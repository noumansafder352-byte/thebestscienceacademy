import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function ReadMore({
  text,
  collapsedLines = 8,
  className = "",
}: {
  text: string;
  collapsedLines?: number;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Measure only when collapsed
    const check = () => {
      const wasExpanded = expanded;
      if (wasExpanded) {
        setOverflowing(true);
        return;
      }
      setOverflowing(el.scrollHeight - el.clientHeight > 4);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text, expanded, collapsedLines]);

  const paragraphs = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

  return (
    <div className={className}>
      <div
        ref={ref}
        style={
          expanded
            ? undefined
            : {
                display: "-webkit-box",
                WebkitLineClamp: collapsedLines,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }
        }
        className="prose-content text-[15px] leading-[1.85] text-muted-foreground [overflow-wrap:anywhere] [word-break:break-word] hyphens-auto space-y-4"
      >
        {paragraphs.length > 1
          ? paragraphs.map((p, i) => (
              <p key={i} className="[overflow-wrap:anywhere]">
                {p}
              </p>
            ))
          : <p className="[overflow-wrap:anywhere] whitespace-pre-line">{text}</p>}
      </div>
      {(overflowing || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          {expanded ? (
            <>Read less <ChevronUp className="h-4 w-4" /></>
          ) : (
            <>Read more <ChevronDown className="h-4 w-4" /></>
          )}
        </button>
      )}
    </div>
  );
}
