"use client";

import React from "react";
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { PageLoader } from "@/components/page-loader";
import { PageError } from "@/components/page-error";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";

export const WorkspaceSettingsClient = () => {
  const workspaceId = useWorkspaceId();
  const { data: initialValues, isLoading } = useGetWorkspace({ workspaceId });

  if (isLoading) {
    return <PageLoader />;
  }

  if (!initialValues) {
    return <PageError message="Workspace not found" />;
  }
  return (
    <div>
      <EditWorkspaceForm initialValues={initialValues} />
    </div>
  );
};