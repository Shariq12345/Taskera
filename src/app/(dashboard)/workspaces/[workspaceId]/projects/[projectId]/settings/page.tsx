import React from "react";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { SettingsClient } from "./client";

const ProjectSettingsPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <SettingsClient />;
};

export default ProjectSettingsPage;
