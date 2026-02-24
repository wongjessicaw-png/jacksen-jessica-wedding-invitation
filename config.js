// config.js

// ==========================
// Firebase configuration
// Replace with your real credentials before deploying
// ==========================
const firebaseConfig = {
    apiKey: "AIzaSyCJdsciEiXcuImuuvtoH_3vFhdz3XRM3-I",
    authDomain: "wedding-database-e128c.firebaseapp.com",
    databaseURL: "https://wedding-database-e128c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "wedding-database-e128c",
    storageBucket: "wedding-database-e128c.appspot.com",
    messagingSenderId: "144261977665",
    appId: "1:144261977665:web:508c89eff1e4d7ab7b18c0",
    measurementId: "G-JNR07XFJTC"
};

// ==========================
// Sample guest list for testing
// Used for demo purposes to verify URL parameter personalization
// ==========================
const guests = [
    { name: 'Budi', rsvp: true },
    { name: 'Jessica', rsvp: true },
    { name: 'Jacksen', rsvp: true },
    { name: 'Alice Johnson', rsvp: false }
];

// Expose to global scope for use in scripts without ES module
window.firebaseConfig = firebaseConfig;
window.guests = guests;
