// // "use client";

// // import {
// //   UserCircleIcon,
// //   CheckCircleIcon,
// //   UserGroupIcon,
// // } from "@heroicons/react/24/solid";
// // import Link from "next/link";

// // export default function PersonalityList({
// //   personalities,
// //   selected,
// //   onSelect,
// //   loading,
// // }: any) {
// //   // Default avatar colors for personalities
// //   const avatarColors = [
// //     "bg-gradient-to-r from-purple-500 to-pink-500",
// //     "bg-gradient-to-r from-blue-500 to-cyan-500",
// //     "bg-gradient-to-r from-green-500 to-emerald-500",
// //     "bg-gradient-to-r from-orange-500 to-red-500",
// //     "bg-gradient-to-r from-indigo-500 to-purple-500",
// //     "bg-gradient-to-r from-yellow-500 to-orange-500",
// //   ];

// //   const getAvatarColor = (index: number) => {
// //     return avatarColors[index % avatarColors.length];
// //   };

// //   if (loading) {
// //     return (
// //       <div className="w-72 border-r border-gray-200 bg-white p-6">
// //         <h2 className="font-bold text-xl text-gray-800 mb-6 flex items-center gap-2">
// //           <UserCircleIcon className="w-6 h-6 text-purple-600" />
// //           Personalities
// //         </h2>
// //         <div className="space-y-3">
// //           {[1, 2, 3].map((i) => (
// //             <div
// //               key={i}
// //               className="flex items-center gap-3 p-3 rounded-xl animate-pulse"
// //             >
// //               <div className="w-10 h-10 rounded-full bg-gray-200"></div>
// //               <div className="flex-1">
// //                 <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
// //                 <div className="h-3 bg-gray-100 rounded w-1/2"></div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="w-72 border-r border-gray-200 bg-white p-6 shadow-sm">
// //       <h2 className="font-bold text-xl text-gray-800 mb-6 flex items-center gap-2">
// //         <UserCircleIcon className="w-6 h-6 text-purple-600" />
// //         Personalities
// //       </h2>

// //       <div className="space-y-2">
// //         {personalities.map((p: any, index: number) => (
// //           <button
// //             key={p._id}
// //             onClick={() => onSelect(p)}
// //             className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center gap-3 group ${
// //               selected?._id === p._id
// //                 ? "bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 shadow-sm"
// //                 : "hover:bg-gray-50 hover:shadow-sm"
// //             }`}
// //           >
// //             {/* Avatar */}
// //             <div className="relative">
// //               <div
// //                 className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${getAvatarColor(
// //                   index
// //                 )}`}
// //               >
// //                 <span className="font-semibold">
// //                   {p.name.charAt(0).toUpperCase()}
// //                 </span>
// //               </div>
// //               {selected?._id === p._id && (
// //                 <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
// //                   <CheckCircleIcon className="w-3 h-3 text-white" />
// //                 </div>
// //               )}
// //             </div>

// //             {/* Personality Info */}
// //             <div className="flex-1 min-w-0">
// //               <div className="font-medium text-gray-900 truncate">{p.name}</div>
// //               <div className="text-sm text-gray-500 truncate">
// //                 {p.description || "AI Assistant"}
// //               </div>
// //             </div>
// //           </button>
// //         ))}
// //       </div>
// //       <Link
// //         href="/personalities"
// //         className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
// //       >
// //         <UserGroupIcon className="w-5 h-5" />
// //         Personalities
// //       </Link>
// //       {/* Stats */}
// //       <div className="mt-8 pt-6 border-t border-gray-100">
// //         <div className="text-sm text-gray-600">
// //           <div className="flex items-center justify-between mb-2">
// //             <span>Active chats</span>
// //             <span className="font-semibold text-gray-900">
// //               {personalities.length}
// //             </span>
// //           </div>
// //           <div className="flex items-center justify-between">
// //             <span>Online</span>
// //             <div className="flex items-center gap-1">
// //               <div className="w-2 h-2 bg-green-500 rounded-full"></div>
// //               <span className="font-semibold text-gray-900">Now</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // // }
// // "use client";

// // import {
// //   UserCircleIcon,
// //   CheckCircleIcon,
// //   UserGroupIcon,
// // } from "@heroicons/react/24/solid";
// // import Link from "next/link";

// // // Default avatar images for different personalities
// // const defaultAvatarImages = [
// //   "/avatars/eren.png",
// //   "/avatars/mikasa.png",
// //   "/avatars/naruto.png",
// //   "/avatars/kohli.png",
// //   "/avatars/socrates.png",
// //   "/avatars/eren.png", // fallback
// // ];

// // export default function PersonalityList({
// //   personalities,
// //   selected,
// //   onSelect,
// //   loading,
// // }: any) {
// //   // Function to get avatar image based on personality
// //   const getAvatarImage = (personality: any, index: number) => {
// //     // If personality has a custom avatar, use it
// //     if (personality.avatar && personality.avatar !== "") {
// //       return personality.avatar;
// //     }

// //     // Check for specific characters
// //     const name = personality.name.toLowerCase();
// //     if (name.includes("eren")) {
// //       return "/avatars/eren.png";
// //     }
// //     if (name.includes("mikasa")) {
// //       return "/avatars/mikasa.png";
// //     }
// //     if (name.includes("naruto")) {
// //       return "/avatars/naruto.png";
// //     }
// //     if (name.includes("kohli")) {
// //       return "/avatars/kohli.png";
// //     }
// //     if (name.includes("socrates")) {
// //       return "/avatars/socrates.png";
// //     }

// //     // Otherwise use default based on index
// //     return defaultAvatarImages[index % defaultAvatarImages.length];
// //   };

// //   // Fallback gradient colors for when images fail to load
// //   const avatarColors = [
// //     "bg-gradient-to-r from-purple-500 to-pink-500",
// //     "bg-gradient-to-r from-blue-500 to-cyan-500",
// //     "bg-gradient-to-r from-green-500 to-emerald-500",
// //     "bg-gradient-to-r from-orange-500 to-red-500",
// //     "bg-gradient-to-r from-indigo-500 to-purple-500",
// //     "bg-gradient-to-r from-yellow-500 to-orange-500",
// //   ];

// //   const getAvatarColor = (index: number) => {
// //     return avatarColors[index % avatarColors.length];
// //   };

