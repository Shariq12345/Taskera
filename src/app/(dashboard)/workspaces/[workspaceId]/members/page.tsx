import React from "react";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { MembersList } from "@/features/workspaces/components/members-list";

const WorkspaceIdMemberPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/");

  return (
    <div className="">
      <MembersList />
    </div>
  );
};

export default WorkspaceIdMemberPage;
