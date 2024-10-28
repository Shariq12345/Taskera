import React from "react";
import { Task } from "../types";
import { format } from "date-fns";
import { TaskActions } from "./task-actions";
import { MoreHorizontalIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";

interface KanbanCardProps {
  task: Task;
}

export const KanbanCard = ({ task }: KanbanCardProps) => {
  const formattedDueDate = task.dueDate
    ? format(new Date(task.dueDate), "MMM dd, yyyy")
    : "No due date";

  return (
    <div className="bg-white p-4 mb-3 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
      <div className="flex items-start justify-between gap-x-2">
        <p className="text-md font-semibold line-clamp-2 text-gray-800 hover:text-gray-900 transition-colors duration-200">
          {task.name}
        </p>
        <TaskActions id={task.$id} projectId={task.projectId}>
          <MoreHorizontalIcon className="w-5 h-5 text-gray-600 hover:text-gray-800 transition-opacity duration-200" />
        </TaskActions>
      </div>
      <Separator className="my-2" />

      <div className="flex items-center gap-x-3 text-gray-600">
        <MemberAvatar
          name={task.assignee?.name}
          fallbackClassName="text-[10px]"
        />
        <span className="text-xs font-medium">{task.assignee?.name}</span>
      </div>
      <Separator className="my-2" />

      <div className="flex items-center gap-x-2 mb-2">
        <ProjectAvatar
          name={task.project?.name}
          image={task.project.imageUrl}
          fallbackClassName="text-[10px]"
        />
        <span className="text-xs font-medium text-gray-700">
          {task.project.name}
        </span>
      </div>

      <div className="flex items-center justify-between gap-x-2 mt-2">
        <span className="text-xs font-semibold text-gray-500">Due Date:</span>
        <span
          className={`text-xs font-medium ${
            task.dueDate ? "text-red-500" : "text-gray-400"
          }`}
        >
          {formattedDueDate}
        </span>
      </div>
    </div>
  );
};
