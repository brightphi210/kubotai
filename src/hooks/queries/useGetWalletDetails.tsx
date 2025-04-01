import { walletDetails } from '@/APIs/api/wallet';
import { useQuery } from '@tanstack/react-query'


export interface RewardsParams {
    userName: string;
}
const useGetWalletDetails = ({userName}: RewardsParams) => {
  return useQuery({
    queryKey: ['rewards', userName],
    queryFn: ()=> {
        if (!userName) {
            throw new Error("Valid user name is required")
        }
        return walletDetails(userName)
    },

    enabled: !!userName
  })
}

export default useGetWalletDetails
