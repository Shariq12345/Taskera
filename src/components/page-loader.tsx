import { Loader2 } from "lucide-react";
import React from "react";

export const PageLoader = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
};
