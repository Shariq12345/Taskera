"use client";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { Users, Building2, ArrowRight } from "lucide-react";
import { useJoinWorkspace } from "@/features/workspaces/api/use-join-workspace";
import { useInviteCode } from "@/features/workspaces/hooks/use-invite-code";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useRouter } from "next/navigation";

interface JoinWorkspaceFormProps {
  initialValues: {
    name: string;
  };
}

export const JoinWorkspaceForm = ({
  initialValues,
}: JoinWorkspaceFormProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useJoinWorkspace();

  const inviteCode = useInviteCode();

  const onSubmit = () => {
    mutate(
      {
        param: { workspaceId },
        json: { code: inviteCode },
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
      <Card className="w-full max-w-xl bg-white shadow-lg">
        <CardHeader className="space-y-4 p-6 md:p-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-full">
              <Building2 className="size-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">
                Join Workspace
              </CardTitle>
              <CardDescription className="text-base mt-1">
                You've been invited to join
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="p-3 bg-white rounded-full shadow-sm">
              <Users className="size-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">
                {initialValues.name}
              </h3>
              <p className="text-sm text-gray-500">
                Click join below to accept the invitation
              </p>
            </div>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <h4 className="font-medium text-blue-700 mb-1">
              What happens next?
            </h4>
            <ul className="space-y-2 text-sm text-blue-600">
              <li className="flex items-center gap-2">
                <ArrowRight className="size-4 flex-shrink-0" />
                <span>You'll get immediate access to the workspace</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="size-4 flex-shrink-0" />
                <span>Collaborate with team members in real-time</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="size-4 flex-shrink-0" />
                <span>Access shared resources and documents</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-1/2 border-gray-200"
              asChild
              disabled={isPending}
            >
              <Link href="/">Cancel</Link>
            </Button>
            <Button
              size="lg"
              className="w-full sm:w-1/2 bg-primary hover:bg-primary/90"
              onClick={onSubmit}
              disabled={isPending}
            >
              Join Workspace
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
