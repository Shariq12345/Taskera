"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createTaskSchema } from "../schemas";
import { useCreateTask } from "../api/use-create-task";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { DatePicker } from "@/components/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { TaskStatus } from "../types";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";

interface CreateTaskFormProps {
  onCancel?: () => void;
  projectOptions: { id: string; name: string; imageUrl: string }[];
  memberOptions: { id: string; name: string }[];
}

export const CreateTaskForm = ({
  onCancel,
  memberOptions,
  projectOptions,
}: CreateTaskFormProps) => {
  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useCreateTask();

  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema.omit({ workspaceId: true })),
    defaultValues: {
      workspaceId,
    },
  });

  const onSubmit = async (values: z.infer<typeof createTaskSchema>) => {
    mutate(
      { json: { ...values, workspaceId } },
      {
        onSuccess: () => {
          form.reset();
          onCancel?.();
        },
      }
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md border-0">
      <CardHeader className="pb-6 pt-8 px-8">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary/10 rounded-xl">
            <CalendarCheck className="w-7 h-7 text-primary" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold text-slate-800">
              Create New Task
            </CardTitle>
            <p className="text-sm text-slate-500">
              Add a new task to your workspace
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8 pt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel className="text-sm font-medium text-slate-700">
                      Task Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter task name"
                        className="h-11 bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary/20 rounded-lg transition-colors"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-700">
                      Due Date
                    </FormLabel>
                    <FormControl>
                      <DatePicker {...field} className="w-full" />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assigneeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-700">
                      Assignee
                    </FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11 bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary/20 rounded-lg transition-colors">
                          <SelectValue placeholder="Select assignee" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                      <SelectContent className="border-slate-200 shadow-lg rounded-lg">
                        {memberOptions.map((member) => (
                          <SelectItem
                            key={member.id}
                            value={member.id}
                            className="focus:bg-slate-100 cursor-pointer"
                          >
                            <div className="flex items-center gap-x-3">
                              <MemberAvatar
                                className="size-7"
                                name={member.name}
                              />
                              <span className="text-slate-700">
                                {member.name}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-slate-700">
                      Status
                    </FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11 bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary/20 rounded-lg transition-colors">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                      <SelectContent className="border-slate-200 shadow-lg rounded-lg">
                        <SelectItem
                          value={TaskStatus.BACKLOG}
                          className="focus:bg-slate-100"
                        >
                          <div className="flex items-center gap-x-2">
                            <div className="size-2 rounded-full bg-slate-400" />
                            <span>Backlog</span>
                          </div>
                        </SelectItem>
                        <SelectItem
                          value={TaskStatus.IN_PROGRESS}
                          className="focus:bg-slate-100"
                        >
                          <div className="flex items-center gap-x-2">
                            <div className="size-2 rounded-full bg-blue-400" />
                            <span>In Progress</span>
                          </div>
                        </SelectItem>
                        <SelectItem
                          value={TaskStatus.IN_REVIEW}
                          className="focus:bg-slate-100"
                        >
                          <div className="flex items-center gap-x-2">
                            <div className="size-2 rounded-full bg-purple-400" />
                            <span>In Review</span>
                          </div>
                        </SelectItem>
                        <SelectItem
                          value={TaskStatus.TODO}
                          className="focus:bg-slate-100"
                        >
                          <div className="flex items-center gap-x-2">
                            <div className="size-2 rounded-full bg-yellow-400" />
                            <span>Todo</span>
                          </div>
                        </SelectItem>
                        <SelectItem
                          value={TaskStatus.DONE}
                          className="focus:bg-slate-100"
                        >
                          <div className="flex items-center gap-x-2">
                            <div className="size-2 rounded-full bg-green-400" />
                            <span>Done</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel className="text-sm font-medium text-slate-700">
                      Project
                    </FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11 bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary/20 rounded-lg transition-colors">
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                      <SelectContent className="border-slate-200 shadow-lg rounded-lg">
                        {projectOptions.map((project) => (
                          <SelectItem
                            key={project.id}
                            value={project.id}
                            className="focus:bg-slate-100 cursor-pointer"
                          >
                            <div className="flex items-center gap-x-3">
                              <ProjectAvatar
                                className="size-7"
                                name={project.name}
                                image={project.imageUrl}
                              />
                              <span className="text-slate-700">
                                {project.name}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={onCancel}
                className={cn(
                  "w-32 h-11 font-medium transition-all hover:bg-slate-100",
                  onCancel ? "block" : "hidden"
                )}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-32 h-11 font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-70"
                disabled={isPending}
              >
                {isPending ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating...</span>
                  </div>
                ) : (
                  "Create Task"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
