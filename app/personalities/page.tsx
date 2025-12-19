// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   PencilSquareIcon,
//   TrashIcon,
//   PlusIcon,
//   SparklesIcon,
//   UserGroupIcon,
//   CheckCircleIcon,
//   XCircleIcon,
// } from "@heroicons/react/24/solid";
// import { UserIcon, PhotoIcon } from "@heroicons/react/24/outline";

// // Default avatar options
// const AVATAR_OPTIONS = [
//   "/avatars/eren.png",
//   "/avatars/naruto.png",
//   "/avatars/kohli.png",
//   "/avatars/socrates.png",
//   "/avatars/eren.png", // You can add more avatar paths here
//   "/avatars/naruto.png",
// ];

// export default function PersonalitiesPage() {
//   const router = useRouter();
//   const [personalities, setPersonalities] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedPersonality, setSelectedPersonality] = useState<any>(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     avatar: "/avatars/eren.png", // Default avatar
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Load personalities
//   useEffect(() => {
//     fetchPersonalities();
//   }, []);

//   const fetchPersonalities = async () => {
//     try {
//       const res = await fetch("/api/personality");
//       if (res.ok) {
//         const data = await res.json();
//         setPersonalities(data);
//       }
//     } catch (error) {
//       console.error("Failed to fetch personalities:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleAvatarSelect = (avatar: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       avatar,
//     }));
//   };

