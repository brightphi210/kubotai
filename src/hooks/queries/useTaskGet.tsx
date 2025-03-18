import { allTasks } from '@/APIs/api/task'
import { useQuery } from '@tanstack/react-query'

const useTaskGet = () => {
  return useQuery({
    queryKey: ['task'],
    queryFn: allTasks
  })
}

export default useTaskGet