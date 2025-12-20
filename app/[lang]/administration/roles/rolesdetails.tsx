"use client";
import { useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import PermissionTree from "./permissiontree";


export type PermissionType = "module" | "submodule" | "page" | "action";

export interface PermissionNode {
  id: number;
  name: string;
  type: PermissionType;
  checked?: boolean;
  children?: PermissionNode[];
}


const RolesDetails = () => {
  const [treeData, setTreeData] = useState<PermissionNode[]>([
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
        {
          id: 12,
          name: "Level 1.1",
          type: "page",
        },
        {
          id: 13,
          name: "Level 2",
          type: "submodule",
          children: [
            {
              id: 14,
              name: "Level 2.1",
              type: "page",
            },
            {
              id: 15,
              name: "Level 2.2",
              type: "page",
            },
            {
              id: 16,
              name: "Level 3",
              type: "submodule",
              children: [
                {
                  id: 17,
                  name: "Level 3.1",
                  type: "page",
                },
                {
                  id: 18,
                  name: "Level 3.2",
                  type: "page",
                },
              ],
            },
          ],
        }
      ],
    }
  ]);

  const getSelectedPermissions = (nodes: PermissionNode[]): number[] => {
    let selected: number[] = [];
    for (const node of nodes) {
      if (node.checked) selected.push(node.id);
      if (node.children) selected = selected.concat(getSelectedPermissions(node.children));
    }
    return selected;
  };

  const handleSubmit = () => {
    const selected = getSelectedPermissions(treeData);
    console.log("Selected permission IDs:", selected);
    alert("Permissions saved: " + selected.join(", "));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className="text-xl cursor-pointer">
          <AlertCircle />
        </span>
      </SheetTrigger>

      <SheetContent className="max-w-[736px]">
        <SheetHeader>
          <SheetTitle>Roles Details</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col justify-between" style={{ height: "calc(100vh - 80px)" }}>
          <div className="py-5">
            <hr className="text-border" />
            <PermissionTree data={treeData} setData={setTreeData} />
          </div>

          <div className="space-x-4 rtl:space-x-reverse">
            <Button variant="outline" size="xs">Cancel</Button>
            <Button size="xs" onClick={handleSubmit}>Submit</Button>
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>footer content</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default RolesDetails;
