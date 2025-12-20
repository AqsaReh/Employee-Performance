import TreeNode from "./TreeNode";




export default function PermissionTree({ data }: { data: any[] }) {
  return (
    <div className="rounded p-4 bg-white">
      {data.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </div>
  );
}
