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

interface User {
  id: number;
  emp_code: string;
  fullname: string;
  role: string;
  email: string;
  contact_official: string;
  contact_personal: string;
  action: string;
}

const users: User[] = [
  {
    id: 1,
    emp_code: "EMP001",
    fullname: "Alice Johnson",
    role: "Admin",
    email: "alice.johnson@company.com",
    contact_official: "123-456-7890",
    contact_personal: "987-654-3210",
    action: "create-user",
  },
  {
    id: 2,
    emp_code: "EMP002",
    fullname: "Bob Smith",
    role: "Editor",
    email: "bob.smith@company.com",
    contact_official: "234-567-8901",
    contact_personal: "876-543-2109",
    action: "edit-article",
  },
  {
    id: 3,
    emp_code: "EMP003",
    fullname: "Charlie Davis",
    role: "Viewer",
    email: "charlie.davis@company.com",
    contact_official: "345-678-9012",
    contact_personal: "765-432-1098",
    action: "view-reports",
  },
  {
    id: 4,
    emp_code: "EMP004",
    fullname: "Diana King",
    role: "Moderator",
    email: "diana.king@company.com",
    contact_official: "456-789-0123",
    contact_personal: "654-321-0987",
    action: "ban-user",
  },
  {
    id: 5,
    emp_code: "EMP005",
    fullname: "Ethan Brooks",
    role: "Support",
    email: "ethan.brooks@company.com",
    contact_official: "567-890-1234",
    contact_personal: "543-210-9876",
    action: "resolve-ticket",
  },
];

const schema_name = z.object({
  fullname: z
    .string({
      required_error: "Full name is required",
      invalid_type_error: "Full name must be a string",
    })
    .min(6, "Full name must be at least 6 characters long"),

  emp_code: z
    .string({
      required_error: "Employee code is required",
      invalid_type_error: "Employee code must be a string",
    })
    .min(3, "Employee code must be at least 3 characters long"),

  role: z
    .string({
      required_error: "Role is required",
      invalid_type_error: "Role must be a string",
    })
    .min(3, "Role must be at least 3 characters long"),

  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email address"),

  contact_official: z
    .string({
      required_error: "Official contact is required",
    })
    .min(7, "Official contact must be at least 7 digits long"),

  contact_personal: z
    .string({
      required_error: "Personal contact is required",
    })
    .min(7, "Personal contact must be at least 7 digits long"),
});