// //   if (loading) {
// //     return (
// //       <div className="w-72 border-r border-gray-200 bg-white p-6">
// //         <h2 className="font-bold text-xl text-gray-800 mb-6 flex items-center gap-2">
// //           <UserCircleIcon className="w-6 h-6 text-purple-600" />
// //           Personalities
// //         </h2>
// //         <div className="space-y-3">
// //           {[1, 2, 3].map((i) => (
// //             <div
// //               key={i}
// //               className="flex items-center gap-3 p-3 rounded-xl animate-pulse"
// //             >
// //               <div className="w-10 h-10 rounded-full bg-gray-200"></div>
// //               <div className="flex-1">
// //                 <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
// //                 <div className="h-3 bg-gray-100 rounded w-1/2"></div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="w-72 border-r border-gray-200 bg-white p-6 shadow-sm">
// //       <h2 className="font-bold text-xl text-gray-800 mb-6 flex items-center gap-2">
// //         <UserCircleIcon className="w-6 h-6 text-purple-600" />
// //         Personalities
// //       </h2>

// //       <div className="space-y-2">
// //         {personalities.map((p: any, index: number) => {
// //           const avatarImage = getAvatarImage(p, index);
// //           const avatarColor = getAvatarColor(index);

// //           return (
// //             <button
// //               key={p._id}
// //               onClick={() => onSelect(p)}
// //               className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center gap-3 group ${
// //                 selected?._id === p._id
// //                   ? "bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 shadow-sm"
// //                   : "hover:bg-gray-50 hover:shadow-sm"
// //               }`}
// //             >
// //               {/* Avatar with image */}

// //               <div className="relative">
// //                 <div
// //                   className={`w-10 h-10 rounded-full overflow-hidden ${avatarColor}`}
// //                 >
// //                   {avatarImage ? (
// //                     <img
// //                       src={avatarImage}
// //                       alt={`${p.name} avatar`}
// //                       className="w-full h-full object-cover"
// //                     />
// //                   ) : (
// //                     <div className="w-full h-full flex items-center justify-center text-white font-semibold">
// //                       {p.name.charAt(0).toUpperCase()}
// //                     </div>
// //                   )}
// //                 </div>
// //                 {selected?._id === p._id && (
// //                   <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center border border-white">
// //                     <CheckCircleIcon className="w-3 h-3 text-white" />
// //                   </div>
// //                 )}
// //               </div>
// //               {/* Personality Info */}
// //               <div className="flex-1 min-w-0">
// //                 <div className="font-medium text-gray-900 truncate">
// //                   {p.name}
// //                 </div>
// //                 <div className="text-sm text-gray-500 truncate">
// //                   {p.description || "AI Assistant"}
// //                 </div>
// //               </div>
// //             </button>
// //           );
// //         })}
// //       </div>

// //       {/* Link to Personalities Management Page */}
// //       <div className="mt-6 pt-6 border-t border-gray-100">
// //         <Link
// //           href="/personalities"
// //           className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors group"
// //         >
// //           <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
// //             <UserGroupIcon className="w-4 h-4 text-purple-600" />
// //           </div>
// //           <span className="font-medium">Manage Personalities</span>
// //           <span className="ml-auto text-gray-400 group-hover:text-purple-600">
// //             →
// //           </span>
// //         </Link>
// //       </div>

// //       {/* Stats */}
// //       <div className="mt-6 pt-6 border-t border-gray-100">
// //         <div className="text-sm text-gray-600">
// //           <div className="flex items-center justify-between mb-2">
// //             <span>Total Personalities</span>
// //             <span className="font-semibold text-gray-900">
// //               {personalities.length}
// //             </span>
// //           </div>
// //           <div className="flex items-center justify-between mb-2">
// //             <span>Default</span>
// //             <span className="font-semibold text-gray-900">
// //               {personalities.filter((p) => p.isDefault).length}
// //             </span>
// //           </div>
// //           <div className="flex items-center justify-between">
// //             <span>Online</span>
// //             <div className="flex items-center gap-1">
// //               <div className="w-2 h-2 bg-green-500 rounded-full"></div>
// //               <span className="font-semibold text-gray-900">Now</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import {
//   UserCircleIcon,
//   CheckCircleIcon,
//   UserGroupIcon,
// } from "@heroicons/react/24/solid";
// import {
//   MagnifyingGlassIcon,
//   ArrowRightIcon,
//   PlusIcon,
// } from "@heroicons/react/24/outline";
// import Link from "next/link";
// import { useState } from "react";

// // Default avatar images for different personalities
// const defaultAvatarImages = [
//   "/avatars/eren.png",
//   "/avatars/mikasa.png",
//   "/avatars/naruto.png",
//   "/avatars/kohli.png",
//   "/avatars/socrates.png",
// ];

// export default function PersonalityList({
//   personalities,
//   selected,
//   onSelect,
//   loading,
// }: any) {
//   const [searchTerm, setSearchTerm] = useState("");

//   // Function to get avatar image based on personality
//   const getAvatarImage = (personality: any, index: number) => {
//     // If personality has a custom avatar, use it
//     if (personality.avatar && personality.avatar !== "") {
//       return personality.avatar;
//     }

//     // Check for specific characters
//     const name = personality.name.toLowerCase();
//     if (name.includes("eren")) {
//       return "/avatars/eren.png";
//     }
//     if (name.includes("mikasa")) {
//       return "/avatars/mikasa.png";
//     }
//     if (name.includes("naruto")) {
//       return "/avatars/naruto.png";
//     }
//     if (name.includes("kohli")) {
//       return "/avatars/kohli.png";
//     }
//     if (name.includes("socrates")) {
//       return "/avatars/socrates.png";
//     }

//     // Otherwise use default based on index
//     return defaultAvatarImages[index % defaultAvatarImages.length];
//   };

//   // Fallback gradient colors for when images fail to load
//   const avatarColors = [
//     "bg-gradient-to-r from-purple-500 to-pink-500",
//     "bg-gradient-to-r from-blue-500 to-cyan-500",
//     "bg-gradient-to-r from-green-500 to-emerald-500",
//     "bg-gradient-to-r from-orange-500 to-red-500",
//     "bg-gradient-to-r from-indigo-500 to-purple-500",
//   ];

//   const getAvatarColor = (index: number) => {
//     return avatarColors[index % avatarColors.length];
//   };

//   // Filter personalities based on search
//   const filteredPersonalities = personalities.filter(
//     (p: any) =>
//       p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (p.description || "").toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <div className="w-72 border-r border-gray-200 bg-white shadow-sm flex flex-col h-screen">
//         <div className="p-6 pb-4">
//           <div className="h-7 bg-gray-200 rounded w-48 mb-6"></div>
//         </div>
//         <div className="flex-1 overflow-y-auto px-6 space-y-2">
//           {[1, 2, 3, 4, 5, 6].map((i) => (
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
//         <div className="p-6 pt-4 border-t border-gray-100">
//           <div className="h-10 bg-gray-200 rounded"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-72 border-r border-gray-200 bg-white shadow-sm flex flex-col h-screen">
//       {/* Header */}
//       <div className="p-6 pb-4">
//         <h2 className="font-bold text-xl text-gray-800 flex items-center gap-2">
//           <UserCircleIcon className="w-6 h-6 text-purple-600" />
//           Personalities
//         </h2>
//       </div>

