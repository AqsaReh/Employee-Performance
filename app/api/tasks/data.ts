/**
 * Task and SubTask type definitions
 */

export interface Task {
  id: string;
  title: string;
  desc?: string;
  priority?: string;
  status?: string;
  assign?: any[];
  image?: string;
  category?: string;
  pages?: string;
  messageCount?: number;
  link?: string;
  date?: string;
  time?: string;
  boardId: string;
  tags?: string[];
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
  assignDate?: string;
  taskId: string;
  priority?: string;
  assign?: Array<{
    name?: string;
    image?: string;
    [key: string]: any;
  }>;
}

