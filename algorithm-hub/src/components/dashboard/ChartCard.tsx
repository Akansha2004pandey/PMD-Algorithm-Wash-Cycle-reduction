import { DilutionData } from "@/types/dilution";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

interface ChartCardProps {
  data: DilutionData[];
  chartType: "area" | "bar";
  title: string;
}

export function ChartCard({ data, chartType, title }: ChartCardProps) {
  // Transform data for charts - sample every nth element for readability
  const step = Math.max(1, Math.floor(data.length / 50));
  const chartData = data.filter((_, i) => i % step === 0).map((d, index) => ({
    index,
    fraction: d.fraction,
    sample: d.sample,
    buffer: d.buffer,
    mixing: d.mixing,
    wash: d.wash,
    area: d.chip_area,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 rounded-lg border border-border/50">
          <p className="font-mono text-primary text-sm mb-2">
            {payload[0]?.payload?.fraction}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="font-semibold text-foreground mb-4">{title}</h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "area" ? (
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorSample" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(175, 80%, 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(175, 80%, 50%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorBuffer" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(280, 70%, 60%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(280, 70%, 60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
              <XAxis 
                dataKey="index" 
                stroke="hsl(215, 16%, 47%)" 
                fontSize={10}
                tickLine={false}
              />
              <YAxis 
                stroke="hsl(215, 16%, 47%)" 
                fontSize={10}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="sample"
                name="Sample"
                stroke="hsl(175, 80%, 50%)"
                fill="url(#colorSample)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="buffer"
                name="Buffer"
                stroke="hsl(280, 70%, 60%)"
                fill="url(#colorBuffer)"
                strokeWidth={2}
              />
            </AreaChart>
          ) : (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
              <XAxis 
                dataKey="index" 
                stroke="hsl(215, 16%, 47%)" 
                fontSize={10}
                tickLine={false}
              />
              <YAxis 
                stroke="hsl(215, 16%, 47%)" 
                fontSize={10}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: '12px', color: 'hsl(215, 16%, 47%)' }}
              />
              <Bar 
                dataKey="mixing" 
                name="Mixing Steps"
                fill="hsl(175, 80%, 50%)" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="wash" 
                name="Wash Cycles"
                fill="hsl(45, 90%, 55%)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
