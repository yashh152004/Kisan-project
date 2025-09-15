// src/App.jsx
import { useState, useEffect } from "react";
import "./App.css";
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  // Track Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Email/Password login or signup
  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage("✅ Login successful!");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage("🎉 Account created successfully!");
      }
    } catch (error) {
      setMessage("❌ " + error.message);
    }
  };

  // Forgot password
  const handleResetPassword = async () => {
    if (!email) {
      setMessage("⚠️ Please enter your email to reset password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("📩 Password reset email sent!");
    } catch (error) {
      setMessage("❌ " + error.message);
    }
  };

  // Logout
  const handleLogout = async () => {
    await signOut(auth);
    setMessage("👋 Logged out successfully!");
  };

  // Google login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setMessage("✅ Google login successful!");
    } catch (error) {
      setMessage("❌ " + error.message);
    }
  };

  return (
    <div className="App">
      <div className="login-container">
        {user ? (
          // Logged-in view
          <div>
            <h2>Welcome, {user.email}</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          // Login/Signup form
          <div>
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>
            <form onSubmit={handleAuth}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
            </form>

            <p className="toggle" onClick={() => setIsLogin(!isLogin)}>
              {isLogin
                ? "Need an account? Sign Up"
                : "Already have an account? Login"}
            </p>

            {isLogin && (
              <p className="reset" onClick={handleResetPassword}>
                Forgot Password?
              </p>
            )}

            <button onClick={handleGoogleLogin}>Login with Google</button>
          </div>
        )}

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default App;
