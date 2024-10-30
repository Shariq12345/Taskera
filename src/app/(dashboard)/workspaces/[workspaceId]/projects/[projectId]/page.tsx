import React from "react";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { getProject } from "@/features/projects/queries";
import { ProjectClient } from "./client";

const ProjectIdPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <ProjectClient />;
};

export default ProjectIdPage;
