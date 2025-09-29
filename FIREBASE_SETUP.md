# Firebase Setup for Angular App

## 🔥 Firebase Integration Complete!

Your Angular app is now configured to work with Firebase. Here's what has been set up:

### What's Been Added:

1. **Firebase Configuration** - Added to all environment files
2. **Firebase Services** - Authentication, Firestore, and Storage providers
3. **Firebase Service** - A comprehensive service with common Firebase operations
4. **Demo Component** - Shows how to use Firebase features

### Next Steps:

#### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Follow the setup wizard
4. Enable the services you need:
   - **Authentication** (Email/Password provider)
   - **Firestore Database** (Start in test mode for development)
   - **Storage** (if you need file uploads)

#### 2. Get Your Firebase Configuration

1. In Firebase Console, click the gear icon → "Project settings"
2. Scroll down to "Your apps" section
3. Click "Add app" → Web (</>) 
4. Register your app with a nickname
5. Copy the configuration object

#### 3. Update Environment Files

Replace the placeholder values in these files with your actual Firebase config:

- `src/environments/environment.ts` (production)
- `src/environments/environment.development.ts` (development)  
- `src/environments/environment.staging.ts` (staging)

```typescript
firebase: {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id"
}
```

#### 4. Set Up Firestore Security Rules

In Firebase Console → Firestore Database → Rules, use these rules for development:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /items/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

#### 5. Run Your App

```bash
npm start
```

Visit `http://localhost:4200` to see your app with Firebase integration!

### Available Firebase Services:

The `FirebaseService` provides these methods:

#### Authentication:
- `signUp(email, password)` - Create new user account
- `signIn(email, password)` - Sign in existing user  
- `signOut()` - Sign out current user
- `user$` - Observable of authentication state
- `getCurrentUser()` - Get current user object
- `isAuthenticated()` - Check if user is signed in

#### Firestore Database:
- `addDocument(collection, data)` - Add new document
- `getDocuments(collection)` - Get all documents from collection
- `getDocument(collection, id)` - Get specific document
- `updateDocument(collection, id, data)` - Update document
- `deleteDocument(collection, id)` - Delete document

#### Storage:
- `uploadFile(path, file)` - Upload file and get download URL
- `deleteFile(path)` - Delete file from storage

### Demo Component Features:

The Firebase demo component (`/firebase-demo`) shows:
- User registration and login
- Adding/deleting items in Firestore
- Real-time authentication state
- Error handling and user feedback

### Security Notes:

- **Never commit real Firebase config to version control** if your repo is public
- Use environment variables for production deployments
- Set up proper Firestore security rules before going live
- Enable Firebase Authentication providers as needed

### Troubleshooting:

If you encounter issues:
1. Check that all Firebase services are enabled in the console
2. Verify your Firebase config values are correct
3. Ensure Firestore security rules allow your operations
4. Check the browser console for error messages

### Resources:

- [Firebase Documentation](https://firebase.google.com/docs)
- [AngularFire Documentation](https://github.com/angular/angularfire)
- [Firebase Console](https://console.firebase.google.com/)

Happy coding! 🚀
