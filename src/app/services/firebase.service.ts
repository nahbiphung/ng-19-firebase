import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Firestore, collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc, CollectionReference, DocumentData } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { authState } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  user$: Observable<User | null>;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) {
    this.user$ = authState(this.auth);
  }

  // Authentication methods
  async signUp(email: string, password: string) {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password);
      return result;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  async signIn(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      return result;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  async signOut() {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  // Firestore methods
  async addDocument(collectionName: string, data: any) {
    try {
      const collectionRef = collection(this.firestore, collectionName);
      const docRef = await addDoc(collectionRef, data);
      return docRef;
    } catch (error) {
      console.error('Add document error:', error);
      throw error;
    }
  }

  async getDocuments(collectionName: string) {
    try {
      const collectionRef = collection(this.firestore, collectionName);
      const snapshot = await getDocs(collectionRef);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Get documents error:', error);
      throw error;
    }
  }

  async getDocument(collectionName: string, documentId: string) {
    try {
      const docRef = doc(this.firestore, collectionName, documentId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('Document not found');
      }
    } catch (error) {
      console.error('Get document error:', error);
      throw error;
    }
  }

  async updateDocument(collectionName: string, documentId: string, data: any) {
    try {
      const docRef = doc(this.firestore, collectionName, documentId);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error('Update document error:', error);
      throw error;
    }
  }

  async deleteDocument(collectionName: string, documentId: string) {
    try {
      const docRef = doc(this.firestore, collectionName, documentId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Delete document error:', error);
      throw error;
    }
  }

  // Storage methods
  async uploadFile(path: string, file: File) {
    try {
      const storageRef = ref(this.storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Upload file error:', error);
      throw error;
    }
  }

  async deleteFile(path: string) {
    try {
      const storageRef = ref(this.storage, path);
      await deleteObject(storageRef);
    } catch (error) {
      console.error('Delete file error:', error);
      throw error;
    }
  }

  // Utility methods
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  isAuthenticated(): boolean {
    return this.auth.currentUser !== null;
  }
}
