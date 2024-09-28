import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Auth/firebase"; 
import { login } from "../features/authSlice"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadCartForUser } from "../features/cartSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignupActive, setIsSignupActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = () => {
    setIsSignupActive(!isSignupActive);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      let userCredential;
      if (isSignupActive) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Signup successful!", {
          autoClose: 1000,
          onClose: () => {
            navigate("/");
          },
        });
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login successful!", {
          autoClose: 1000,
          onClose: () => {
            navigate("/");
          },
        });
      }

      const user = userCredential.user;
      localStorage.setItem("uid", user.uid); 
      dispatch(loadCartForUser(user.uid));
      dispatch(login(user.email));  

    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      console.log(error.code, errorMessage);
    } finally {
      setLoading(false); 
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 text-white p-10 rounded-lg shadow-lg w-full max-w-lg transition-all duration-300 transform hover:scale-105"
      >
        <h2 className="text-4xl font-bold mb-8 text-center text-blue-500">
          {isSignupActive ? "Sign Up" : "Log In"}
        </h2>

        <div className="mb-6">
          <label className="block text-gray-300 text-lg font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 text-black text-lg border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 transition duration-300"
            required
          />
        </div>


        <div className="mb-6">
          <label className="block text-gray-300 text-lg font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 text-black text-lg border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 transition duration-300"
            required
          />
        </div>

        <div className="mb-6">
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 text-xl transition duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading} 
          >
            {loading ? "Loading..." : (isSignupActive ? "Sign Up" : "Login")}
          </button>
        </div>

        <p className="text-center text-gray-400">
          <a onClick={handleRegister} className="text-blue-500 hover:underline cursor-pointer">
            {isSignupActive ? "Log In" : "Don't have an account? Register"}
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
