import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Navigation } from "./Navigation";
import { Button } from "./ui/button";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { Projects } from "./projects";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-slate-50/50 dark:bg-slate-900/20 border-r border-slate-200 dark:border-slate-800 p-4 w-full flex flex-col">
      <div className="flex items-center gap-3 px-2">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative size-8 rounded-lg flex items-center justify-center overflow-hidden transition-all duration-200 ">
            <Image
              src="/logo.svg"
              alt="logo"
              width={24}
              height={24}
              className="transition-all duration-200 group-hover:scale-110"
            />
          </div>
          <h1 className="text-xl font-semibold bg-gradient-to-r from-slate-800 to-slate-500 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
            Taskera
          </h1>
        </Link>
      </div>

      {/* <div className="mt-2 px-2">
        <Button
          variant="tertiary"
          className="justify-start gap-2 h-10 font-normal"
        >
          New Project
          <ChevronRight className="text-muted-foreground ml-2 size-4" />
        </Button>
      </div> */}

      <Separator className="my-4" />

      <WorkspaceSwitcher />

      <Navigation />

      <Separator className="my-4" />
      <Projects />

      <div className="mt-auto">
        <Separator className="my-4" />
        <div className="rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4">
          <h3 className="font-medium text-sm text-slate-900 dark:text-slate-100">
            Need Help?
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Check our documentation or contact support for assistance.
          </p>
          <Button variant="primary" size="sm" className="w-full mt-3">
            View Documentation
          </Button>
        </div>
      </div>
    </aside>
  );
};
