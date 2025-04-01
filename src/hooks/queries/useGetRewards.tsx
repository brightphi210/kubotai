import { allReward } from '@/APIs/api/rewards'
import { useQuery } from '@tanstack/react-query'


export interface RewardsParams {
    userName: string;
}
const useRewardsGet = ({userName}: RewardsParams) => {
  return useQuery({
    queryKey: ['rewards', userName],
    queryFn: ()=> {
        if (!userName) {
            throw new Error("Valid user name is required")
        }
        return allReward(userName)
    },

    enabled: !!userName
  })
}

export default useRewardsGet
