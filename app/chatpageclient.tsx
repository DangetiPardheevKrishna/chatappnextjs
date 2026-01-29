// // "use client";

// // import { useEffect, useState } from "react";
// // import PersonalityList from "@/components/personalityList";
// // import ChatWindow from "@/components/chatwindow";

// // export default function ChatPage() {
// //   const [personalities, setPersonalities] = useState<any[]>([]);
// //   const [selected, setSelected] = useState<any>(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetch("/api/personality")
// //       .then((res) => res.json())
// //       .then((data) => {
// //         setPersonalities(data);
// //         if (data.length > 0 && !selected) {
// //           setSelected(data[0]);
// //         }
// //         setLoading(false);
// //       });
// //   }, []);

// //   return (
// //     <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
// //       <PersonalityList
// //         personalities={personalities}
// //         selected={selected}
// //         onSelect={setSelected}
// //         loading={loading}
// //       />

// //       {selected ? (
// //         <ChatWindow personality={selected} />
// //       ) : (
// //         <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
// //           <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
// //             <span className="text-4xl">🤖</span>
// //           </div>
// //           <h2 className="text-2xl font-bold text-gray-800 mb-3">
// //             Welcome to AI Chat
// //           </h2>
// //           <p className="text-gray-600 max-w-md">
// //             {loading
// //               ? "Loading personalities..."
// //               : "Select a personality from the sidebar to start chatting"}
// //           </p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import PersonalityList from "@/components/personalityList";
// import ChatWindow from "@/components/chatwindow";

// export default function ChatPage() {
//   const [personalities, setPersonalities] = useState<any[]>([]);
//   const [selected, setSelected] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     fetch("/api/personality")
//       .then((res) => res.json())
//       .then((data) => {
//         setPersonalities(data);

//         // Check if there's a personality ID in the URL
//         const personalityId = searchParams.get("personality");

//         if (personalityId) {
//           // Find the personality with matching ID
//           const foundPersonality = data.find(
//             (p: any) => p._id === personalityId
//           );
//           if (foundPersonality) {
//             setSelected(foundPersonality);
//           } else if (data.length > 0) {
//             // Fallback to first personality if not found
//             setSelected(data[0]);
//           }
//         } else if (data.length > 0 && !selected) {
//           // Default to first personality if no URL param
//           setSelected(data[0]);
//         }

//         setLoading(false);
//       });
//   }, [searchParams]);

//   return (
//     // <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">

//     //   <PersonalityList
//     //     personalities={personalities}
//     //     selected={selected}
//     //     onSelect={setSelected}
//     //     loading={loading}
//     //   />

//     //   {selected ? (
//     //     <ChatWindow personality={selected} />
//     //   ) : (
//     // <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
//     //   <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
//     //     <span className="text-4xl">🤖</span>
//     //   </div>
//     //   <h2 className="text-2xl font-bold text-gray-800 mb-3">
//     //     Welcome to AI Chat
//     //   </h2>
//     //   <p className="text-gray-600 max-w-md">
//     //     {loading
//     //       ? "Loading personalities..."
//     //       : "Select a personality from the sidebar to start chatting"}
//     //   </p>
//     // </div>
//     //   )}
//     // </div>
//     <div className="relative h-screen bg-background overflow-hidden">
//       <div className="flex h-full">
//         <PersonalityList
//           personalities={personalities}
//           selected={selected}
//           onSelect={setSelected}
//           loading={loading}
//         />

//         {selected ? (
//           <ChatWindow personality={selected} />
//         ) : (
//           <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
//             <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
//               <span className="text-4xl">🤖</span>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-3">
//               Welcome to AI Chat
//             </h2>
//             <p className="text-gray-600 max-w-md">
//               {loading
//                 ? "Loading personalities..."
//                 : "Select a personality from the sidebar to start chatting"}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// // }
// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import PersonalityList from "@/components/personalityList";
// import ChatWindow from "@/components/chatwindow";
// import ParticlesWrapper from "@/components/particleWrapper";
// import { Particles } from "@/components/ui/particles";
// import { useTheme } from "next-themes";
// import { signOut } from "next-auth/react";

// export default function ChatPageClient() {
//   const [personalities, setPersonalities] = useState<any[]>([]);
//   const [selected, setSelected] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const searchParams = useSearchParams();
//   const { resolvedTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   const color = resolvedTheme === "dark" ? "#ffffff" : "#000000";
//   useEffect(() => {
//     fetch("/api/personality")
//       .then((res) => res.json())
//       .then((data) => {
//         setPersonalities(data);

//         const personalityId = searchParams.get("personality");

//         if (personalityId) {
//           const found = data.find((p: any) => p._id === personalityId);
//           setSelected(found ?? data[0] ?? null);
//         } else {
//           setSelected(data[0] ?? null);
//         }

//         setLoading(false);
//       });
//   }, [searchParams]);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null; // 🚀

//   return (
//     <div className="relative h-screen bg-background overflow-hidden">
//       <Particles
//         key={resolvedTheme} // 🔥 THIS IS THE FIX
//         className="fixed inset-0 z-0 pointer-events-none"
//         quantity={120}
//         ease={80}
//         color={color}
//         refresh
//       />
//       <div className="flex relative z-10 h-full">
//         <PersonalityList
//           personalities={personalities}
//           selected={selected}
//           onSelect={setSelected}
//           loading={loading}
//         />

