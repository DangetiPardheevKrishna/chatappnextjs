"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Check } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const passwordStrength = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*]/.test(password),
  };

  const strengthScore = Object.values(passwordStrength).filter(Boolean).length;

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    if (!agreedToTerms) {
      setError("Please agree to the Terms & Conditions");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (strengthScore < 3) {
      setError("Please use a stronger password");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.message || "Registration failed");
      setLoading(false);
      return;
    }

    setSuccess("Account created successfully! Logging you in...");

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
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-[#e8f5e9] border border-[#a3d9a5] text-[#2e7d32] px-4 py-3 rounded-xl mb-6">
          <p className="text-sm font-medium">{success}</p>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#344e41] mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#588157]" />
            <input
              className="w-full pl-10 pr-4 py-3 border border-[#a3b18a] rounded-xl focus:ring-2 focus:ring-[#3a5a40] focus:border-transparent transition-all text-[#344e41] placeholder:text-[#588157]/70 bg-white/90"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

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
              placeholder="Create a strong password"
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

          {/* Password Strength Meter */}
          {password && (
            <div className="mt-3 space-y-2">
              <div className="h-2 bg-[#dad7cd] rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    strengthScore < 2
                      ? "bg-[#dc2626]"
                      : strengthScore < 4
                      ? "bg-[#d97706]"
                      : "bg-[#16a34a]"
                  }`}
                  style={{ width: `${(strengthScore / 5) * 100}%` }}
                />
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full flex items-center justify-center ${
                      passwordStrength.length ? "bg-[#16a34a]" : "bg-[#a3b18a]"
                    }`}
                  >
                    {passwordStrength.length && (
                      <Check className="w-2 h-2 text-white" />
                    )}
                  </div>
                  <span className="text-[#588157]">8+ characters</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full flex items-center justify-center ${
                      passwordStrength.uppercase
                        ? "bg-[#16a34a]"
                        : "bg-[#a3b18a]"
                    }`}
                  >
                    {passwordStrength.uppercase && (
                      <Check className="w-2 h-2 text-white" />
                    )}
                  </div>
                  <span className="text-[#588157]">Uppercase</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full flex items-center justify-center ${
                      passwordStrength.number ? "bg-[#16a34a]" : "bg-[#a3b18a]"
                    }`}
                  >
                    {passwordStrength.number && (
                      <Check className="w-2 h-2 text-white" />
                    )}
                  </div>
                  <span className="text-[#588157]">Number</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full flex items-center justify-center ${
                      passwordStrength.special ? "bg-[#16a34a]" : "bg-[#a3b18a]"
                    }`}
                  >
                    {passwordStrength.special && (
                      <Check className="w-2 h-2 text-white" />
                    )}
                  </div>
                  <span className="text-[#588157]">Special char</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#344e41] mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#588157]" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full pl-10 pr-12 py-3 border border-[#a3b18a] rounded-xl focus:ring-2 focus:ring-[#3a5a40] focus:border-transparent transition-all text-[#344e41] placeholder:text-[#588157]/70 bg-white/90"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#588157] hover:text-[#3a5a40]"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-[#e8f5e9] rounded-xl">
          <button
            type="button"
            onClick={() => setAgreedToTerms(!agreedToTerms)}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
              agreedToTerms
                ? "bg-[#3a5a40] border-[#3a5a40]"
                : "border-[#588157] hover:border-[#3a5a40]"
            }`}
            aria-label="Agree to terms and conditions"
          >
            {agreedToTerms && <Check className="w-3 h-3 text-white" />}
          </button>
          <label className="text-sm text-[#588157] cursor-pointer">
            I agree to the{" "}
            <a href="#" className="text-[#3a5a40] font-medium hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#3a5a40] font-medium hover:underline">
              Privacy Policy
            </a>
          </label>
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#588157] to-[#3a5a40] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating account...
            </span>
          ) : (
            "Create Account"
          )}
        </button>
      </div>
    </>
  );
}
