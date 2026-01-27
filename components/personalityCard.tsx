import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
// Import Magic UI components. You'll need to install the library first.
import { MagicCard } from "./ui/magic-card";
import { BlurFade } from "./ui/blur-fade";
import { InteractiveHoverButton } from "./ui/interactive-hover-button";

// Define the Personality type
type Personality = {
  id: string;
  name: string;
  description?: string;
  avatar?: string;
  isDefault: boolean;
};

// Define the component props interface
interface PersonalityCardProps {
  personality: Personality;
  index: number;
  onChat: (personality: Personality) => void;
  onEdit: (personality: Personality) => void;
  onDelete: (personality: Personality) => void;
  isHovered: number | null;
  setHovered: (index: number | null) => void;
}

const PersonalityCard = ({
  personality,
  index,
  onChat,
  onEdit,
  onDelete,
  isHovered,
  setHovered,
}: PersonalityCardProps) => {
  return (
    // Wrap the entire card in the MagicCard component for the border/spotlight effect[citation:2]
    <MagicCard
      gradientColor="#262626"
      gradientSize={200}
      gradientOpacity={0.8}
      gradientFrom="#9E7AFF"
      gradientTo="#FE8BBB"
      className="relative flex flex-col h-full rounded-2xl overflow-hidden border border-gray-200"
    >
      {/* Use BlurFade for the card's entrance animation[citation:3] */}
      <BlurFade
        delay={index * 0.1}
        duration={0.6}
        direction="up"
        inView
        className="h-full"
      >
        <motion.article
          layout
          className="group relative bg-white/95 backdrop-blur-xs flex flex-col h-full rounded-2xl"
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          style={{
            filter:
              isHovered !== null && isHovered !== index ? "blur(2px)" : "none",
            transition: "filter 0.3s ease",
          }}
        >
          {/* 1. Dominant Image Container */}
          <div className="relative h-60 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Avatar/Image */}
            {personality.avatar ? (
              <motion.img
                src={personality.avatar}
                alt={`Avatar of ${personality.name}`}
                className="absolute inset-0 w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="relative w-40 h-40 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl">
                  <UserIcon className="w-20 h-20 text-white/90" />
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-cyan-300/30"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
              </div>
            )}
            {/* Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
            {/* "Default" Badge */}
            {personality.isDefault && (
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-semibold shadow-lg">
                  Default
                </span>
              </div>
            )}
            {/* Quick Action Overlay */}
            <motion.div
              className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            >
              {/* Replaced with Magic UI's InteractiveHoverButton[citation:5][citation:8] */}
              <InteractiveHoverButton
                onClick={() => onChat(personality)}
                className="px-6 py-3 bg-white text-gray-900 font-bold rounded-full flex items-center gap-2 shadow-2xl"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z"
                    clipRule="evenodd"
                  />
                </svg>
                Start Chat
              </InteractiveHoverButton>
            </motion.div>
          </div>

          {/* 2. Content Section */}
          <div className="p-5 flex-1 flex flex-col">
            <div className="mb-3">
              <h3 className="text-xl font-bold text-gray-900 truncate">
                {personality.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                {personality.isDefault ? (
                  <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                )}
                <span className="text-sm text-gray-500">
                  {personality.isDefault ? "Pre-defined" : "Custom"}
                </span>
              </div>
            </div>
            <p className="text-gray-600 text-sm flex-1 line-clamp-3 mb-4">
              {personality.description || "No description provided."}
            </p>

            {/* 3. Action Buttons */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              {/* Primary Action Button */}
              <InteractiveHoverButton
                onClick={() => onChat(personality)}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg text-sm flex items-center gap-2 shadow-md"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z"
                    clipRule="evenodd"
                  />
                </svg>
                Chat Now
              </InteractiveHoverButton>

              {/* Secondary Actions */}
              {!personality.isDefault && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(personality)}
                    className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label={`Edit ${personality.name}`}
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(personality)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label={`Delete ${personality.name}`}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.article>
      </BlurFade>
    </MagicCard>
  );
};

export default PersonalityCard;
