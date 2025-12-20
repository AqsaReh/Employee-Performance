"use client";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";

export default function AddNodeModal({
  isOpen,
  onClose,
  onAdd,
  parentNode,
  editMode = false,
  existingNode = null,
  typeOptions,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newNode: any) => void;
  parentNode: any;
  editMode?: boolean;
  existingNode?: any;
  typeOptions?: string[];
}) {
  const [name, setName] = useState(existingNode?.name || "");
  const [url, setUrl] = useState(existingNode?.url || "");
  const [type, setType] = useState(existingNode?.type || "");

  useEffect(() => {
    setName(existingNode?.name || "");
    setUrl(existingNode?.url || "");

    if (existingNode?.type) {
      setType(existingNode.type);
    } else {
      const options = typeOptions || getTypeOptions();
      let nextType = options[0] || "module";
      setType(nextType);
    }
  }, [existingNode, parentNode]);

  const isPage = type === "page";

  const getTypeOptions = () => {
    if (!parentNode || !parentNode.type) {
      return ["module", "page"]; // Root level
    }

    switch (parentNode.type) {
      case "module":
      case "submodule":
        return ["submodule", "page"];
      case "page":
        return ["action"];
      default:
        return [];
    }
  };

  const typeOptionsToUse = typeOptions || getTypeOptions();

  const handleSubmit = () => {
    if (!name.trim()) return;

    const newNode: any = {
      id: existingNode?.id || Date.now(),
      name: name.trim(),
      type,
      children: existingNode?.children || [],
    };

    if (isPage) {
      newNode.url = url.trim();
    }

    onAdd(newNode);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-25"
        aria-hidden="true"
      />

      <Dialog.Panel className="bg-white p-6 rounded shadow-md w-[400px] z-50 relative">
        <Dialog.Title className="text-lg font-bold mb-4">
          {editMode ? "Edit Node" : "Add Node"}
        </Dialog.Title>

        {!editMode && (
          <>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4"
            >
              {typeOptionsToUse.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </>
        )}

        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
          placeholder="Enter node name"
        />

        {isPage && (
          <>
            <label className="block text-sm font-medium mb-1">Page URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4"
              placeholder="/path-to-page"
            />
          </>
        )}

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-100">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            {editMode ? "Save Changes" : "Add Node"}
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
