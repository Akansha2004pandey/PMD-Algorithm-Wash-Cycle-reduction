import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DilutionData } from "@/types/dilution";

interface FractionSearchProps {
  data: DilutionData[];
  onResult: (result: DilutionData | null) => void;
}

export function FractionSearch({ data, onResult }: FractionSearchProps) {
  const [search, setSearch] = useState("");

  const handleSearch = (value: string) => {
    setSearch(value);
    const found = data.find(d => d.fraction.includes(value));
    onResult(found || null);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search fraction (e.g., 165/256)"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-10 bg-secondary/50 border-border/50 focus:border-primary font-mono"
      />
    </div>
  );
}
