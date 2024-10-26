"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Plus } from "lucide-react";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";

export const Projects = () => {
  const { open } = useCreateProjectModal();
  const pathname = usePathname();
  const workspaceId = useWorkspaceId();
  const { data } = useGetProjects({ workspaceId });
  return (
    <div className="flex flex-col gap-y-3 mb-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold tracking-wider text-neutral-600">
          PROJECTS
        </p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={open}
                className="group transition-all hover:bg-neutral-100 p-1 rounded-md"
              >
                <Plus className="size-4 text-neutral-600 group-hover:text-neutral-900 transition-all" />
              </button>
            </TooltipTrigger>
            <TooltipContent>New Project</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {data?.documents.map((project) => {
        const href = `/workspaces/${workspaceId}/projects/${project.$id}`;
        const isActive = pathname === href;

        return (
          <Link href={href} key={project.$id}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md hover:opacity-75 transition cursor-pointer text-neutral-500",
                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
              )}
            >
              <ProjectAvatar image={project.imageUrl} name={project.name} />
              <span className="truncate text-sm">{project.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
