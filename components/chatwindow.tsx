// "use client";

// import { useEffect, useRef, useState } from "react";
// import MessageInput from "./messageInput";
// import {
//   PaperAirplaneIcon,
//   UserCircleIcon,
//   SparklesIcon,
// } from "@heroicons/react/24/solid";
// import { ClockIcon } from "@heroicons/react/24/outline";

// export default function ChatWindow({ personality }: any) {
//   const [messages, setMessages] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [isLoadingHistory, setIsLoadingHistory] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Auto scroll to bottom
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   useEffect(() => {
//     // Clear messages immediately when personality changes
//     setMessages([]);
//     setIsLoadingHistory(true);

//     async function loadHistory() {
//       try {
//         const res = await fetch(`/api/chat?personalityId=${personality._id}`);
//         const data = await res.json();
//         setMessages(data);
//       } catch (error) {
//         console.error("Failed to load chat history:", error);
//       } finally {
//         setIsLoadingHistory(false);
//       }
//     }

//     // Small delay to prevent flicker when switching quickly
//     const timer = setTimeout(() => {
//       loadHistory();
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [personality]);

//   async function sendMessage(content: string) {
//     if (!content.trim()) return;

//     const newMessage = {
//       id: Date.now().toString(),
//       sender: "user",
//       content,
//       timestamp: new Date(),
//     };

//     const updatedMessages = [...messages, newMessage];
//     setMessages(updatedMessages);
//     setLoading(true);

//     try {
//       const res = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           personalityId: personality._id,
//           messages: updatedMessages,
//         }),
//       });

//       if (!res.ok) throw new Error("Failed to send message");

//       const data = await res.json();
//       const aiMessage = {
//         id: (Date.now() + 1).toString(),
//         sender: "ai",
//         content: data.reply,
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, aiMessage]);
//     } catch (error) {
//       console.error("Failed to send message:", error);
//       // Optionally show error message to user
//       const errorMessage = {
//         id: (Date.now() + 2).toString(),
//         sender: "system",
//         content: "Sorry, I couldn't send your message. Please try again.",
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, errorMessage]);
//     } finally {
//       setLoading(false);
//     }
//   }

//   const formatTime = (date: Date) => {
//     return new Date(date).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="flex-1 flex flex-col bg-gradient-to-b from-white to-gray-50">
//       {/* Header */}
//       <div className="border-b border-gray-200 bg-white p-4 shadow-sm">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
//             {personality.name.charAt(0).toUpperCase()}
//           </div>
//           <div className="flex-1">
//             <h2 className="font-bold text-gray-900">{personality.name}</h2>
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <SparklesIcon className="w-4 h-4 text-purple-500" />
//               <span>{personality.description || "AI Assistant"}</span>
//             </div>
//           </div>
//           <div className="flex items-center gap-1 text-sm text-gray-500">
//             <ClockIcon className="w-4 h-4" />
//             <span>{isLoadingHistory ? "Loading..." : "Just now"}</span>
//           </div>
//         </div>
//       </div>

//       {/* Chat Messages */}
//       <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
//         {isLoadingHistory ? (
//           <div className="flex flex-col items-center justify-center h-full">
//             <div className="text-center">
//               <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center animate-pulse">
//                 <SparklesIcon className="w-8 h-8 text-purple-500" />
//               </div>
//               <p className="text-gray-600">Loading conversation...</p>
//               <p className="text-sm text-gray-400 mt-2">
//                 Chatting with {personality.name}
//               </p>
//             </div>
//           </div>
//         ) : messages.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-full text-center p-8">
//             <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
//               <SparklesIcon className="w-12 h-12 text-purple-500" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-3">
//               Start a conversation
//             </h3>
//             <p className="text-gray-600 max-w-md">
//               Send a message to begin chatting with {personality.name}. They're
//               excited to talk with you!
//             </p>
//             <div className="mt-6 text-sm text-gray-500">
//               <p>This is a fresh conversation with {personality.name}</p>
//             </div>
//           </div>
//         ) : (
//           messages.map((m) => (
//             <div
//               key={m.id}
//               className={`flex gap-3 ${
//                 m.sender === "user" ? "flex-row-reverse" : ""
//               }`}
//             >
//               {/* Avatar */}
//               <div className="flex-shrink-0">
//                 {m.sender === "user" ? (
//                   <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-semibold">
//                     <UserCircleIcon className="w-5 h-5" />
//                   </div>
//                 ) : m.sender === "system" ? (
//                   <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-500 to-gray-600 flex items-center justify-center text-white text-sm font-semibold">
//                     ⚠️
//                   </div>
//                 ) : (
//                   <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-semibold">
//                     {personality.name.charAt(0).toUpperCase()}
//                   </div>
//                 )}
//               </div>

