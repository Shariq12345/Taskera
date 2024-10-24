"use client";
import React, { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  CopyIcon,
  ImageIcon,
  Link,
  Loader2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { updateWorkspaceSchema } from "../schemas";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Workspace } from "../type";
import { useUpdateWorkspace } from "../api/use-update-workspace";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteWorkspace } from "../api/use-delete-workspace";
import { toast } from "sonner";
import { useResetInviteCode } from "../api/use-reset-invite-code";

interface EditWorkspaceFormProps {
  onCancel?: () => void;
  initialValues: Workspace;
}

export const EditWorkspaceForm = ({
  onCancel,
  initialValues,
}: EditWorkspaceFormProps) => {
  const router = useRouter();
  const { mutate, isPending } = useUpdateWorkspace();
  const { mutate: deleteWorkspace, isPending: isDeleting } =
    useDeleteWorkspace();
  const { mutate: resetInviteLink, isPending: isResettingInviteLink } =
    useResetInviteCode();
  const inputRef = useRef<HTMLInputElement>(null);
  const [fullInviteLink, setFullInviteLink] = useState("");

  // Set up the invite link after component mounts
  useEffect(() => {
    setFullInviteLink(
      `${window.location.origin}/workspaces/${initialValues.$id}/join/${initialValues.inviteCode}`
    );
  }, [initialValues.$id, initialValues.inviteCode]);

  const handleCopyInviteLink = () => {
    if (!fullInviteLink) return;

    navigator.clipboard
      .writeText(fullInviteLink)
      .then(() => toast.success("Invite link copied"));
  };

  const [DeleteDialog, confirmDelete] = useConfirm(
    "Delete Workspace",
    "Are you sure you want to delete this workspace?",
    "destructive"
  );

  const [ResetDialog, confirmReset] = useConfirm(
    "Reset Invite Link",
    "Are you sure you want to reset the invite link?",
    "destructive"
  );

  const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
    resolver: zodResolver(updateWorkspaceSchema),
    defaultValues: {
      ...initialValues,
      image: initialValues.imageUrl ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof updateWorkspaceSchema>) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : "",
    };
    mutate(
      { form: finalValues, param: { workspaceId: initialValues.$id } },
      {
        onSuccess: ({ data }) => {
          form.reset();
          router.push(`/workspaces/${data.$id}`);
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

  const handleDelete = async () => {
    const ok = await confirmDelete();

    if (!ok) {
      return;
    }

    deleteWorkspace(
      {
        param: { workspaceId: initialValues.$id },
      },
      {
        onSuccess: () => {
          // router.push("/");
          window.location.href = "/";
        },
      }
    );
  };

  const handleResetInvite = async () => {
    const ok = await confirmReset();

    if (!ok) {
      return;
    }

    resetInviteLink(
      {
        param: { workspaceId: initialValues.$id },
      },
      {
        onSuccess: () => {
          router.refresh();
        },
      }
    );
  };

  // const fullInviteLink = `${window.location.origin}/workspaces/${initialValues.$id}/join/${initialValues.inviteCode}`;

  // const handleCopyInviteLink = () => {
  //   navigator.clipboard
  //     .writeText(fullInviteLink)
  //     .then(() => toast.success("Invite link copied"));
  // };

  return (
    <div className="flex flex-col gap-y-4 min-h-[80vh] bg-gray-50/50 p-4 sm:p-6">
      <DeleteDialog />
      <ResetDialog />
      <Card className="w-full max-w-2xl mx-auto border shadow-md">
        <CardHeader className="border-b bg-white/80 backdrop-blur-sm p-4 sm:p-6">
          <div className="flex items-center gap-4">
            {/* <Button
              size="sm"
              variant="ghost"
              onClick={
                onCancel
                  ? onCancel
                  : () => router.push(`/workspaces/${initialValues.$id}`)
              }
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="size-4" />
            </Button> */}
            <div className="flex items-center gap-3 sm:gap-4 flex-1">
              <div className="p-2 sm:p-2.5 bg-primary/10 rounded-full">
                <Building2 className="size-4 sm:size-5 text-primary" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg sm:text-xl font-semibold">
                  Update <span className="text-blue-600">Workspace</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Customize your workspace settings and appearance
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
                            alt="Workspace Image"
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
                        <h3 className="font-medium mb-1">Workspace Icon</h3>
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
                      Workspace Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter workspace name"
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

      <Card className="w-full max-w-2xl mx-auto border border-slate-200 bg-white shadow-md rounded-lg">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="p-3 bg-slate-100 rounded-full flex-shrink-0">
              <Link className="size-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-slate-900">
                Invite <span className="text-blue-600">Members</span>
              </h3>
              <p className="text-sm text-slate-600 mt-2 mb-4 sm:mb-6">
                Share the link below to invite members to this workspace.
              </p>
              <div className="mt-4">
                <div className="flex items-center gap-x-2">
                  <Input disabled value={fullInviteLink} className="flex-1" />
                  <Button
                    onClick={handleCopyInviteLink}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <CopyIcon />
                    {/* Copy */}
                  </Button>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button
                  className="w-full sm:w-fit"
                  variant="destructive"
                  type="button"
                  disabled={isPending || isResettingInviteLink}
                  onClick={handleResetInvite}
                >
                  Reset Invite Link
                </Button>
              </div>
            </div>
          </div>
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
                Deleting a workspace is irreversible. Please be certain before
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
                  Delete Workspace
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
