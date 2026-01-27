"use client";

import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import { User, LogOut, Users, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* User Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        aria-label="User menu"
      >
        <User className={`w-5 h-5 transition-transform`} />
        {/* <ChevronDown /> */}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-background border border-input rounded-lg shadow-lg p-2 min-w-[220px] z-50">
          {/* Menu Items */}
          <div className="space-y-1">
            <Link
              href="/personalities"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-md hover:bg-primary/5 transition-colors text-foreground"
            >
              <Users className="w-4 h-4" />
              <span>Manage Personalities</span>
            </Link>

            <div className="h-px bg-input my-1"></div>

            <button
              onClick={() => {
                setIsOpen(false);
                signOut({ callbackUrl: "http://localhost:3000/login" });
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-md hover:bg-destructive/10 text-destructive transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
