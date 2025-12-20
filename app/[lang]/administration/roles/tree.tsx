"use client";
import { useState } from "react";
import TreeNode from "./treenode";
import { PermissionNode } from "./rolesdetails";

const initialTree: PermissionNode = {
  id: 1,
  name: "Root Module",
  type: "module",
  checked: false,
  children: [
    {
      id: 2,
      name: "Submodule 1",
      type: "submodule",
      checked: false,
      children: [
        {
          id: 3,
          name: "Page 1",
          type: "page",
          checked: false,
        },
      ],
    },
  ],
};

export default function Tree() {
  const [treeData, setTreeData] = useState<PermissionNode>(initialTree);

  const updateCheckState = (node: PermissionNode, checked: boolean): PermissionNode => {
    return {
      ...node,
      checked,
      children: node.children?.map((child) => updateCheckState(child, checked)),
    };
  };

  const handleCheckChange = (id: number, checked: boolean, currentNode: PermissionNode): PermissionNode => {
    if (currentNode.id === id) {
      return updateCheckState(currentNode, checked);
    }
    return {
      ...currentNode,
      children: currentNode.children?.map((child) =>
        handleCheckChange(id, checked, child)
      ),
    };
  };

  const onNodeToggle = (id: number, checked: boolean) => {
    setTreeData((prev) => handleCheckChange(id, checked, prev));
  };

  return (
    <div className="p-4">
      <TreeNode node={treeData} onToggle={onNodeToggle} />
    </div>
  );
}
