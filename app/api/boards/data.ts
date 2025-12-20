/**
 * Board type definition for task boards
 */
export interface Board {
  id: string;
  name: string;
  status?: string;
  color?: string;
  icon?: string;
  description?: string;
}

