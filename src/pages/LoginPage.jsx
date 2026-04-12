import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login, saveToken } from "../api/auth";

export default function LoginPage() {
  const [username, setUsername] = useState("defaultuser");
  const [password, setPassword] = useState("defaultpass");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await login({ username, password });
      saveToken(data.token);
      navigate("/");
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      <div className="grid grid-cols-10 space-x-1">
        {/* LEFT */}
        <div className="col-span-7  flex items-center justify-between rounded-lg p-10 bg-white ">
          {/* TEXT */}
          <div className="max-w-md">
            <h1 className="text-6xl font-bold leading-tight">
              Khám phá <br />
              những điều <span className="text-blue-500">bạn yêu thích.</span>
            </h1>
          </div>

          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/y0/r/U45qBJmWVHU.webp"
              alt="Facebook illustration"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-span-3 flex items-center justify-center pl-10 rounded-lg p-10 bg-white ">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="w-full max-w-sm">
              <h2 className="text-lg font-semibold mb-6 text-center">
                Đăng nhập vào Facebook
              </h2>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <input
                  className="w-full mb-3 p-3 border rounded-lg"
                  placeholder="Email"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  className="w-full mb-3 p-3 border rounded-lg"
                  placeholder="Mật khẩu"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold">
                  Đăng nhập
                </button>
              </div>
            </div>
          </form>
          <div className="mt-4 text-center">
            <a href="#" className="text-blue-600 text-sm hover:underline">Forgot password?</a>
          </div>
          <hr className="my-6" />
          <div className="text-center">
            <Link
              to="/register"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-semibold"
            >
              Create New Account
            </Link>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Default: <strong>defaultuser</strong> / <strong>defaultpass</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