//               {/* Message Bubble */}
//               <div
//                 className={`max-w-xl rounded-2xl p-4 shadow-sm ${
//                   m.sender === "user"
//                     ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none"
//                     : m.sender === "system"
//                     ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-bl-none"
//                     : "bg-white border border-gray-200 rounded-bl-none"
//                 }`}
//               >
//                 <p className="whitespace-pre-wrap">{m.content}</p>
//                 <div
//                   className={`text-xs mt-2 ${
//                     m.sender === "user"
//                       ? "text-blue-200"
//                       : m.sender === "system"
//                       ? "text-amber-200"
//                       : "text-gray-500"
//                   }`}
//                 >
//                   {formatTime(m.timestamp)}
//                 </div>
//               </div>
//             </div>
//           ))
//         )}

//         {/* Typing indicator - only shows when sending a message, not loading history */}
//         {loading && !isLoadingHistory && messages.length > 0 && (
//           <div className="flex gap-3">
//             <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-semibold">
//               {personality.name.charAt(0).toUpperCase()}
//             </div>
//             <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none p-4 shadow-sm">
//               <div className="flex gap-1">
//                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
//                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
//               </div>
//               <p className="text-xs text-gray-500 mt-2">Thinking...</p>
//             </div>
//           </div>
//         )}

//         <div ref={messagesEndRef} />
//       </div>

//       {/* Message Input */}
//       <MessageInput
//         onSend={sendMessage}
//         loading={loading || isLoadingHistory}
//       />
//     </div>
//   );
// }
"use client";

