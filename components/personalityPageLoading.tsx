// components/PersonalityPageLoading.tsx
"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
};

const pulseVariants = {
  initial: { opacity: 0.3, scale: 1 },
  animate: {
    opacity: [0.3, 0.5, 0.3],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const shimmerVariants = {
  initial: { x: "-100%" },
  animate: {
    x: "100%",
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function PersonalityPageLoading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-background-from to-background-to p-4 md:p-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Loading with Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mb-8"
        >
          {/* Navigation Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3"
            >
              {/* Back Button */}
              <div className="relative overflow-hidden w-32 h-10 bg-muted rounded-xl">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent dark:via-white/5"
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                />
              </div>

              {/* Separator */}
              <div className="hidden md:block h-6 w-px bg-gradient-to-b from-border to-transparent"></div>

              {/* Home Link */}
              <div className="hidden md:block relative overflow-hidden w-24 h-10 bg-muted rounded-xl">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent dark:via-white/5"
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                />
              </div>
            </motion.div>

            {/* Add Button */}
            <motion.div variants={itemVariants}>
              <div className="relative overflow-hidden w-48 h-12 bg-gradient-to-r from-muted to-accent rounded-xl">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/10"
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                />
              </div>
            </motion.div>
          </div>

          {/* Title Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800/30 dark:to-pink-800/30"
                variants={floatingVariants}
                animate="animate"
              />
              <div className="relative overflow-hidden w-64 h-8 bg-muted rounded-lg">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/20"
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                />
              </div>
            </div>
            <div className="relative overflow-hidden w-96 h-4 bg-muted rounded">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/20"
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Animated Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="card  border-none hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between p-6">
                <div className="space-y-3">
                  <div className="relative overflow-hidden w-24 h-4 bg-muted rounded">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/20 "
                      variants={shimmerVariants}
                      initial="initial"
                      animate="animate"
                    />
                  </div>
                  <motion.div
                    className="w-16 h-8 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded"
                    variants={pulseVariants}
                    initial="initial"
                    animate="animate"
                  />
                </div>
                <motion.div
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30"
                  variants={floatingVariants}
                  animate="animate"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Quick Actions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mb-8 flex flex-wrap gap-3"
        >
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="relative overflow-hidden w-40 h-10 bg-muted rounded-xl"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/20"
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Personality Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="card border-none overflow-hidden"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Avatar Section */}
              <div className="relative h-48 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-card dark:to-accent flex items-center justify-center overflow-hidden">
                {/* Animated gradient background - Light mode */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      "linear-gradient(90deg, hsl(var(--chart-4) / 0.1) 0%, hsl(var(--chart-5) / 0.1) 100%)",
                      "linear-gradient(90deg, hsl(var(--chart-4) / 0.2) 0%, hsl(var(--chart-5) / 0.2) 100%)",
                      "linear-gradient(90deg, hsl(var(--chart-4) / 0.1) 0%, hsl(var(--chart-5) / 0.1) 100%)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Animated gradient background - Dark mode */}
                <motion.div
                  className="absolute inset-0 hidden dark:block"
                  animate={{
                    background: [
                      "linear-gradient(90deg, hsl(var(--chart-4) / 0.15) 0%, hsl(var(--chart-5) / 0.15) 100%)",
                      "linear-gradient(90deg, hsl(var(--chart-4) / 0.25) 0%, hsl(var(--chart-5) / 0.25) 100%)",
                      "linear-gradient(90deg, hsl(var(--chart-4) / 0.15) 0%, hsl(var(--chart-5) / 0.15) 100%)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Animated avatar */}
                <motion.div
                  className="relative z-10 w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-card shadow-lg"
                  variants={floatingVariants}
                  animate="animate"
                >
                  <div className="w-full h-full bg-gradient-to-r from-purple-200 to-pink-200 dark:from-chart-4/30 dark:to-chart-5/30 flex items-center justify-center">
                    <motion.div
                      className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-300 to-pink-300 dark:from-chart-4/50 dark:to-chart-5/50"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </motion.div>

                {/* Animated badge */}
                <motion.div
                  className="absolute top-4 right-4 w-16 h-6 bg-gradient-to-r from-blue-200 to-cyan-200 dark:from-chart-1/40 dark:to-chart-2/40 rounded-full"
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                />
              </div>
              {/* Info Section */}
              <div className="p-6">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="relative overflow-hidden w-32 h-6 bg-muted rounded">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/20"
                        variants={shimmerVariants}
                        initial="initial"
                        animate="animate"
                      />
                    </div>
                    <div className="w-12 h-4 bg-muted rounded-full"></div>
                  </div>

                  <div className="space-y-2">
                    <div className="relative overflow-hidden w-full h-3 bg-muted rounded">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/15"
                        variants={shimmerVariants}
                        initial="initial"
                        animate="animate"
                      />
                    </div>
                    <div className="relative overflow-hidden w-2/3 h-3 bg-muted rounded">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/15"
                        variants={shimmerVariants}
                        initial="initial"
                        animate="animate"
                      />
                    </div>
                    <div className="relative overflow-hidden w-1/2 h-3 bg-muted rounded">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/15"
                        variants={shimmerVariants}
                        initial="initial"
                        animate="animate"
                      />
                    </div>
                  </div>
                </div>

                {/* Actions Loading */}
                <div className="flex items-center gap-2 pt-4 border-t border-border">
                  <motion.div
                    className="flex-1 h-10 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg"
                    variants={pulseVariants}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.div
                    className="w-16 h-10 bg-muted rounded-lg"
                    variants={pulseVariants}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.div
                    className="w-16 h-10 bg-red-50 dark:bg-red-900/20 rounded-lg"
                    variants={pulseVariants}
                    initial="initial"
                    animate="animate"
                  />
                </div>
              </div>

              {/* Floating particles */}
              {[...Array(3)].map((_, particleIndex) => (
                <motion.div
                  key={particleIndex}
                  className="absolute w-1 h-1 bg-purple-300/30 dark:bg-purple-500/20 rounded-full"
                  style={{
                    left: `${20 + particleIndex * 20}%`,
                    top: "20%",
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2 + particleIndex,
                    repeat: Infinity,
                    delay: particleIndex * 0.3,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Navigation Loading */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mt-12 pt-8 border-t border-border"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative overflow-hidden w-40 h-4 bg-muted rounded">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/20"
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
              />
            </div>
            <div className="flex items-center gap-3">
              {[1, 2].map((i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="relative overflow-hidden w-32 h-10 bg-muted rounded-xl"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/20"
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
