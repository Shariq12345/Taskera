"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { updateProjectSchema } from "../schemas";
import { Project } from "../types";

import { useUpdateProject } from "../api/use-update-project";
import { useDeleteProject } from "../api/use-delete-project";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useConfirm } from "@/hooks/use-confirm";

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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  ImageIcon,
  Loader2,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface EditProjectFormProps {
  onCancel?: () => void;
  initialValues: Project;
}

export const EditProjectForm = ({
  onCancel,
  initialValues,
}: EditProjectFormProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useUpdateProject();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();
  const inputRef = useRef<HTMLInputElement>(null);

  const [DeleteDialog, confirmDelete] = useConfirm(
    "Delete Project",
    "Are you sure you want to delete this project?",
    "destructive"
  );

  const form = useForm<z.infer<typeof updateProjectSchema>>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      ...initialValues,
      image: initialValues.imageUrl ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof updateProjectSchema>) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : "",
    };
    mutate({ form: finalValues, param: { projectId: initialValues.$id } });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      form.setValue("image", file);
    }
  };

  const handleDelete = async () => {
    const ok = await confirmDelete();

    if (!ok) {
      return;
    }

    deleteProject(
      {
        param: { projectId: initialValues.$id },
      },
      {
        onSuccess: () => {
          // router.push("/");
          window.location.href = `/workspaces/${initialValues.workspaceId}`;
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-y-4 min-h-[80vh] bg-gray-50/50 p-4 sm:p-6">
      <DeleteDialog />
      <Card className="w-full max-w-2xl mx-auto border shadow-md">
        <CardHeader className="border-b bg-white/80 backdrop-blur-sm p-4 sm:p-6">
          <div className="flex items-center gap-4">
            <Button
              size="sm"
              variant="ghost"
              onClick={
                onCancel
                  ? onCancel
                  : () =>
                      router.push(
                        `/workspaces/${workspaceId}/projects/${initialValues.$id}`
                      )
              }
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <div className="flex items-center gap-3 sm:gap-4 flex-1">
              <div className="p-2 sm:p-2.5 bg-primary/10 rounded-full">
                <Building2 className="size-4 sm:size-5 text-primary" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg sm:text-xl font-semibold">
                  Update <span className="text-blue-600">Project</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Customize your project settings and appearance
                </p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 sm:space-y-8"
            >
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <div className="p-4 sm:p-6 bg-gray-50 rounded-lg border">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                      {field.value ? (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 relative rounded-lg overflow-hidden border-2 border-white shadow-sm mx-auto sm:mx-0">
                          <Image
                            src={
                              field.value instanceof File
                                ? URL.createObjectURL(field.value)
                                : field.value
                            }
                            alt="Project Image"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-white shadow-sm mx-auto sm:mx-0">
                          <AvatarFallback className="bg-gray-100">
                            <ImageIcon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex flex-col flex-1 text-center sm:text-left">
                        <h3 className="font-medium mb-1">Project Icon</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          JPG, PNG, SVG or JPEG up to 1MB
                        </p>
                        <input
                          type="file"
                          className="hidden"
                          accept=".jpg, .png, .svg"
                          ref={inputRef}
                          disabled={isPending}
                          onChange={handleImageChange}
                        />
                        {field.value ? (
                          <Button
                            type="button"
                            disabled={isPending}
                            variant={"destructive"}
                            size="xs"
                            className="w-fit mt-2"
                            onClick={() => {
                              field.onChange(null);
                              if (inputRef.current) {
                                inputRef.current.value = "";
                              }
                            }}
                          >
                            Remove
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            disabled={isPending}
                            variant={"tertiary"}
                            size="xs"
                            className="w-fit mt-2"
                            onClick={() => inputRef.current?.click()}
                          >
                            Upload Image
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-base font-medium">
                      Project Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter project name"
                        className="h-11"
                        disabled={isPending}
                      />
                    </FormControl>
                    <p className="text-sm text-muted-foreground">
                      This name will be visible to all members of the workspace
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-6 border-t">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onCancel}
                  className={cn(
                    "w-full sm:w-32",
                    onCancel ? "block" : "hidden"
                  )}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-full sm:w-32 bg-primary"
                  disabled={isPending}
                >
                  {isPending ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Updating...</span>
                    </div>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="w-full max-w-2xl mx-auto border border-red-100 bg-red-50/30">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="p-3 bg-red-100 rounded-full flex-shrink-0">
              <AlertTriangle className="size-5 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-600">
                Danger Zone
              </h3>
              <p className="text-sm text-red-600/80 mt-1.5 mb-4 sm:mb-6">
                Deleting a project is irreversible. Please be certain before
                proceeding.
              </p>
              <div className="flex justify-end">
                <Button
                  className="w-full sm:w-fit"
                  variant="destructive"
                  type="button"
                  disabled={isPending || isDeleting}
                  onClick={handleDelete}
                >
                  Delete Project
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
