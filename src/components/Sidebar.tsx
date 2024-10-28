"use client";

import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Navigation } from "./Navigation";
import { Button } from "./ui/button";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { Projects } from "./projects";

export const Sidebar = () => {
  return (
    <aside className="sidebar h-full bg-gradient-to-b from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-950 border-r border-slate-200/70 dark:border-slate-800/70 w-full flex flex-col overflow-y-auto">
      <div className="flex flex-col flex-grow p-5 space-y-6">
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center gap-3 px-2 group transition-transform hover:-translate-y-0.5"
        >
          <div className="relative size-9 rounded-xl flex items-center justify-center overflow-hidden bg-white dark:bg-slate-800 shadow-sm">
            <Image
              src="/logo.svg"
              alt="logo"
              width={24}
              height={24}
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <h1 className="text-xl font-semibold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-800 dark:from-slate-100 dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
            Taskera
          </h1>
        </Link>

        <Separator className="bg-slate-200 dark:bg-slate-700" />

        {/* Workspace Switcher */}
        <div className="px-2">
          <WorkspaceSwitcher />
        </div>

        {/* Navigation */}
        <div className="px-2">
          <Navigation />
        </div>

        <Separator className="bg-slate-200 dark:bg-slate-700" />

        {/* Projects Section */}
        <div className="px-2">
          <Projects />
        </div>

        {/* Help Section */}
        <div className="mt-auto px-2">
          <Separator className="bg-slate-200 dark:bg-slate-700 mb-4" />
          <div className="rounded-lg bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-blue-400/10 p-5 backdrop-blur-sm border border-slate-200/20 dark:border-slate-700/30 shadow-md">
            <h3 className="font-medium text-sm text-slate-900 dark:text-slate-100">
              Need Help?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Check our documentation or contact support for assistance.
            </p>
            <Button
              variant="primary"
              size="sm"
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              View Documentation
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
