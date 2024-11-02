import React, { useState } from "react";
import { Task } from "../types";
import { useUpdateTask } from "../api/use-update-task";
import { PencilIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

interface TaskDescriptionProps {
  task: Task;
}

export const TaskDescription = ({ task }: TaskDescriptionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.description);

  const { mutate, isPending } = useUpdateTask();

  const handleSave = async () => {
    mutate(
      {
        json: {
          description: value,
        },
        param: {
          taskId: task.$id,
        },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  return (
    <div className="p-4 md:p-8 bg-background border rounded-lg shadow-md transition-shadow duration-150 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Task Description</h3>
          <p className="text-sm text-muted-foreground">
            Add a description to your task
          </p>
        </div>
        <Button
          onClick={() => setIsEditing((prev) => !prev)}
          size="sm"
          variant="outline"
          className="gap-x-2"
        >
          {isEditing ? (
            <XIcon className="size-4" />
          ) : (
            <PencilIcon className="size-4" />
          )}
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>
      <Separator className="my-4" />
      {isEditing ? (
        <div className="flex flex-col gap-y-4">
          <Textarea
            placeholder="Add a description"
            value={value}
            rows={10}
            onChange={(e) => setValue(e.target.value)}
            disabled={isPending}
            className="border-muted focus:border-primary"
          />
          <Button
            size="sm"
            className="w-fit ml-auto"
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      ) : (
        <div className="text-sm">
          {task.description || (
            <span className="italic text-muted-foreground">
              No description provided
            </span>
          )}
        </div>
      )}
    </div>
  );
};
