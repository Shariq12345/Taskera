import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Edit3Icon,
  FileTextIcon,
  FolderOpenIcon,
  Trash2Icon,
} from "lucide-react";
import React from "react";
import { useDeleteTask } from "../api/use-delete-task";
import { useConfirm } from "@/hooks/use-confirm";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useUpdateTaskModal } from "../hooks/use-edit-task-modal";

interface TaskActionsProps {
  id: string;
  projectId: string;
  children: React.ReactNode;
}

export const TaskActions = ({ children, id, projectId }: TaskActionsProps) => {
  const workspaceId = useWorkspaceId();

  const { open } = useUpdateTaskModal();

  const router = useRouter();
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Task",
    "Are you sure you want to delete this task?",
    "destructive"
  );

  const { mutate: deleteTask, isPending: isDeletingTask } = useDeleteTask();

  const onDelete = async () => {
    const ok = await confirm();

    if (!ok) return;

    deleteTask({
      param: {
        taskId: id,
      },
    });
  };

  const onOpenTask = () => {
    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  };

  const onOpenProject = () => {
    router.push(`/workspaces/${workspaceId}/projects/${projectId}`);
  };

  return (
    <div className="flex justify-end">
      <ConfirmDialog />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild className="focus:outline-none">
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 p-1.5 border border-gray-100 shadow-lg animate-in fade-in-0 zoom-in-95"
        >
          <DropdownMenuItem
            onClick={onOpenTask}
            className="group flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 focus:text-gray-900 rounded-md transition-colors cursor-pointer"
          >
            <FileTextIcon className="size-4 stroke-2 text-gray-500 group-hover:text-gray-700 group-focus:text-gray-700 transition-colors" />
            <span>Task Details</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={onOpenProject}
            className="group flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-blue-600 hover:text-blue-700 focus:text-blue-700 hover:bg-blue-50 focus:bg-blue-50 rounded-md transition-colors cursor-pointer"
          >
            <FolderOpenIcon className="size-4 stroke-2 group-hover:text-blue-700 group-focus:text-blue-700 transition-colors" />
            <span>Open Project</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-1.5 bg-gray-100" />

          <DropdownMenuItem
            onClick={() => open(id)}
            className="group flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 focus:text-gray-900 rounded-md transition-colors cursor-pointer"
          >
            <Edit3Icon className="size-4 stroke-2 text-gray-500 group-hover:text-gray-700 group-focus:text-gray-700 transition-colors" />
            <span>Edit Task</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={onDelete}
            disabled={isDeletingTask}
            className="group flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-rose-600 hover:text-rose-700 focus:text-rose-700 hover:bg-rose-50 focus:bg-rose-50 rounded-md transition-colors cursor-pointer"
          >
            <Trash2Icon className="size-4 stroke-2 group-hover:text-rose-700 group-focus:text-rose-700 transition-colors" />
            <span>Delete Task</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
