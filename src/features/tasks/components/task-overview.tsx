import React from "react";
import { Task } from "../types";
import { Button } from "@/components/ui/button";
import { PencilIcon, UserCircle, Calendar, Clock } from "lucide-react";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import TaskDate from "./task-date";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { snakeCaseToTitleCase } from "@/lib/utils";
import { useUpdateTaskModal } from "../hooks/use-edit-task-modal";

interface TaskOverviewProps {
  task: Task;
}

export const TaskOverview = ({ task }: TaskOverviewProps) => {
  const { open } = useUpdateTaskModal();

  return (
    <div className="w-full max-w-3xl bg-background rounded-lg border border-border/40 p-6 shadow-md transition-shadow duration-150 hover:shadow-lg md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold">Task Overview</h3>
          <p className="text-sm text-muted-foreground">
            Task details and progress tracking
          </p>
        </div>
        <Button
          onClick={() => open(task.$id)}
          variant="outline"
          size="sm"
          className="gap-x-2"
        >
          <PencilIcon className="size-4" />
          Edit
        </Button>
      </div>

      <Separator className="my-4" />

      {/* Assignee Section */}
      <div className="mb-4 bg-accent/10 rounded-lg p-4">
        <div className="flex items-center gap-x-3 text-sm text-muted-foreground mb-2">
          <UserCircle className="size-4" />
          Assignee
        </div>
        <div className="flex items-center gap-x-3">
          <div className="bg-secondary rounded-full w-8 h-8 flex items-center justify-center text-lg font-medium">
            {task.assignee.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium">{task.assignee.name}</p>
            <p className="text-sm text-muted-foreground">Task Owner</p>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Due Date and Status Grid */}
      <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
        <div className="bg-accent/10 rounded-lg p-4">
          <div className="flex items-center gap-x-3 text-sm text-muted-foreground mb-2">
            <Calendar className="size-4" />
            Due Date
          </div>
          <div className="flex items-center gap-x-2">
            <div className="inline-flex items-center gap-x-1 px-2 py-1 rounded-md text-sm">
              <TaskDate value={task.dueDate} className="rounded-md" />
            </div>
          </div>
        </div>

        <div className="bg-accent/10 rounded-lg p-4">
          <div className="flex items-center gap-x-3 text-sm text-muted-foreground mb-2">
            <Clock className="size-4" />
            Status
          </div>
          <div className="flex items-center gap-x-2">
            <Badge
              variant={task.status}
              className="capitalize px-3 py-1 text-sm font-medium rounded-md"
            >
              {snakeCaseToTitleCase(task.status)}
            </Badge>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Progress Bar */}
      {/* <div className="bg-accent/10 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm text-muted-foreground">Updated 2h ago</span>
        </div>
        <div className="w-full bg-secondary h-2 rounded-full">
          <div className="bg-blue-700 w-1/2 h-2 rounded-full" />
        </div>
      </div> */}
    </div>
  );
};

export default TaskOverview;
