"use client";
import React, { useCallback } from "react";
import { useQueryState } from "nuqs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  PlusIcon,
  TableIcon,
  KanbanIcon,
  CalendarIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { useGetTasks } from "../api/use-get-tasks";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { DataFilters } from "./data-filters";
import { useTaskFilters } from "../hooks/use-task-filters";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { DataKanban } from "./data-kanban";
import { TaskStatus } from "../types";
import { useBulkUpdateTasks } from "../api/use-bulk-update-tasks";
import { DataCalendar } from "./data-calendar";

export const TaskViewSwitcher = () => {
  const { open } = useCreateTaskModal();
  const { mutate: bulkUpdate } = useBulkUpdateTasks();
  const [{ status, assigneeId, projectId, dueDate }] = useTaskFilters();

  const [view, setView] = useQueryState("task-view", {
    defaultValue: "table",
  });

  const workspaceId = useWorkspaceId();

  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
    projectId,
    assigneeId,
    status,
    dueDate,
  });

  const onKanbanChange = useCallback(
    (tasks: { $id: string; status: TaskStatus; position: number }[]) => {
      bulkUpdate({
        json: { tasks },
      });
    },
    [bulkUpdate]
  );

  return (
    <Tabs
      defaultValue={view}
      onValueChange={setView}
      className="flex-1 w-full border rounded-lg border-gray-300"
    >
      <div className="h-full flex flex-col overflow-auto p-4 bg-gray-50 rounded-lg shadow-md">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger
              className="h-10 w-full lg:w-auto flex items-center justify-center font-medium text-gray-700 hover:bg-gray-200 transition duration-200"
              value="table"
            >
              <TableIcon className="w-4 h-4 mr-1" /> Table
            </TabsTrigger>
            <TabsTrigger
              className="h-10 w-full lg:w-auto flex items-center justify-center font-medium text-gray-700 hover:bg-gray-200 transition duration-200"
              value="kanban"
            >
              <KanbanIcon className="w-4 h-4 mr-1" /> Kanban
            </TabsTrigger>
            <TabsTrigger
              className="h-10 w-full lg:w-auto flex items-center justify-center font-medium text-gray-700 hover:bg-gray-200 transition duration-200"
              value="calendar"
            >
              <CalendarIcon className="w-4 h-4 mr-1" /> Calendar
            </TabsTrigger>
          </TabsList>
          <Button
            onClick={open}
            size="sm"
            className="w-full lg:w-auto bg-blue-600 text-white hover:bg-blue-700 transition duration-200 flex items-center justify-center"
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            New Task
          </Button>
        </div>
        <Separator className="my-4 border-gray-300" />

        <DataFilters />
        <Separator className="my-4 border-gray-300" />

        {isLoadingTasks ? (
          <div className="w-full border-rounded-lg h-[200px] flex flex-col items-center justify-center">
            <Loader2 className="size-5 animate-spin text-blue-600" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <DataTable columns={columns} data={tasks?.documents ?? []} />
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              <DataKanban
                data={tasks?.documents ?? []}
                onChange={onKanbanChange}
              />
            </TabsContent>
            <TabsContent value="calendar" className="mt-0 h-full pb-4">
              <DataCalendar data={tasks?.documents ?? []} />
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
};
