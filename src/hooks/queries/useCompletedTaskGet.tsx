import { completedTasks } from "@/APIs/api/task";
import { useQuery } from "@tanstack/react-query";

export interface CompletedTaskParams {
    user_id: number
}
  
const useCompletedTaskGet = ({user_id}: CompletedTaskParams) => {
    return useQuery({
      queryKey: ['completedTask', user_id],
      queryFn: () => {
        if (!user_id) {
          throw new Error("Valid user ID is required")
        }
        return completedTasks(user_id)
      },
      enabled: !!user_id
    })
}

export default useCompletedTaskGet;