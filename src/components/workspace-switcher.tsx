"use client";

import React from "react";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const WorkspaceSwitcher = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { data: workspaces } = useGetWorkspaces();
  const { open } = useCreateWorkspaceModal();

  const onSelect = (workspaceId: string) => {
    router.push(`/workspaces/${workspaceId}`);
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-y-3 mb-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold tracking-wider text-neutral-600">
            WORKSPACES
          </p>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={open}
                className="group transition-all hover:bg-neutral-100 p-1 rounded-md"
              >
                <Plus className="size-4 text-neutral-600 group-hover:text-neutral-900 transition-all" />
              </button>
            </TooltipTrigger>
            <TooltipContent>New Workspace</TooltipContent>
          </Tooltip>
        </div>

        <Select onValueChange={onSelect} value={workspaceId}>
          <SelectTrigger className="w-full bg-white/80 hover:bg-white transition-colors border border-neutral-200 rounded-lg shadow-sm">
            <SelectValue
              placeholder="Select workspace"
              className="text-neutral-600"
            />
          </SelectTrigger>
          <SelectContent className="bg-white/95 backdrop-blur-lg border border-neutral-200">
            {workspaces?.documents.map((workspace) => (
              <SelectItem
                key={workspace.$id}
                value={workspace.$id}
                className="hover:bg-neutral-100 transition-colors focus:bg-neutral-100 cursor-pointer"
              >
                <div className="flex items-center gap-3 py-1">
                  <WorkspaceAvatar
                    name={workspace.name}
                    image={workspace.imageUrl}
                  />
                  <span className="truncate font-medium text-neutral-700">
                    {workspace.name}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </TooltipProvider>
  );
};
