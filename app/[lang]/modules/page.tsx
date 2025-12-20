"use client";

import React, { useState } from "react";
import { z } from "zod";
import { Module, modules } from "./(data)/data";
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

const schema_name = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(4, "Name must be at least 4 characters long"),

  desc: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .min(8, "Description must be at least 8 characters long"),
});

const ModulesPage = () => {
  const [open, setOpen] = useState(false);
  const [modulesData, setModulesData] = useState<Module[]>(modules);
  const [openTrashModel, setOpenTrashModel] = useState(false);
  const [openEditModel, setOpenEditModel] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<Module | null>(null);

  const {
    register,
    handleSubmit: handleModuleSubmit,
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
        name: original.name,
        desc: original.desc,
      });
      setOpenEditModel(false);
    }
  };

  const handleDelete = () => {
    if (selectedRowData) {
      const updateData = modulesData.filter(
        (module) => module.id !== selectedRowData.id
      );
      setModulesData(updateData); // Update the data state
      setOpenTrashModel(false); // Close the modal
    }
  };

  // name change

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setSelectedRowData((prevData: any) => ({
      ...prevData,
      name: newName,
    }));
  };

  const handleAddFormSubmit = (data: any) => {
    console.log(data);
    console.log("aqsa");
   
      const newId = modulesData.length
        ? modulesData[modulesData.length - 1].id + 1
        : 1;

      const newModule: Module = {
        id: modulesData.length + 1,
        name: `Module ${newId}`,
        desc: `Description ${newId}`,
        status: 1,
      };

      setModulesData([...modulesData, newModule]);
      alert("Data added successfully");
      console.log(modulesData);
      console.log("aqsaRehman");
      setOpen(false); // Close the modal
      reset();
    }

  // Columns

  const columns: ColumnDef<Module>[] = [
    {
      id: "id",
      header: ({ table }) => <label htmlFor="">Sr #</label>,
      cell: ({ row }) => <h1>{row.index + 1}</h1>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const value = row.original.name;
        return (
          <div className="font-medium text-card-foreground/80">
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
      accessorKey: "desc",
      header: "Description",
      cell: ({ row }) => {
        const value = row.original.desc;
        return (
          <div className="font-medium text-card-foreground/80">
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
      accessorKey: "module",
      header: "Status",
      cell: ({ row }) => {
        const [status, setStatus] = useState(row.original.status);
        const handleToggle = () => {
          setStatus(status === 1 ? 0 : 1);
        };

        return (
          <div className="font-medium text-card-foreground/80">
            <div className="flex space-x-3 rtl:space-x-reverse items-center">
              <Switch
                id={`status-${row.original.id}`} // Use row.original.id for unique id
                data-state={status === 1 ? "checked" : "unchecked"}
                onCheckedChange={handleToggle} // Use onCheckedChange for switch state
                checked={status === 1} // Boolean value for checked state
              />
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "action",
      header: () => <div className="text-left">Action</div>,
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
                setOpenEditModel(true);
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
                setOpenTrashModel(true);
                setSelectedRowData(row.original);
              }}
            >
              <Icon icon="heroicons:trash" className="h-4 w-4" />
            </Button>
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
            <h1 className="mb-3 text-xl">Search Module</h1>
            <Button onClick={() => setOpen(true)}>Add New Module</Button>
          </div>

          <hr className="my-3" />
          <div className="mt-5">
            <BasicDataTable data={modulesData} columns={columns} />
          </div>
        </div>

        {/* Models */}

        {/* Add Model */}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent size="2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-default-700 ">
              Add Module
            </DialogTitle>
          </DialogHeader>

          <div className="text-sm text-default-500 space-y-4">
            <form
              onSubmit={handleModuleSubmit((data: any) => {
                handleAddFormSubmit(data); // This will add the new module
              })}
            >
              <Label className="mb-3" htmlFor="name">
                Enter The Name
              </Label>
              <Input
                type="text"
                {...register("name")}
                placeholder="Enter Your Name"
                id="username"
                // required
              />

              {errors.name && (
                <div className="text-destructive mt-2">
                  {errors.name.message as string}
                </div>
              )}

              <Label className="my-3" htmlFor="message">
                Enter The Description
              </Label>
              <Textarea
                {...register("desc")}
                placeholder="Message..."
                id="message"
                rows={3}
              />
              {errors.desc && (
                <div className="text-destructive mt-2">
                  {errors.desc.message as string}
                </div>
              )}

              {/* Make sure the submit button is inside the form */}
              <DialogFooter className="mt-3">
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Trash Modal */}

      <Dialog open={openTrashModel} onOpenChange={setOpenTrashModel}>
        <DialogContent className="top-['unset'] bottom-2 translate-y-0">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-default-700 ">
              Remove Module
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
              Are you sure you want to delete {selectedRowData?.name}?
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

      <Dialog
        open={openEditModel}
        onOpenChange={(open) => {
          setOpenEditModel(open);
        }}
      >
        <DialogContent size="2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-default-700 ">
              Edit {selectedRowData?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="text-sm text-default-500 space-y-4">
            <form
              onSubmit={handleModuleSubmit((data: any) => {
                const updatedData = modulesData.map((module: any) =>
                  module.id === selectedRowData?.id
                    ? { ...module, ...data }
                    : module
                );
                setModulesData(updatedData);
                console.log(data);
                setOpenEditModel(false);
              })}
            >
              <Label className="mb-3" htmlFor="name">
                Enter The Name
              </Label>
              <Input
                type="text"
                {...register("name")}
                placeholder="Enter Your Name"
                id="username"
                defaultValue={selectedRowData?.name}
                onChange={handleNameChange}
              />

              {errors.name && (
                <div className="text-destructive mt-2">
                  {errors.name.message as string}
                </div>
              )}
              <Label className="my-3" htmlFor="message">
                Enter The Description
              </Label>
              <Textarea id="message" rows={3} {...register("desc")}>
                {selectedRowData?.desc || ""}
              </Textarea>

              {errors.desc && (
                <div className="text-destructive mt-2">
                  {errors.desc.message as string}
                </div>
              )}
              {/* Make sure the submit button is inside the form */}
              <DialogFooter className="mt-3">
                <Button
                  //  onClick={handleEditRow}
                  type="submit"
                >
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModulesPage;
