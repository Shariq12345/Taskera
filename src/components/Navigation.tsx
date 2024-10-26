"use client";
import React from "react";
import Link from "next/link";
// import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  SettingsIcon,
  UsersIcon,
  ChevronRight,
  Calendar,
  Bell,
} from "lucide-react";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

const routes = [
  {
    label: "Dashboard",
    href: "",
    icon: GoHome,
    activeIcon: GoHomeFill,
    color: "text-blue-500",
  },
  {
    label: "Tasks",
    href: "/tasks",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
    color: "text-green-500",
  },
  {
    label: "Calendar",
    href: "/calendar",
    icon: Calendar,
    activeIcon: Calendar,
    color: "text-purple-500",
  },
  {
    label: "Members",
    href: "/members",
    icon: UsersIcon,
    activeIcon: UsersIcon,
    color: "text-orange-500",
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: Bell,
    activeIcon: Bell,
    color: "text-pink-500",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
    color: "text-gray-500",
  },
];

export const Navigation = () => {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <ul className="flex flex-col gap-2">
        {routes.map((route) => {
          const fullHref = `/workspaces/${workspaceId}${route.href}`;
          const isActive = pathname === fullHref;
          const Icon = isActive ? route.activeIcon : route.icon;

          return (
            <Tooltip key={route.href} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link href={fullHref} className="relative">
                  <div
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg font-medium transition-all duration-200",
                      "hover:bg-white/80 hover:shadow-sm group",
                      "dark:hover:bg-slate-800/50",
                      isActive &&
                        "bg-white shadow-sm dark:bg-slate-800/60 border"
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-5 transition-colors duration-200",
                        isActive
                          ? route.color
                          : "text-slate-500 dark:text-slate-400",
                        "group-hover:text-slate-800 dark:group-hover:text-slate-200"
                      )}
                    />
                    <span
                      className={cn(
                        "text-sm transition-colors duration-200",
                        isActive
                          ? "text-slate-900 dark:text-slate-100"
                          : "text-slate-500 dark:text-slate-400",
                        "group-hover:text-slate-800 dark:group-hover:text-slate-200"
                      )}
                    >
                      {route.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute right-3 flex items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <ChevronRight className="size-4 text-slate-500" />
                      </motion.div>
                    )}
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="hidden lg:hidden">
                {route.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </ul>
    </TooltipProvider>
  );
};
