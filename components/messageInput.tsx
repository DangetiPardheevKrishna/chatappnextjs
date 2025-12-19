"use client";

import { useState } from "react";
import { PaperAirplaneIcon, PaperClipIcon } from "@heroicons/react/24/solid";

export default function MessageInput({ onSend, loading }: any) {
  const [text, setText] = useState("");

  function submit() {
    if (!text.trim() || loading) return;
    onSend(text);
    setText("");
  }

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3">
          {/* Attachment button */}

          {/* Input */}
          <div className="flex-1 relative">
            <input
              className="w-full border border-gray-300 rounded-full px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && submit()}
              placeholder={`Type your message...`}
              disabled={loading}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
              Press Enter to send
            </div>
          </div>

          {/* Send button */}
          <button
            onClick={submit}
            disabled={!text.trim() || loading}
            className={`p-3 rounded-full transition-all duration-200 flex items-center justify-center ${
              text.trim() && !loading
                ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg transform hover:-translate-y-0.5"
                : "bg-gray-200 cursor-not-allowed"
            }`}
          >
            <PaperAirplaneIcon
              className={`w-5 h-5 ${
                text.trim() && !loading ? "text-white" : "text-gray-400"
              }`}
            />
          </button>
        </div>

        {/* Hint text */}
        <div className="mt-2 text-center">
          <p className="text-xs text-gray-500">
            Your conversations are private and secure
          </p>
        </div>
      </div>
    </div>
  );
}
