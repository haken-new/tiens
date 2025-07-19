import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
import { showMessage, validateEmail, validatePassword } from './common.js';

const firebaseConfig = {
  apiKey: "AIzaSyDOeXqRu3sFQMgzJjzjpvoIC2e2OhrRnoM",
  authDomain: "tiens-b1300.firebaseapp.com",
  projectId: "tiens-b1300",
  storageBucket: "tiens-b1300.firebasestorage.app",
  messagingSenderId: "172538440844",
  appId: "1:172538440844:web:b835a71e3b39359601dfa9",
  measurementId: "G-5GGPTW9YDZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

function handleLogin(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const email = formData.get('email');
  const password = formData.get('password');

  if (!validateEmail(email)) {
    showMessage('Please enter a valid email address', 'error');
    return;
  }

  if (!validatePassword(password)) {
    showMessage('Password must be at least 6 characters long', 'error');
    return;
  }

  showMessage('Signing you in...');

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      showMessage('Login successful! Redirecting...');
      setTimeout(() => window.location.href = 'home.html', 1000);
    })
    .catch((error) => {
      showMessage(error.message, 'error');
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const loadingOverlay = document.getElementById('loadingOverlay');
  window.addEventListener('load', () => loadingOverlay?.classList.add('hidden'));

  const loginForm = document.getElementById('loginForm');
  loginForm?.addEventListener('submit', handleLogin);

  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', () => input.parentElement.style.transform = 'translateY(-2px)');
    input.addEventListener('blur', () => input.parentElement.style.transform = 'translateY(0)');
  });
});