import { useEffect, useRef, useState } from "react";
import MessageInput from "./messageInput";
import {
  PaperAirplaneIcon,
  UserCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import { ClockIcon } from "@heroicons/react/24/outline";

// Default avatar images for different personalities
const defaultAvatarImages = [
  "/avatars/eren.png",
  "/avatars/mikasa.png",
  "/avatars/naruto.png",
  "/avatars/kohli.png",
  "/avatars/socrates.png",
  "/avatars/eren.png", // fallback
];

// Function to get avatar image based on personality
const getAvatarImage = (personality: any) => {
  // If personality has a custom avatar, use it
  if (personality.avatar && personality.avatar !== "") {
    return personality.avatar;
  }

  // Check for specific characters
  const name = personality.name.toLowerCase();
  if (name.includes("eren")) {
    return "/avatars/eren.png";
  }
  if (name.includes("mikasa")) {
    return "/avatars/mikasa.png";
  }
  if (name.includes("naruto")) {
    return "/avatars/naruto.png";
  }
  if (name.includes("kohli")) {
    return "/avatars/kohli.png";
  }
  if (name.includes("socrates")) {
    return "/avatars/socrates.png";
  }

  // Fallback to first letter
  return null;
};

export default function ChatWindow({ personality }: any) {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const avatarImage = getAvatarImage(personality);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Clear messages immediately when personality changes
    setMessages([]);
    setIsLoadingHistory(true);

    async function loadHistory() {
      try {
        const res = await fetch(`/api/chat?personalityId=${personality._id}`);
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error("Failed to load chat history:", error);
      } finally {
        setIsLoadingHistory(false);
      }
    }

    // Small delay to prevent flicker when switching quickly
    const timer = setTimeout(() => {
      loadHistory();
    }, 300);

    return () => clearTimeout(timer);
  }, [personality]);

  async function sendMessage(content: string) {
    if (!content.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: "user",
      content,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personalityId: personality._id,
          messages: updatedMessages,
        }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      const data = await res.json();
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        content: data.reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
      // Optionally show error message to user
      const errorMessage = {
        id: (Date.now() + 2).toString(),
        sender: "system",
        content: "Sorry, I couldn't send your message. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  }

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Function to render avatar with image or fallback
  const renderAvatar = (size = "w-10 h-10", showAI = true) => {
    if (avatarImage) {
      return (
        <div
          className={`${size} rounded-full overflow-hidden border border-gray-200`}
        >
          <img
            src={avatarImage}
            alt={`${personality.name} avatar`}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to colored background if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent) {
                parent.className = `${parent.className} flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500`;
                parent.innerHTML = `
                  <span class="text-white font-semibold text-lg">
                    ${personality.name.charAt(0).toUpperCase()}
                  </span>
                `;
              }
            }}
          />
        </div>
      );
    }

    // Fallback to colored circle with initial
    return (
      <div
        className={`${size} rounded-full flex items-center justify-center text-white font-semibold bg-gradient-to-r from-purple-500 to-pink-500`}
      >
        {personality.name.charAt(0).toUpperCase()}
      </div>
    );
  };

  // Function to render AI avatar in messages
  const renderAIAvatar = (size = "w-8 h-8") => {
    if (avatarImage) {
      return (
        <div
          className={`${size} rounded-full overflow-hidden border border-white shadow-sm`}
        >
          <img
            src={avatarImage}
            alt={`${personality.name} avatar`}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to colored background if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent) {
                parent.className = `${parent.className} flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500`;
                parent.innerHTML = `
                  <span class="text-white font-semibold text-sm">
                    ${personality.name.charAt(0).toUpperCase()}
                  </span>
                `;
              }
            }}
          />
        </div>
      );
    }

    // Fallback to colored circle with initial
    return (
      <div
        className={`${size} rounded-full flex items-center justify-center text-white text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500`}
      >
        {personality.name.charAt(0).toUpperCase()}
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          {renderAvatar("w-10 h-10")}

          <div className="flex-1">
            <h2 className="font-bold text-gray-900">{personality.name}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <SparklesIcon className="w-4 h-4 text-purple-500" />
              <span>{personality.description || "AI Assistant"}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <ClockIcon className="w-4 h-4" />
            <span>{isLoadingHistory ? "Loading..." : "Just now"}</span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {isLoadingHistory ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center">
              {/* Loading Avatar */}
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-white shadow-lg animate-pulse">
                {avatarImage ? (
                  <img
                    src={avatarImage}
                    alt={`${personality.name} avatar`}
                    className="w-full h-full object-cover opacity-80"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                    <SparklesIcon className="w-10 h-10 text-purple-500" />
                  </div>
                )}
              </div>
              <p className="text-gray-600">Loading conversation...</p>
              <p className="text-sm text-gray-400 mt-2">
                Chatting with {personality.name}
              </p>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            {/* Large Avatar for empty state */}
            <div className="w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg">
              {avatarImage ? (
                <img
                  src={avatarImage}
                  alt={`${personality.name} avatar`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                  <SparklesIcon className="w-16 h-16 text-purple-500" />
                </div>
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Start a conversation with {personality.name}
            </h3>
            <p className="text-gray-600 max-w-md mb-2">
              Send a message to begin chatting. {personality.name} is excited to
              talk with you!
            </p>
            {personality.description && (
              <p className="text-gray-500 text-sm max-w-md">
                {personality.description}
              </p>
            )}
            <div className="mt-8 flex flex-col gap-2 text-sm text-gray-400">
              <p>💬 Start by asking a question</p>
              <p>✨ See how {personality.name} responds in character</p>
              <p>⚡ The conversation will appear here</p>
            </div>
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${
                m.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                {m.sender === "user" ? (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-semibold">
                    <UserCircleIcon className="w-5 h-5" />
                  </div>
                ) : m.sender === "system" ? (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white text-sm font-semibold">
                    ⚠️
                  </div>
                ) : (
                  renderAIAvatar()
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-xl rounded-2xl p-4 shadow-sm ${
                  m.sender === "user"
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none"
                    : m.sender === "system"
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-bl-none"
                    : "bg-white border border-gray-200 rounded-bl-none"
                }`}
              >
                <p className="whitespace-pre-wrap">{m.content}</p>
                <div
                  className={`text-xs mt-2 ${
                    m.sender === "user"
                      ? "text-blue-200"
                      : m.sender === "system"
                      ? "text-amber-200"
                      : "text-gray-500"
                  }`}
                >
                  {formatTime(m.timestamp)}
                </div>
              </div>
            </div>
          ))
        )}

        {/* Typing indicator */}
        {loading && !isLoadingHistory && (
          <div className="flex gap-3">
            {renderAIAvatar()}
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none p-4 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {personality.name} is thinking...
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput
        onSend={sendMessage}
        loading={loading || isLoadingHistory}
      />
    </div>
  );
}
