"use client";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { useState } from "react";
import zod from "zod";
import z from "zod";
import { Module, modules } from "@/app/[lang]/modules/(data)/data";
import BasicDataTable from "@/components/datatables/basic-table";
import { ColumnDef } from "@tanstack/react-table";

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

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import BasicDataTable, { setData } from "./(components)/datatable";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set } from "date-fns";

const ModulePage = () => {
  const [open, setOpen] = useState(false);
  const [modulesData, setModulesData] = useState<Module[]>(modules);

  const handleFormSubmit = (data: { name: string; desc: string }) => {
    const newModule = {
      id: modulesData.length + 1, // Assign a unique ID
      name: data.name,
      desc: data.desc,
      status: 1, // Assuming a default status of 1 (active)
    };

    setModulesData([...modulesData, newModule]);
    console.log(modulesData);

    setOpen(false); // Close the modal
    reset();
  };

  // Zod Resolver ----------------
  const {
    register,
    handleSubmit: handleModuleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema_name),
    mode: "all",
  });

  //   CREATE COLUMNS
  const columns: ColumnDef<Module>[] = [
    {
      accessorKey: "name",
      header: "Module Name",
      cell: ({ row }) => <span>{row.original.name}</span>,
    },
    {
      accessorKey: "desc",
      header: "Description",
      cell: ({ row }) => <span>{row.original.desc}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span>{row.original.status === 1 ? "Active" : "Inactive"}</span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const module = row.original;
        return (
          <div className="flex space-x-2">
            <Button onClick={() => handleEditModule(module)}>Edit</Button>
            <Button onClick={() => handleRemoveModule(module.id)}>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const handleAddModule = () => {
    alert("adeel called");

    const newId = modulesData.length ? modulesData[modulesData.length - 1].id + 1 : 1;
      const newModuleData: Module = {
        id: newId,
        name: `Module ${newId}`,
        desc: `Description ${newId}`,
        status: 1,
      };
      setModulesData([...modulesData, newModuleData]);

      console.log(modulesData);
  };
  const handleEditModule = (module: Module) => {};
  const handleRemoveModule = (id: number) => {   
  };


  //   setData(modules);

  return (
    <>
      <div className="-mt-1">
        <Breadcrumbs>
          <BreadcrumbItem>Modules</BreadcrumbItem>
          <BreadcrumbItem className="text-primary"></BreadcrumbItem>
        </Breadcrumbs>
        <div className="mt-4 p-5 rounded-lg bg-white ">
          <div className="flex justify-between">
            <h1 className="mb-3 text-xl">Search Module</h1>
            <Button onClick={handleAddModule}>
            {/* <Button onClick={() => setOpen(true)}> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                className="mr-1"
                viewBox="0 0 24 24"
              >
                <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
                  <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12m10-8a8 8 0 1 0 0 16a8 8 0 0 0 0-16" />
                  <path d="M13 7a1 1 0 1 0-2 0v4H7a1 1 0 1 0 0 2h4v4a1 1 0 1 0 2 0v-4h4a1 1 0 1 0 0-2h-4z" />
                </g>
              </svg>
              New Module
            </Button>
          </div>

          <hr className="my-3" />
          <div className="mt-5">
            {/* Display the modules table */}
            <BasicDataTable data={modulesData} columns={columns} /> 
          </div>
        </div>
      </div>

      {/* Modals */}
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
                handleFormSubmit(data); // This will add the new module
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
    </>
  );
};

export default ModulePage;
