import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login, saveToken } from "../api/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("khanh@example.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await login({ email, password });
      console.log("Login successful:", data);
      saveToken(data.token);
      navigate("/");
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center py-8">
      <div className="w-full max-w-5xl px-4">
        <div className="grid grid-cols-1 xl:grid-cols-[5fr_4fr] gap-6 items-stretch">
          <div className="hidden xl:grid grid-cols-[1.4fr_1fr] gap-6 rounded-[20px] bg-white p-8 shadow-2xl h-full min-h-0 overflow-hidden">
            <div className="flex flex-col justify-center gap-6">
              <div className="w-full">
                <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900">
                  Khám phá <br />
                  những điều <span className="text-blue-500">bạn yêu thích.</span>
                </h1>
                <p className="mt-5 text-base text-slate-600">
                  Kết nối với bạn bè mới và chia sẻ khoảnh khắc theo cách gần gũi nhất.
                </p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5 shadow-inner">
                <p className="text-sm text-slate-500">
                  Mạng xã hội cá nhân, tối ưu cho kết nối, chia sẻ và khám phá tiện lợi.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center h-full min-h-0">
              <div className="w-full h-full max-h-[620px] rounded-[32px] border border-slate-200 bg-slate-100 p-5 shadow-lg">
                <img
                  src="https://static.xx.fbcdn.net/rsrc.php/y0/r/U45qBJmWVHU.webp"
                  alt="Facebook illustration"
                  className="w-full h-full rounded-[28px] object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center px-4 sm:px-6">
            <div className="w-full max-w-2xl rounded-[16px] bg-white p-8 shadow-2xl flex flex-col justify-between xl:h-full mx-auto">
              <div>
                <h2 className="text-3xl font-semibold text-center text-slate-900 mb-5">
                  Đăng nhập vào Facebook
                </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Email hoặc username"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Mật khẩu"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-white transition hover:bg-blue-700"
                >
                  Đăng nhập
                </button>
              </form>

              <div className="mt-5 text-center">
                <a href="#" className="text-blue-600 text-sm hover:underline">
                  Forgot password?
                </a>
              </div>

              <div className="mt-5 flex items-center justify-center gap-3">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  Create New Account
                </Link>
              </div>

              <p className="mt-5 text-center text-xs text-slate-500">
                Default: <strong>defaultuser</strong> / <strong>defaultpass</strong>
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
