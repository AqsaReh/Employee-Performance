import { PermissionNode } from "./rolesdetails";
import TreeNode from "./treenode";


interface PermissionTreeProps {
  data: PermissionNode[];
  setData: (data: PermissionNode[]) => void;
}

const updateNodeChecked = (node: PermissionNode, checked: boolean): PermissionNode => ({
  ...node,
  checked,
  children: node.children?.map((child:PermissionNode) => updateNodeChecked(child, checked)),
});

const updateTree = (
  nodes: PermissionNode[],
  id: number,
  checked: boolean
): PermissionNode[] =>
  nodes.map((node) => {
    if (node.id === id) return updateNodeChecked(node, checked);
    return {
      ...node,
      children: node.children ? updateTree(node.children, id, checked) : undefined,
    };
  });

export default function PermissionTree({ data, setData }: PermissionTreeProps) {
  const handleToggle = (id: number, checked: boolean) => {
    const updated = updateTree(data, id, checked);
    setData(updated);
  };

  return (
    <div className="rounded p-4 bg-white">
      {data.map((node) => (
        <TreeNode key={node.id} node={node} onToggle={handleToggle} />
      ))}
    </div>
  );
}
