import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQS } from "@/data/site";

export default function Faq() {
  const [open, setOpen] = useState(null);
  return (
    <div data-testid="faq-section" className="divide-y divide-precision/10 border-y border-precision/10">
      {FAQS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              data-testid={`faq-question-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-300 hover:text-aqua-deep"
            >
              <span className="font-display text-lg font-light tracking-tight text-precision md:text-xl">
                {item.q}
              </span>
              <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }} className="shrink-0">
                <Plus className={`h-5 w-5 transition-colors duration-300 ${isOpen ? "text-aqua-deep" : "text-precision"}`} strokeWidth={1.5} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p data-testid={`faq-answer-${i}`} className="max-w-2xl pb-8 text-sm leading-relaxed text-precision/70">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