//   const handleAddPersonality = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.name.trim() || !formData.description.trim()) {
//       alert("Please fill in all fields");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const res = await fetch("/api/personality", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         const newPersonality = await res.json();
//         setPersonalities((prev) => [...prev, newPersonality]);
//         setShowAddModal(false);
//         resetForm();
//         router.refresh();
//       } else {
//         const error = await res.json();
//         alert(error.error || "Failed to create personality");
//       }
//     } catch (error) {
//       console.error("Failed to add personality:", error);
//       alert("Failed to create personality");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleEditPersonality = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (
//       !selectedPersonality ||
//       !formData.name.trim() ||
//       !formData.description.trim()
//     ) {
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const res = await fetch(`/api/personality/${selectedPersonality._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         const updatedPersonality = await res.json();
//         setPersonalities((prev) =>
//           prev.map((p) =>
//             p._id === updatedPersonality._id ? updatedPersonality : p
//           )
//         );
//         setShowEditModal(false);
//         resetForm();
//         router.refresh();
//       } else {
//         const error = await res.json();
//         alert(error.error || "Failed to update personality");
//       }
//     } catch (error) {
//       console.error("Failed to edit personality:", error);
//       alert("Failed to update personality");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDeletePersonality = async () => {
//     if (!selectedPersonality) return;

//     setIsSubmitting(true);
//     try {
//       const res = await fetch(`/api/personality/${selectedPersonality._id}`, {
//         method: "DELETE",
//       });

//       if (res.ok) {
//         setPersonalities((prev) =>
//           prev.filter((p) => p._id !== selectedPersonality._id)
//         );
//         setShowDeleteModal(false);
//         setSelectedPersonality(null);
//         router.refresh();
//       } else {
//         const error = await res.json();
//         alert(error.error || "Failed to delete personality");
//       }
//     } catch (error) {
//       console.error("Failed to delete personality:", error);
//       alert("Failed to delete personality");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       description: "",
//       avatar: "/avatars/eren.png",
//     });
//     setSelectedPersonality(null);
//   };

//   const openEditModal = (personality: any) => {
//     setSelectedPersonality(personality);
//     setFormData({
//       name: personality.name,
//       description: personality.description || "",
//       avatar: personality.avatar || "/avatars/eren.png",
//     });
//     setShowEditModal(true);
//   };

//   const openDeleteModal = (personality: any) => {
//     setSelectedPersonality(personality);
//     setShowDeleteModal(true);
//   };

//   const startChat = (personality: any) => {
//     router.push(`/chat?personality=${personality._id}`);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="animate-pulse">
//             <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="bg-white rounded-xl shadow-sm p-6">
//                   <div className="flex items-center gap-4 mb-4">
//                     <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
//                     <div className="flex-1">
//                       <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
//                       <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
//               <UserGroupIcon className="w-8 h-8 text-purple-600" />
//               AI Personalities
//             </h1>
//             <p className="text-gray-600 mt-2">
//               Create and manage your AI personalities for customized
//               conversations
//             </p>
//           </div>
//           <button
//             onClick={() => {
//               resetForm();
//               setShowAddModal(true);
//             }}
//             className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
//           >
//             <PlusIcon className="w-5 h-5" />
//             Add New Personality
//           </button>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//           <div className="bg-white rounded-xl shadow-sm p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Personalities</p>
//                 <p className="text-3xl font-bold text-gray-900">
//                   {personalities.length}
//                 </p>
//               </div>
//               <UserGroupIcon className="w-10 h-10 text-purple-500" />
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow-sm p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Default Personalities</p>
//                 <p className="text-3xl font-bold text-gray-900">
//                   {personalities.filter((p) => p.isDefault).length}
//                 </p>
//               </div>
//               <SparklesIcon className="w-10 h-10 text-blue-500" />
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow-sm p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Custom Personalities</p>
//                 <p className="text-3xl font-bold text-gray-900">
//                   {personalities.filter((p) => !p.isDefault).length}
//                 </p>
//               </div>
//               <PlusIcon className="w-10 h-10 text-green-500" />
//             </div>
//           </div>
//         </div>

//         {/* Personalities Grid */}
//         {personalities.length === 0 ? (
//           <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
//             <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
//               <UserGroupIcon className="w-12 h-12 text-purple-500" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-3">
//               No Personalities Yet
//             </h3>
//             <p className="text-gray-600 max-w-md mx-auto mb-8">
//               Create your first AI personality to start having customized
//               conversations.
//             </p>
//             <button
//               onClick={() => setShowAddModal(true)}
//               className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200"
//             >
//               <PlusIcon className="w-5 h-5" />
//               Create Your First Personality
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {personalities.map((personality) => (
//               <div
//                 key={personality._id}
//                 className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
//               >
//                 {/* Avatar Section */}
//                 <div className="relative h-48 bg-gradient-to-r from-purple-50 to-pink-50 flex items-center justify-center">
//                   <div className="absolute inset-0 opacity-10">
//                     <div className="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200"></div>
//                   </div>
//                   <div className="relative z-10 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
//                     {personality.avatar ? (
//                       <img
//                         src={personality.avatar}
//                         alt={personality.name}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
//                         <UserIcon className="w-12 h-12 text-white" />
//                       </div>
//                     )}
//                   </div>
//                   {personality.isDefault && (
//                     <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
//                       Default
//                     </div>
//                   )}
//                 </div>

//                 {/* Info Section */}
//                 <div className="p-6">
//                   <div className="flex items-start justify-between mb-3">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900">
//                         {personality.name}
//                       </h3>
//                       <div className="flex items-center gap-2 mt-1">
//                         {personality.isDefault ? (
//                           <CheckCircleIcon className="w-4 h-4 text-green-500" />
//                         ) : (
//                           <PlusIcon className="w-4 h-4 text-purple-500" />
//                         )}
//                         <span className="text-sm text-gray-500">
//                           {personality.isDefault ? "Pre-defined" : "Custom"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <p className="text-gray-600 mb-6 line-clamp-3">
//                     {personality.description || "No description provided"}
//                   </p>

//                   {/* Actions */}
//                   <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
//                     <button
//                       onClick={() => startChat(personality)}
//                       className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-md transition-all"
//                     >
//                       Chat
//                     </button>
//                     {!personality.isDefault && (
//                       <>
//                         <button
//                           onClick={() => openEditModal(personality)}
//                           className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
//                         >
//                           <PencilSquareIcon className="w-4 h-4" />
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => openDeleteModal(personality)}
//                           className="px-4 py-2 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2"
//                         >
//                           <TrashIcon className="w-4 h-4" />
//                           Delete
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Add/Edit Modal */}
//       {(showAddModal || showEditModal) && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl font-bold text-gray-900">
//                   {showAddModal ? "Create New Personality" : "Edit Personality"}
//                 </h2>
//                 <button
//                   onClick={() => {
//                     setShowAddModal(false);
//                     setShowEditModal(false);
//                     resetForm();
//                   }}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <XCircleIcon className="w-6 h-6" />
//                 </button>
//               </div>

//               <form
//                 onSubmit={
//                   showAddModal ? handleAddPersonality : handleEditPersonality
//                 }
//               >
//                 {/* Avatar Selection */}
//                 <div className="mb-8">
//                   <label className="block text-sm font-semibold text-gray-700 mb-4">
//                     Choose Avatar
//                   </label>
//                   <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
//                     {AVATAR_OPTIONS.map((avatar, index) => (
//                       <button
//                         key={index}
//                         type="button"
//                         onClick={() => handleAvatarSelect(avatar)}
//                         className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
//                           formData.avatar === avatar
//                             ? "border-purple-500 ring-2 ring-purple-200"
//                             : "border-gray-200 hover:border-purple-300"
//                         }`}
//                       >
//                         <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
//                           {avatar ? (
//                             <img
//                               src={avatar}
//                               alt={`Avatar ${index + 1}`}
//                               className="w-full h-full object-cover"
//                             />
//                           ) : (
//                             <PhotoIcon className="w-8 h-8 text-gray-400" />
//                           )}
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Name Input */}
//                 <div className="mb-6">
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Personality Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder="e.g., Eren Yeager, Naruto Uzumaki"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                     required
//                   />
//                 </div>

