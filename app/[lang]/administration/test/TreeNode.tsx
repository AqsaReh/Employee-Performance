"use client";
import { useState } from "react";
import { Plus, Pencil, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import AddNodeModal from "./AddNodeModal";

const TreeNode = ({ node }: { node: any }) => {
  const [expanded, setExpanded] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [children, setChildren] = useState(node.children || []);
  const [name, setName] = useState(node.name);

  const handleAddChild = (newNode: any) => {
    setChildren([...children, newNode]);
  };

  const handleEdit = (updatedNode: any) => {
    setName(updatedNode.name);
  };

  const handleDelete = () => {
    if (confirm(`Delete "${name}" and all its children?`)) {
      alert("Node deleted (in real app: update state/DB)");
    }
  };

  return (
    <div className="ml-2">
      <div className="flex items-center gap-2 py-1">
        {children.length > 0 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm w-4"
          >
            {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
        )}
        <span>
          {node.type === "module" && "📁"}
          {node.type === "submodule" && "📂"}
          {node.type === "page" && "📄"}
          {node.type === "action" && "🔘"}
        </span>
        <span
          onClick={() => setExpanded(!expanded)}
          className="font-medium hover:bg-blue-300 cursor-pointer py-1 px-2 rounded-md text-lg my-1"
        >
          {name}
        </span>

        <button
          onClick={() => {
            setEditMode(false);
            setModalOpen(true);
          }}
          className="ml-auto text-gray-500 hover:text-blue-600"
        >
          <Plus size={18} />
        </button>

        <button
          onClick={() => {
            setEditMode(true);
            setModalOpen(true);
          }}
          className="text-gray-400 hover:text-yellow-500"
        >
          <Pencil size={16} />
        </button>

        <button
          onClick={handleDelete}
          className="text-gray-400 hover:text-red-500"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {expanded && children.length > 0 && (
        <div className="ml-4 border-l pl-4">
          {children.map((child: any) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </div>
      )}

      <AddNodeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={editMode ? handleEdit : handleAddChild}
        parentNode={node}
        editMode={editMode}
        existingNode={editMode ? { ...node, name } : null}
      />
    </div>
  );
};

export default TreeNode;
