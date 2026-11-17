"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ease, Reveal } from "@/components/motion/reveal";

type Faq = { readonly q: string; readonly a: string };

/**
 * One answer open at a time. A closed answer stays in the page at zero height, so crawlers and
 * AI readers still get every answer, while keyboard and screen-reader users only meet the open one.
 */
export function FaqList({ items }: { items: readonly Faq[] }) {
  const id = useId();
  const still = useReducedMotion() ?? false;
  const [open, setOpen] = useState(0);
  const dur = still ? 0 : 0.5;

  return (
    <Reveal className="card flex flex-col px-6 py-2 sm:px-8">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className={i ? "border-t border-border" : ""}>
            <h3>
              <button
                type="button"
                id={`${id}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex w-full items-center justify-between gap-6 py-[22px] text-left text-[19px] font-bold leading-[1.3]"
              >
                <span className="group-hover:underline">{f.q}</span>
                {/* A plus that becomes a minus: the vertical bar folds away as the answer opens. */}
                <span aria-hidden="true" className="relative size-5 shrink-0 text-accent">
                  <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rounded-full bg-current" />
                  <motion.span
                    className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 rounded-full bg-current"
                    initial={false}
                    animate={{ scaleY: isOpen ? 0 : 1, rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: dur, ease }}
                  />
                </span>
              </button>
            </h3>
            <motion.div
              id={`${id}-a${i}`}
              role="region"
              aria-labelledby={`${id}-q${i}`}
              inert={!isOpen}
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: dur, ease, opacity: { duration: still ? 0 : isOpen ? 0.4 : 0.2 } }}
              className="overflow-hidden"
            >
              <p className="pb-[22px] pr-10 text-muted-foreground">{f.a}</p>
            </motion.div>
          </div>
        );
      })}
    </Reveal>
  );
}