//       {/* Search Bar - Fixed position */}
//       <div className="px-6 pb-4">
//         <div className="relative">
//           <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//             <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             placeholder="Search personalities..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full px-4 py-2.5 pl-10 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
//           />
//         </div>
//       </div>

//       {/* Scrollable Personality List */}
//       <div className="flex-1 overflow-y-auto px-6 space-y-2 pb-4">
//         {filteredPersonalities.length > 0 ? (
//           filteredPersonalities.map((p: any, index: number) => {
//             const avatarImage = getAvatarImage(p, index);
//             const avatarColor = getAvatarColor(index);

//             return (
//               <button
//                 key={p._id}
//                 onClick={() => onSelect(p)}
//                 className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center gap-3 group ${
//                   selected?._id === p._id
//                     ? "bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 shadow-sm"
//                     : "hover:bg-gray-50 hover:shadow-sm"
//                 }`}
//               >
//                 {/* Avatar with image */}
//                 <div className="relative flex-shrink-0">
//                   <div
//                     className={`w-10 h-10 rounded-full overflow-hidden ${avatarColor}`}
//                   >
//                     {avatarImage ? (
//                       <img
//                         src={avatarImage}
//                         alt={`${p.name} avatar`}
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                           const target = e.target as HTMLImageElement;
//                           target.style.display = "none";
//                           target.parentElement!.innerHTML = `
//                             <div class="w-full h-full flex items-center justify-center text-white font-semibold">
//                               ${p.name.charAt(0).toUpperCase()}
//                             </div>
//                           `;
//                         }}
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center text-white font-semibold">
//                         {p.name.charAt(0).toUpperCase()}
//                       </div>
//                     )}
//                   </div>
//                   {selected?._id === p._id && (
//                     <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
//                       <CheckCircleIcon className="w-2.5 h-2.5 text-white" />
//                     </div>
//                   )}
//                 </div>

//                 {/* Personality Info */}
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center gap-2">
//                     <div className="font-medium text-gray-900 truncate">
//                       {p.name}
//                     </div>
//                   </div>
//                   <div className="text-sm text-gray-500 truncate mt-0.5">
//                     {p.description || "AI Assistant"}
//                   </div>
//                 </div>

//                 {/* Selection indicator arrow */}
//                 <ArrowRightIcon
//                   className={`w-4 h-4 text-gray-300 flex-shrink-0 transition-transform ${
//                     selected?._id === p._id
//                       ? "text-purple-500"
//                       : "group-hover:text-purple-400"
//                   }`}
//                 />
//               </button>
//             );
//           })
//         ) : (
//           <div className="text-center py-8">
//             <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
//               <UserCircleIcon className="w-8 h-8 text-gray-400" />
//             </div>
//             <p className="text-gray-500 mb-2">
//               {searchTerm
//                 ? "No matching personalities"
//                 : "No personalities yet"}
//             </p>
//             {searchTerm ? (
//               <button
//                 onClick={() => setSearchTerm("")}
//                 className="text-sm text-purple-600 hover:text-purple-700 font-medium"
//               >
//                 Clear search
//               </button>
//             ) : (
//               <Link
//                 href="/personalities"
//                 className="inline-flex items-center gap-2 mt-2 text-sm text-purple-600 hover:text-purple-700 font-medium"
//               >
//                 <PlusIcon className="w-4 h-4" />
//                 Create your first personality
//               </Link>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Footer - Fixed position */}
//       <div className="p-6 pt-4 border-t border-gray-100">
//         {/* Stats */}
//         {/* <div className="mb-4 grid grid-cols-3 gap-2 text-center">
//           <div className="bg-gray-50 rounded-lg p-2">
//             <div className="text-lg font-bold text-gray-900">
//               {personalities.length}
//             </div>
//             <div className="text-xs text-gray-500">Total</div>
//           </div>
//           <div className="bg-blue-50 rounded-lg p-2">
//             <div className="text-lg font-bold text-blue-900">
//               {personalities.filter((p: any) => p.isDefault).length}
//             </div>
//             <div className="text-xs text-blue-600">Default</div>
//           </div>
//           <div className="bg-green-50 rounded-lg p-2">
//             <div className="text-lg font-bold text-green-900">
//               {personalities.filter((p: any) => !p.isDefault).length}
//             </div>
//             <div className="text-xs text-green-600">Custom</div>
//           </div>
//         </div> */}

//         {/* Link to Personalities Management Page */}
//         <Link
//           href="/personalities"
//           className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-[1.02]"
//         >
//           <UserGroupIcon className="w-5 h-5" />
//           Manage Personalities
//         </Link>
//       </div>
//     </div>
//   );
// // }
// "use client";

// import {
//   UserCircleIcon,
//   CheckCircleIcon,
//   UserGroupIcon,
// } from "@heroicons/react/24/solid";
// import {
//   MagnifyingGlassIcon,
//   ArrowRightIcon,
//   PlusIcon,
// } from "@heroicons/react/24/outline";
// import Link from "next/link";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// // Default avatar images for different personalities
// const defaultAvatarImages = [
//   "/avatars/eren.png",
//   "/avatars/mikasa.png",
//   "/avatars/naruto.png",
//   "/avatars/kohli.png",
//   "/avatars/socrates.png",
// ];

// // Animation variants
// const containerVariants = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: 0.2,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20, scale: 0.95 },
//   show: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       type: "spring",
//       stiffness: 300,
//       damping: 20,
//     },
//   },
// };

// const personalityItemVariants = {
//   initial: { scale: 1 },
//   hover: {
//     scale: 1.02,
//     transition: {
//       type: "spring",
//       stiffness: 400,
//       damping: 25,
//     },
//   },
//   tap: { scale: 0.98 },
// };

// const avatarImageVariants = {
//   initial: { scale: 1 },
//   hover: {
//     scale: 1.1,
//     transition: {
//       duration: 0.3,
//       ease: "easeOut",
//     },
//   },
// };

// const arrowVariants = {
//   initial: { x: 0, opacity: 0.5 },
//   hover: {
//     x: 3,
//     opacity: 1,
//     transition: {
//       type: "spring",
//       stiffness: 400,
//     },
//   },
// };

// const checkmarkVariants = {
//   initial: { scale: 0, rotate: -180 },
//   animate: {
//     scale: 1,
//     rotate: 0,
//     transition: {
//       type: "spring",
//       stiffness: 500,
//       damping: 15,
//     },
//   },
// };

// const searchVariants = {
//   focus: {
//     boxShadow: "0 0 0 2px rgba(168, 85, 247, 0.2)",
//     borderColor: "#a855f7",
//   },
// };

