import { differenceInDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar, AlertCircle } from "lucide-react";

interface TaskDateProps {
  value: string;
  className?: string;
}

export const TaskDate = ({ value, className }: TaskDateProps) => {
  const today = new Date();
  const endDate = new Date(value);
  const diffInDays = differenceInDays(endDate, today);

  const getDateStatus = () => {
    if (diffInDays <= 3) {
      return {
        color: "text-red-600 bg-red-100",
        icon: <AlertCircle className="w-4 h-4" />,
        label: "Urgent",
      };
    } else if (diffInDays <= 7) {
      return {
        color: "text-yellow-700 bg-yellow-100",
        icon: <AlertCircle className="w-4 h-4" />,
        label: "Soon",
      };
    } else if (diffInDays <= 14) {
      return {
        color: "text-blue-600 bg-blue-100",
        icon: <Calendar className="w-4 h-4" />,
        label: "Upcoming",
      };
    }
    return {
      color: "text-gray-500 bg-gray-100",
      icon: <Calendar className="w-4 h-4" />,
      label: "Scheduled",
    };
  };

  const status = getDateStatus();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors duration-300 ease-in-out",
        status.color,
        className
      )}
    >
      {status.icon}
      <div className="flex items-center gap-1">
        <span className="truncate hidden md:inline">{status.label}</span>
        <span className="truncate text-sm font-medium">
          {format(endDate, "MMM d")}
        </span>
      </div>
    </div>
  );
};

export default TaskDate;
