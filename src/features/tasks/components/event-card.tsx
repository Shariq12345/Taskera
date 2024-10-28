"use client";
import React from "react";
import { Project } from "@/features/projects/types";
import { TaskStatus } from "../types";
import { cn } from "@/lib/utils";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useRouter } from "next/navigation";

interface EventCardProps {
  title: string;
  assignee: any;
  project: Project;
  status: TaskStatus;
  id: string;
}

const statusColorMap: Record<TaskStatus, string> = {
  [TaskStatus.BACKLOG]: "border-l-slate-500",
  [TaskStatus.TODO]: "border-l-amber-500",
  [TaskStatus.IN_PROGRESS]: "border-l-blue-500",
  [TaskStatus.IN_REVIEW]: "border-l-purple-500",
  [TaskStatus.DONE]: "border-l-emerald-500",
};

export const EventCard = ({
  assignee,
  id,
  project,
  status,
  title,
}: EventCardProps) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  };
  return (
    <div className="px-2">
      <div
        onClick={handleOnClick}
        className={cn(
          "p-3 bg-white text-primary shadow-sm rounded-lg border border-neutral-200 border-l-4 flex flex-col gap-y-3 cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg",
          statusColorMap[status]
        )}
      >
        <p className="text-sm font-semibold text-gray-800 line-clamp-2">
          {title}
        </p>

        <div className="flex flex-col gap-y-2 text-gray-600">
          {/* Assignee Section */}
          <div className="flex items-center gap-x-2">
            <MemberAvatar
              name={assignee?.name}
              fallbackClassName="text-[10px]"
            />
            <span className="text-xs font-medium">{assignee?.name}</span>
          </div>

          {/* Project Section */}
          <div className="flex items-center gap-x-2">
            <ProjectAvatar name={project?.name} image={project?.imageUrl} />
            <span className="text-xs font-medium">{project?.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
