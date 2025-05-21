import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import pattern1 from "../assets/pattern1.png";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();

  console.log("hi ritesh " + pattern1);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");
  const [user, setUser] = React.useState(null);

  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const handleSignIn = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post(`${backendUrl}/login`, {
        email,
        password,
      });

      setMessage(response.data.message || "Login successful!");
      login(response.data.token); // Save token to context + localStorage
      navigate("/profile"); // ✅ Redirect after login
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Image */}
        <img
          src={pattern1}
          alt="Pattern"
          className="absolute inset-0 w-full h-full object-cover z-0 p-0 m-0 rounded-3xl opacity-55"
        />

        {/* Centered Login Box */}
        <div className="flex justify-center items-center h-full">
          <div className="relative z-10 w-full mx-4 max-w-md p-6 rounded-xl bg-gray-100 shadow-md border border-transparent">
            <h2 className="text-2xl font-bold mb-6 text-center text-primary">
              Sign In
            </h2>

            <form onSubmit={handleSignIn}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="text"
                  className="mt-1 w-full px-4 py-2 rounded-lg border-none bg-gray-200 text-gray-700 placeholder:text-slate-400 shadow-inner focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  className="mt-1 w-full px-4 py-2 rounded-lg border-none bg-gray-200 text-gray-700 placeholder:text-slate-400 shadow-inner focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 mt-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary transition-all"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {(message || error) && (
              <p
                className={`mt-4 text-center ${
                  error ? "text-red-500" : "text-indigo-500"
                }`}
              >
                {error || message}
              </p>
            )}

            <div className="mt-4 text-center">
              <p className="text-gray-700">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-primary underline hover:opacity-80 transition-colors"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
