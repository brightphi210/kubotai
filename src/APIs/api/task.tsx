
import { base_url } from "../base"
import { ALL_TASKS, COMPLETE_TASK, COMPLETED_TASKS, } from "../endpoints"


export const allTasks = () => base_url.get(ALL_TASKS)
export const completedTasks = (user_id:number) => base_url.get(COMPLETED_TASKS(user_id))
export const completeTaskRequest = (user_id: number, task_id: number) => base_url.post(COMPLETE_TASK(user_id, task_id))