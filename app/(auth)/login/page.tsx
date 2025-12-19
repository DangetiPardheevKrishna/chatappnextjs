// "use client";

// import { signIn } from "next-auth/react";
// import { useSearchParams } from "next/navigation";
// import { useState } from "react";
// import { Mail, Lock, Eye, EyeOff } from "lucide-react";

// export default function LoginPage() {
//   const searchParams = useSearchParams();
//   const error = searchParams.get("error");

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     setLoading(true);
//     await signIn("credentials", {
//       email,
//       password,
//       callbackUrl: "/",
//     });
//     setLoading(false);
//   };

//   return (
//     <>
//       {error && (
//         <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
//           <p className="text-sm font-medium">
//             {error === "CredentialsSignin"
//               ? "Invalid email or password"
//               : "Authentication failed"}
//           </p>
//         </div>
//       )}

//       <div className="space-y-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Email Address
//           </label>
//           <div className="relative">
//             <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               type="email"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Password
//           </label>
//           <div className="relative">
//             <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type={showPassword ? "text" : "password"}
//               className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//             >
//               {showPassword ? (
//                 <EyeOff className="w-5 h-5" />
//               ) : (
//                 <Eye className="w-5 h-5" />
//               )}
//             </button>
//           </div>
//           <div className="flex justify-end mt-2">
//             <a
//               href="#"
//               className="text-sm text-blue-600 hover:text-blue-700 font-medium"
//             >
//               Forgot password?
//             </a>
//           </div>
//         </div>

//         <button
//           onClick={handleLogin}
//           disabled={loading}
//           className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
//         >
//           {loading ? (
//             <span className="flex items-center justify-center gap-2">
//               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               Signing in...
//             </span>
//           ) : (
//             "Sign In"
//           )}
//         </button>
//       </div>
//     </>
//   );
// }
"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
    setLoading(false);
  };

  return (
    <>
      {error && (
        <div className="bg-[#fdf6e8] border border-[#e7b8a3] text-[#8b4513] px-4 py-3 rounded-xl mb-6">
          <p className="text-sm font-medium">
            {error === "CredentialsSignin"
              ? "Invalid email or password"
              : "Authentication failed"}
          </p>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#344e41] mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#588157]" />
            <input
              className="w-full pl-10 pr-4 py-3 border border-[#a3b18a] rounded-xl focus:ring-2 focus:ring-[#3a5a40] focus:border-transparent transition-all text-[#344e41] placeholder:text-[#588157]/70 bg-white/90"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#344e41] mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#588157]" />
            <input
              type={showPassword ? "text" : "password"}
              className="w-full pl-10 pr-12 py-3 border border-[#a3b18a] rounded-xl focus:ring-2 focus:ring-[#3a5a40] focus:border-transparent transition-all text-[#344e41] placeholder:text-[#588157]/70 bg-white/90"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#588157] hover:text-[#3a5a40]"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="flex justify-end mt-2">
            <a
              href="#"
              className="text-sm text-[#3a5a40] hover:text-[#344e41] font-medium"
            >
              Forgot password?
            </a>
          </div>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#588157] to-[#3a5a40] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Signing in...
            </span>
          ) : (
            "Sign In"
          )}
        </button>
      </div>
    </>
  );
}
