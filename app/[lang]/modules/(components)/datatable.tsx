"use client";
import * as React from "react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import zod, { any } from "zod";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
// ---------Dialog-----------

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Module, modules } from "../(data)/data";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

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

const [data, setData] = useState<Module[]>([...modules]);

export function BasicDataTable({ newrow }: { newrow: Module[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [openTrashModel, setOpenTrashModel] = useState(false);
  const [openEditModel, setOpenEditModel] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<Module | null>(null);
  // const [data, setData] = useState(modules);

  const {
    register,
    handleSubmit: handleModuleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema_name),
    mode: "all",
  });

  const handleDelete = () => {
    if (selectedRowData) {
      const updatedData = data.filter(
        (module) => module.id !== selectedRowData.id
      );
      setData(updatedData); // Update the data state
      setOpenTrashModel(false); // Close the modal
    }
  };

  const columns: ColumnDef<Module>[] = [
    {
      id: "id",
      header: ({ table }) => <label htmlFor="">Sr #</label>,
      cell: ({ row }) => <h1>{row.index + 1}</h1>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "module",
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
      accessorKey: "module",
      header: "Desc",
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
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => {
        const action = parseFloat(row.getValue("action"));
        return (
          <div className="text-center font-medium">
            <TableCell className="flex gap-3  justify-center">
              <Button
                size="icon"
                variant="outline"
                className=" h-7 w-7"
                color="secondary"
                onClick={() => {
                  setOpenEditModel(true);
                  setSelectedRowData(row.original);
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
            </TableCell>
          </div>
        );
      },
    },
  ];

  const options = {
    data: data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setSelectedRowData((prevData: any) => ({
      ...prevData,
      name: newName,
    }));
  };

  const table = useReactTable(options);

  return (
    <>
      <div className="flex items-center flex-wrap gap-2  px-4">
        <Input
          placeholder="Filter name..."
          value={(table.getColumn("name")?.getFilterValue() as string) || ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm min-w-[200px] h-10"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center flex-wrap gap-4 px-4 py-4">
        <div className="flex-1 text-sm text-muted-foreground whitespace-nowrap">
          {table.getFilteredSelectedRowModel().rows.length} of
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        <div className="flex gap-2  items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-8 w-8"
          >
            <Icon
              icon="heroicons:chevron-left"
              className="w-5 h-5 rtl:rotate-180"
            />
          </Button>

          {table.getPageOptions().map((page, pageIdx) => (
            <Button
              key={`basic-data-table-${pageIdx}`}
              onClick={() => table.setPageIndex(pageIdx)}
              className={cn("w-8 h-8")}
            >
              {page + 1}
            </Button>
          ))}
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            <Icon
              icon="heroicons:chevron-right"
              className="w-5 h-5 rtl:rotate-180"
            />
          </Button>
        </div>
      </div>

      {/*Trash Modal */}

      <Dialog open={openTrashModel} onOpenChange={setOpenTrashModel}>
        <DialogContent className="top-['unset'] bottom-2 translate-y-0">
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

      <Dialog open={openEditModel} onOpenChange={setOpenEditModel}>
        <DialogContent size="2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-default-700 ">
              Edit {selectedRowData?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="text-sm text-default-500 space-y-4">
            <form
              onSubmit={handleModuleSubmit((data) => {
                const updatedData = data.map((module: any) =>
                  module.id === selectedRowData?.id ? data : module
                );
                setData(updatedData);
                console.log(data);
                setOpenEditModel(false);
              })}
            >
              <Label className="mb-3" htmlFor="name">
                Enter The Name
              </Label>
              <Input
                type="text"
                placeholder="Enter Your Name"
                id="username"
                // required
                value={selectedRowData?.name}
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
              <Textarea id="message" rows={3}>
                {selectedRowData?.desc || ""}
                {/* onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => setSelectedRowData(prev ? ({ ...prev, desc: e.target.value }))} */}
              </Textarea>

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
}

export default BasicDataTable;
