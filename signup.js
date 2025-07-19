// Firebase SDK (CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";

// Your local helper file
import { showMessage, validateEmail, validatePassword } from './common.js';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDOeXqRu3sFQMgzJjzjpvoIC2e2OhrRnoM",
  authDomain: "tiens-b1300.firebaseapp.com",
  projectId: "tiens-b1300",
  storageBucket: "tiens-b1300.appspot.com",
  messagingSenderId: "172538440844",
  appId: "1:172538440844:web:b835a71e3b39359601dfa9",
  measurementId: "G-5GGPTW9YDZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Signup form handler
function handleSignup(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');
  const terms = formData.get('terms');

  if (!firstName || !lastName) {
    showMessage('Please fill in all name fields', 'error');
    return;
  }

  if (!validateEmail(email)) {
    showMessage('Please enter a valid email address', 'error');
    return;
  }

  if (!validatePassword(password)) {
    showMessage('Password must be at least 6 characters long', 'error');
    return;
  }

  if (password !== confirmPassword) {
    showMessage('Passwords do not match', 'error');
    return;
  }


  showMessage('Creating your account...');

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      });
    })
    .then(() => {
      showMessage('Account created successfully! Redirecting...');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    })
    .catch((error) => {
      showMessage(error.message, 'error');
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  const loadingOverlay = document.getElementById('loadingOverlay');

  window.addEventListener('load', function () {
    if (loadingOverlay) loadingOverlay.classList.add('hidden');
  });

  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', handleSignup);
  }

  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function () {
      this.parentElement.style.transform = 'translateY(-2px)';
    });

    input.addEventListener('blur', function () {
      this.parentElement.style.transform = 'translateY(0)';
    });
  });
});
