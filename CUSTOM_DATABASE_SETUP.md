# Using Custom Firestore Database: test-db-1

## What's Been Configured:

Your Angular app is now configured to use the custom Firestore database named `test-db-1` instead of the default `(default)` database.

## Changes Made:

1. **Environment Files Updated** - Added `databaseId: "test-db-1"` to all environment configurations
2. **App Config Modified** - Updated `app.config.ts` to connect to the custom database
3. **Firebase Service** - Will automatically use the correct database instance

## Configuration Details:

### Environment Files:

```typescript
firebase: {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id",
  databaseId: "test-db-1"  // ← This tells Firebase which database to use
}
```

### App Configuration:

The app will now automatically connect to your `test-db-1` database when it initializes.

## Firebase Console Setup:

To create and configure the `test-db-1` database in your Firebase project:

1. **Go to Firebase Console** → Your Project → Firestore Database
2. **Create a new database**:

   - Click "Create database" (or the + icon if you have existing databases)
   - Choose "Start in test mode" for development
   - Select your preferred region
   - **Important**: Set the database ID to `test-db-1`

3. **Set Security Rules** for your custom database:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Allow authenticated users to read/write
       match /{document=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

## How It Works:

- **Default Database**: Firebase projects come with a database named `(default)`
- **Multiple Databases**: You can create additional databases with custom names
- **Your Setup**: Your app now connects to `test-db-1` instead of `(default)`

## Testing Your Setup:

1. **Run your app**: `npm start`
2. **Navigate to the Firebase demo**: The app should load at `http://localhost:4200`
3. **Try authentication and data operations**: All Firestore operations will use `test-db-1`

## Important Notes:

- **Security Rules**: Each database has its own security rules
- **Data Isolation**: Data in `test-db-1` is completely separate from `(default)`
- **Billing**: Each database is billed separately
- **Indexes**: Each database maintains its own indexes

## Switching Between Databases:

To switch to a different database, simply change the `databaseId` value in your environment files:

- `"test-db-1"` - Uses your custom database
- `"(default)"` - Uses the default database
- Remove `databaseId` property - Also uses default database

Your app is now ready to work with the `test-db-1` Firestore database! 🎉
