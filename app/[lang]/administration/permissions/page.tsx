"use client";

import React, { useState } from "react";
import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import BasicDataTable from "@/components/datatables/basic-table";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { set } from "date-fns";
import { AlertCircle } from "lucide-react";
import { permission } from "process";

interface Permission {
  id: number;
  groupname: string;
  permissions: string;

}

const permissions: Permission[] = [
  {
    id: 1,
    groupname: "Admin",
    permissions: "Yes",

  },
  {
    id: 2,
    groupname: "Editor",
    permissions: "No",
  },
  {
    id: 3,
    groupname: "Viewer",
    permissions: "Yes",
  },
  {
    id: 4,
    groupname: "Moderator",
    permissions: "Yes",
  },
  {
    id: 5,
    groupname: "Support",
    permissions: " No",
  },
];

const schema_name = z.object({
  groupname: z
    .string({
      required_error: "Role name is required",
      invalid_type_error: "Role name must be a string",
    })
    .min(4, "Role name must be at least 4 characters long"),

  permissions: z
    .string({
      required_error: "Permission status is required",
      invalid_type_error: "Permission status must be a string",
    })
    .min(2, "Permission status must be at least 2 characters long"),
});

const PermissionsPage = () => {
  const [open, setOpen] = useState(false);
  const [permissionsData, setPermissionsData] = useState<Role[]>(permissions);
  const [openTrashPermissions, setOpenTrashPermissions] = useState(false);
  const [openEditPermissions, setOpenEditPermissions] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<Role | null>(null);

  const {
    register,
    handleSubmit: handlePermissionsSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema_name),
    mode: "all",
  });

  const handleEditClickBtn = (original: any) => {
    reset();
    if (original) {
      setSelectedRowData(original);
      reset({
        groupname: original.rolename,
        permissions: original.permissions,
      });
      setOpenEditPermissions(false);
    }
  };

  const handleDelete = () => {
    if (selectedRowData) {
      const updateData = permissionsData.filter(
        (role) => role.id !== selectedRowData.id
      );
      setPermissionsData(updateData); // Update the data state
      setOpenTrashPermissions(false); // Close the modal
    }
  };

  // name change

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setSelectedRowData((prevData: any) => ({
      ...prevData,
      groupname: newName,
    }));
  };

  interface Role {
    id: number;
    groupname: string;
    permissions: string;
  }

  const handleAddFormSubmit = (data: any) => {
    console.log(data);
    console.log("aqsa");

    const newId = permissionsData.length ? permissionsData[permissionsData.length - 1].id + 1 : 1;

    console.log("data is", data);

    const newPermission: Permission = {
      id: newId,
      groupname: data.groupname,
      permissions: data.permissions,
   
    };

    setPermissionsData([...permissionsData, newPermission]);
    alert("Data added successfully");
    console.log(permissionsData);
    console.log("aqsaRehman");
    setOpen(false); // Close the modal
    reset();
  };

  // Columns

  const columns: ColumnDef<Role>[] = [
    {
      accessorKey: "action",
      header: () => <div className="text-left mb-4">Action</div>,
      cell: ({ row }) => {
        const permissions = row.original;
        return (
          <div className="flex space-x-2">
            <Button
              size="icon"
              variant="outline"
              className=" h-7 w-7"
              color="secondary"
              onClick={() => {
                handleEditClickBtn(row.original);
                setOpenEditPermissions(true);
                // setSelectedRowData(row.original);
              }}
            >
              <Icon icon="heroicons:pencil" className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="outline"
              className=" h-7 w-7"
              color="secondary"
              onClick={() => {
                setOpenTrashPermissions(true);
                setSelectedRowData(row.original);
              }}
            >
              <Icon icon="heroicons:trash" className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
    {
      id: "id",
      header: ({ table }) => <label htmlFor="">Sr. No</label>,
      cell: ({ row }) => <h1>{row.index + 1}</h1>,
      enableSorting: false,
      enableHiding: false,
      size: 60, 
    },
    {
      accessorKey: "groupname",
      header: "Group Name",
      size: 80, 
      cell: ({ row }) => {
        const value = row.original.groupname;
        return (
          <div className="font-medium text-card-foreground/80 py-3 ">
            <div className="flex space-x-3 rtl:space-x-reverse items-center">
              <span className="text-sm text-card-foreground whitespace-nowrap">
                {value}
              </span>
            </div>
          </div>
        );
      },
     
    },
    {
      accessorKey: "permissions",
      header: "Permissions",
      size: 60,
      cell: ({ row }) => {
        const value = row.original.permissions;
        return (
          <div className="font-medium text-card-foreground/80 py-3">
            <div className="flex space-x-3 rtl:space-x-reverse justify-end items-center">
              <span className="text-sm text-card-foreground whitespace-nowrap">
                {value}
              </span>
            </div>
          </div>
        );
      },
       
    },
    
  ];

  return (
    <>
      <div className="-mt-1">
        <div className="mt-4 p-5 rounded-lg bg-white ">
          <div className="flex justify-between">
            <h1 className="mb-3 text-2xl font-semibold tracking-wide">Permissions</h1>
            <Button onClick={() => setOpen(true)}>Add</Button>
          </div>

          <hr className="my-2" />
          <div className="mt-3">
            <BasicDataTable data={permissionsData} columns={columns} />
          </div>
        </div>

        {/* Models */}

        {/* Add Model */}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent size="2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-default-700 ">
              Add New Permission
            </DialogTitle>
          </DialogHeader>

          <div className="text-sm text-default-500 space-y-4">
            <form
              onSubmit={handlePermissionsSubmit((data: any) => {
                console.log(data);
                handleAddFormSubmit(data); // This will add the new module
              })}
            >
              <Label className="mb-3" htmlFor="name">
                Enter The Name
              </Label>
              <Input
                type="text"
                {...register("groupname")}
                placeholder="Enter Your Group Name"
                id="groupname"
                // required
              />

              {errors.groupname && (
                <div className="text-destructive mt-2">
                  {errors.groupname.message as string}
                </div>
              )}

              <Label className="my-3" htmlFor="message">
                Enter The Permission 
              </Label>
          
              <Input
                type="text"
                {...register("permissions")}
                placeholder="Enter Your Permissions"
                id="permissions"
                // required
              />
              {errors.permissions && (
                <div className="text-destructive mt-2">
                  {errors.permissions.message as string}
                </div>
              )}

              <DialogFooter className="mt-3">
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Trash Modal */}

      <Dialog open={openTrashPermissions} onOpenChange={setOpenTrashPermissions}>
        <DialogContent className="top-['unset'] bottom-2 translate-y-0">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-default-700 ">
              Remove Permission
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6em"
                height="6em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4zm2 2h6V4H9zM6.074 8l.857 12H17.07l.857-12zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-default-950 dark:text-primary-foreground">
              Are you sure you want to delete {selectedRowData?.groupname}?
            </h3>
          </div>
          <hr className="my-5 border-border" />
          <DialogFooter className="sm:justify-center">
            <DialogClose asChild>
              <Button variant="outline" color="warning">
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={handleDelete}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}

      <Dialog open={openEditPermissions} onOpenChange={setOpenEditPermissions}>
        <DialogContent size="2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-default-700 ">
              Edit {selectedRowData?.groupname}
            </DialogTitle>
          </DialogHeader>

          <div className="text-sm text-default-500 space-y-4">
            <form
              onSubmit={handlePermissionsSubmit((data: any) => {
                console.log("close has clicked");
                const updatedData = permissionsData.map((role: any) =>
                  role.id === selectedRowData?.id ? { ...role, ...data } : role
                );
                setPermissionsData(updatedData);
                console.log(data);
                setOpenEditPermissions(false);
              })}
            >
              <Label className="mb-3" htmlFor="name">
                Enter The Group Name
              </Label>
              <Input
                type="text"
                {...register("groupname")}
                placeholder="Enter Your Group Name"
                id="groupname"
                defaultValue={selectedRowData?.groupname}
                onChange={handleNameChange}
              />

              {errors.groupname && (
                <div className="text-destructive mt-2">
                  {errors.groupname.message as string}
                </div>
              )}
              <Label className="my-3" htmlFor="message">
                Change The Permissions
              </Label>
              <Input
                id="message"
                type="text"
                {...register("permissions")}
                defaultValue={selectedRowData?.permissions || ""}
              />

              {errors.permissions && (
                <div className="text-destructive mt-2">
                  {errors.permissions.message as string}
                </div>
              )}

              <DialogFooter className="mt-3">
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PermissionsPage;
