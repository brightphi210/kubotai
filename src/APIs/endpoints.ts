

// TASK
export const ALL_TASKS = '/api/tasks/'
export const COMPLETED_TASKS = (user_id:number)=> `/api/tasks/completed/${user_id}/`
export const COMPLETE_TASK = (user_id:number, task_id:number)=> `/api/tasks/complete/${user_id}/${task_id}/`;

