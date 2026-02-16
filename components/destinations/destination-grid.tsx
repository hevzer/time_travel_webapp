"use client";

import { DestinationCard } from "@/components/destinations/destination-card";
import { destinations } from "@/data/destinations";
import { motion } from "framer-motion";

export function DestinationGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {destinations.map((destination, index) => (
        <motion.div
          key={destination.id}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
        >
          <DestinationCard destination={destination} />
        </motion.div>
      ))}
    </div>
  );
}
