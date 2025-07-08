export class Batch {
  id?: number;
  name?: string;
  students?: {
    id: number;
    name: string;
    email: string;
  }[];
}
