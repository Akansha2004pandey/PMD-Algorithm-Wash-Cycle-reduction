import { DATASETS, DatasetInfo } from "@/types/dilution";
import { cn } from "@/lib/utils";

interface DatasetSelectorProps {
  selected: string;
  onSelect: (id: string) => void;
}

export function DatasetSelector({ selected, onSelect }: DatasetSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {DATASETS.map((dataset) => (
        <button
          key={dataset.id}
          onClick={() => onSelect(dataset.id)}
          className={cn(
            "px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200",
            "border border-border/50 hover:border-primary/50",
            selected === dataset.id
              ? "bg-primary text-primary-foreground border-primary glow-effect"
              : "bg-secondary/50 text-secondary-foreground hover:bg-secondary"
          )}
        >
          {dataset.name}
        </button>
      ))}
    </div>
  );
}
