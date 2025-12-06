export interface DilutionData {
  fraction: string;
  sample: number;
  buffer: number;
  mixing: number;
  wash: number;
  width: number;
  height: number;
  chip_area: number;
}

export interface DatasetInfo {
  id: string;
  name: string;
  file: string;
  resolution: number;
}

export const DATASETS: DatasetInfo[] = [
  { id: '15', name: '16 Fractions', file: '/data/3_15.csv', resolution: 16 },
  { id: '31', name: '32 Fractions', file: '/data/3_31.csv', resolution: 32 },
  { id: '63', name: '64 Fractions', file: '/data/3_63.csv', resolution: 64 },
  { id: '127', name: '128 Fractions', file: '/data/3_127.csv', resolution: 128 },
  { id: '255', name: '256 Fractions', file: '/data/3_255.csv', resolution: 256 },
  { id: '511', name: '512 Fractions', file: '/data/3_511.csv', resolution: 512 },
  { id: '1023', name: '1024 Fractions', file: '/data/3_1023.csv', resolution: 1024 },
];
