import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-firebase-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="firebase-demo">
      <h2>Firebase Demo</h2>

      <!-- Authentication Section -->
      <div class="auth-section">
        <h3>Authentication</h3>
        <div *ngIf="!firebaseService.isAuthenticated(); else userInfo">
          <div class="auth-form">
            <input type="email" [(ngModel)]="email" placeholder="Email" />
            <input type="password" [(ngModel)]="password" placeholder="Password" />
            <div class="auth-buttons">
              <button (click)="signIn()">Sign In</button>
              <button (click)="signUp()">Sign Up</button>
            </div>
          </div>
        </div>

        <ng-template #userInfo>
          <p>Welcome, {{ firebaseService.getCurrentUser()?.email }}!</p>
          <button (click)="signOut()">Sign Out</button>
        </ng-template>
      </div>

      <!-- Firestore Section -->
      <div class="firestore-section" *ngIf="firebaseService.isAuthenticated()">
        <h3>Firestore Demo</h3>
        <div class="add-data">
          <input type="text" [(ngModel)]="newItemName" placeholder="Item name" />
          <button (click)="addItem()">Add Item</button>
        </div>

        <div class="items-list">
          <h4>Items:</h4>
          <div *ngFor="let item of items" class="item">
            {{ item.name }}
            <button (click)="deleteItem(item.id)">Delete</button>
          </div>
        </div>
      </div>

      <!-- Error/Success Messages -->
      <div *ngIf="message" class="message" [ngClass]="{'error': isError, 'success': !isError}">
        {{ message }}
      </div>
    </div>
  `,
  styles: [`
    .firebase-demo {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }

    .auth-section, .firestore-section {
      margin-bottom: 20px;
      padding: 15px;
      background: #f9f9f9;
      border-radius: 5px;
    }

    .auth-form input, .add-data input {
      margin: 5px;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .auth-buttons {
      margin-top: 10px;
    }

    button {
      margin: 5px;
      padding: 8px 16px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background: #0056b3;
    }

    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px;
      margin: 5px 0;
      background: white;
      border: 1px solid #eee;
      border-radius: 3px;
    }

    .message {
      padding: 10px;
      margin: 10px 0;
      border-radius: 4px;
    }

    .error {
      background: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }

    .success {
      background: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }
  `]
})
export class FirebaseDemoComponent {
  firebaseService = inject(FirebaseService);

  email = '';
  password = '';
  newItemName = '';
  items: any[] = [];
  message = '';
  isError = false;

  async signUp() {
    try {
      await this.firebaseService.signUp(this.email, this.password);
      this.showMessage('Successfully signed up!', false);
      this.clearAuthForm();
    } catch (error: any) {
      this.showMessage(error.message, true);
    }
  }

  async signIn() {
    try {
      await this.firebaseService.signIn(this.email, this.password);
      this.showMessage('Successfully signed in!', false);
      this.clearAuthForm();
      await this.loadItems();
    } catch (error: any) {
      this.showMessage(error.message, true);
    }
  }

  async signOut() {
    try {
      await this.firebaseService.signOut();
      this.showMessage('Successfully signed out!', false);
      this.items = [];
    } catch (error: any) {
      this.showMessage(error.message, true);
    }
  }

  async addItem() {
    if (!this.newItemName.trim()) {
      this.showMessage('Please enter an item name', true);
      return;
    }

    try {
      await this.firebaseService.addDocument('items', {
        name: this.newItemName,
        createdAt: new Date(),
        userId: this.firebaseService.getCurrentUser()?.uid
      });
      this.showMessage('Item added successfully!', false);
      this.newItemName = '';
      await this.loadItems();
    } catch (error: any) {
      this.showMessage(error.message, true);
    }
  }

  async loadItems() {
    try {
      this.items = await this.firebaseService.getDocuments('items');
    } catch (error: any) {
      this.showMessage(error.message, true);
    }
  }

  async deleteItem(itemId: string) {
    try {
      await this.firebaseService.deleteDocument('items', itemId);
      this.showMessage('Item deleted successfully!', false);
      await this.loadItems();
    } catch (error: any) {
      this.showMessage(error.message, true);
    }
  }

  private clearAuthForm() {
    this.email = '';
    this.password = '';
  }

  private showMessage(message: string, isError: boolean) {
    this.message = message;
    this.isError = isError;
    setTimeout(() => {
      this.message = '';
    }, 5000);
  }
}