//         {selected ? (
//           <div className="flex-1 flex flex-col min-h-0">
//             <ChatWindow personality={selected} />
//           </div>
//         ) : (
//           <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-8">
//             {/* Animated Gradient Avatar */}
//             <div className="relative">
//               <div className="w-28 h-28 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 animate-gradient-x shadow-lg shadow-purple-500/20">
//                 <div className="absolute inset-4 rounded-full bg-background flex items-center justify-center">
//                   <div className="text-4xl animate-pulse">🤖</div>
//                 </div>
//               </div>

//               {/* Pulsing Rings */}
//               <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 animate-ping"></div>
//               <div className="absolute -inset-1 rounded-full border-2 border-pink-400/20 animate-pulse"></div>
//             </div>

//             {/* Text Content */}
//             <div className="space-y-4">
//               <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                 Welcome to AI Chat
//               </h2>

//               <div className="flex flex-col items-center space-y-3">
//                 <p className="text-muted-foreground text-lg">
//                   {loading ? (
//                     <>
//                       <span className="inline-block animate-pulse">
//                         Loading personalities
//                       </span>
//                       <span className="inline-flex ml-2">
//                         <span className="animate-bounce mx-0.5">.</span>
//                         <span
//                           className="animate-bounce mx-0.5"
//                           style={{ animationDelay: "0.1s" }}
//                         >
//                           .
//                         </span>
//                         <span
//                           className="animate-bounce mx-0.5"
//                           style={{ animationDelay: "0.2s" }}
//                         >
//                           .
//                         </span>
//                       </span>
//                     </>
//                   ) : (
//                     "Select a personality from the sidebar to start chatting"
//                   )}
//                 </p>

//                 {loading && (
//                   <div className="pt-2">
//                     <div className="w-64 h-1.5 bg-secondary rounded-full overflow-hidden">
//                       <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-progress"></div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//           // <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
//           //   <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
//           //     <span className="text-4xl">🤖</span>
//           //   </div>
//           //   <h2 className="text-2xl font-bold mb-3">Welcome to AI Chat</h2>
//           //   <p className="text-muted-foreground max-w-md">
//           //     {loading
//           //       ? "Loading personalities..."
//           //       : "Select a personality from the sidebar to start chatting"}
//           //   </p>
//           // </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PersonalityList from "@/components/personalityList";
import ChatWindow from "@/components/chatwindow";
import { Particles } from "@/components/ui/particles";
import { useTheme } from "next-themes";
import { Menu, Sidebar, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChatPageClient() {
  const [personalities, setPersonalities] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const searchParams = useSearchParams();
  const { resolvedTheme } = useTheme();

  const color = resolvedTheme === "dark" ? "#ffffff" : "#000000";

  useEffect(() => {
    fetch("/api/personality")
      .then((res) => res.json())
      .then((data) => {
        setPersonalities(data);
        const personalityId = searchParams.get("personality");
        if (personalityId) {
          const found = data.find((p: any) => p._id === personalityId);
          setSelected(found ?? data[0] ?? null);
        } else {
          setSelected(data[0] ?? null);
        }
        setLoading(false);
      });
  }, [searchParams]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative h-screen bg-background overflow-hidden">
      <Particles
        key={resolvedTheme}
        className="fixed inset-0 z-0 pointer-events-none"
        quantity={120}
        ease={80}
        color={color}
        refresh
      />

      <div className="flex  relative z-10 h-full">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Personality List Sidebar */}
        <div
          className={`
          fixed lg:relative
          h-full
          z-50 lg:z-auto
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          w-80
          border-r border-border
          bg-background
        `}
        >
          <PersonalityList
            personalities={personalities}
            selected={selected}
            onSelect={(personality) => {
              setSelected(personality);
              if (window.innerWidth < 1024) {
                setSidebarOpen(false);
              }
            }}
            loading={loading}
            onClose={() => setSidebarOpen(false)}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Mobile Header with Sidebar Toggle */}

          {/* Chat Content */}
          {selected ? (
            <div className="flex-1 flex flex-col h-full min-h-0">
              <ChatWindow
                personality={selected}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-8">
              {/* Animated Gradient Avatar */}
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 animate-gradient-x shadow-lg shadow-purple-500/20">
                  <div className="absolute inset-4 rounded-full bg-background flex items-center justify-center">
                    <div className="text-4xl animate-pulse">🤖</div>
                  </div>
                </div>
                {/* Pulsing Rings */}
                <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 animate-ping"></div>
                <div className="absolute -inset-1 rounded-full border-2 border-pink-400/20 animate-pulse"></div>
              </div>

              {/* Text Content */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Welcome to AI Chat
                </h2>

                <div className="flex flex-col items-center space-y-3">
                  <p className="text-muted-foreground text-lg">
                    {loading ? (
                      <>
                        <span className="inline-block animate-pulse">
                          Loading personalities
                        </span>
                        <span className="inline-flex ml-2">
                          <span className="animate-bounce mx-0.5">.</span>
                          <span
                            className="animate-bounce mx-0.5"
                            style={{ animationDelay: "0.1s" }}
                          >
                            .
                          </span>
                          <span
                            className="animate-bounce mx-0.5"
                            style={{ animationDelay: "0.2s" }}
                          >
                            .
                          </span>
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="block lg:hidden">
                          Tap the menu button to select a personality
                        </span>
                        <span className="hidden lg:block">
                          Select a personality from the sidebar to start
                          chatting
                        </span>
                      </>
                    )}
                  </p>

                  {loading && (
                    <div className="pt-2">
                      <div className="w-64 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-progress"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Prompt */}
              {!loading && (
                <Button
                  variant="outline"
                  className="lg:hidden mt-4"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-4 w-4 mr-2" />
                  Browse Personalities
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
