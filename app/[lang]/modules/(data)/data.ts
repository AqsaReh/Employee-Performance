import { faker } from "@faker-js/faker";

// DATA STURUCTURE 
export interface Module {
  id: number;
  name: string;
  desc: string;
  status: number;
}
export const modules: Module[] = [
  {
    id: 1,
    name: "User Management",
    desc: "Handles all user-related operations such as creating, updating, and deleting users.",
    status: 1, // 1 for active, 0 for inactive
  },
  {
    id: 2,
    name: "Inventory",
    desc: "Manages product inventory, stock levels, and warehouse locations.",
    status: 1,
  },
  {
    id: 3,
    name: "Order Processing",
    desc: "Facilitates order placements, processing, and tracking.",
    status: 0,
  },
  {
    id: 4,
    name: "Reports",
    desc: "Generates and manages reports related to sales, inventory, and users.",
    status: 1,
  },
  {
    id: 5,
    name: "Payments",
    desc: "Handles payment gateways, transactions, and refunds.",
    status: 1,
  },
  {
    id: 6,
    name: "Notifications",
    desc: "Manages system notifications for users and admins.",
    status: 0,
  }
];

