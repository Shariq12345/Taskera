"use client";
import React from "react";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useGetMembers } from "@/features/members/api/use-get-members";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FolderIcon, ListChecksIcon, UserIcon } from "lucide-react";
import { TaskStatus } from "../types";
import { useTaskFilters } from "../hooks/use-task-filters";
import { DatePicker } from "@/components/date-picker";

interface DataFiltersProps {
  hideProjectFilter?: boolean;
}

export const DataFilters = ({ hideProjectFilter }: DataFiltersProps) => {
  const workspaceId = useWorkspaceId();

  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId,
  });

  const isLoading = isLoadingProjects || isLoadingMembers;

  const projectOptions = projects?.documents.map((project) => ({
    value: project.$id,
    label: project.name,
  }));

  const memberOptions = members?.documents.map((member) => ({
    value: member.$id,
    label: member.name,
  }));

  const [{ status, assigneeId, projectId, dueDate }, setFilters] =
    useTaskFilters();

  const onStatusChange = (value: string) => {
    setFilters({ status: value === "all" ? null : (value as TaskStatus) });
  };

  const onAssigneeChange = (value: string) => {
    setFilters({ assigneeId: value === "all" ? null : (value as string) });
  };

  const onProjectChange = (value: string) => {
    setFilters({ projectId: value === "all" ? null : (value as string) });
  };

  if (isLoading) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-3 bg-white p-2 rounded-lg shadow-sm border border-slate-200">
      {/* STATUS */}
      <Select
        defaultValue={status ?? undefined}
        onValueChange={(value) => onStatusChange(value)}
      >
        <SelectTrigger className="w-full lg:w-[180px] h-10 bg-slate-50 hover:bg-slate-100 transition-colors border-slate-200 rounded-lg">
          <div className="flex items-center">
            <div className="flex items-center gap-2 text-slate-600">
              <ListChecksIcon className="size-4 text-slate-500" />
              <SelectValue placeholder="All statuses" />
            </div>
          </div>
        </SelectTrigger>
        <SelectContent className="bg-white rounded-lg border-slate-200 shadow-lg">
          <SelectItem className="cursor-pointer hover:bg-slate-50" value="all">
            <span className="font-medium">All Statuses</span>
          </SelectItem>
          <SelectSeparator className="my-1 bg-slate-100" />
          <SelectItem
            className="cursor-pointer hover:bg-slate-50"
            value={TaskStatus.BACKLOG}
          >
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-slate-400" />
              Backlog
            </div>
          </SelectItem>
          <SelectItem
            className="cursor-pointer hover:bg-slate-50"
            value={TaskStatus.IN_PROGRESS}
          >
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-blue-400" />
              In Progress
            </div>
          </SelectItem>
          <SelectItem
            className="cursor-pointer hover:bg-slate-50"
            value={TaskStatus.IN_REVIEW}
          >
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-purple-400" />
              In Review
            </div>
          </SelectItem>
          <SelectItem
            className="cursor-pointer hover:bg-slate-50"
            value={TaskStatus.TODO}
          >
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-yellow-400" />
              Todo
            </div>
          </SelectItem>
          <SelectItem
            className="cursor-pointer hover:bg-slate-50"
            value={TaskStatus.DONE}
          >
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-green-400" />
              Done
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      {/* ASSIGNEE */}
      <Select
        defaultValue={assigneeId ?? undefined}
        onValueChange={(value) => onAssigneeChange(value)}
      >
        <SelectTrigger className="w-full lg:w-[180px] h-10 bg-slate-50 hover:bg-slate-100 transition-colors border-slate-200 rounded-lg">
          <div className="flex items-center">
            <div className="flex items-center gap-2 text-slate-600">
              <UserIcon className="size-4 text-slate-500" />
              <SelectValue placeholder="All assignees" />
            </div>
          </div>
        </SelectTrigger>
        <SelectContent className="bg-white rounded-lg border-slate-200 shadow-lg">
          <SelectItem className="cursor-pointer hover:bg-slate-50" value="all">
            <span className="font-medium">All assignees</span>
          </SelectItem>
          <SelectSeparator className="my-1 bg-slate-100" />
          {memberOptions?.map((member) => (
            <SelectItem
              key={member.value}
              className="cursor-pointer hover:bg-slate-50"
              value={member.value}
            >
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs text-primary font-medium">
                    {member.label.charAt(0)}
                  </span>
                </div>
                {member.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* PROJECT */}
      {!hideProjectFilter && (
        <Select
          defaultValue={projectId ?? undefined}
          onValueChange={(value) => onProjectChange(value)}
        >
          <SelectTrigger className="w-full lg:w-[180px] h-10 bg-slate-50 hover:bg-slate-100 transition-colors border-slate-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex items-center gap-2 text-slate-600">
                <FolderIcon className="size-4 text-slate-500" />
                <SelectValue placeholder="All projects" />
              </div>
            </div>
          </SelectTrigger>
          <SelectContent className="bg-white rounded-lg border-slate-200 shadow-lg">
            <SelectItem
              className="cursor-pointer hover:bg-slate-50"
              value="all"
            >
              <span className="font-medium">All projects</span>
            </SelectItem>
            <SelectSeparator className="my-1 bg-slate-100" />
            {projectOptions?.map((project) => (
              <SelectItem
                key={project.value}
                className="cursor-pointer hover:bg-slate-50"
                value={project.value}
              >
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FolderIcon className="size-3 text-primary" />
                  </div>
                  {project.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <DatePicker
        placeholder="Due Date"
        className="w-full lg:w-[180px] h-10 bg-slate-50 hover:bg-slate-100 transition-colors border-slate-200 rounded-lg"
        value={dueDate ? new Date(dueDate) : undefined}
        onChange={(date) => {
          setFilters({ dueDate: date ? date.toISOString() : null });
        }}
      />
    </div>
  );
};