// const statsVariants = {
//   hover: {
//     scale: 1.05,
//     transition: {
//       type: "spring",
//       stiffness: 300,
//     },
//   },
// };

// export default function PersonalityList({
//   personalities,
//   selected,
//   onSelect,
//   loading,
// }: any) {
//   const [searchTerm, setSearchTerm] = useState("");

//   // Function to get avatar image based on personality
//   const getAvatarImage = (personality: any, index: number) => {
//     // If personality has a custom avatar, use it
//     if (personality.avatar && personality.avatar !== "") {
//       return personality.avatar;
//     }

//     // Check for specific characters
//     const name = personality.name.toLowerCase();
//     if (name.includes("eren")) {
//       return "/avatars/eren.png";
//     }
//     if (name.includes("mikasa")) {
//       return "/avatars/mikasa.png";
//     }
//     if (name.includes("naruto")) {
//       return "/avatars/naruto.png";
//     }
//     if (name.includes("kohli")) {
//       return "/avatars/kohli.png";
//     }
//     if (name.includes("socrates")) {
//       return "/avatars/socrates.png";
//     }

//     // Otherwise use default based on index
//     return defaultAvatarImages[index % defaultAvatarImages.length];
//   };
//   const selectionVariants = {
//     selected: {
//       borderColor: "#a855f7",
//       borderWidth: 2,
//       backgroundColor: "rgba(245, 243, 255, 0.5)",
//       transition: {
//         type: "spring",
//         stiffness: 400,
//         damping: 25,
//       },
//     },
//     unselected: {
//       borderColor: "transparent",
//       borderWidth: 1,
//       backgroundColor: "transparent",
//       transition: {
//         type: "spring",
//         stiffness: 400,
//         damping: 25,
//       },
//     },
//   };

//   // Fallback gradient colors for when images fail to load
//   const avatarColors = [
//     "bg-gradient-to-r from-purple-500 to-pink-500",
//     "bg-gradient-to-r from-blue-500 to-cyan-500",
//     "bg-gradient-to-r from-green-500 to-emerald-500",
//     "bg-gradient-to-r from-orange-500 to-red-500",
//     "bg-gradient-to-r from-indigo-500 to-purple-500",
//   ];

//   const getAvatarColor = (index: number) => {
//     return avatarColors[index % avatarColors.length];
//   };

//   // Filter personalities based on search
//   const filteredPersonalities = personalities.filter(
//     (p: any) =>
//       p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (p.description || "").toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="w-72 border-r border-gray-200 bg-white shadow-sm flex flex-col h-screen"
//       >
//         <div className="p-6 pb-4">
//           <div className="h-7 bg-gray-200 rounded w-48 mb-6"></div>
//         </div>
//         <div className="flex-1 overflow-y-auto px-6 space-y-2">
//           {[1, 2, 3, 4, 5, 6].map((i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.1 }}
//               className="flex items-center gap-3 p-3 rounded-xl"
//             >
//               <div className="w-10 h-10 rounded-full bg-gray-200"></div>
//               <div className="flex-1">
//                 <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                 <div className="h-3 bg-gray-100 rounded w-1/2"></div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//         <div className="p-6 pt-4 border-t border-gray-100">
//           <div className="h-10 bg-gray-200 rounded"></div>
//         </div>
//       </motion.div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ x: -20, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       transition={{ type: "spring", stiffness: 300 }}
//       className="w-72 border-r border-gray-200 bg-white shadow-sm flex flex-col h-screen"
//     >
//       {/* Header */}
//       <motion.div
//         initial={{ y: -10, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.1 }}
//         className="p-6 pb-4"
//       >
//         <h2 className="font-bold text-xl text-gray-800 flex items-center gap-2">
//           <motion.div
//             animate={{ rotate: [0, 10, 0] }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               repeatDelay: 3,
//             }}
//           >
//             <UserCircleIcon className="w-6 h-6 text-purple-600" />
//           </motion.div>
//           Personalities
//         </h2>
//       </motion.div>

//       {/* Search Bar - Fixed position */}
//       <motion.div
//         initial={{ y: -10, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.15 }}
//         className="px-6 pb-4"
//       >
//         <div className="relative">
//           <motion.div
//             animate={{ rotate: [0, -5, 5, 0] }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               repeatDelay: 5,
//             }}
//             className="absolute left-3 top-1/2 transform -translate-y-1/2"
//           >
//             <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
//           </motion.div>
//           <motion.input
//             type="text"
//             placeholder="Search personalities..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full px-4 py-2.5 pl-10 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
//             whileFocus="focus"
//             variants={searchVariants}
//           />
//           <AnimatePresence>
//             {searchTerm && (
//               <motion.button
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 exit={{ scale: 0 }}
//                 onClick={() => setSearchTerm("")}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 ✕
//               </motion.button>
//             )}
//           </AnimatePresence>
//         </div>
//       </motion.div>

//       {/* Scrollable Personality List */}
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="show"
//         className="flex-1 overflow-y-auto px-6 space-y-2 pb-4"
//       >
//         {filteredPersonalities.length > 0 ? (
//           filteredPersonalities.map((p: any, index: number) => {
//             const avatarImage = getAvatarImage(p, index);
//             const avatarColor = getAvatarColor(index);
//             const isSelected = selected?._id === p._id;

//             return (
//               <motion.button
//                 key={p._id}
//                 variants={itemVariants}
//                 whileHover="hover"
//                 whileTap="tap"
//                 custom={index}
//                 onClick={() => onSelect(p)}
//                 className={`w-full text-left p-3 rounded-xl flex items-center gap-3 group ${
//                   isSelected
//                     ? "bg-gradient-to-r from-purple-50 to-pink-50 shadow-sm"
//                     : "hover:bg-gray-50 hover:shadow-sm"
//                 }`}
//                 animate={isSelected ? "selected" : "unselected"}
//                 variants={{ ...itemVariants, ...selectionVariants }}
//               >
//                 {/* Avatar with image */}
//                 <div className="relative flex-shrink-0">
//                   <motion.div
//                     className={`w-10 h-10 rounded-full overflow-hidden ${avatarColor}`}
//                     whileHover="hover"
//                     variants={avatarImageVariants}
//                   >
//                     {avatarImage ? (
//                       <motion.img
//                         src={avatarImage}
//                         alt={`${p.name} avatar`}
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                           const target = e.target as HTMLImageElement;
//                           target.style.display = "none";
//                           target.parentElement!.innerHTML = `
//                             <div class="w-full h-full flex items-center justify-center text-white font-semibold">
//                               ${p.name.charAt(0).toUpperCase()}
//                             </div>
//                           `;
//                         }}
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center text-white font-semibold">
//                         {p.name.charAt(0).toUpperCase()}
//                       </div>
//                     )}
//                   </motion.div>

