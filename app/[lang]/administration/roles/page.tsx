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
import RolesDetails from "./rolesdetails";

interface Role {
  id: number;
  rolename: string;
  permissionstatus: string;
  permission: string;
  action: string;
}

const roles: Role[] = [
  {
    id: 1,
    rolename: "Admin",
    permissionstatus: "Yes",
    permission: "read-write",
    action: "create-user",
  },
  {
    id: 2,
    rolename: "Editor",
    permissionstatus: "No",
    permission: "write",
    action: "edit-article",
  },
  {
    id: 3,
    rolename: "Viewer",
    permissionstatus: "Yes",
    permission: "read",
    action: "view-reports",
  },
  {
    id: 4,
    rolename: "Moderator",
    permissionstatus: "Yes",
    permission: "moderate",
    action: "ban-user",
  },
  {
    id: 5,
    rolename: "Support",
    permissionstatus: " No",
    permission: "read-write",
    action: "resolve-ticket",
  },
];

const schema_name = z.object({
  rolename: z
    .string({
      required_error: "Role name is required",
      invalid_type_error: "Role name must be a string",
    })
    .min(4, "Role name must be at least 4 characters long"),

  permissionstatus: z
    .string({
      required_error: "Permission status is required",
      invalid_type_error: "Permission status must be a string",
    })
    .min(2, "Permission status must be at least 2 characters long"),
});

const RolesPage = () => {
  const [open, setOpen] = useState(false);
  const [rolesData, setRolesData] = useState<Role[]>(roles);
  const [openTrashRoles, setOpenTrashRoles] = useState(false);
  const [openEditRoles, setOpenEditRoles] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<Role | null>(null);

  const {
    register,
    handleSubmit: handleRolesSubmit,
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
        rolename: original.rolename,
        permissionstatus: original.permissionstatus,
      });
      setOpenEditRoles(false);
    }
  };

  const handleDelete = () => {
    if (selectedRowData) {
      const updateData = rolesData.filter(
        (role) => role.id !== selectedRowData.id
      );
      setRolesData(updateData); // Update the data state
      setOpenTrashRoles(false); // Close the modal
    }
  };

  // name change

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setSelectedRowData((prevData: any) => ({
      ...prevData,
      rolename: newName,
    }));
  };

  interface Role {
    id: number;
    rolename: string;
    permissionstatus: string;
    permission: string;
    action: string;
  }

  const handleAddFormSubmit = (data: any) => {
    const [open, setOpen] = useState(false);
    console.log(data);
    console.log("aqsa");

    const newId = rolesData.length ? rolesData[rolesData.length - 1].id + 1 : 1;

    console.log("data is", data);

    const newRole: Role = {
      id: newId,
      rolename: data.rolename,
      permissionstatus: data.permissionstatus,
      permission: "read",
      action: "view",
    };

    setRolesData([...rolesData, newRole]);
    alert("Data added successfully");
    console.log(rolesData);
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
        const module = row.original;
        return (
          <div className="flex space-x-2">
            <Button
              size="icon"
              variant="outline"
              className=" h-7 w-7"
              color="secondary"
              onClick={() => {
                handleEditClickBtn(row.original);
                setOpenEditRoles(true);
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
                setOpenTrashRoles(true);
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
      accessorKey: "name",
      header: "Name",
      size: 80,
      cell: ({ row }) => {
        const value = row.original.rolename;
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
      accessorKey: "permissionstatus",
      header: "Permission Status",
      size: 60,
      cell: ({ row }) => {
        const value = row.original.permissionstatus;
        return (
          <div className="font-medium text-card-foreground/80 py-3">
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
      accessorKey: "permission",
      header: "Permissions",
      cell: ({ row }) => {
        const value = row.original.permission;
        return (
          <div className="font-medium text-card-foreground/80">
            <div className="space-x-3 rtl:space-x-reverse flex justify-end items-center">
              {/* <AlertCircle className="h-5 w-5 cursor-pointer" onClick={() => setOpen(true)} /> */}

            <RolesDetails />
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
            <h1 className="mb-3 text-2xl font-semibold tracking-wide">Roles</h1>
            <Button onClick={() => setOpen(true)}>Add</Button>
          </div>

          <hr className="my-2" />
          <div className="mt-3">
            <BasicDataTable data={rolesData} columns={columns} />
          </div>
        </div>

        {/* Models */}

        {/* Add Model */}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent size="2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-default-700 ">
              Add New Role
            </DialogTitle>
          </DialogHeader>

          <div className="text-sm text-default-500 space-y-4">
            <form
              onSubmit={handleRolesSubmit((data: any) => {
                console.log(data);
                handleAddFormSubmit(data); // This will add the new module
              })}
            >
              <Label className="mb-3" htmlFor="name">
                Enter The Name
              </Label>
              <Input
                type="text"
                {...register("rolename")}
                placeholder="Enter Your Role Name"
                id="rolename"
                // required
              />

              {errors.rolename && (
                <div className="text-destructive mt-2">
                  {errors.rolename.message as string}
                </div>
              )}

              <Label className="my-3" htmlFor="message">
                Enter The Permission Status
              </Label>

              <Input
                type="text"
                {...register("permissionstatus")}
                placeholder="Enter Your Permission Status"
                id="permissionstatus"
                // required
              />
              {errors.permissionstatus && (
                <div className="text-destructive mt-2">
                  {errors.permissionstatus.message as string}
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

      <Dialog open={openTrashRoles} onOpenChange={setOpenTrashRoles}>
        <DialogContent className="top-['unset'] bottom-2 translate-y-0">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-default-700 ">
              Remove Role
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
              Are you sure you want to delete {selectedRowData?.rolename}?
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

      <Dialog open={openEditRoles} onOpenChange={setOpenEditRoles}>
        <DialogContent size="2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-default-700 ">
              Edit {selectedRowData?.rolename}
            </DialogTitle>
          </DialogHeader>

          <div className="text-sm text-default-500 space-y-4">
            <form
              onSubmit={handleRolesSubmit((data: any) => {
                console.log("close has clicked");
                const updatedData = rolesData.map((role: any) =>
                  role.id === selectedRowData?.id ? { ...role, ...data } : role
                );
                setRolesData(updatedData);
                console.log(data);
                setOpenEditRoles(false);
              })}
            >
              <Label className="mb-3" htmlFor="name">
                Enter The Role Name
              </Label>
              <Input
                type="text"
                {...register("rolename")}
                placeholder="Enter Your Name"
                id="rolename"
                defaultValue={selectedRowData?.rolename}
                onChange={handleNameChange}
              />

              {errors.rolename && (
                <div className="text-destructive mt-2">
                  {errors.rolename.message as string}
                </div>
              )}
              <Label className="my-3" htmlFor="message">
                Change The Permission Status
              </Label>
              <Input
                id="message"
                type="text"
                {...register("permissionstatus")}
                defaultValue={selectedRowData?.permissionstatus || ""}
              />

              {errors.permissionstatus && (
                <div className="text-destructive mt-2">
                  {errors.permissionstatus.message as string}
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

export default RolesPage;
