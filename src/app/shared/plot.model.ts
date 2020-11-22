export interface IPlot {
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  data: IData[];
  label: string;
  lineTension: number;
  showLine: boolean;
  tension: number;
  borderDash: number[];
}

export interface IData {
  x: number;
  y: number;
}
