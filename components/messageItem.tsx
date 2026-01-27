import { motion } from "framer-motion";
import {
  UserCircleIcon,
  ClockIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  ClipboardIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function MessageItem({ m, index, renderAIAvatar, formatTime }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(m.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const isUser = m.sender === "user";
  const isSystem = m.sender === "system";
  const isAI = !isUser && !isSystem;

  return (
    <motion.div
      key={m.id}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ scale: 1.005 }}
      className={`flex gap-4 relative ${
        isUser ? "flex-row-reverse" : ""
      } group`}
    >
      {/* Animated Background Glow */}
      {isAI && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          className={`absolute inset-0 -z-10 bg-gradient-to-r ${
            isUser
              ? "from-blue-500/10 to-cyan-500/10"
              : "from-purple-500/10 to-pink-500/10"
          } blur-xl rounded-3xl`}
        />
      )}

      {/* Avatar Container */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className={`relative flex-shrink-0 ${isUser ? "order-2" : "order-1"}`}
      >
        {/* Avatar Glow Effect */}
        <div
          className={`absolute inset-0 rounded-full ${
            isUser
              ? "bg-blue-500/20"
              : isSystem
              ? "bg-amber-500/20"
              : "bg-purple-500/20"
          } blur-md animate-pulse`}
        />

        {/* Avatar */}
        <div
          className={`relative w-12 h-12 rounded-2xl ${
            isUser
              ? "bg-gradient-to-br from-blue-500 to-cyan-500"
              : isSystem
              ? "bg-gradient-to-br from-amber-500 to-orange-500"
              : "bg-gradient-to-br from-purple-500 to-pink-500"
          } flex items-center justify-center text-white shadow-xl backdrop-blur-sm ring-2 ring-white/20`}
        >
          {isUser ? (
            <UserCircleIcon className="w-6 h-6" />
          ) : isSystem ? (
            <ExclamationTriangleIcon className="w-5 h-5" />
          ) : (
            renderAIAvatar() || <SparklesIcon className="w-6 h-6" />
          )}
        </div>

        {/* Online Indicator */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ring-2 ring-background ${
            isUser ? "bg-green-400" : isSystem ? "bg-red-400" : "bg-purple-400"
          }`}
        />
      </motion.div>

      {/* Message Container */}
      <div
        className={`relative ${
          isUser ? "order-1 pr-1" : "order-2 pl-1"
        } flex-1`}
      >
        {/* Speech Bubble Tail */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.05 + 0.1 }}
          className={`absolute top-4 w-3 h-3 ${
            isUser
              ? "-right-2 rotate-45 bg-gradient-to-br from-blue-500 to-blue-600"
              : isSystem
              ? "-left-2 rotate-45 bg-gradient-to-br from-amber-500 to-orange-500"
              : "-left-2 rotate-45 bg-gradient-to-br from-purple-500 to-pink-500"
          }`}
        />

        {/* Message Bubble */}
        <motion.div
          whileHover={{
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            borderColor: isUser
              ? "rgba(59, 130, 246, 0.5)"
              : "rgba(168, 85, 247, 0.5)",
          }}
          className={`relative rounded-3xl p-5 backdrop-blur-sm max-w-xl ${
            isUser
              ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-tr-lg shadow-2xl shadow-blue-500/20"
              : isSystem
              ? "bg-gradient-to-br from-amber-600 to-orange-700 text-white rounded-tl-lg shadow-2xl shadow-amber-500/20"
              : "bg-card/90 backdrop-blur-md border border-border/50 rounded-tl-lg shadow-2xl shadow-purple-500/10"
          }`}
        >
          {/* Message Content */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 + 0.2 }}
            className="whitespace-pre-wrap leading-relaxed text-base"
          >
            {m.content}
          </motion.p>

          {/* Message Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 + 0.3 }}
            className={`flex items-center justify-between mt-4 pt-3 ${
              isUser
                ? "border-t border-blue-500/30"
                : isSystem
                ? "border-t border-amber-500/30"
                : "border-t border-border/30"
            }`}
          >
            {/* Timestamp */}
            <div
              className={`flex items-center gap-2 text-sm ${
                isUser
                  ? "text-blue-200/80"
                  : isSystem
                  ? "text-amber-200/80"
                  : "text-muted-foreground"
              }`}
            >
              <ClockIcon className="w-4 h-4" />
              <span>{formatTime(m.timestamp)}</span>
            </div>

            {/* Action Buttons */}
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  /* Regenerate logic */
                }}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                title="Regenerate"
              >
                <ArrowPathIcon className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCopy}
                className="p-2 rounded-full hover:bg-white/10 transition-colors relative"
                title={isCopied ? "Copied!" : "Copy"}
              >
                <ClipboardIcon className="w-4 h-4" />
                {isCopied && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"
                  />
                )}
              </motion.button>

              {/* Message Status */}
              {isUser && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="ml-2"
                >
                  <CheckIcon className="w-4 h-4 text-green-400" />
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Animated Reaction Options */}
        {isAI && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute -bottom-2 left-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {["👍", "👎", "🔥", "💡"].map((emoji, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.8 }}
                className="w-8 h-8 bg-background rounded-full flex items-center justify-center text-sm shadow-md border"
              >
                {emoji}
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Typing Animation for AI Messages */}
      {m.isTyping && (
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute -bottom-6 left-16 flex items-center gap-1"
        >
          <div className="w-2 h-2 bg-purple-400 rounded-full" />
          <div
            className="w-2 h-2 bg-purple-400 rounded-full"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="w-2 h-2 bg-purple-400 rounded-full"
            style={{ animationDelay: "0.4s" }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}

// Usage in parent component
