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
//   HomeIcon,
// } from "@heroicons/react/24/solid";
// import {
//   UserIcon,
//   PhotoIcon,
//   ArrowLeftIcon,
// } from "@heroicons/react/24/outline";
// import Link from "next/link";

// // Default avatar options
// const AVATAR_OPTIONS = [
//   "/avatars/eren.png",
//   "/avatars/mikasa.png",
//   "/avatars/naruto.png",
//   "/avatars/kohli.png",
//   "/avatars/socrates.png",
//   "/avatars/eren.png",
// ];

// export default function PersonalitiesPage() {
//   const router = useRouter();
//   const [personalities, setPersonalities] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedPersonality, setSelectedPersonality] = useState<any>(null);
//   const [image, setImage] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     avatar: "/avatars/eren.png",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Load personalities
//   useEffect(() => {
//     fetchPersonalities();
//   }, []);
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//   };

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
//     if (image) {
//       formData.append("image", avatar);
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
//     if (image) {
//       formData.append("image", image);
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
//     router.push(`/?personality=${personality._id}`);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
//         <div className="max-w-7xl mx-auto">
//           {/* Loading header */}
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
//         {/* Navigation Header with Back to Home */}
//         <div className="mb-8">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             {/* Left: Back to Home */}
//             <div className="flex items-center gap-3">
//               <Link
//                 href="/"
//                 className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-white hover:shadow-sm rounded-xl transition-all duration-200"
//               >
//                 <ArrowLeftIcon className="w-5 h-5" />
//                 <span className="font-medium">Back to Home</span>
//               </Link>

//               {/* Separator */}
//               <div className="hidden md:block h-6 w-px bg-gray-300"></div>

//               {/* Home link */}
//               <Link
//                 href="/"
//                 className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-white hover:shadow-sm rounded-xl transition-all duration-200"
//               >
//                 <HomeIcon className="w-5 h-5" />
//                 <span className="font-medium">Home</span>
//               </Link>
//             </div>

//             {/* Right: Add Personality Button */}
//             <button
//               onClick={() => {
//                 resetForm();
//                 setShowAddModal(true);
//               }}
//               className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
//             >
//               <PlusIcon className="w-5 h-5" />
//               Add New Personality
//             </button>
//           </div>
//         </div>

//         {/* Main Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
//             <UserGroupIcon className="w-8 h-8 text-purple-600" />
//             AI Personalities
//           </h1>
//           <p className="text-gray-600 mt-2 max-w-2xl">
//             Create and manage your AI personalities for customized
//             conversations. Each personality has unique characteristics and
//             speaking styles.
//           </p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//           <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Personalities</p>
//                 <p className="text-3xl font-bold text-gray-900">
//                   {personalities.length}
//                 </p>
//               </div>
//               <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
//                 <UserGroupIcon className="w-6 h-6 text-purple-600" />
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Default Personalities</p>
//                 <p className="text-3xl font-bold text-gray-900">
//                   {personalities.filter((p) => p.isDefault).length}
//                 </p>
//               </div>
//               <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center">
//                 <SparklesIcon className="w-6 h-6 text-blue-600" />
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Custom Personalities</p>
//                 <p className="text-3xl font-bold text-gray-900">
//                   {personalities.filter((p) => !p.isDefault).length}
//                 </p>
//               </div>
//               <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center">
//                 <PlusIcon className="w-6 h-6 text-green-600" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="mb-8">
//           <div className="flex flex-wrap gap-3">
//             <Link
//               href="/"
//               className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-md transition-all"
//             >
//               <SparklesIcon className="w-5 h-5" />
//               Start Chatting
//             </Link>
//             <button
//               onClick={() => setShowAddModal(true)}
//               className="inline-flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-purple-400 hover:text-purple-700 hover:bg-purple-50 transition-all"
//             >
//               <PlusIcon className="w-5 h-5" />
//               Quick Add
//             </button>
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
//               conversations. You can start with our default personalities or
//               create your own.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-3 justify-center">
//               <button
//                 onClick={() => setShowAddModal(true)}
//                 className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
//               >
//                 <PlusIcon className="w-5 h-5" />
//                 Create Your First Personality
//               </button>
//               <Link
//                 href="/"
//                 className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
//               >
//                 <HomeIcon className="w-5 h-5" />
//                 Back to Home
//               </Link>
//             </div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {personalities.map((personality) => (
//               <div
//                 key={personality._id}
//                 className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200 group"
//               >
//                 {/* Avatar Section */}
//                 <div className="relative h-48 bg-gradient-to-r from-purple-50 to-pink-50 flex items-center justify-center">
//                   <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
//                     <div className="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200"></div>
//                   </div>
//                   <div className="relative z-10 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300">
//                     {personality.avatar ? (
//                       <img
//                         src={personality.avatar}
//                         alt={personality.name}
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                           const target = e.target as HTMLImageElement;
//                           target.style.display = "none";
//                           target.parentElement!.innerHTML = `
//                             <div class="w-full h-full flex items-center justify-center text-white font-semibold bg-gradient-to-r from-purple-500 to-pink-500">
//                               ${personality.name.charAt(0).toUpperCase()}
//                             </div>
//                           `;
//                         }}
//                       />
//                     ) : (
//                       <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
//                         <UserIcon className="w-12 h-12 text-white" />
//                       </div>
//                     )}
//                   </div>
//                   {personality.isDefault && (
//                     <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
//                       Default
//                     </div>
//                   )}
//                 </div>

