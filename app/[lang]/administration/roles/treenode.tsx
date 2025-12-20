"use client";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronRight } from "lucide-react";
import { PermissionNode } from "./rolesdetails";


interface TreeNodeProps {
  node: PermissionNode;
  onToggle: (id: number, checked: boolean) => void;
}

const TreeNode = ({ node, onToggle }: TreeNodeProps) => {
  const [expanded, setExpanded] = useState(true);

  const handleToggle = (checked: boolean) => {
    onToggle(node.id, checked);
  };

  return (
    <div className="ml-2">
      <div className="flex items-center gap-2 py-1">
        {node.children?.length ? (
          <button onClick={() => setExpanded(!expanded)} className="text-sm w-4">
            {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        ) : (
          <div className="w-4" />
        )}

        <Checkbox
          checked={node.checked ?? false}
          onCheckedChange={(val) => handleToggle(!!val)}
        />

        <span>
          {node.type === "module" && "📁"}
          {node.type === "submodule" && "📂"}
          {node.type === "page" && "📄"}
          {node.type === "action" && "🔘"}
        </span>

        <span className="font-medium text-sm">{node.name}</span>
      </div>

      {expanded && node.children?.length && (
        <div className="ml-4 border-l pl-2">
          {node.children.map((child: PermissionNode) => (
            <TreeNode key={child.id} node={child} onToggle={onToggle} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
