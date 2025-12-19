// "use client";

// import {
//   UserCircleIcon,
//   CheckCircleIcon,
//   UserGroupIcon,
// } from "@heroicons/react/24/solid";
// import Link from "next/link";

// export default function PersonalityList({
//   personalities,
//   selected,
//   onSelect,
//   loading,
// }: any) {
//   // Default avatar colors for personalities
//   const avatarColors = [
//     "bg-gradient-to-r from-purple-500 to-pink-500",
//     "bg-gradient-to-r from-blue-500 to-cyan-500",
//     "bg-gradient-to-r from-green-500 to-emerald-500",
//     "bg-gradient-to-r from-orange-500 to-red-500",
//     "bg-gradient-to-r from-indigo-500 to-purple-500",
//     "bg-gradient-to-r from-yellow-500 to-orange-500",
//   ];

//   const getAvatarColor = (index: number) => {
//     return avatarColors[index % avatarColors.length];
//   };

//   if (loading) {
//     return (
//       <div className="w-72 border-r border-gray-200 bg-white p-6">
//         <h2 className="font-bold text-xl text-gray-800 mb-6 flex items-center gap-2">
//           <UserCircleIcon className="w-6 h-6 text-purple-600" />
//           Personalities
//         </h2>
//         <div className="space-y-3">
//           {[1, 2, 3].map((i) => (
//             <div
//               key={i}
//               className="flex items-center gap-3 p-3 rounded-xl animate-pulse"
//             >
//               <div className="w-10 h-10 rounded-full bg-gray-200"></div>
//               <div className="flex-1">
//                 <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                 <div className="h-3 bg-gray-100 rounded w-1/2"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-72 border-r border-gray-200 bg-white p-6 shadow-sm">
//       <h2 className="font-bold text-xl text-gray-800 mb-6 flex items-center gap-2">
//         <UserCircleIcon className="w-6 h-6 text-purple-600" />
//         Personalities
//       </h2>

//       <div className="space-y-2">
//         {personalities.map((p: any, index: number) => (
//           <button
//             key={p._id}
//             onClick={() => onSelect(p)}
//             className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center gap-3 group ${
//               selected?._id === p._id
//                 ? "bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 shadow-sm"
//                 : "hover:bg-gray-50 hover:shadow-sm"
//             }`}
//           >
//             {/* Avatar */}
//             <div className="relative">
//               <div
//                 className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${getAvatarColor(
//                   index
//                 )}`}
//               >
//                 <span className="font-semibold">
//                   {p.name.charAt(0).toUpperCase()}
//                 </span>
//               </div>
//               {selected?._id === p._id && (
//                 <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
//                   <CheckCircleIcon className="w-3 h-3 text-white" />
//                 </div>
//               )}
//             </div>

//             {/* Personality Info */}
//             <div className="flex-1 min-w-0">
//               <div className="font-medium text-gray-900 truncate">{p.name}</div>
//               <div className="text-sm text-gray-500 truncate">
//                 {p.description || "AI Assistant"}
//               </div>
//             </div>
//           </button>
//         ))}
//       </div>
//       <Link
//         href="/personalities"
//         className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
//       >
//         <UserGroupIcon className="w-5 h-5" />
//         Personalities
//       </Link>
//       {/* Stats */}
//       <div className="mt-8 pt-6 border-t border-gray-100">
//         <div className="text-sm text-gray-600">
//           <div className="flex items-center justify-between mb-2">
//             <span>Active chats</span>
//             <span className="font-semibold text-gray-900">
//               {personalities.length}
//             </span>
//           </div>
//           <div className="flex items-center justify-between">
//             <span>Online</span>
//             <div className="flex items-center gap-1">
//               <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//               <span className="font-semibold text-gray-900">Now</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import {
  UserCircleIcon,
  CheckCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

// Default avatar images for different personalities
const defaultAvatarImages = [
  "/avatars/eren.png",
  "/avatars/mikasa.png",
  "/avatars/naruto.png",
  "/avatars/kohli.png",
  "/avatars/socrates.png",
  "/avatars/eren.png", // fallback
];

export default function PersonalityList({
  personalities,
  selected,
  onSelect,
  loading,
}: any) {
  // Function to get avatar image based on personality
  const getAvatarImage = (personality: any, index: number) => {
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

    // Otherwise use default based on index
    return defaultAvatarImages[index % defaultAvatarImages.length];
  };

  // Fallback gradient colors for when images fail to load
  const avatarColors = [
    "bg-gradient-to-r from-purple-500 to-pink-500",
    "bg-gradient-to-r from-blue-500 to-cyan-500",
    "bg-gradient-to-r from-green-500 to-emerald-500",
    "bg-gradient-to-r from-orange-500 to-red-500",
    "bg-gradient-to-r from-indigo-500 to-purple-500",
    "bg-gradient-to-r from-yellow-500 to-orange-500",
  ];

  const getAvatarColor = (index: number) => {
    return avatarColors[index % avatarColors.length];
  };

  if (loading) {
    return (
      <div className="w-72 border-r border-gray-200 bg-white p-6">
        <h2 className="font-bold text-xl text-gray-800 mb-6 flex items-center gap-2">
          <UserCircleIcon className="w-6 h-6 text-purple-600" />
          Personalities
        </h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-xl animate-pulse"
            >
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-72 border-r border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="font-bold text-xl text-gray-800 mb-6 flex items-center gap-2">
        <UserCircleIcon className="w-6 h-6 text-purple-600" />
        Personalities
      </h2>

      <div className="space-y-2">
        {personalities.map((p: any, index: number) => {
          const avatarImage = getAvatarImage(p, index);
          const avatarColor = getAvatarColor(index);

          return (
            <button
              key={p._id}
              onClick={() => onSelect(p)}
              className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center gap-3 group ${
                selected?._id === p._id
                  ? "bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 shadow-sm"
                  : "hover:bg-gray-50 hover:shadow-sm"
              }`}
            >
              {/* Avatar with image */}

              <div className="relative">
                <div
                  className={`w-10 h-10 rounded-full overflow-hidden ${avatarColor}`}
                >
                  {avatarImage ? (
                    <img
                      src={avatarImage}
                      alt={`${p.name} avatar`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white font-semibold">
                      {p.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                {selected?._id === p._id && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center border border-white">
                    <CheckCircleIcon className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              {/* Personality Info */}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">
                  {p.name}
                </div>
                <div className="text-sm text-gray-500 truncate">
                  {p.description || "AI Assistant"}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Link to Personalities Management Page */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <Link
          href="/personalities"
          className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
            <UserGroupIcon className="w-4 h-4 text-purple-600" />
          </div>
          <span className="font-medium">Manage Personalities</span>
          <span className="ml-auto text-gray-400 group-hover:text-purple-600">
            →
          </span>
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="text-sm text-gray-600">
          <div className="flex items-center justify-between mb-2">
            <span>Total Personalities</span>
            <span className="font-semibold text-gray-900">
              {personalities.length}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span>Default</span>
            <span className="font-semibold text-gray-900">
              {personalities.filter((p) => p.isDefault).length}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Online</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-semibold text-gray-900">Now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
