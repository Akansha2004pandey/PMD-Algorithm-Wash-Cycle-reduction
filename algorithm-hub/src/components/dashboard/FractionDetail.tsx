import { DilutionData } from "@/types/dilution";

interface FractionDetailProps {
  data: DilutionData | null;
}

export function FractionDetail({ data }: FractionDetailProps) {
  if (!data) {
    return (
      <div className="glass-card rounded-xl p-6 text-center">
        <p className="text-muted-foreground text-sm">
          Search for a fraction to see details
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-6 animate-fade-in">
      <div className="text-center mb-6">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          Concentration
        </p>
        <p className="text-3xl font-bold font-mono gradient-text">
          {data.fraction}
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <DetailItem label="Sample" value={data.sample} color="chart-1" />
        <DetailItem label="Buffer" value={data.buffer} color="chart-2" />
        <DetailItem label="Mixing Steps" value={data.mixing} color="chart-3" />
        <DetailItem label="Wash Cycles" value={data.wash} color="chart-4" />
      </div>
      
      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Chip Dimensions</span>
          <span className="font-mono text-primary">
            {data.width} × {data.height} = {data.chip_area} cells
          </span>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value, color }: { label: string; value: number; color: string }) {
  const colorClasses: Record<string, string> = {
    "chart-1": "text-chart-1",
    "chart-2": "text-chart-2",
    "chart-3": "text-chart-3",
    "chart-4": "text-chart-4",
  };
  
  return (
    <div className="text-center p-3 rounded-lg bg-secondary/30">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className={`text-2xl font-bold font-mono ${colorClasses[color] || "text-primary"}`}>{value}</p>
    </div>
  );
}
