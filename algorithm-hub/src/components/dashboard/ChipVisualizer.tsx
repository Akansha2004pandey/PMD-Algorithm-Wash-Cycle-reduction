import { DilutionData } from "@/types/dilution";
import { cn } from "@/lib/utils";

interface ChipVisualizerProps {
  data: DilutionData | null;
}

export function ChipVisualizer({ data }: ChipVisualizerProps) {
  if (!data) {
    return (
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-semibold mb-4">Chip Layout</h3>
        <div className="aspect-square max-w-[200px] mx-auto flex items-center justify-center">
          <p className="text-muted-foreground text-sm text-center">
            Select a fraction to visualize
          </p>
        </div>
      </div>
    );
  }

  const totalCells = data.width * data.height;
  const sampleRatio = data.sample / (data.sample + data.buffer);
  const sampleCells = Math.round(totalCells * sampleRatio);
  
  const cells = [];
  for (let i = 0; i < totalCells; i++) {
    const isSample = i < sampleCells;
    cells.push(
      <div
        key={i}
        className={cn(
          "aspect-square rounded-sm transition-all duration-300",
          isSample 
            ? "bg-primary/60 border border-primary/80" 
            : "bg-chart-2/40 border border-chart-2/60"
        )}
        style={{
          animationDelay: `${i * 30}ms`,
        }}
      />
    );
  }

  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="font-semibold mb-4">Chip Layout</h3>
      <div className="mb-3 text-xs text-muted-foreground text-center">
        <span className="text-primary font-medium">{data.sample}</span> sample : <span className="text-chart-2 font-medium">{data.buffer}</span> buffer
      </div>
      <div 
        className="grid gap-1 mx-auto"
        style={{
          gridTemplateColumns: `repeat(${data.width}, 1fr)`,
          maxWidth: `${data.width * 40}px`,
        }}
      >
        {cells}
      </div>
      <div className="mt-4 flex justify-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-primary/60 border border-primary/80" />
          <span className="text-muted-foreground">Sample ({sampleCells})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-chart-2/40 border border-chart-2/60" />
          <span className="text-muted-foreground">Buffer ({totalCells - sampleCells})</span>
        </div>
      </div>
    </div>
  );
}