//                   {/* Selection checkmark */}
//                   <AnimatePresence>
//                     {isSelected && (
//                       <motion.div
//                         className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center border-2 border-white"
//                         variants={checkmarkVariants}
//                         initial="initial"
//                         animate="animate"
//                         exit="initial"
//                       >
//                         <CheckCircleIcon className="w-2.5 h-2.5 text-white" />
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>

//                 {/* Personality Info */}
//                 <div className="flex-1 min-w-0">
//                   <motion.div
//                     className="flex items-center gap-2"
//                     whileHover={{ x: 2 }}
//                     transition={{ type: "spring", stiffness: 400 }}
//                   >
//                     <div className="font-medium text-gray-900 truncate">
//                       {p.name}
//                     </div>
//                   </motion.div>
//                   <motion.div
//                     className="text-sm text-gray-500 truncate mt-0.5"
//                     whileHover={{ opacity: 0.8 }}
//                   >
//                     {p.description || "AI Assistant"}
//                   </motion.div>
//                 </div>

//                 {/* Selection indicator arrow */}
//                 <motion.div
//                   variants={arrowVariants}
//                   whileHover="hover"
//                   animate={
//                     isSelected
//                       ? {
//                           x: 3,
//                           opacity: 1,
//                           color: "#a855f7",
//                         }
//                       : {}
//                   }
//                 >
//                   <ArrowRightIcon className="w-4 h-4 flex-shrink-0" />
//                 </motion.div>
//               </motion.button>
//             );
//           })
//         ) : (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="text-center py-8"
//           >
//             <motion.div
//               className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center"
//               animate={{
//                 rotate: [0, 5, -5, 0],
//                 scale: [1, 1.05, 1],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 repeatDelay: 2,
//               }}
//             >
//               <UserCircleIcon className="w-8 h-8 text-gray-400" />
//             </motion.div>
//             <p className="text-gray-500 mb-2">
//               {searchTerm
//                 ? "No matching personalities"
//                 : "No personalities yet"}
//             </p>
//             {searchTerm ? (
//               <motion.button
//                 onClick={() => setSearchTerm("")}
//                 className="text-sm text-purple-600 hover:text-purple-700 font-medium"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Clear search
//               </motion.button>
//             ) : (
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Link
//                   href="/personalities"
//                   className="inline-flex items-center gap-2 mt-2 text-sm text-purple-600 hover:text-purple-700 font-medium"
//                 >
//                   <PlusIcon className="w-4 h-4" />
//                   Create your first personality
//                 </Link>
//               </motion.div>
//             )}
//           </motion.div>
//         )}
//       </motion.div>

//       {/* Footer - Fixed position */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.3 }}
//         className="p-6 pt-4 border-t border-gray-100"
//       >
//         {/* Link to Personalities Management Page */}
//         <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//           <Link
//             href="/personalities"
//             className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
//           >
//             <motion.div
//               animate={{ rotate: [0, 360] }}
//               transition={{
//                 duration: 10,
//                 repeat: Infinity,
//                 ease: "linear",
//               }}
//             >
//               <UserGroupIcon className="w-5 h-5" />
//             </motion.div>
//             <span>Manage Personalities</span>
//             <motion.div
//               animate={{ x: [0, 3, 0] }}
//               transition={{
//                 duration: 1.5,
//                 repeat: Infinity,
//                 repeatDelay: 1,
//               }}
//             >
//               <ArrowRightIcon className="w-4 h-4" />
//             </motion.div>
//           </Link>
//         </motion.div>

//         {/* Animated stats (optional) */}
//         <AnimatePresence>
//           {personalities.length > 0 && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               className="mt-4 overflow-hidden"
//             >
//               <div className="grid grid-cols-3 gap-2 text-center">
//                 {[
//                   {
//                     value: personalities.length,
//                     label: "Total",
//                     color: "gray",
//                   },
//                   {
//                     value: personalities.filter((p: any) => p.isDefault).length,
//                     label: "Default",
//                     color: "blue",
//                   },
//                   {
//                     value: personalities.filter((p: any) => !p.isDefault)
//                       .length,
//                     label: "Custom",
//                     color: "green",
//                   },
//                 ].map((stat, index) => (
//                   <motion.div
//                     key={stat.label}
//                     variants={statsVariants}
//                     whileHover="hover"
//                     className={`bg-${stat.color}-50 rounded-lg p-2 cursor-pointer`}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.4 + index * 0.1 }}
//                   >
//                     <div className={`text-lg font-bold text-${stat.color}-900`}>
//                       {stat.value}
//                     </div>
//                     <div className={`text-xs text-${stat.color}-600`}>
//                       {stat.label}
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </motion.div>
//   );
// }
// "use client";

// import {
//   UserCircleIcon,
//   CheckCircleIcon,
//   UserGroupIcon,
// } from "@heroicons/react/24/solid";
// import {
//   MagnifyingGlassIcon,
//   ArrowRightIcon,
//   PlusIcon,
// } from "@heroicons/react/24/outline";
// import Link from "next/link";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// // Default avatar images for different personalities
// const defaultAvatarImages = [
//   "/avatars/eren.png",
//   "/avatars/mikasa.png",
//   "/avatars/naruto.png",
//   "/avatars/kohli.png",
//   "/avatars/socrates.png",
// ];

// // Animation variants
// const containerVariants = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: 0.2,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20, scale: 0.95 },
//   show: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       type: "spring",
//       stiffness: 300,
//       damping: 20,
//     },
//   },
// };

// const personalityItemVariants = {
//   initial: { scale: 1 },
//   hover: {
//     scale: 1.02,
//     transition: {
//       type: "spring",
//       stiffness: 400,
//       damping: 25,
//     },
//   },
//   tap: { scale: 0.98 },
// };

// const avatarImageVariants = {
//   initial: { scale: 1 },
//   hover: {
//     scale: 1.1,
//     transition: {
//       duration: 0.3,
//       ease: "easeOut",
//     },
//   },
// };

// const arrowVariants = {
//   initial: { x: 0, opacity: 0.5 },
//   hover: {
//     x: 3,
//     opacity: 1,
//     transition: {
//       type: "spring",
//       stiffness: 400,
//     },
//   },
// };

// const checkmarkVariants = {
//   initial: { scale: 0, rotate: -180 },
//   animate: {
//     scale: 1,
//     rotate: 0,
//     transition: {
//       type: "spring",
//       stiffness: 500,
//       damping: 15,
//     },
//   },
// };

// const searchVariants = {
//   focus: {
//     boxShadow: "0 0 0 2px rgba(var(--primary-rgb), 0.2)",
//     borderColor: "var(--primary)",
//   },
// };