//                 {/* Info Section */}
//                 <div className="p-6">
//                   <div className="flex items-start justify-between mb-3">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
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
//                       className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-md hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 24 24"
//                         fill="currentColor"
//                         className="w-4 h-4"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                       Chat Now
//                     </button>
//                     {!personality.isDefault && (
//                       <>
//                         <button
//                           onClick={() => openEditModal(personality)}
//                           className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 hover:text-gray-900 transition-all flex items-center gap-2"
//                         >
//                           <PencilSquareIcon className="w-4 h-4" />
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => openDeleteModal(personality)}
//                           className="px-4 py-2 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 hover:text-red-700 transition-all flex items-center gap-2"
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

//         {/* Footer Navigation */}
//         {personalities.length > 0 && (
//           <div className="mt-12 pt-8 border-t border-gray-200">
//             <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//               <div className="text-gray-600 text-sm">
//                 Showing {personalities.length} personality
//                 {personalities.length !== 1 ? "ies" : ""}
//               </div>
//               <div className="flex items-center gap-3">
//                 <Link
//                   href="/"
//                   className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-white hover:shadow-sm rounded-xl transition-all"
//                 >
//                   <HomeIcon className="w-5 h-5" />
//                   Go to Home
//                 </Link>
//                 <button
//                   onClick={() => setShowAddModal(true)}
//                   className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
//                 >
//                   <PlusIcon className="w-5 h-5" />
//                   Add Another
//                 </button>
//               </div>
//             </div>
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
//                   {/* <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
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
//                   </div> */}
//                   <div className="relative h-48 bg-gradient-to-r from-purple-50 to-pink-50 flex items-center justify-center rounded-2xl border border-dashed border-gray-300 hover:border-purple-400 transition group cursor-pointer">
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleImageChange}
//                       className="absolute inset-0 opacity-0 cursor-pointer"
//                     />

//                     <div className="relative z-10 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300">
//                       {preview ? (
//                         <img
//                           src={preview}
//                           alt="Selected avatar"
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
//                           <UserIcon className="w-12 h-12 text-white" />
//                         </div>
//                       )}
//                     </div>

//                     {!preview && (
//                       <p className="absolute bottom-4 text-sm text-gray-500 font-medium">
//                         Click to upload avatar
//                       </p>
//                     )}
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
import { motion, AnimatePresence } from "framer-motion";
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
import PersonalityPageLoading from "@/components/personalityPageLoading";
import PersonalityCard from "@/components/personalityCard";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Variants } from "framer-motion";
// Default avatar options
const AVATAR_OPTIONS = [
  "/avatars/krishna.png",
  "/avatars/radha.png",
  "/avatars/girl1.png",
  "/avatars/boy1.png",
  "/avatars/girl2.png",
  "/avatars/boy2.png",
];

// Animation variants
// const containerVariants = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: 0.2
//     }
//   }
// };

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
  hover: {
    y: -5,
    scale: 1.02,
    boxShadow: "0 20px 40px -15px rgba(168, 85, 247, 0.15)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      type: "spring",
      stiffness: 400,
    },
  },
};

