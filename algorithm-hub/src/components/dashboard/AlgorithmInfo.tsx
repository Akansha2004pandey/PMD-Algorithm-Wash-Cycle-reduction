import { Beaker, Droplets, Layers, Zap } from "lucide-react";

export function AlgorithmInfo() {
  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="font-semibold text-lg mb-4 gradient-text">
        Balanced Partition Algorithm
      </h3>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        Optimizes concentration synthesis on PMD chips by minimizing wash cycles 
        and mixing steps through intelligent fraction decomposition.
      </p>
      
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-chart-1/10 text-chart-1">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-medium">Fraction Decomposition</h4>
            <p className="text-xs text-muted-foreground mt-1">
              N → ⌈N/2⌉ + ⌊N/2⌋ splitting rule
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-chart-2/10 text-chart-2">
            <Beaker className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-medium">Balanced Binary Tree</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Minimal depth reduces mixing steps
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-chart-3/10 text-chart-3">
            <Droplets className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-medium">Immediate Consumption</h4>
            <p className="text-xs text-muted-foreground mt-1">
              No idle droplets, fewer wash cycles
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-chart-4/10 text-chart-4">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-medium">Optimized Placement</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Transport-free chip mapping
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
