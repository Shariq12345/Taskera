"use client";

import React from "react";
import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createProjectSchema } from "../schemas";
import { useCreateProject } from "../api/use-create-project";
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
// import { Separator } from "@/components/ui/separator";
import { Building2, ImageIcon, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

interface CreateProjectFormProps {
  onCancel?: () => void;
}

export const CreateProjectForm = ({ onCancel }: CreateProjectFormProps) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const { mutate, isPending } = useCreateProject();
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema.omit({ workspaceId: true })),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createProjectSchema>) => {
    const finalValues = {
      ...values,
      workspaceId,
      image: values.image instanceof File ? values.image : "",
    };
    mutate(
      { form: finalValues },
      {
        onSuccess: ({ data }) => {
          form.reset();
          // TODO: Redirect to project page
          router.push(`/workspaces/${workspaceId}/projects/${data.$id}`);
        },
      }
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      form.setValue("image", file);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto border-0">
      <CardHeader className="space-y-1">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-primary/10 rounded-full">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="md:text-xl text-2xl font-semibold">
            Create Project
          </CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Create a new project to start collaborating with your team.
        </p>
      </CardHeader>
      {/* <Separator className="mx-0" /> */}
      <CardContent className="p-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <div className="flex flex-col gap-y-2">
                  <div className="flex items-center gap-x-5">
                    {field.value ? (
                      <div className="size-[72px] relative rounded-md overflow-hidden">
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
                      <Avatar className="size-[72px]">
                        <AvatarFallback>
                          <ImageIcon className="size-[36px] text-neutral-400" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className="flex flex-col">
                      <p className="text-sm text">Project Icon</p>
                      <p className="text-xs text-muted-foreground">
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
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter project name"
                      className="h-11"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end space-x-3">
              <Button
                type="button"
                variant="ghost"
                onClick={onCancel}
                className={cn("w-32", onCancel ? "block" : "hidden")}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" className="w-32" disabled={isPending}>
                {isPending ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating...</span>
                  </div>
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
