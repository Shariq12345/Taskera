"use client";
import React from "react";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVerticalIcon, Users2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteMember } from "@/features/members/api/use-delete-member";
import { useUpdateMember } from "@/features/members/api/use-update-member";
import { MemberRole } from "@/features/members/types";
import { useConfirm } from "@/hooks/use-confirm";

export const MembersList = () => {
  const workspaceId = useWorkspaceId();
  const [ConfirmRemoveDialog, confirmRemove] = useConfirm(
    "Remove Member",
    "Are you sure you want to remove this member?",
    "destructive"
  );
  const { data } = useGetMembers({ workspaceId });

  const { mutate: deleteMember, isPending: isDeleting } = useDeleteMember();

  const { mutate: updateMember, isPending: isUpdating } = useUpdateMember();

  const handleUpdateMember = (memberId: string, role: MemberRole) => {
    updateMember({ json: { role }, param: { memberId } });
  };

  const handleDeleteMember = async (memberId: string) => {
    const ok = await confirmRemove();

    if (!ok) return;

    deleteMember(
      { param: { memberId } },
      {
        onSuccess: () => {
          window.location.reload();
        },
      }
    );
  };

  return (
    <div className="min-h-[80vh] bg-gray-50/50 p-4 sm:p-6 flex items-center justify-center">
      <ConfirmRemoveDialog />
      <Card className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
        <CardHeader className="space-y-4 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            {/* <Button
              variant="ghost"
              size="sm"
              asChild
              className="hover:bg-gray-100"
            >
              <Link
                href={`/workspaces/${workspaceId}`}
                className="flex items-center gap-2"
              >
                <ArrowLeftIcon className="size-4" />
                <span className="text-sm font-medium">Back</span>
              </Link>
            </Button> */}
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Users2 className="size-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-semibold">
                Workspace Members
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your workspace members and their roles
              </p>
            </div>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {data?.documents.map((member) => (
              <div
                key={member.$id}
                className="flex items-center gap-4 p-4 sm:p-6 hover:bg-gray-50/50 transition-colors"
              >
                <MemberAvatar
                  className="size-12 ring-2 ring-white ring-offset-2"
                  fallbackClassName="text-lg"
                  name={member.name}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 truncate">
                      {member.name}
                    </p>
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                      {member.role}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate mt-0.5">
                    {member.email}
                  </p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-auto flex-shrink-0 hover:bg-gray-100"
                    >
                      <MoreVerticalIcon className="size-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="bottom"
                    align="end"
                    className="w-56 shadow-lg rounded-md bg-white border border-gray-200"
                  >
                    <DropdownMenuItem
                      className="font-medium flex items-center gap-2"
                      onClick={() =>
                        handleUpdateMember(member.$id, MemberRole.ADMIN)
                      }
                      disabled={isUpdating}
                    >
                      Set as Admin
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="font-medium flex items-center gap-2"
                      onClick={() =>
                        handleUpdateMember(member.$id, MemberRole.MEMBER)
                      }
                      disabled={isUpdating}
                    >
                      Set as Member
                    </DropdownMenuItem>
                    <Separator className="my-1" />
                    <DropdownMenuItem
                      className="font-medium text-red-600 flex items-center gap-2"
                      onClick={() => handleDeleteMember(member.$id)}
                      disabled={isDeleting}
                    >
                      Remove {member.name}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
