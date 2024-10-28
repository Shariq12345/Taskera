import { useQueryState, parseAsBoolean, parseAsString } from "nuqs";

export const useUpdateTaskModal = () => {
  const [taskId, setTaskId] = useQueryState("edit-task", parseAsString);

  return {
    taskId,
    open: (id: string) => setTaskId(id),
    close: () => setTaskId(null),
    setTaskId,
  };
};
