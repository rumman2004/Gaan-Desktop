import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { ChevronDown } from "@/components/ui/animated-icons";

export interface AccordionItemData {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultOpen = [],
  className,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpen);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn("divide-y divide-[var(--border-subtle)]", className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="py-4">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between text-left font-medium text-[var(--text-primary)] hover:text-[var(--text-primary)] transition-colors py-1 cursor-pointer group"
            >
              <div className="flex items-center gap-3 pr-4">
                {item.icon && (
                  <span className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                    {item.icon}
                  </span>
                )}
                <span className="text-base sm:text-lg font-semibold tracking-tight">
                  {item.title}
                </span>
              </div>
              <ChevronDown
                className={cn(
                  "size-5 shrink-0 text-[var(--text-muted)] transition-transform duration-200",
                  isOpen && "rotate-180 text-[var(--text-primary)]"
                )}
              />
            </button>
            {isOpen && (
              <div className="pt-3 pb-1 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed animate-in fade-in duration-200">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
