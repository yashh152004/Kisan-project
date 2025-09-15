// src/App.jsx
import { useState, useEffect } from "react";
import "./App.css";
import { auth } from "./firebase";
import { RecaptchaVerifier, signInWithPhoneNumber, signOut, onAuthStateChanged } from "firebase/auth";

function App() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [confirmationResult, setConfirmationResult] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log("Recaptcha verified");
        },
      },
      auth
    );
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phone) {
      setMessage("⚠️ Please enter your phone number.");
      return;
    }
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    try {
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      setMessage("📩 OTP sent to your phone!");
    } catch (error) {
      setMessage("❌ Failed to send OTP: " + error.message);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      setMessage("⚠️ Please enter the OTP.");
      return;
    }
    if (!confirmationResult) {
      setMessage("⚠️ No OTP request found. Please request OTP first.");
      return;
    }
    try {
      const result = await confirmationResult.confirm(otp);
      setUser(result.user);
      setMessage("✅ Phone login successful!");
    } catch (error) {
      setMessage("❌ Invalid OTP. Please try again.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setConfirmationResult(null);
    setPhone("");
    setOtp("");
    setMessage("👋 Logged out successfully!");
  };

  return (
    <div className="App">
      <div className="login-container">
        {user ? (
          <div>
            <h2>Welcome, {user.phoneNumber}</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <h2>Phone Login</h2>
            {!confirmationResult ? (
              <form onSubmit={handleSendOtp}>
                <input
                  type="text"
                  placeholder="+91 1234567890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <button type="submit">Send OTP</button>
                <div id="recaptcha-container"></div>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp}>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <button type="submit">Verify OTP</button>
              </form>
            )}
          </div>
        )}

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default App;
