// config.js

// ==========================
// Firebase configuration placeholder
// Replace with your real credentials after deploying
// ==========================
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// ==========================
// Sample guest list for testing
// Used for demo purposes to verify URL parameter personalization
// ==========================
const guests = [
  { name: 'John Doe', rsvp: true },
  { name: 'Jane Smith', rsvp: false },
  { name: 'Alice Johnson', rsvp: true }
];

// Expose to global scope for use in scripts without ES module
window.firebaseConfig = firebaseConfig;
window.guests = guests;
