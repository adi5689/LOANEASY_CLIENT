import { useState } from "react";
import LOGO from "../assets/LOAN.png";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom"; 

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "", 
  });

  const { email, password, username } = formData;
  const { handleLogin, handleSignup, loading, error } = useAuthContext();
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await handleLogin(email, password);
        navigate("/");
      } else {
        await handleSignup(username, email, password);
        navigate("/" ); 
      }
    } catch (err) {
      console.error(err);
      error();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-blue-500">
      <div className="lg:w-3/5 p-6 bg-white shadow-md rounded-md lg:h-screen h-full flex flex-col justify-center items-center">
        <div className="flex items-center justify-center">
          <img src={LOGO} alt="logo" />
        </div>
        <div>
          <h1 className="font-anta">Makes taking a loan easy!</h1>
        </div>
      </div>
      <div className="bg-blue-500 lg:h-screen w-full flex justify-center items-center lg:w-2/5 m-3">
      <div className="p-6 bg-white shadow-md rounded-md">
        
          <h1 className="text-2xl font-bold mb-4">
            {isLogin ? "Login" : "Signup"}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 m-3">
            {!isLogin && (
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            )}
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {isLogin ? "Login" : "Signup"}
            </button>
          </form>
          <div className="flex mt-4 gap-x-2">
            {isLogin ? (
              <p>Don't have an account?</p>
            ) : (
              <p>Already have an account?</p>
            )}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 hover:text-blue-600"
            >
              {isLogin ? " Sign Up" : " Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
