import { motion } from "framer-motion";
import { containerVariants } from "../../lib/motionVariants";

export function AnimatedPage({ className = "", children }) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}