// const statsVariants = {
//   hover: {
//     scale: 1.05,
//     transition: {
//       type: "spring",
//       stiffness: 300,
//     },
//   },
// };

// export default function PersonalityList({
//   personalities,
//   selected,
//   onSelect,
//   loading,
// }: any) {
//   const [searchTerm, setSearchTerm] = useState("");

//   // Function to get avatar image based on personality
//   const getAvatarImage = (personality: any, index: number) => {
//     if (personality.avatar && personality.avatar !== "") {
//       return personality.avatar;
//     }

//     const name = personality.name.toLowerCase();
//     if (name.includes("eren")) return "/avatars/eren.png";
//     if (name.includes("mikasa")) return "/avatars/mikasa.png";
//     if (name.includes("naruto")) return "/avatars/naruto.png";
//     if (name.includes("kohli")) return "/avatars/kohli.png";
//     if (name.includes("socrates")) return "/avatars/socrates.png";

//     return defaultAvatarImages[index % defaultAvatarImages.length];
//   };

//   const selectionVariants = {
//     selected: {
//       borderColor: "var(--primary)",
//       borderWidth: 2,
//       backgroundColor: "rgba(var(--primary-rgb), 0.1)",
//       transition: {
//         type: "spring",
//         stiffness: 400,
//         damping: 25,
//       },
//     },
//     unselected: {
//       borderColor: "transparent",
//       borderWidth: 1,
//       backgroundColor: "transparent",
//       transition: {
//         type: "spring",
//         stiffness: 400,
//         damping: 25,
//       },
//     },
//   };

//   // Fallback gradient colors
//   const avatarColors = [
//     "bg-gradient-to-r from-primary to-purple-600",
//     "bg-gradient-to-r from-blue-500 to-cyan-500",
//     "bg-gradient-to-r from-green-500 to-emerald-500",
//     "bg-gradient-to-r from-orange-500 to-red-500",
//     "bg-gradient-to-r from-indigo-500 to-purple-500",
//   ];

//   const getAvatarColor = (index: number) => {
//     return avatarColors[index % avatarColors.length];
//   };

//   // Filter personalities based on search
//   const filteredPersonalities = personalities.filter(
//     (p: any) =>
//       p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (p.description || "").toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="w-72 border-r border-border bg-card shadow-sm flex flex-col h-screen"
//       >
//         <div className="p-6 pb-4">
//           <div className="h-7 bg-muted rounded w-48 mb-6"></div>
//         </div>
//         <div className="flex-1 overflow-y-auto px-6 space-y-2">
//           {[1, 2, 3, 4, 5, 6].map((i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.1 }}
//               className="flex items-center gap-3 p-3 rounded-xl"
//             >
//               <div className="w-10 h-10 rounded-full bg-muted"></div>
//               <div className="flex-1">
//                 <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
//                 <div className="h-3 bg-muted/50 rounded w-1/2"></div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//         <div className="p-6 pt-4 border-t border-border">
//           <div className="h-10 bg-muted rounded"></div>
//         </div>
//       </motion.div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ x: -20, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       transition={{ type: "spring", stiffness: 300 }}
//       className="w-80 border-r border-border bg-card shadow-sm flex flex-col h-screen"
//     >
//       {/* Header */}
//       <motion.div
//         initial={{ y: -10, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.1 }}
//         className="p-6 pb-4"
//       >
//         <h2 className="font-bold text-xl text-card-foreground flex items-center gap-2">
//           <motion.div
//             animate={{ rotate: [0, 10, 0] }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               repeatDelay: 3,
//             }}
//           >
//             <UserCircleIcon className="w-6 h-6 text-primary" />
//           </motion.div>
//           Personalities
//         </h2>
//       </motion.div>

//       {/* Search Bar */}
//       <motion.div
//         initial={{ y: -10, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.15 }}
//         className="px-6 pb-4"
//       >
//         <div className="relative">
//           <motion.div
//             animate={{ rotate: [0, -5, 5, 0] }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               repeatDelay: 5,
//             }}
//             className="absolute left-3 top-1/2 transform -translate-y-1/2"
//           >
//             <MagnifyingGlassIcon className="w-4 h-4 text-muted-foreground" />
//           </motion.div>
//           <motion.input
//             type="text"
//             placeholder="Search personalities..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full px-4 py-2.5 pl-10 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm placeholder:text-muted-foreground"
//             whileFocus="focus"
//             variants={searchVariants}
//           />
//           <AnimatePresence>
//             {searchTerm && (
//               <motion.button
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 exit={{ scale: 0 }}
//                 onClick={() => setSearchTerm("")}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 ✕
//               </motion.button>
//             )}
//           </AnimatePresence>
//         </div>
//       </motion.div>

//       {/* Scrollable Personality List */}
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="show"
//         className="flex-1 overflow-y-auto no-scrollbar px-6 space-y-2 pb-4"
//       >
//         {filteredPersonalities.length > 0 ? (
//           filteredPersonalities.map((p: any, index: number) => {
//             const avatarImage = getAvatarImage(p, index);
//             const avatarColor = getAvatarColor(index);
//             const isSelected = selected?._id === p._id;

//             return (
//               <motion.button
//                 key={p._id}
//                 variants={itemVariants}
//                 whileHover="hover"
//                 whileTap="tap"
//                 custom={index}
//                 onClick={() => onSelect(p)}
//                 className={`w-full text-left p-3 rounded-xl flex items-center gap-3 group ${
//                   isSelected ? " shadow-sm" : "hover:shadow-sm"
//                 }`}
//                 animate={isSelected ? "selected" : "unselected"}
//                 variants={{ ...itemVariants, ...selectionVariants }}
//               >
//                 {/* Avatar with image */}
//                 <div className="relative flex-shrink-0">
//                   <motion.div
//                     className={`w-10 h-10 rounded-full overflow-hidden ${avatarColor}`}
//                     whileHover="hover"
//                     variants={avatarImageVariants}
//                   >
//                     {avatarImage ? (
//                       <motion.img
//                         src={avatarImage}
//                         alt={`${p.name} avatar`}
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                           const target = e.target as HTMLImageElement;
//                           target.style.display = "none";
//                           const parent = target.parentElement;
//                           if (parent) {
//                             parent.className = `${parent.className} flex items-center justify-center text-primary-foreground font-semibold`;
//                             parent.innerHTML = `
//                               <div class="w-full h-full flex items-center justify-center text-primary-foreground font-semibold">
//                                 ${p.name.charAt(0).toUpperCase()}
//                               </div>
//                             `;
//                           }
//                         }}
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center text-primary-foreground font-semibold">
//                         {p.name.charAt(0).toUpperCase()}
//                       </div>
//                     )}
//                   </motion.div>

