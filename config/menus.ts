// dynamicMenuConfig.ts
import {
  Components,
  MenuBar,
  Files,
  ClipBoard,
  Building,
  Building2,
  Note,
} from "@/components/svg";

export interface MenuItemProps {
  title: string;
  icon: any;
  href?: string;
  child?: MenuItemProps[];
  megaMenu?: MenuItemProps[];
  multi_menu?: MenuItemProps[];
  nested?: MenuItemProps[];
  onClick: () => void;
  isHeader?: boolean;
}

// 1) Your backend permission node structure:
export interface PermissionNode {
  id: number;
  name: string;
  type: "module" | "submodule" | "page" | "action";
  children?: PermissionNode[];
}

// 2) Example dummy permission tree:
export const permissionsTree: PermissionNode[] = [
  {
    id: 1,
    name: "Esmart",
    type: "module",
    children: [
      {
        id: 2,
        name: "Esmart Advances",
        type: "submodule",
        children: [
          {
            id: 3,
            name: "Create Activity Page",
            type: "page",
            children: [
              { id: 4, name: "Submit Activity", type: "action" },
              { id: 5, name: "Validate Budget", type: "action" },
            ],
          },
          { id: 6, name: "View Activity Page", type: "page" },
          {
            id: 7,
            name: "Reports",
            type: "page",
            children: [
              { id: 8, name: "Report Page 1", type: "page" },
              { id: 9, name: "Report Page 2", type: "page" },
            ],
          },
        ],
      },
      {
        id: 10,
        name: "Esmart Adjustments",
        type: "submodule",
      },
    ],
  },
  {
    id: 11,
    name: "Multi Level",
    type: "module",
    children: [
      { id: 12, name: "Level 1.1", type: "page" },
      {
        id: 13,
        name: "Level 2",
        type: "submodule",
        children: [
          { id: 14, name: "Level 2.1", type: "page" },
          { id: 15, name: "Level 2.2", type: "page" },
          {
            id: 16,
            name: "Level 3",
            type: "submodule",
            children: [
              { id: 17, name: "Level 3.1", type: "page" },
              { id: 18, name: "Level 3.2", type: "page" },
            ],
          },
        ],
      },
    ],
  },

  
];

// 3) Icon mapping per type:
const iconMapper: Record<PermissionNode["type"], any> = {
  module: MenuBar,
  submodule: Components,
  page: Files,
  action: ClipBoard,
};

// nuildmenu item

function buildMenuItems(
  nodes: PermissionNode[],
  pathPrefix: string = ""
): MenuItemProps[] {
  return nodes.map((node) => {
    const href =
      node.type === "page" || node.type === "action"
        ? `${pathPrefix}/${node.name.toLowerCase().replace(/\s+/g, "-")}`
        : "";

    const item: MenuItemProps = {
      title: node.name,
      icon: iconMapper[node.type],
      href,
      onClick: () => {},
    };

    if (node.children && node.children.length > 0) {
      const children = buildMenuItems(node.children, href || pathPrefix);

      if (node.type === "module" || node.type === "submodule") {
        item.child = children;
      } else if (node.type === "page") {
        item.nested = children;
      }
    }

    return item;
  });
}


// 4) Transform function:
function transformPermissionsToMenu(
  permissions: PermissionNode[],
  pathPrefix: string = ""
): MenuItemProps[] {
  return permissions.map((node) => {
    const href =
      node.type === "page" || node.type === "action"
        ? `${pathPrefix}/${node.name.toLowerCase().replace(/\s+/g, "-")}`
        : "";

    const menuItem: MenuItemProps = {
      title: node.name,
      icon: iconMapper[node.type] || Note,
      href,
      onClick: () => {},
    };

    if (node.children && node.children.length > 0) {
      // Build nested structure recursively:
      const childItems = transformPermissionsToMenu(
        node.children,
        href || pathPrefix
      );

      // Use `child` or `nested` depending on type (for variety, but both work similarly):
      if (node.type === "module" || node.type === "submodule") {
        menuItem.child = childItems;
      } else if (node.type === "page") {
        menuItem.nested = childItems;
      }
    }

    return menuItem;
  });
}

// 5) Generate the dynamic sidebar menu:
export const menusConfig = {
   mainNav: buildMenuItems(permissionsTree),

  sidebarNav: {
    modern: buildMenuItems(permissionsTree),
    classic: buildMenuItems(permissionsTree),
  },

   classicNav: {
    modern: buildMenuItems(permissionsTree),
  },
};



export type ModernNavType = (typeof menusConfig.sidebarNav.modern)[number];
export type ClassicNavType = (typeof menusConfig.sidebarNav.classic)[number];
export type MainNavType = (typeof menusConfig.mainNav)[number];
