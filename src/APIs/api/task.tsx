
import { base_url } from "../base"
import { ALL_TASKS, COMPLETE_TASK, } from "../endpoints"


export const allTasks = () => base_url.get(ALL_TASKS)
export const completeTaskRequest = (user_id: number, task_id: number) => base_url.post(COMPLETE_TASK(user_id, task_id))