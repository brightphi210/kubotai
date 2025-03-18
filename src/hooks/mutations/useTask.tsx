import { completeTaskRequest } from "@/APIs/api/task"
import { useMutation } from "@tanstack/react-query"

interface CompleteTaskParams {
  user_id: number
  task_id: number
}

const useTask = () => {
  return useMutation({
    mutationFn: ({ user_id, task_id }: CompleteTaskParams) => {
      if (user_id === undefined) {
        throw new Error("User ID is required")
      }
      return completeTaskRequest(user_id, task_id)
    },
  })
}

export default useTask