const UsersPage = () => {
  const [open, setOpen] = useState(false);
  const [usersData, setUsersData] = useState<User[]>(users);
  const [openTrashUsers, setOpenTrashUsers] = useState(false);
  const [openEditUsers, setOpenEditUsers] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<User | null>(null);

  const {
    register,
    handleSubmit: handleUsersSubmit,
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
        emp_code: original.emp_code,
        fullname: original.fullname,
        role: original.role,
        email: original.email,
        contact_official: original.contact_official,
        contact_personal: original.contact_personal,
      });
      setOpenEditUsers(false);
    }
  };

  const handleDelete = () => {
    if (selectedRowData) {
      const updateData = usersData.filter(
        (user) => user.id !== selectedRowData.id
      );
      setUsersData(updateData); // Update the data state
      setOpenTrashUsers(false); // Close the modal
    }
  };

  // name change

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setSelectedRowData((prevData: any) => ({
      ...prevData,
      fullname: newName,
    }));
  };

  interface User {
    id: number;
    emp_code: string;
    fullname: string;
    role: string;
    email: string;
    contact_official: string;
    contact_personal: string;
    action: string;
  }

  const handleAddFormSubmit = (data: any) => {
    console.log(data);
    console.log("aqsa");

    const newId = usersData.length ? usersData[usersData.length - 1].id + 1 : 1;

    console.log("data is", data);

    const newUser: User = {
      id: newId,
      emp_code: data.emp_code,
      fullname: data.fullname,
      role: data.role,
      email: data.email,
      contact_official: data.contact_official,
      contact_personal: data.contact_personal,
      action: data.action,
    };

    setUsersData([...usersData, newUser]);
    alert("Data added successfully");
    console.log(usersData);
    console.log("aqsaRehman");
    setOpen(false); // Close the modal
    reset();
  };

  // Columns

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "action",
      header: () => <div className="text-left mb-4">Action</div>,
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex space-x-2">
            <Button
              size="icon"
              variant="outline"
              className=" h-7 w-7"
              color="secondary"
              onClick={() => {
                handleEditClickBtn(row.original);
                setOpenEditUsers(true);
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
                setOpenTrashUsers(true);
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
    },
    {
      accessorKey: "emp_code",
      header: "Emp_Code",
      size: 80,
      cell: ({ row }) => {
        const value = row.original.emp_code;
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
      accessorKey: "fullname",
      header: "Fullname",
      size: 60,
      cell: ({ row }) => {
        const value = row.original.fullname;
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
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const value = row.original.role;
        return (
          <div className="font-medium text-card-foreground/80">
            <div className="space-x-3 rtl:space-x-reverse flex justify-start items-center">
              <span className="text-sm text-card-foreground whitespace-nowrap">
                {value}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        const value = row.original.email;
        return (
          <div className="font-medium text-card-foreground/80">
            <div className="space-x-3 rtl:space-x-reverse flex justify-start items-center">
              <span className="text-sm text-card-foreground whitespace-nowrap">
                {value}
              </span>
            </div>
          </div>
        );
      },
    },

    {
      accessorKey: "contact_official",
      header: "Contact Official",
      cell: ({ row }) => {
        const value = row.original.contact_official;
        return (
          <div className="font-medium text-card-foreground/80">
            <div className="space-x-3 rtl:space-x-reverse flex justify-start items-center">
              <span className="text-sm text-card-foreground whitespace-nowrap">
                {value}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: " contact_personal",
      header: "Contact Personal",
      cell: ({ row }) => {
        const value = row.original.contact_personal;
        return (
          <div className="font-medium text-card-foreground/80">
            <div className="space-x-3 rtl:space-x-reverse flex justify-end items-center">
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
            <h1 className="mb-3 text-2xl font-semibold tracking-wide">Users</h1>
            <Button onClick={() => setOpen(true)}>Add</Button>
          </div>

          <hr className="my-2" />
          <div className="mt-3">
            <BasicDataTable data={usersData} columns={columns} />
          </div>
        </div>

        {/* Models */}

        {/* Add Model */}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent size="2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-default-700 ">
              Add New User
            </DialogTitle>
          </DialogHeader>

          <div className="text-sm text-default-500 space-y-4">
            <form
              onSubmit={handleUsersSubmit((data: any) => {
                console.log(data);
                handleAddFormSubmit(data); // This will add the new module
              })}
            >
              <Label className="mb-3" htmlFor="fullname">
                Enter The Full Name
              </Label>
              <Input
                type="text"
                {...register("fullname")}
                placeholder="Enter Your Full Name"
                id="fullname"
                // required
              />

              {errors.fullname && (
                <div className="text-destructive mt-2">
                  {errors.fullname.message as string}
                </div>
              )}

              <Label className="my-3" htmlFor="emp_code">
                Enter The Employee Code
              </Label>

              <Input
                type="text"
                {...register("emp_code")}
                placeholder="Enter Your Employee Code"
                id="emp_code"
                // required
              />
              {errors.emp_code && (
                <div className="text-destructive mt-2">
                  {errors.emp_code.message as string}
                </div>
              )}

              
              <Label className="my-3" htmlFor="role">
                Enter The Role
              </Label>

              <Input
                type="text"
                {...register("role")}
                placeholder="Enter Your Role "
                id="role"
                // required
              />
              {errors.role && (
                <div className="text-destructive mt-2">
                  {errors.role.message as string}
                </div>
              )}


              <Label className="my-3" htmlFor="email">
                Enter The Email
              </Label>

              <Input
                type="text"
                {...register("email")}
                placeholder="Enter Your Email "
                id="email"
                // required
              />
              {errors.email && (
                <div className="text-destructive mt-2">
                  {errors.email.message as string}
                </div>
              )}


              <Label className="my-3" htmlFor="contact_official">
                Enter The Contact Official
              </Label>

              <Input
                type="text"
                {...register("contact_official")}
                placeholder="Enter Your Contact Official"
                id="contact_official"
                // required
              />
              {errors.contact_official && (
                <div className="text-destructive mt-2">
                  {errors.contact_official.message as string}
                </div>
              )}
              


              <Label className="my-3" htmlFor="contact_personal">
                Enter The Contact Personal
              </Label>

              <Input
                type="text"
                {...register("contact_personal")}
                placeholder="Enter Your Contact Personal"
                id="contact_personal"
                // required
              />
              {errors.contact_personal && (
                <div className="text-destructive mt-2">
                  {errors.contact_personal.message as string}
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

      <Dialog open={openTrashUsers} onOpenChange={setOpenTrashUsers}>
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
              Are you sure you want to delete {selectedRowData?.fullname}?
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

      <Dialog open={openEditUsers} onOpenChange={setOpenEditUsers}>
        <DialogContent size="2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-default-700 ">
              Edit {selectedRowData?.fullname}
            </DialogTitle>
          </DialogHeader>

          <div className="text-sm text-default-500 space-y-4">
            <form
              onSubmit={handleUsersSubmit((data: any) => {
                console.log("close has clicked");
                const updatedData = usersData.map((role: any) =>
                  role.id === selectedRowData?.id ? { ...role, ...data } : role
                );
                setUsersData(updatedData);
                console.log(data);
                setOpenEditUsers(false);
              })}
            >
              <Label className="mb-3" htmlFor="fullname">
                Enter The Full Name
              </Label>
              <Input
                type="text"
                {...register("fullname")}
                placeholder="Enter Your Full Name"
                id="fullname"
                defaultValue={selectedRowData?.fullname}
                onChange={handleNameChange}
              />

              {errors.fullname && (
                <div className="text-destructive mt-2">
                  {errors.fullname.message as string}
                </div>
              )}


              <Label className="my-3" htmlFor="emp_code">
                Change The Emp Code
              </Label>
              <Input
                id="message"
                type="text"
                {...register("emp_code")}
                defaultValue={selectedRowData?.emp_code || ""}
              />
              {errors.emp_code && (
                <div className="text-destructive mt-2">
                  {errors.emp_code.message as string}
                </div>
              )}

              <Label className="my-3" htmlFor="role">
                Change The Role
              </Label>
              <Input
                id="role"
                type="text"
                {...register("role")}
                defaultValue={selectedRowData?.role || ""}
              />
              {errors.role && (
                <div className="text-destructive mt-2">
                  {errors.role.message as string}
                </div>
              )}


              <Label className="my-3" htmlFor="email">
                Change The Email
              </Label>
              <Input
                id="email"
                type="text"
                {...register("email")}
                defaultValue={selectedRowData?.email || ""}
              />
              {errors.email && (
                <div className="text-destructive mt-2">
                  {errors.email.message as string}
                </div>
              )}


              <Label className="my-3" htmlFor="contact_official">
                Change The Contact Official
              </Label>
              <Input
                id="contact_official"
                type="text"
                {...register("contact_official")}
                defaultValue={selectedRowData?.contact_official || ""}
              />
              {errors.contact_official && (
                <div className="text-destructive mt-2">
                  {errors.contact_official.message as string}
                </div>
              )}


              <Label className="my-3" htmlFor="contact_personal">
                Change The contact_personal
              </Label>
              <Input
                id="contact_personal"
                type="text"
                {...register("contact_personal")}
                defaultValue={selectedRowData?.contact_personal || ""}
              />
              {errors.contact_personal && (
                <div className="text-destructive mt-2">
                  {errors.contact_personal.message as string}
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

export default UsersPage;
