import { DilutionData } from "@/types/dilution";

export async function parseCSV(url: string): Promise<DilutionData[]> {
  const response = await fetch(url);
  const text = await response.text();
  const lines = text.trim().split('\n');
  
  // Skip header
  const dataLines = lines.slice(1);
  
  return dataLines.map(line => {
    const [fraction, sample, buffer, mixing, wash, width, height, chip_area] = line.split(',');
    return {
      fraction: fraction.trim(),
      sample: parseInt(sample, 10),
      buffer: parseInt(buffer, 10),
      mixing: parseInt(mixing, 10),
      wash: parseInt(wash, 10),
      width: parseInt(width, 10),
      height: parseInt(height, 10),
      chip_area: parseInt(chip_area, 10),
    };
  });
}

export function getDatasetStats(data: DilutionData[]) {
  const samples = data.map(d => d.sample);
  const buffers = data.map(d => d.buffer);
  const mixings = data.map(d => d.mixing);
  const washes = data.map(d => d.wash);
  const areas = data.map(d => d.chip_area);

  return {
    totalFractions: data.length,
    avgSample: (samples.reduce((a, b) => a + b, 0) / samples.length).toFixed(2),
    avgBuffer: (buffers.reduce((a, b) => a + b, 0) / buffers.length).toFixed(2),
    avgMixing: (mixings.reduce((a, b) => a + b, 0) / mixings.length).toFixed(2),
    avgWash: (washes.reduce((a, b) => a + b, 0) / washes.length).toFixed(2),
    avgArea: (areas.reduce((a, b) => a + b, 0) / areas.length).toFixed(2),
    maxSample: Math.max(...samples),
    maxBuffer: Math.max(...buffers),
    maxMixing: Math.max(...mixings),
    maxWash: Math.max(...washes),
    maxArea: Math.max(...areas),
    totalWash: washes.reduce((a, b) => a + b, 0),
    totalMixing: mixings.reduce((a, b) => a + b, 0),
  };
}
