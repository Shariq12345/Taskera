import React from "react";
import { getCurrent } from "@/features/auth/queries";
import { getWorkspaceInfo } from "@/features/workspaces/queries";
import { redirect } from "next/navigation";
import { JoinWorkspaceForm } from "@/components/join-workspace-form";

interface WorkspaceIdJoinPageProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdJoinPage = async ({ params }: WorkspaceIdJoinPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/");

  const initialValues = await getWorkspaceInfo({
    workspaceId: params.workspaceId,
  });

  if (!initialValues) {
    redirect("/");
  }

  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceForm initialValues={initialValues} />
    </div>
  );
};

export default WorkspaceIdJoinPage;
