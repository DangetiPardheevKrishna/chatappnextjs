// "use client";

// import { useEffect, useState } from "react";
// import PersonalityList from "@/components/personalityList";
// import ChatWindow from "@/components/chatwindow";

// export default function ChatPage() {
//   const [personalities, setPersonalities] = useState<any[]>([]);
//   const [selected, setSelected] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("/api/personality")
//       .then((res) => res.json())
//       .then((data) => {
//         setPersonalities(data);
//         if (data.length > 0 && !selected) {
//           setSelected(data[0]);
//         }
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <PersonalityList
//         personalities={personalities}
//         selected={selected}
//         onSelect={setSelected}
//         loading={loading}
//       />

//       {selected ? (
//         <ChatWindow personality={selected} />
//       ) : (
//         <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
//           <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
//             <span className="text-4xl">🤖</span>
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-3">
//             Welcome to AI Chat
//           </h2>
//           <p className="text-gray-600 max-w-md">
//             {loading
//               ? "Loading personalities..."
//               : "Select a personality from the sidebar to start chatting"}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PersonalityList from "@/components/personalityList";
import ChatWindow from "@/components/chatwindow";

export default function ChatPage() {
  const [personalities, setPersonalities] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    fetch("/api/personality")
      .then((res) => res.json())
      .then((data) => {
        setPersonalities(data);

        // Check if there's a personality ID in the URL
        const personalityId = searchParams.get("personality");

        if (personalityId) {
          // Find the personality with matching ID
          const foundPersonality = data.find(
            (p: any) => p._id === personalityId
          );
          if (foundPersonality) {
            setSelected(foundPersonality);
          } else if (data.length > 0) {
            // Fallback to first personality if not found
            setSelected(data[0]);
          }
        } else if (data.length > 0 && !selected) {
          // Default to first personality if no URL param
          setSelected(data[0]);
        }

        setLoading(false);
      });
  }, [searchParams]); // Add searchParams as dependency

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <PersonalityList
        personalities={personalities}
        selected={selected}
        onSelect={setSelected}
        loading={loading}
      />

      {selected ? (
        <ChatWindow personality={selected} />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
            <span className="text-4xl">🤖</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Welcome to AI Chat
          </h2>
          <p className="text-gray-600 max-w-md">
            {loading
              ? "Loading personalities..."
              : "Select a personality from the sidebar to start chatting"}
          </p>
        </div>
      )}
    </div>
  );
}
