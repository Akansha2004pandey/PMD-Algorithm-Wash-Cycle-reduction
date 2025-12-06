import { DilutionData } from "@/types/dilution";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DataTableProps {
  data: DilutionData[];
  maxRows?: number;
}

export function DataTable({ data, maxRows = 20 }: DataTableProps) {
  const displayData = maxRows ? data.slice(0, maxRows) : data;
  
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border/50">
        <h3 className="font-semibold text-foreground">Dilution Data</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Showing {displayData.length} of {data.length} fractions
        </p>
      </div>
      <ScrollArea className="h-[400px]">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium">Fraction</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">Sample</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">Buffer</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">Mixing</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">Wash</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">Area</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayData.map((row, index) => (
              <TableRow 
                key={row.fraction} 
                className="border-border/30 hover:bg-primary/5 transition-colors"
                style={{ animationDelay: `${index * 20}ms` }}
              >
                <TableCell className="font-mono text-primary font-medium">
                  {row.fraction}
                </TableCell>
                <TableCell className="text-right data-cell">{row.sample}</TableCell>
                <TableCell className="text-right data-cell">{row.buffer}</TableCell>
                <TableCell className="text-right data-cell">{row.mixing}</TableCell>
                <TableCell className="text-right data-cell">{row.wash}</TableCell>
                <TableCell className="text-right data-cell">
                  {row.width}×{row.height}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
