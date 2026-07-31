import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export default function CountUp({ value, prefix = "", suffix = "" }) {
  const count = useMotionValue(0);
  const formatted = useTransform(count, (latest) => {
    return prefix + Math.round(latest).toLocaleString() + suffix;
  });

  useEffect(() => {
    const animation = animate(count, value, { duration: 1.5, ease: "easeOut" });
    return animation.stop;
  }, [value, count]);

  return <motion.span>{formatted}</motion.span>;
}
