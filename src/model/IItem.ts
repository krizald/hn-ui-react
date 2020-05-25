export interface IItem {
  id: number;
  deleted: boolean;
  type: string;
  by: string;
  time: number;
  kids: Array<number>;
  score: number;
  title: string;
  url: string;
}