//                 {/* Description Input */}
//                 <div className="mb-8">
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Description
//                   </label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     placeholder="Describe this personality's traits, speaking style, and characteristics..."
//                     rows={4}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
//                     required
//                   />
//                 </div>

//                 {/* Submit Button */}
//                 <div className="flex items-center gap-3">
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isSubmitting ? (
//                       <span className="flex items-center justify-center gap-2">
//                         <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                         {showAddModal ? "Creating..." : "Updating..."}
//                       </span>
//                     ) : (
//                       <span className="flex items-center justify-center gap-2">
//                         <SparklesIcon className="w-5 h-5" />
//                         {showAddModal
//                           ? "Create Personality"
//                           : "Update Personality"}
//                       </span>
//                     )}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setShowAddModal(false);
//                       setShowEditModal(false);
//                       resetForm();
//                     }}
//                     className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && selectedPersonality && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
//             <div className="p-6">
//               <div className="text-center mb-6">
//                 <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
//                   <TrashIcon className="w-8 h-8 text-red-600" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">
//                   Delete Personality
//                 </h3>
//                 <p className="text-gray-600">
//                   Are you sure you want to delete{" "}
//                   <span className="font-semibold">
//                     {selectedPersonality.name}
//                   </span>
//                   ? This action cannot be undone.
//                 </p>
//               </div>

//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={handleDeletePersonality}
//                   disabled={isSubmitting}
//                   className="flex-1 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isSubmitting ? "Deleting..." : "Delete"}
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowDeleteModal(false);
//                     setSelectedPersonality(null);
//                   }}
//                   className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
  SparklesIcon,
  UserGroupIcon,
  CheckCircleIcon,
  XCircleIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import {
  UserIcon,
  PhotoIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

// Default avatar options
const AVATAR_OPTIONS = [
  "/avatars/eren.png",
  "/avatars/mikasa.png",
  "/avatars/naruto.png",
  "/avatars/kohli.png",
  "/avatars/socrates.png",
  "/avatars/eren.png",
];

export default function PersonalitiesPage() {
  const router = useRouter();
  const [personalities, setPersonalities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPersonality, setSelectedPersonality] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    avatar: "/avatars/eren.png",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load personalities
  useEffect(() => {
    fetchPersonalities();
  }, []);

  const fetchPersonalities = async () => {
    try {
      const res = await fetch("/api/personality");
      if (res.ok) {
        const data = await res.json();
        setPersonalities(data);
      }
    } catch (error) {
      console.error("Failed to fetch personalities:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarSelect = (avatar: string) => {
    setFormData((prev) => ({
      ...prev,
      avatar,
    }));
  };

  const handleAddPersonality = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.description.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/personality", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const newPersonality = await res.json();
        setPersonalities((prev) => [...prev, newPersonality]);
        setShowAddModal(false);
        resetForm();
        router.refresh();
      } else {
        const error = await res.json();
        alert(error.error || "Failed to create personality");
      }
    } catch (error) {
      console.error("Failed to add personality:", error);
      alert("Failed to create personality");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditPersonality = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !selectedPersonality ||
      !formData.name.trim() ||
      !formData.description.trim()
    ) {
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/personality/${selectedPersonality._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const updatedPersonality = await res.json();
        setPersonalities((prev) =>
          prev.map((p) =>
            p._id === updatedPersonality._id ? updatedPersonality : p
          )
        );
        setShowEditModal(false);
        resetForm();
        router.refresh();
      } else {
        const error = await res.json();
        alert(error.error || "Failed to update personality");
      }
    } catch (error) {
      console.error("Failed to edit personality:", error);
      alert("Failed to update personality");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePersonality = async () => {
    if (!selectedPersonality) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/personality/${selectedPersonality._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPersonalities((prev) =>
          prev.filter((p) => p._id !== selectedPersonality._id)
        );
        setShowDeleteModal(false);
        setSelectedPersonality(null);
        router.refresh();
      } else {
        const error = await res.json();
        alert(error.error || "Failed to delete personality");
      }
    } catch (error) {
      console.error("Failed to delete personality:", error);
      alert("Failed to delete personality");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      avatar: "/avatars/eren.png",
    });
    setSelectedPersonality(null);
  };

  const openEditModal = (personality: any) => {
    setSelectedPersonality(personality);
    setFormData({
      name: personality.name,
      description: personality.description || "",
      avatar: personality.avatar || "/avatars/eren.png",
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (personality: any) => {
    setSelectedPersonality(personality);
    setShowDeleteModal(true);
  };

  const startChat = (personality: any) => {
    router.push(`/?personality=${personality._id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Loading header */}
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Header with Back to Home */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Left: Back to Home */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-white hover:shadow-sm rounded-xl transition-all duration-200"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                <span className="font-medium">Back to Home</span>
              </Link>

              {/* Separator */}
              <div className="hidden md:block h-6 w-px bg-gray-300"></div>

              {/* Home link */}
              <Link
                href="/"
                className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-white hover:shadow-sm rounded-xl transition-all duration-200"
              >
                <HomeIcon className="w-5 h-5" />
                <span className="font-medium">Home</span>
              </Link>
            </div>

            {/* Right: Add Personality Button */}
            <button
              onClick={() => {
                resetForm();
                setShowAddModal(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
            >
              <PlusIcon className="w-5 h-5" />
              Add New Personality
            </button>
          </div>
        </div>

        {/* Main Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <UserGroupIcon className="w-8 h-8 text-purple-600" />
            AI Personalities
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Create and manage your AI personalities for customized
            conversations. Each personality has unique characteristics and
            speaking styles.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Personalities</p>
                <p className="text-3xl font-bold text-gray-900">
                  {personalities.length}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                <UserGroupIcon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Default Personalities</p>
                <p className="text-3xl font-bold text-gray-900">
                  {personalities.filter((p) => p.isDefault).length}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center">
                <SparklesIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Custom Personalities</p>
                <p className="text-3xl font-bold text-gray-900">
                  {personalities.filter((p) => !p.isDefault).length}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center">
                <PlusIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-md transition-all"
            >
              <SparklesIcon className="w-5 h-5" />
              Start Chatting
            </Link>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-purple-400 hover:text-purple-700 hover:bg-purple-50 transition-all"
            >
              <PlusIcon className="w-5 h-5" />
              Quick Add
            </button>
          </div>
        </div>

        {/* Personalities Grid */}
        {personalities.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
              <UserGroupIcon className="w-12 h-12 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              No Personalities Yet
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              Create your first AI personality to start having customized
              conversations. You can start with our default personalities or
              create your own.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                <PlusIcon className="w-5 h-5" />
                Create Your First Personality
              </button>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
              >
                <HomeIcon className="w-5 h-5" />
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalities.map((personality) => (
              <div
                key={personality._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200 group"
              >
                {/* Avatar Section */}
                <div className="relative h-48 bg-gradient-to-r from-purple-50 to-pink-50 flex items-center justify-center">
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                    <div className="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200"></div>
                  </div>
                  <div className="relative z-10 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                    {personality.avatar ? (
                      <img
                        src={personality.avatar}
                        alt={personality.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          target.parentElement!.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center text-white font-semibold bg-gradient-to-r from-purple-500 to-pink-500">
                              ${personality.name.charAt(0).toUpperCase()}
                            </div>
                          `;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        <UserIcon className="w-12 h-12 text-white" />
                      </div>
                    )}
                  </div>
                  {personality.isDefault && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                      Default
                    </div>
                  )}
                </div>

                {/* Info Section */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                        {personality.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        {personality.isDefault ? (
                          <CheckCircleIcon className="w-4 h-4 text-green-500" />
                        ) : (
                          <PlusIcon className="w-4 h-4 text-purple-500" />
                        )}
                        <span className="text-sm text-gray-500">
                          {personality.isDefault ? "Pre-defined" : "Custom"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {personality.description || "No description provided"}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => startChat(personality)}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-md hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Chat Now
                    </button>
                    {!personality.isDefault && (
                      <>
                        <button
                          onClick={() => openEditModal(personality)}
                          className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 hover:text-gray-900 transition-all flex items-center gap-2"
                        >
                          <PencilSquareIcon className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => openDeleteModal(personality)}
                          className="px-4 py-2 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 hover:text-red-700 transition-all flex items-center gap-2"
                        >
                          <TrashIcon className="w-4 h-4" />
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Navigation */}
        {personalities.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-gray-600 text-sm">
                Showing {personalities.length} personality
                {personalities.length !== 1 ? "ies" : ""}
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-white hover:shadow-sm rounded-xl transition-all"
                >
                  <HomeIcon className="w-5 h-5" />
                  Go to Home
                </Link>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                  <PlusIcon className="w-5 h-5" />
                  Add Another
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {showAddModal ? "Create New Personality" : "Edit Personality"}
                </h2>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircleIcon className="w-6 h-6" />
                </button>
              </div>

              <form
                onSubmit={
                  showAddModal ? handleAddPersonality : handleEditPersonality
                }
              >
                {/* Avatar Selection */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Choose Avatar
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                    {AVATAR_OPTIONS.map((avatar, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleAvatarSelect(avatar)}
                        className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                          formData.avatar === avatar
                            ? "border-purple-500 ring-2 ring-purple-200"
                            : "border-gray-200 hover:border-purple-300"
                        }`}
                      >
                        <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                          {avatar ? (
                            <img
                              src={avatar}
                              alt={`Avatar ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <PhotoIcon className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name Input */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Personality Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Eren Yeager, Naruto Uzumaki"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* Description Input */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe this personality's traits, speaking style, and characteristics..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {showAddModal ? "Creating..." : "Updating..."}
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <SparklesIcon className="w-5 h-5" />
                        {showAddModal
                          ? "Create Personality"
                          : "Update Personality"}
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                      resetForm();
                    }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedPersonality && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <TrashIcon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Delete Personality
                </h3>
                <p className="text-gray-600">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold">
                    {selectedPersonality.name}
                  </span>
                  ? This action cannot be undone.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleDeletePersonality}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Deleting..." : "Delete"}
                </button>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedPersonality(null);
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
