import { cn } from "../../lib/utils";
import { Check, X } from "@/components/ui/animated-icons";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/Table";
import { Card } from "../ui/Card";
import { type ComparisonMetric } from "../../data/comparisons";

export interface ComparisonTableProps {
  metrics: ComparisonMetric[];
  className?: string;
}

function CellValue({ value, isGaan = false }: { value: string | boolean; isGaan?: boolean }) {
  if (typeof value === "boolean") return <span className="inline-flex items-center gap-1.5 text-xs"><span className="sr-only">{value ? "Yes" : "No"}</span>{value ? <Check className="size-4 text-[var(--text-primary)]" /> : <X className="size-4 text-[var(--text-muted)]" />}</span>;
  return <span className={cn("text-xs sm:text-sm leading-normal", isGaan ? "font-semibold text-[var(--text-primary)]" : "text-[var(--text-secondary)]")}>{value}</span>;
}

export function ComparisonTable({ metrics, className }: ComparisonTableProps) {
  return <>
    <div className={cn("hidden md:block w-full overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-[var(--shadow-card)]", className)}>
      <Table>
        <TableHeader><TableRow className="bg-[var(--bg-secondary)]/70"><TableHead className="w-1/4">Aspect</TableHead><TableHead className="w-[38%] bg-[var(--bg-primary)]/40 border-x border-[var(--border-subtle)]">Gaan</TableHead><TableHead>Typical streaming apps</TableHead></TableRow></TableHeader>
        <TableBody>{metrics.map((row) => <TableRow key={row.feature} className={row.highlight ? "bg-[var(--bg-secondary)]/20" : ""}><TableCell className="font-semibold text-sm text-[var(--text-primary)] py-4">{row.feature}</TableCell><TableCell className="bg-[var(--bg-card)] border-x border-[var(--border-subtle)] py-4"><CellValue value={row.gaan} isGaan /></TableCell><TableCell className="py-4"><CellValue value={row.commercialStreaming} /></TableCell></TableRow>)}</TableBody>
      </Table>
    </div>
    <div className="md:hidden grid grid-cols-1 gap-3">
      {metrics.map((row) => <Card key={row.feature} variant="outlined" className="p-4"><h3 className="text-sm font-semibold mb-3">{row.feature}</h3><div className="grid grid-cols-2 gap-3"><div><p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-1">Gaan</p><CellValue value={row.gaan} isGaan /></div><div><p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-1">Typical streaming apps</p><CellValue value={row.commercialStreaming} /></div></div></Card>)}
    </div>
  </>;
}
