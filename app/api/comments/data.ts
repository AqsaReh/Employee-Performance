/**
 * Comment type definition
 */
export interface Comment {
  id: string;
  name: string;
  avatar?: string;
  text: string;
  date: string;
  taskId?: string;
  subTaskId?: string;
}

