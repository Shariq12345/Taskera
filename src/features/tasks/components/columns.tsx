"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Task } from "../types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Calendar, MoreVerticalIcon } from "lucide-react";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { TaskDate } from "./task-date";
import { Badge } from "@/components/ui/badge";
import { snakeCaseToTitleCase } from "@/lib/utils";
import { TaskActions } from "./task-actions";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full justify-start font-semibold text-gray-700 hover:text-primary"
        >
          Tasks
          <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original.name;
      return (
        <div className="flex items-center space-x-2 py-2">
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-gray-900 hover:text-primary transition-colors cursor-pointer">
              {name}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "project",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full justify-start font-semibold text-gray-700 hover:text-primary"
        >
          Project
          <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const project = row.original.project;
      return (
        <div className="flex items-center gap-2 group">
          <div className="flex items-center gap-2 px-2 py-1 rounded-lg group-hover:bg-gray-50 transition-all duration-200">
            <ProjectAvatar
              className="w-6 h-6 rounded-md shadow-sm"
              name={project.name}
              image={project.imageUrl}
            />
            <p className="text-sm font-medium text-gray-700 truncate">
              {project.name}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "assignee",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full justify-start font-semibold text-gray-700 hover:text-primary"
        >
          Assignee
          <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const assignee = row.original.assignee;
      return (
        <div className="flex items-center gap-2 group">
          <div className="flex items-center gap-2 px-2 py-1 rounded-lg group-hover:bg-gray-50 transition-all duration-200">
            <MemberAvatar
              className="w-7 h-7 border-2 border-white shadow-sm"
              fallbackClassName="text-xs"
              name={assignee.name}
            />
            <p className="text-sm font-medium text-gray-600">{assignee.name}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full justify-start font-semibold text-gray-700 hover:text-primary"
        >
          <Calendar className="mr-2 h-4 w-4" />
          Due Date
          <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dueDate = row.original.dueDate;
      return (
        <div className="flex items-center">
          <div className="px-2 py-1 rounded-lg hover:bg-gray-50 transition-all duration-200">
            <TaskDate value={dueDate} />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full justify-start font-semibold text-gray-700 hover:text-primary"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div className="flex items-center">
          <Badge
            variant={status}
            className="capitalize font-medium transition-all duration-200 hover:scale-105"
          >
            {snakeCaseToTitleCase(status)}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.$id;
      const projectId = row.original.projectId;

      return (
        <TaskActions id={id} projectId={projectId}>
          <Button variant={"ghost"} className="size-8 p-0">
            <MoreVerticalIcon className="size-4" />
          </Button>
        </TaskActions>
      );
    },
  },
];
