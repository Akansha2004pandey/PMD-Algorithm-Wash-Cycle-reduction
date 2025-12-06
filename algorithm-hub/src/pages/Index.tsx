import { useState, useEffect } from "react";
import { Activity, Beaker, Droplets, Grid3X3, Sparkles, TestTube } from "lucide-react";
import { Header } from "@/components/dashboard/Header";
import { StatCard } from "@/components/dashboard/StatCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { DatasetSelector } from "@/components/dashboard/DatasetSelector";
import { AlgorithmInfo } from "@/components/dashboard/AlgorithmInfo";
import { FractionSearch } from "@/components/dashboard/FractionSearch";
import { FractionDetail } from "@/components/dashboard/FractionDetail";
import { ChipVisualizer } from "@/components/dashboard/ChipVisualizer";
import { parseCSV, getDatasetStats } from "@/lib/csvParser";
import { DilutionData, DATASETS } from "@/types/dilution";

const Index = () => {
  const [selectedDataset, setSelectedDataset] = useState("127");
  const [data, setData] = useState<DilutionData[]>([]);
  const [stats, setStats] = useState<ReturnType<typeof getDatasetStats> | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFraction, setSelectedFraction] = useState<DilutionData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const dataset = DATASETS.find(d => d.id === selectedDataset);
      if (dataset) {
        const parsed = await parseCSV(dataset.file);
        setData(parsed);
        setStats(getDatasetStats(parsed));
        setSelectedFraction(parsed[0] || null);
      }
      setLoading(false);
    };
    loadData();
  }, [selectedDataset]);

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-[0.02] pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-primary/5 to-transparent pointer-events-none" />
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Dataset Selector */}
        <section className="mb-8">
          <h2 className="text-sm font-medium text-muted-foreground mb-3">Select Resolution</h2>
          <DatasetSelector selected={selectedDataset} onSelect={setSelectedDataset} />
        </section>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-muted-foreground">Loading data...</span>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              <StatCard
                title="Total Fractions"
                value={stats?.totalFractions || 0}
                icon={<Sparkles className="w-4 h-4" />}
              />
              <StatCard
                title="Avg Sample"
                value={stats?.avgSample || "0"}
                icon={<TestTube className="w-4 h-4" />}
              />
              <StatCard
                title="Avg Buffer"
                value={stats?.avgBuffer || "0"}
                icon={<Beaker className="w-4 h-4" />}
              />
              <StatCard
                title="Avg Mixing"
                value={stats?.avgMixing || "0"}
                icon={<Activity className="w-4 h-4" />}
              />
              <StatCard
                title="Avg Wash"
                value={stats?.avgWash || "0"}
                icon={<Droplets className="w-4 h-4" />}
              />
              <StatCard
                title="Max Area"
                value={stats?.maxArea || 0}
                subtitle="cells"
                icon={<Grid3X3 className="w-4 h-4" />}
              />
            </section>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {/* Charts */}
              <div className="lg:col-span-2 space-y-6">
                <ChartCard 
                  data={data} 
                  chartType="area" 
                  title="Sample vs Buffer Distribution"
                />
                <ChartCard 
                  data={data} 
                  chartType="bar" 
                  title="Mixing Steps & Wash Cycles"
                />
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <AlgorithmInfo />
                
                <div className="glass-card rounded-xl p-5 space-y-4">
                  <h3 className="font-semibold">Fraction Lookup</h3>
                  <FractionSearch 
                    data={data} 
                    onResult={setSelectedFraction}
                  />
                  <FractionDetail data={selectedFraction} />
                </div>

                <ChipVisualizer data={selectedFraction} />
              </div>
            </div>

            {/* Data Table */}
            <section>
              <DataTable data={data} maxRows={30} />
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-12 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground">
            Balanced Partition Framework for PMD Chips • 
            <span className="text-primary ml-1">NSUT Research Project</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
