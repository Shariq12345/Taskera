import React from "react";
import { TaskStatus } from "../types";
import { snakeCaseToTitleCase } from "@/lib/utils";
import {
  CheckCircle2Icon,
  ClockIcon,
  ListTodoIcon,
  MoveRightIcon,
  LayoutGridIcon,
  PlusIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";

interface KanbanColumnHeaderProps {
  board: TaskStatus;
  tasksCount: number;
}

const statusIconMap: Record<TaskStatus, React.ReactNode> = {
  [TaskStatus.BACKLOG]: (
    <LayoutGridIcon className="size-[18px] text-slate-500 transition-colors group-hover:text-slate-700 stroke-[1.5px]" />
  ),
  [TaskStatus.TODO]: (
    <ListTodoIcon className="size-[18px] text-amber-500 transition-colors group-hover:text-amber-600 stroke-[1.5px]" />
  ),
  [TaskStatus.IN_PROGRESS]: (
    <ClockIcon className="size-[18px] text-blue-500 transition-colors group-hover:text-blue-600 stroke-[1.5px] animate-[spin_3s_linear_infinite]" />
  ),
  [TaskStatus.IN_REVIEW]: (
    <MoveRightIcon className="size-[18px] text-purple-500 transition-colors group-hover:text-purple-600 stroke-[1.5px]" />
  ),
  [TaskStatus.DONE]: (
    <CheckCircle2Icon className="size-[18px] text-emerald-500 transition-colors group-hover:text-emerald-600 stroke-[1.5px]" />
  ),
};

const getHeaderStyles = (status: TaskStatus) => {
  const baseStyles =
    "group px-3 py-2.5 flex items-center justify-between backdrop-blur-sm rounded-lg shadow-sm border transition-all duration-200";

  const statusStyles = {
    [TaskStatus.BACKLOG]:
      "bg-slate-50/50 hover:bg-slate-50 border-slate-200/50 hover:border-slate-300/50",
    [TaskStatus.TODO]:
      "bg-amber-50/50 hover:bg-amber-50 border-amber-200/50 hover:border-amber-300/50",
    [TaskStatus.IN_PROGRESS]:
      "bg-blue-50/50 hover:bg-blue-50 border-blue-200/50 hover:border-blue-300/50",
    [TaskStatus.IN_REVIEW]:
      "bg-purple-50/50 hover:bg-purple-50 border-purple-200/50 hover:border-purple-300/50",
    [TaskStatus.DONE]:
      "bg-emerald-50/50 hover:bg-emerald-50 border-emerald-200/50 hover:border-emerald-300/50",
  };

  const badgeStyles = {
    [TaskStatus.BACKLOG]:
      "bg-slate-100 text-slate-600 group-hover:bg-slate-200",
    [TaskStatus.TODO]: "bg-amber-100 text-amber-600 group-hover:bg-amber-200",
    [TaskStatus.IN_PROGRESS]:
      "bg-blue-100 text-blue-600 group-hover:bg-blue-200",
    [TaskStatus.IN_REVIEW]:
      "bg-purple-100 text-purple-600 group-hover:bg-purple-200",
    [TaskStatus.DONE]:
      "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200",
  };

  return {
    header: `${baseStyles} ${statusStyles[status]}`,
    badge: badgeStyles[status],
  };
};

export const KanbanColumnHeader = ({
  board,
  tasksCount,
}: KanbanColumnHeaderProps) => {
  const { open } = useCreateTaskModal();
  const icon = statusIconMap[board];
  const styles = getHeaderStyles(board);

  return (
    <div className={styles.header}>
      <div className="flex items-center gap-x-3">
        <div className="flex items-center gap-x-2">
          {icon}
          <h2 className="text-sm font-semibold text-slate-700 transition-colors group-hover:text-slate-900">
            {snakeCaseToTitleCase(board)}
          </h2>
        </div>
        <div
          className={`min-w-[24px] h-6 px-2 flex items-center justify-center rounded-full text-xs font-medium transition-colors ${styles.badge}`}
        >
          {tasksCount}
        </div>
      </div>
      <Button
        onClick={open}
        variant="ghost"
        size="icon"
        className="size-6 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white/60"
      >
        <PlusIcon className="size-4 text-slate-500 transition-colors hover:text-slate-900" />
      </Button>
    </div>
  );
};
