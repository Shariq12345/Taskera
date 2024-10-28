"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { UserButton } from "@/features/auth/components/user-button";
import { MobileSidebar } from "./mobile-sidebar";
// import { Bell, Search, Plus, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search } from "lucide-react";

// Function to match dynamic workspace routes
const getPageTitle = (pathname: string) => {
  if (/^\/workspaces\/\w+\/settings$/.test(pathname)) {
    return "Workspace Settings";
  } else if (/^\/workspaces\/\w+\/members$/.test(pathname)) {
    return "Team Members";
  } else if (/^\/workspaces\/\w+$/.test(pathname)) {
    return "Dashboard";
  }

  // Static routes
  const routes = {
    "/tasks": "Tasks",
    "/calendar": "Calendar",
    "/settings": "Settings",
    "/notifications": "Notifications",
  };

  return routes[pathname as keyof typeof routes] || "Dashboard";
};

const getPageDescription = (pathname: string) => {
  if (/^\/workspaces\/\w+\/settings$/.test(pathname)) {
    return "Manage your workspace settings and preferences.";
  } else if (/^\/workspaces\/\w+\/members$/.test(pathname)) {
    return "Manage your team members.";
  } else if (/^\/workspaces\/\w+$/.test(pathname)) {
    return "Monitor all of your projects and tasks in one place.";
  }

  // Static routes
  const descriptions = {
    "/tasks": "View and manage your tasks.",
    "/calendar": "Check your events and scheduled tasks.",
    "/settings": "Update your profile and account settings.",
    "/notifications": "View your notifications.",
  };

  return (
    descriptions[pathname as keyof typeof descriptions] ||
    "Manage your workspace"
  );
};

export const Navbar = () => {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);
  const pageDescription = getPageDescription(pathname);

  return (
    <nav className="sticky top-0 z-30 w-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <MobileSidebar />

          <div className="hidden lg:flex flex-col flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                {pageTitle}
              </h1>
              {pathname === "/" && (
                <Badge variant="secondary" className="font-normal">
                  12 active projects
                </Badge>
              )}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {pageDescription}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="hidden md:flex items-center gap-2 h-9 pr-2"
              >
                <Search className="size-4" />
                <span className="text-sm">Quick search...</span>
                <kbd className="hidden xl:inline-flex h-5 select-none items-center gap-1 rounded border bg-slate-50 px-1.5 font-mono text-[10px] font-medium opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
              <DialogHeader>
                <DialogTitle>Search</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-2">
                  <Search className="size-4 text-slate-500" />
                  <Input
                    placeholder="Search tasks, projects, and team members..."
                    className="h-9"
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* <Button size="sm" className="hidden md:flex items-center gap-2 h-9">
            <Plus className="size-4" />
            New Task
          </Button> */}

          <UserButton />
        </div>
      </div>
    </nav>
  );
};
