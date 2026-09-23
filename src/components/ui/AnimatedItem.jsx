import { motion } from "framer-motion";
import { itemVariants } from "../../lib/motionVariants";

export function AnimatedItem({ children }) {
  return (
    <motion.div variants={itemVariants}>
      {children}
    </motion.div>
  );
}