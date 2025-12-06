import { Cpu, FlaskConical } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 glow-effect">
              <FlaskConical className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                PMD <span className="gradient-text">Dilution</span> Dashboard
              </h1>
              <p className="text-xs text-muted-foreground">
                Balanced Partition Framework for Concentration Synthesis
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50">
            <Cpu className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-mono text-muted-foreground">PMD Chip Algorithm</span>
          </div>
        </div>
      </div>
    </header>
  );
}
