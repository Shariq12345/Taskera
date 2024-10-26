import React from "react";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { getProject } from "@/features/projects/queries";
import { EditProjectForm } from "@/features/projects/components/edit-project-form";

interface ProjectSettingsPageProps {
  params: {
    projectId: string;
  };
}

const ProjectSettingsPage = async ({ params }: ProjectSettingsPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const initialValues = await getProject({
    projectId: params.projectId,
  });

  return (
    <div>
      <EditProjectForm initialValues={initialValues} />
    </div>
  );
};

export default ProjectSettingsPage;