//                   {/* Selection checkmark */}
//                   <AnimatePresence>
//                     {isSelected && (
//                       <motion.div
//                         className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center border-2 border-card"
//                         variants={checkmarkVariants}
//                         initial="initial"
//                         animate="animate"
//                         exit="initial"
//                       >
//                         <CheckCircleIcon className="w-2.5 h-2.5 text-primary-foreground" />
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>

//                 {/* Personality Info */}
//                 <div className="flex-1 min-w-0">
//                   <motion.div
//                     className="flex items-center gap-2"
//                     whileHover={{ x: 2 }}
//                     transition={{ type: "spring", stiffness: 400 }}
//                   >
//                     <div className="font-medium text-card-foreground truncate">
//                       {p.name}
//                     </div>
//                   </motion.div>
//                   <motion.div
//                     className="text-sm text-muted-foreground truncate mt-0.5"
//                     whileHover={{ opacity: 0.8 }}
//                   >
//                     {p.description || "AI Assistant"}
//                   </motion.div>
//                 </div>

//                 {/* Selection indicator arrow */}
//                 <motion.div
//                   variants={arrowVariants}
//                   whileHover="hover"
//                   animate={
//                     isSelected
//                       ? {
//                           x: 3,
//                           opacity: 1,
//                           color: "var(--primary)",
//                         }
//                       : {}
//                   }
//                 >
//                   <ArrowRightIcon className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
//                 </motion.div>
//               </motion.button>
//             );
//           })
//         ) : (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="text-center py-8"
//           >
//             <motion.div
//               className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-muted to-muted/50 flex items-center justify-center"
//               animate={{
//                 rotate: [0, 5, -5, 0],
//                 scale: [1, 1.05, 1],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 repeatDelay: 2,
//               }}
//             >
//               <UserCircleIcon className="w-8 h-8 text-muted-foreground" />
//             </motion.div>
//             <p className="text-muted-foreground mb-2">
//               {searchTerm
//                 ? "No matching personalities"
//                 : "No personalities yet"}
//             </p>
//             {searchTerm ? (
//               <motion.button
//                 onClick={() => setSearchTerm("")}
//                 className="text-sm text-primary hover:text-primary/80 font-medium"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Clear search
//               </motion.button>
//             ) : (
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Link
//                   href="/personalities"
//                   className="inline-flex items-center gap-2 mt-2 text-sm text-primary hover:text-primary/80 font-medium"
//                 >
//                   <PlusIcon className="w-4 h-4" />
//                   Create your first personality
//                 </Link>
//               </motion.div>
//             )}
//           </motion.div>
//         )}
//       </motion.div>

//       {/* Footer */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.3 }}
//         className="p-6 pt-4 border-t border-border"
//       >
//         {/* Manage Personalities Button */}
//         <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//           <Link
//             href="/personalities"
//             className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-[1.02]"
//           >
//             <UserGroupIcon className="animate-pulse w-5 h-5" />
//             Manage Personalities
//             <ArrowRightIcon className="w-4 h-4" />
//           </Link>
//         </motion.div>

//         {/* Stats Section */}
//         <AnimatePresence>
//           {personalities.length > 0 && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               className="mt-4 overflow-hidden"
//             >
//               <div className="grid grid-cols-3 gap-2 text-center">
//                 {[
//                   {
//                     value: personalities.length,
//                     label: "Total",
//                     bg: "bg-muted",
//                     text: "text-foreground",
//                     subtext: "text-muted-foreground",
//                   },
//                   {
//                     value: personalities.filter((p: any) => p.isDefault).length,
//                     label: "Default",
//                     bg: "bg-blue-50 dark:bg-blue-900/20",
//                     text: "text-blue-900 dark:text-blue-100",
//                     subtext: "text-blue-600 dark:text-blue-400",
//                   },
//                   {
//                     value: personalities.filter((p: any) => !p.isDefault)
//                       .length,
//                     label: "Custom",
//                     bg: "bg-green-50 dark:bg-green-900/20",
//                     text: "text-green-900 dark:text-green-100",
//                     subtext: "text-green-600 dark:text-green-400",
//                   },
//                 ].map((stat, index) => (
//                   <motion.div
//                     key={stat.label}
//                     variants={statsVariants}
//                     whileHover="hover"
//                     className={`${stat.bg} rounded-lg p-2 cursor-pointer`}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.4 + index * 0.1 }}
//                   >
//                     <div className={`text-lg font-bold ${stat.text}`}>
//                       {stat.value}
//                     </div>
//                     <div className={`text-xs ${stat.subtext}`}>
//                       {stat.label}
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </motion.div>
//   );
// }

"use client";

import {
  UserCircleIcon,
  CheckCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import {
  MagnifyingGlassIcon,
  ArrowRightIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

// Default avatar images for different personalities
const defaultAvatarImages = [
  "/avatars/eren.png",
  "/avatars/mikasa.png",
  "/avatars/naruto.png",
  "/avatars/kohli.png",
  "/avatars/socrates.png",
];

// Type definitions
type Personality = {
  _id: string;
  name: string;
  description?: string;
  avatar?: string;
  isDefault: boolean;
};

interface PersonalityListProps {
  personalities: Personality[];
  selected: Personality | null;
  onSelect: (personality: Personality) => void;
  loading?: boolean;
}

// Animation variants with proper Variants type
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const personalityItemVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  tap: { scale: 0.98 },
};

const avatarImageVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const arrowVariants: Variants = {
  initial: { x: 0, opacity: 0.5 },
  hover: {
    x: 3,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
    },
  },
};

const checkmarkVariants: Variants = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 15,
    },
  },
};

const searchVariants: Variants = {
  focus: {
    boxShadow: "0 0 0 2px rgba(var(--primary-rgb), 0.2)",
    borderColor: "var(--primary)",
  },
};

const statsVariants: Variants = {
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 300,
    },
  },
};

