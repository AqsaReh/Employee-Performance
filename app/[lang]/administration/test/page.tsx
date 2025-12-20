"use client";

import { useState } from "react";
import PermissionTree from "./PermissionTree";
import AddNodeModal from "./AddNodeModal";
import { Plus, PlusCircle, PlusIcon } from "lucide-react";

export default function PermissionsPage() {
  const dummyPermissions = [
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
                {
                  id: 4,
                  name: "Submit Activity",
                  type: "action",
                },
                {
                  id: 5,
                  name: "Validate Budget",
                  type: "action",
                },
              ],
            },
            {
              id: 6,
              name: "View Activity Page",
              type: "page",
            },
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
  ];

  const [treeData, setTreeData] = useState(dummyPermissions);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddModule = (newModule: any) => {
    setTreeData([...treeData, { ...newModule, children: [] }]);
  };

  return (
    <div className="p-6 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Permission Tree</h1>
        <button
          className="bg-blue-600 text-white flex px-4 py-2 text-base rounded"
          onClick={() => setModalOpen(true)}
        >
          <Plus className="mr-2" /> Add Module
        </button>

      </div>

      <hr className="my-3 text-gray-500" />

      <PermissionTree data={treeData} />

      <AddNodeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddModule}
        parentNode={null}
      />
    </div>
  );
}
