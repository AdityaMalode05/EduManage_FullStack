export class Task {
  id?: number;
  title?: string;
  description?: string;
  dueDate?: string;
  batch: {
    id: number;
    name?: string;
  } = { id: 0 };
}
