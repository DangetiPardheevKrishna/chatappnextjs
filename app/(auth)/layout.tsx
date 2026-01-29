// "use client";

// import { ReactNode } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { signIn } from "next-auth/react";

// interface LayoutProps {
//   children: ReactNode;
// }

// export default function AuthLayout({ children }: LayoutProps) {
//   const pathname = usePathname();
//   const isLoginPage = pathname === "/login";
//   const isRegisterPage = pathname === "/register";

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#344e41] via-[#3a5a40] to-[#588157]">
//       {" "}
//       {/* Decorative Background Elements */}
//       <div className="fixed inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#3a5a40]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#344e41]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#588157]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
//       </div>
//       <div className="relative min-h-screen flex items-center justify-center p-4">
//         <div className="w-full max-w-md">
//           {/* Auth Card */}
//           <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-[#a3b18a]/30 overflow-hidden">
//             <div className="p-8">
//               {/* Toggle Switch */}
//               <div className="flex mb-8 bg-[#e8f5e9] rounded-xl p-1">
//                 <Link
//                   href="/login"
//                   className={`flex-1 py-3 text-center rounded-lg font-medium transition-all ${
//                     isLoginPage
//                       ? "bg-white shadow-sm text-[#3a5a40]"
//                       : "text-[#588157] hover:text-[#344e41]"
//                   }`}
//                 >
//                   Sign In
//                 </Link>
//                 <Link
//                   href="/register"
//                   className={`flex-1 py-3 text-center rounded-lg font-medium transition-all ${
//                     isRegisterPage
//                       ? "bg-white shadow-sm text-[#3a5a40]"
//                       : "text-[#588157] hover:text-[#344e41]"
//                   }`}
//                 >
//                   Sign Up
//                 </Link>
//               </div>

//               {/* Page Content */}
//               <div className="space-y-6">{children}</div>

//               {/* Divider */}
//               <div className="relative my-8">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-[#a3b18a]/50"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-white text-[#588157]">
//                     Or continue with
//                   </span>
//                 </div>
//               </div>

//               {/* Social Auth Buttons */}
//               <div className="grid grid-cols-2 gap-3">
//                 <button
//                   onClick={() => signIn("google", { callbackUrl: "/" })}
//                   className="flex items-center justify-center gap-3 p-3 bg-white border border-[#a3b18a] text-[#344e41] rounded-xl hover:bg-[#f5f5f5] transition-colors"
//                 >
//                   <svg className="w-5 h-5" viewBox="0 0 24 24">
//                     <path
//                       fill="#4285F4"
//                       d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                     />
//                     <path
//                       fill="#34A853"
//                       d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                     />
//                     <path
//                       fill="#FBBC05"
//                       d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                     />
//                     <path
//                       fill="#EA4335"
//                       d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                     />
//                   </svg>
//                   <span className="font-medium">Google</span>
//                 </button>
//                 <button
//                   onClick={() => signIn("github", { callbackUrl: "/" })}
//                   className="flex items-center justify-center gap-3 p-3 bg-[#344e41] text-white rounded-xl hover:bg-[#2a3d34] transition-colors"
//                 >
//                   <svg
//                     className="w-5 h-5"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
//                   </svg>
//                   <span className="font-medium">GitHub</span>
//                 </button>
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="bg-[#f5f5f5] border-t border-[#a3b18a]/30 p-6">
//               <div className="text-center text-sm">
//                 <p className="text-[#588157]">
//                   {isLoginPage
//                     ? "Don't have an account? "
//                     : "Already have an account? "}
//                   <Link
//                     href={isLoginPage ? "/register" : "/login"}
//                     className="text-[#3a5a40] font-semibold hover:text-[#344e41] transition-colors"
//                   >
//                     {isLoginPage ? "Sign up" : "Sign in"}
//                   </Link>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Custom Animations */}
//       <style jsx global>{`
//         @keyframes blob {
//           0% {
//             transform: translate(0px, 0px) scale(1);
//           }
//           33% {
//             transform: translate(30px, -50px) scale(1.1);
//           }
//           66% {
//             transform: translate(-20px, 20px) scale(0.9);
//           }
//           100% {
//             transform: translate(0px, 0px) scale(1);
//           }
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn } from "next-auth/react";

interface LayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: LayoutProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";

  return (
    <div className="min-h-dvh bg-primary/10">
      {" "}
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      <div className="relative min-h-dvh flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Auth Card */}
          <div className="bg-background/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-primary/20 overflow-hidden">
            <div className="p-8">
              {/* Toggle Switch */}
              <div className="flex mb-8 bg-primary/10 rounded-xl p-1">
                <Link
                  href="/login"
                  className={`flex-1 py-3 text-center rounded-lg font-medium transition-all ${
                    isLoginPage
                      ? "bg-background shadow-sm text-primary"
                      : "text-primary/80 hover:text-primary"
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className={`flex-1 py-3 text-center rounded-lg font-medium transition-all ${
                    isRegisterPage
                      ? "bg-background shadow-sm text-primary"
                      : "text-primary/80 hover:text-primary"
                  }`}
                >
                  Sign Up
                </Link>
              </div>

              {/* Page Content */}
              <div className="space-y-6">{children}</div>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-primary/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-primary">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Auth Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                  className="flex items-center justify-center gap-3 p-3 bg-background border border-primary/30 text-primary rounded-xl hover:bg-primary/5 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="font-medium">Google</span>
                </button>
                <button
                  onClick={() => signIn("github", { callbackUrl: "/" })}
                  className="flex items-center justify-center gap-3 p-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="font-medium">GitHub</span>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-primary/5 border-t border-primary/20 p-6">
              <div className="text-center text-sm">
                <p className="text-primary">
                  {isLoginPage
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <Link
                    href={isLoginPage ? "/register" : "/login"}
                    className="text-primary font-semibold hover:text-primary/80 transition-colors"
                  >
                    {isLoginPage ? "Sign up" : "Sign in"}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