const avatarContainerVariants: Variants = {
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
};

const badgeVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      delay: 0.3,
    },
  },
  hover: {
    scale: 1.1,
    rotate: [0, -5, 5, 0],
    transition: {
      rotate: {
        duration: 0.5,
        repeat: 1,
      },
    },
  },
};

const titleVariants: Variants = {
  hover: {
    color: "#9333ea",
    transition: {
      duration: 0.2,
    },
  },
};

const buttonVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      type: "spring",
      stiffness: 400,
    },
  },
};

const chatButtonVariants: Variants = {
  initial: {
    background: "linear-gradient(90deg, #2563eb, #0891b2)",
  },
  hover: {
    background: "linear-gradient(90deg, #2563eb, #0891b2)",
    scale: 1.05,
    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)",
    transition: {
      background: { duration: 0.3 },
      scale: { type: "spring", stiffness: 400 },
    },
  },
  tap: {
    scale: 0.95,
    boxShadow: "0 5px 15px -3px rgba(59, 130, 246, 0.2)",
  },
};

const actionButtonVariants: Variants = {
  hover: {
    x: 2,
    transition: {
      type: "spring",
      stiffness: 300,
    },
  },
};

const descriptionVariants = {
  hover: {
    opacity: 0.9,
    transition: {
      duration: 0.2,
    },
  },
};

// Floating particles animation
const FloatingParticles = () => (
  <div className="absolute inset-0 pointer-events-none">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: i * 0.3,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

// ... inside your component ...

// Animation variants
const avatarItemVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  tap: { scale: 0.95 },
  selected: {
    scale: 1.05,
    boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.4)",
  },
};

const uploadAreaVariants: Variants = {
  initial: { scale: 1, borderColor: "#d1d5db" },
  hover: {
    scale: 1.01,
    borderColor: "#c084fc",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  tap: { scale: 0.99 },
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

const iconVariants: Variants = {
  initial: { rotate: 0 },
  hover: {
    rotate: 15,
    transition: {
      type: "spring",
      stiffness: 200,
    },
  },
};

const selectionRingVariants: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
    },
  },
};

const previewImageVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 300,
    },
  },
};

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
    },
  },
};
export default function PersonalitiesPage() {
  const router = useRouter();
  const [personalities, setPersonalities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPersonality, setSelectedPersonality] = useState<any>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    setImageFile(file);
    setPreview(URL.createObjectURL(file));

    // Clear the preset avatar when uploading custom image
    setFormData((prev) => ({
      ...prev,
      avatar: "",
    }));
  };

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
    // Clear uploaded image when selecting preset avatar
    setImageFile(null);
    setPreview(null);
  };

  const handleAddPersonality = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.description.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);

      // Use uploaded image if available, otherwise use preset avatar
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      } else if (formData.avatar) {
        formDataToSend.append("avatar", formData.avatar);
      }

      const res = await fetch("/api/personality", {
        method: "POST",
        body: formDataToSend,
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
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);

      // Use uploaded image if available, otherwise use preset avatar
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      } else if (formData.avatar) {
        formDataToSend.append("avatar", formData.avatar);
      }

      const res = await fetch(`/api/personality/${selectedPersonality._id}`, {
        method: "PUT",
        body: formDataToSend,
      });

      if (res.ok) {
        const updatedPersonality = await res.json();
        setPersonalities((prev) =>
          prev.map((p) =>
            p._id === updatedPersonality._id ? updatedPersonality : p,
          ),
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
          prev.filter((p) => p._id !== selectedPersonality._id),
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
    setImageFile(null);
    setPreview(null);
  };

  const openEditModal = (personality: any) => {
    setSelectedPersonality(personality);
    setFormData({
      name: personality.name,
      description: personality.description || "",
      avatar: personality.avatar || "/avatars/eren.png",
    });
    // Clear image preview when opening edit modal
    setImageFile(null);
    setPreview(null);
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
    return <PersonalityPageLoading />;
  }

  return (
    <>
      <div className="min-h-dvh bg-gradient-to-br bg-background-from bg-background-to p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Navigation Header with Back to Home */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Left: Back to Home */}
              <div className="hidden lg:flex items-center gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-4 py-2 text-muted-foreground hover:bg-card hover:shadow-sm rounded-xl transition-all duration-200"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                  <span className="font-medium">Back to Home</span>
                </Link>
              </div>

              {/* Right: Add Personality Button */}
              <div className="flex items-center justify-between mt-4 lg:justify-start lg:gap-3">
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
                <AnimatedThemeToggler />
              </div>
            </div>
          </div>

          {/* Main Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-card-foreground flex items-center gap-3">
              <UserGroupIcon className="w-6 h-6 text-purple-600" />
              AI Personalities
            </h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Create and manage your AI personalities for customized
              conversations. Each personality has unique characteristics and
              speaking styles.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Personalities
                  </p>
                  <p className="text-3xl font-bold text-card-foreground">
                    {personalities.length}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <UserGroupIcon className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Default Personalities
                  </p>
                  <p className="text-3xl font-bold text-card-foreground">
                    {personalities.filter((p) => p.isDefault).length}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                  <SparklesIcon className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Custom Personalities
                  </p>
                  <p className="text-3xl font-bold text-card-foreground">
                    {personalities.filter((p) => !p.isDefault).length}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                  <PlusIcon className="w-6 h-6 text-green-500" />
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
                className="inline-flex items-center gap-2 px-4 py-2 border-2 border-dashed border-border text-muted-foreground font-semibold rounded-xl hover:border-primary hover:text-primary hover:bg-accent transition-all"
              >
                <PlusIcon className="w-5 h-5" />
                Quick Add
              </button>
            </div>
          </div>

          {/* Personalities Grid */}
          {personalities.length === 0 ? (
            <div className="bg-card rounded-2xl shadow-sm p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
                <UserGroupIcon className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-3">
                No Personalities Yet
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                Create your first AI personality to start having customized
                conversations. You can start with our default personalities or
                create your own.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                  <PlusIcon className="w-5 h-5" />
                  Create Your First Personality
                </button>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border text-muted-foreground font-semibold rounded-xl hover:bg-accent transition-all"
                >
                  <HomeIcon className="w-5 h-5" />
                  Back to Home
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {personalities.map((personality, index) => (
                  <motion.div
                    key={personality._id}
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      transition: { duration: 0.2 },
                    }}
                    whileHover="hover"
                    whileTap="tap"
                    custom={index}
                    layout
                    className="bg-card rounded-2xl shadow-sm overflow-hidden border border-border group"
                  >
                    {/* Avatar Section */}
                    <motion.div
                      className="relative h-48 bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center overflow-hidden"
                      variants={avatarContainerVariants}
                      whileHover="hover"
                    >
                      {/* Animated gradient background */}
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          background: [
                            "linear-gradient(90deg, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--secondary-rgb), 0.1) 100%)",
                            "linear-gradient(90deg, rgba(var(--primary-rgb), 0.15) 0%, rgba(var(--secondary-rgb), 0.15) 100%)",
                            "linear-gradient(90deg, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--secondary-rgb), 0.1) 100%)",
                          ],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Floating particles */}
                      <FloatingParticles />

                      {/* Animated border ring */}
                      <motion.div
                        className="absolute inset-0 border-2 border-transparent rounded-t-2xl"
                        whileHover={{
                          borderColor: "rgba(var(--primary-rgb), 0.2)",
                          transition: { duration: 0.3 },
                        }}
                      />

                      <motion.div
                        className="relative z-10 w-42 h-42 rounded-full overflow-hidden border-4 border-card shadow-lg"
                        variants={avatarImageVariants}
                        whileHover="hover"
                      >
                        {personality.avatar ? (
                          <motion.img
                            src={personality.avatar}
                            alt={personality.name}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.4 }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                              target.parentElement!.innerHTML = `
                          <motion.div
                            class="w-full h-full flex items-center justify-center text-white font-semibold bg-gradient-to-r from-primary to-secondary"
                            animate={{
                              background: [
                                "linear-gradient(90deg, var(--primary), var(--secondary))",
                                "linear-gradient(90deg, var(--secondary), var(--primary))",
                                "linear-gradient(90deg, var(--primary), var(--secondary))",
                              ]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            ${personality.name.charAt(0).toUpperCase()}
                          </motion.div>
                        `;
                            }}
                          />
                        ) : (
                          <motion.div
                            className="w-full h-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center"
                            animate={{
                              background: [
                                "linear-gradient(90deg, var(--primary), var(--secondary))",
                                "linear-gradient(90deg, var(--secondary), var(--primary))",
                                "linear-gradient(90deg, var(--primary), var(--secondary))",
                              ],
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            <motion.div
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            >
                              <UserIcon className="w-12 h-12 text-white" />
                            </motion.div>
                          </motion.div>
                        )}
                      </motion.div>

                      {/* Default badge */}
                      {personality.isDefault && (
                        <motion.div
                          className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg"
                          variants={badgeVariants}
                          initial="hidden"
                          animate="show"
                          whileHover="hover"
                        >
                          <motion.span
                            animate={{ opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            Default
                          </motion.span>
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Info Section */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <motion.h3
                            className="text-xl font-bold text-card-foreground"
                            variants={titleVariants}
                            whileHover="hover"
                          >
                            {personality.name}
                          </motion.h3>
                          <motion.div
                            className="flex items-center gap-2 mt-1"
                            whileHover={{ x: 2 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {personality.isDefault ? (
                              <motion.div
                                variants={iconVariants}
                                whileHover="hover"
                              >
                                <CheckCircleIcon className="w-4 h-4 text-green-500" />
                              </motion.div>
                            ) : (
                              <motion.div
                                animate={{ rotate: [0, 180, 0] }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  repeatDelay: 3,
                                }}
                              >
                                <PlusIcon className="w-4 h-4 text-primary" />
                              </motion.div>
                            )}
                            <motion.span
                              className="text-sm text-muted-foreground"
                              whileHover={{ color: "var(--muted-foreground)" }}
                            >
                              {personality.isDefault ? "Pre-defined" : "Custom"}
                            </motion.span>
                          </motion.div>
                        </div>
                      </div>

                      <motion.p
                        className="text-muted-foreground mb-6 line-clamp-3"
                        variants={descriptionVariants}
                        whileHover="hover"
                      >
                        {personality.description || "No description provided"}
                      </motion.p>

                      {/* Actions */}
                      <motion.div
                        className="flex items-center gap-2 pt-4 border-t border-gray-100"
                        initial={{ opacity: 1 }} // Changed from 0 to 1
                        animate={{ opacity: 1 }} // Keep this at 1
                      >
                        <motion.button
                          onClick={() => startChat(personality)}
                          variants={chatButtonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          className="flex-1 px-4 py-2 text-white  font-semibold rounded-lg flex items-center justify-center gap-2"
                        >
                          <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              repeatDelay: 1,
                            }}
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z"
                              clipRule="evenodd"
                            />
                          </motion.svg>
                          <span>Chat Now</span>
                        </motion.button>

                        {!personality.isDefault && (
                          <>
                            <motion.button
                              onClick={() => openEditModal(personality)}
                              variants={actionButtonVariants}
                              whileHover="hover"
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 hover:text-gray-900 flex items-center gap-2"
                            >
                              <motion.div
                                whileHover={{ rotate: 90 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <PencilSquareIcon className="w-4 h-4" />
                              </motion.div>
                              Edit
                            </motion.button>

                            <motion.button
                              onClick={() => openDeleteModal(personality)}
                              variants={actionButtonVariants}
                              whileHover="hover"
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 hover:text-red-700 flex items-center gap-2"
                            >
                              <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  repeatDelay: 5,
                                }}
                              >
                                <TrashIcon className="w-4 h-4" />
                              </motion.div>
                              Delete
                            </motion.button>
                          </>
                        )}
                      </motion.div>
                    </div>

                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none rounded-2xl"
                      initial={{ opacity: 0 }}
                      whileHover={{
                        opacity: 0.1,
                        background:
                          "radial-gradient(circle at 50% 0%, rgba(var(--primary-rgb), 0.3), transparent 70%)",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Add/Edit Modal */}
        {(showAddModal || showEditModal) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-card rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-card-foreground">
                    {showAddModal
                      ? "Create New Personality"
                      : "Edit Personality"}
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                      resetForm();
                    }}
                    className="text-muted-foreground hover:text-card-foreground"
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
                    <label className="block text-sm font-semibold text-card-foreground mb-4">
                      Choose Avatar
                    </label>

                    {/* Preset Avatar Options with Framer Motion */}
                    <motion.div
                      className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6"
                      variants={containerVariants}
                      initial="hidden"
                      animate="show"
                    >
                      {AVATAR_OPTIONS.map((avatar, index) => (
                        <motion.button
                          key={index}
                          type="button"
                          onClick={() => handleAvatarSelect(avatar)}
                          variants={itemVariants}
                          whileHover="hover"
                          whileTap="tap"
                          animate={
                            formData.avatar === avatar && !preview
                              ? "selected"
                              : "initial"
                          }
                          className="aspect-square rounded-xl overflow-hidden border-2 border-border focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2"
                        >
                          <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center relative overflow-hidden">
                            {avatar ? (
                              <>
                                <motion.div
                                  variants={avatarImageVariants}
                                  className="w-full h-full"
                                >
                                  <img
                                    src={avatar}
                                    alt={`Avatar ${index + 1}`}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                  />
                                </motion.div>

                                {/* Animated overlay on hover */}
                                <motion.div
                                  className="absolute inset-0 bg-black/0"
                                  whileHover={{
                                    backgroundColor: "rgba(0,0,0,0.1)",
                                  }}
                                  transition={{ duration: 0.2 }}
                                />
                              </>
                            ) : (
                              <motion.div variants={iconVariants}>
                                <PhotoIcon className="w-8 h-8 text-muted-foreground" />
                              </motion.div>
                            )}

                            {/* Selection indicator ring */}
                            {formData.avatar === avatar && !preview && (
                              <motion.div
                                className="absolute inset-0 ring-2 ring-primary ring-inset pointer-events-none"
                                variants={selectionRingVariants}
                                initial="initial"
                                animate="animate"
                              />
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </motion.div>

                    {/* Divider with animation */}
                    <motion.div
                      className="relative mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <motion.span
                          className="px-4 bg-card text-sm text-muted-foreground"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          OR
                        </motion.span>
                      </div>
                    </motion.div>

                    {/* Custom Image Upload with Framer Motion */}
                    <motion.div
                      variants={fadeInUp}
                      initial="initial"
                      animate="animate"
                    >
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-card-foreground mb-2">
                          Upload Custom Avatar
                        </label>

                        {/* Make the entire upload area clickable */}
                        <label className="block cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="sr-only"
                          />

                          <motion.div
                            variants={uploadAreaVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            className="relative h-48 bg-gradient-to-r  from-primary/10 to-secondary/10 flex items-center justify-center rounded-2xl border-2 border-dashed border-border cursor-pointer overflow-hidden"
                          >
                            {/* Animated gradient background */}
                            <motion.div
                              className="absolute inset-0"
                              animate={{
                                background: [
                                  "linear-gradient(90deg, rgba(var(--primary-rgb), 0.05) 0%, rgba(var(--secondary-rgb), 0.05) 100%)",
                                  "linear-gradient(90deg, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--secondary-rgb), 0.1) 100%)",
                                  "linear-gradient(90deg, rgba(var(--primary-rgb), 0.05) 0%, rgba(var(--secondary-rgb), 0.05) 100%)",
                                ],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />

                            {/* Floating particles effect */}
                            <motion.div
                              className="absolute inset-0"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              {[...Array(8)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="absolute w-2 h-2 bg-primary/30 rounded-full"
                                  style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                  }}
                                  animate={{
                                    y: [0, -10, 0],
                                    opacity: [0.3, 0.6, 0.3],
                                  }}
                                  transition={{
                                    duration: 2 + Math.random(),
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                  }}
                                />
                              ))}
                            </motion.div>

                            {/* Main preview area */}
                            <motion.div
                              className="relative z-10 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full overflow-hidden border-4 border-card shadow-lg"
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              {preview ? (
                                <motion.img
                                  src={preview}
                                  alt="Selected avatar"
                                  className="w-full h-full object-cover"
                                  variants={previewImageVariants}
                                  whileHover="hover"
                                />
                              ) : (
                                <motion.div
                                  className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
                                  whileHover={{ scale: 1.1 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 300,
                                  }}
                                >
                                  <motion.div
                                    animate={{
                                      rotate: [0, 5, -5, 0],
                                    }}
                                    transition={{
                                      duration: 3,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                    }}
                                  >
                                    <UserIcon className="w-12 h-12 text-white" />
                                  </motion.div>
                                </motion.div>
                              )}
                            </motion.div>

                            {/* Upload text with animation */}
                            {!preview && (
                              <motion.div
                                className="absolute bottom-6 flex flex-col items-center gap-2 z-10"
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                              >
                                <motion.p
                                  className="text-sm text-muted-foreground font-medium"
                                  whileHover={{ color: "var(--primary)" }}
                                >
                                  Click to upload avatar
                                </motion.p>
                                <motion.p
                                  className="text-xs text-muted-foreground/60"
                                  animate={{ opacity: [0.6, 1, 0.6] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  or drag and drop
                                </motion.p>
                              </motion.div>
                            )}

                            {/* Upload icon overlay */}
                            <motion.div
                              className="absolute top-4 right-4 w-10 h-10 bg-card rounded-full flex items-center justify-center shadow-lg"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileHover={{
                                opacity: 1,
                                scale: 1,
                                rotate: 360,
                              }}
                              transition={{
                                opacity: { duration: 0.2 },
                                scale: { type: "spring", stiffness: 300 },
                                rotate: { duration: 0.5, ease: "easeOut" },
                              }}
                            >
                              <PhotoIcon className="w-5 h-5 text-primary" />
                            </motion.div>

                            {/* Pulse animation ring for upload area */}
                            {!preview && (
                              <motion.div
                                className="absolute inset-0 rounded-2xl ring-2 ring-transparent"
                                animate={{
                                  boxShadow: [
                                    "0 0 0 0 rgba(var(--primary-rgb), 0)",
                                    "0 0 0 10px rgba(var(--primary-rgb), 0.1)",
                                    "0 0 0 20px rgba(var(--primary-rgb), 0)",
                                  ],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeOut",
                                }}
                              />
                            )}
                          </motion.div>
                        </label>

                        {/* File info text */}
                        <motion.p
                          className="text-xs text-muted-foreground mt-2 text-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          Supported formats: JPG, PNG, GIF, WEBP • Max size: 5MB
                        </motion.p>
                      </div>
                    </motion.div>

                    {/* Clear Image Button with animation */}
                    <AnimatePresence>
                      {preview && (
                        <motion.div
                          className="flex justify-center"
                          variants={fadeInUp}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                        >
                          <motion.button
                            type="button"
                            onClick={() => {
                              setImageFile(null);
                              setPreview(null);
                              setFormData((prev) => ({
                                ...prev,
                                avatar: "/avatars/eren.png",
                              }));
                            }}
                            whileHover={{
                              scale: 1.05,
                              backgroundColor:
                                "rgba(var(--destructive-rgb), 0.1)",
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 text-sm text-destructive rounded-lg transition-colors duration-200 flex items-center gap-2 bg-destructive/10"
                          >
                            <motion.svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              whileHover={{ rotate: 90 }}
                              transition={{ type: "spring", stiffness: 200 }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </motion.svg>
                            <span>Remove uploaded image</span>
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {/* Name Input */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-card-foreground mb-2">
                      Personality Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Eren Yeager, Naruto Uzumaki"
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-background text-card-foreground"
                      required
                    />
                  </div>

                  {/* Description Input */}
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-card-foreground mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe this personality's traits, speaking style, and characteristics..."
                      rows={4}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none bg-background text-card-foreground"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-primary-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                      className="px-6 py-3 border border-border text-muted-foreground font-semibold rounded-xl hover:bg-accent transition-colors"
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
            <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md">
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-destructive/10 rounded-full flex items-center justify-center">
                    <TrashIcon className="w-8 h-8 text-destructive" />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-2">
                    Delete Personality
                  </h3>
                  <p className="text-muted-foreground">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-card-foreground">
                      {selectedPersonality.name}
                    </span>
                    ? This action cannot be undone.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDeletePersonality}
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-destructive text-destructive-foreground font-semibold rounded-xl hover:bg-destructive/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Deleting..." : "Delete"}
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setSelectedPersonality(null);
                    }}
                    className="flex-1 px-6 py-3 border border-border text-muted-foreground font-semibold rounded-xl hover:bg-accent transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
