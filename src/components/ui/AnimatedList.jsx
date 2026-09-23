import { motion } from "framer-motion";
import { listVariants } from "../../lib/motionVariants";

export function AnimatedList({ className = "", children }) {
  return (
    <motion.div
      className={className}
      variants={listVariants}
    >
      {children}
    </motion.div>
  );
}