const selectionVariants: Variants = {
  selected: {
    borderColor: "var(--primary)",
    borderWidth: 2,
    backgroundColor: "rgba(var(--primary-rgb), 0.1)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  unselected: {
    borderColor: "transparent",
    borderWidth: 1,
    backgroundColor: "transparent",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

export default function PersonalityList({
  personalities,
  selected,
  onSelect,
  loading = false,
}: PersonalityListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Function to get avatar image based on personality
  const getAvatarImage = (personality: Personality, index: number): string => {
    if (personality.avatar && personality.avatar !== "") {
      return personality.avatar;
    }

    const name = personality.name.toLowerCase();
    if (name.includes("eren")) return "/avatars/eren.png";
    if (name.includes("mikasa")) return "/avatars/mikasa.png";
    if (name.includes("naruto")) return "/avatars/naruto.png";
    if (name.includes("kohli")) return "/avatars/kohli.png";
    if (name.includes("socrates")) return "/avatars/socrates.png";

    return defaultAvatarImages[index % defaultAvatarImages.length];
  };

  // Fallback gradient colors
  const avatarColors = [
    "bg-gradient-to-r from-primary to-purple-600",
    "bg-gradient-to-r from-blue-500 to-cyan-500",
    "bg-gradient-to-r from-green-500 to-emerald-500",
    "bg-gradient-to-r from-orange-500 to-red-500",
    "bg-gradient-to-r from-indigo-500 to-purple-500",
  ];

  const getAvatarColor = (index: number): string => {
    return avatarColors[index % avatarColors.length];
  };

  // Filter personalities based on search
  const filteredPersonalities = personalities.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.description || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-72 border-r border-border bg-card shadow-sm flex flex-col h-screen"
      >
        <div className="p-6 pb-4">
          <div className="h-7 bg-muted rounded w-48 mb-6"></div>
        </div>
        <div className="flex-1 overflow-y-auto px-6 space-y-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-xl"
            >
              <div className="w-10 h-10 rounded-full bg-muted"></div>
              <div className="flex-1">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted/50 rounded w-1/2"></div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="p-6 pt-4 border-t border-border">
          <div className="h-10 bg-muted rounded"></div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-80 border-r border-border bg-card shadow-sm flex flex-col h-screen"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="p-6 pb-4"
      >
        <h2 className="font-bold text-xl text-card-foreground flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <UserCircleIcon className="w-6 h-6 text-primary" />
          </motion.div>
          Personalities
        </h2>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="px-6 pb-4"
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 5,
            }}
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
          >
            <MagnifyingGlassIcon className="w-4 h-4 text-muted-foreground" />
          </motion.div>
          <motion.input
            type="text"
            placeholder="Search personalities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 pl-10 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm placeholder:text-muted-foreground"
            whileFocus="focus"
            variants={searchVariants}
          />
          <AnimatePresence>
            {searchTerm && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Scrollable Personality List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex-1 overflow-y-auto no-scrollbar px-6 space-y-2 pb-4"
      >
        {filteredPersonalities.length > 0 ? (
          filteredPersonalities.map((p, index) => {
            const avatarImage = getAvatarImage(p, index);
            const avatarColor = getAvatarColor(index);
            const isSelected = selected?._id === p._id;

            return (
              <motion.button
                key={p._id}
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
                custom={index}
                onClick={() => onSelect(p)}
                className={`w-full text-left p-3 rounded-xl flex items-center gap-3 group ${
                  isSelected ? " shadow-sm" : "hover:shadow-sm"
                }`}
                animate={isSelected ? "selected" : "unselected"}
                // @ts-ignore - combining variants is a known pattern
                variants={{ ...itemVariants, ...selectionVariants }}
              >
                {/* Avatar with image */}
                <div className="relative flex-shrink-0">
                  <motion.div
                    className={`w-10 h-10 rounded-full overflow-hidden ${avatarColor}`}
                    whileHover="hover"
                    variants={avatarImageVariants}
                  >
                    {avatarImage ? (
                      <motion.img
                        src={avatarImage}
                        alt={`${p.name} avatar`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (parent) {
                            parent.className = `${parent.className} flex items-center justify-center text-primary-foreground font-semibold`;
                            parent.innerHTML = `
                              <div class="w-full h-full flex items-center justify-center text-primary-foreground font-semibold">
                                ${p.name.charAt(0).toUpperCase()}
                              </div>
                            `;
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-primary-foreground font-semibold">
                        {p.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </motion.div>

                  {/* Selection checkmark */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center border-2 border-card"
                        variants={checkmarkVariants}
                        initial="initial"
                        animate="animate"
                        exit="initial"
                      >
                        <CheckCircleIcon className="w-2.5 h-2.5 text-primary-foreground" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Personality Info */}
                <div className="flex-1 min-w-0">
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className="font-medium text-card-foreground truncate">
                      {p.name}
                    </div>
                  </motion.div>
                  <motion.div
                    className="text-sm text-muted-foreground truncate mt-0.5"
                    whileHover={{ opacity: 0.8 }}
                  >
                    {p.description || "AI Assistant"}
                  </motion.div>
                </div>

                {/* Selection indicator arrow */}
                <motion.div
                  variants={arrowVariants}
                  whileHover="hover"
                  animate={
                    isSelected
                      ? {
                          x: 3,
                          opacity: 1,
                          color: "var(--primary)",
                        }
                      : {}
                  }
                >
                  <ArrowRightIcon className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
                </motion.div>
              </motion.button>
            );
          })
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <motion.div
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-muted to-muted/50 flex items-center justify-center"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              <UserCircleIcon className="w-8 h-8 text-muted-foreground" />
            </motion.div>
            <p className="text-muted-foreground mb-2">
              {searchTerm
                ? "No matching personalities"
                : "No personalities yet"}
            </p>
            {searchTerm ? (
              <motion.button
                onClick={() => setSearchTerm("")}
                className="text-sm text-primary hover:text-primary/80 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear search
              </motion.button>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/personalities"
                  className="inline-flex items-center gap-2 mt-2 text-sm text-primary hover:text-primary/80 font-medium"
                >
                  <PlusIcon className="w-4 h-4" />
                  Create your first personality
                </Link>
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="p-6 pt-4 border-t border-border"
      >
        {/* Manage Personalities Button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/personalities"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-[1.02]"
          >
            <UserGroupIcon className="animate-pulse w-5 h-5" />
            Manage Personalities
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Stats Section */}
        <AnimatePresence>
          {personalities.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 overflow-hidden"
            >
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  {
                    value: personalities.length,
                    label: "Total",
                    bg: "bg-muted",
                    text: "text-foreground",
                    subtext: "text-muted-foreground",
                  },
                  {
                    value: personalities.filter((p) => p.isDefault).length,
                    label: "Default",
                    bg: "bg-blue-50 dark:bg-blue-900/20",
                    text: "text-blue-900 dark:text-blue-100",
                    subtext: "text-blue-600 dark:text-blue-400",
                  },
                  {
                    value: personalities.filter((p) => !p.isDefault).length,
                    label: "Custom",
                    bg: "bg-green-50 dark:bg-green-900/20",
                    text: "text-green-900 dark:text-green-100",
                    subtext: "text-green-600 dark:text-green-400",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={statsVariants}
                    whileHover="hover"
                    className={`${stat.bg} rounded-lg p-2 cursor-pointer`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className={`text-lg font-bold ${stat.text}`}>
                      {stat.value}
                    </div>
                    <div className={`text-xs ${stat.subtext}`}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
