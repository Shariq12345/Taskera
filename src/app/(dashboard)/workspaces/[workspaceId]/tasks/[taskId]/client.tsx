"use client";

import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { Separator } from "@/components/ui/separator";
import { useGetTask } from "@/features/tasks/api/use-get-task";
import { TaskBreadCrumb } from "@/features/tasks/components/task-breadcrumb";
import { TaskDescription } from "@/features/tasks/components/task-description";
import { TaskOverview } from "@/features/tasks/components/task-overview";
import { useTaskId } from "@/features/tasks/hooks/use-task-id";

export const TaskIdClient = () => {
  const taskId = useTaskId();
  const { data, isLoading } = useGetTask({ taskId });

  if (isLoading) {
    return <PageLoader />;
  }

  if (!data) return <PageError message="Task Not Found" />;

  return (
    <div className="flex flex-col">
      <TaskBreadCrumb project={data.project} task={data} />
      <Separator className="  my-6" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TaskOverview task={data} />
        <TaskDescription task={data} />
      </div>
    </div>
  );
};
