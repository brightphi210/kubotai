import { RoundedButton, RoundedButtonFull, RoundedSolidButton, RoundedSolidButtonFull } from "@/Compnents/CustomButton"
import Loading from "@/Compnents/Loading"
import useTask from "@/hooks/mutations/useTask"
import useCompletedTaskGet from "@/hooks/queries/useCompletedTaskGet"
import useTaskGet from "@/hooks/queries/useTaskGet"
import { useTelegram } from "@/Providers/TelegramContext"
import { useEffect, useState } from "react"
import { SiRakuten } from "react-icons/si"
import { toast, ToastContainer } from "react-toastify"
import token from '../../assets/token.png'
import { MdTaskAlt } from "react-icons/md";
import { IoCheckmarkDoneOutline  } from "react-icons/io5";
import { FiCheckCircle } from "react-icons/fi";



interface TaskData {
  id: number
  title: string
  reward_amount: number
  completed: boolean
  url: string 
  description: string
}

interface SelectedTaskData {
  id: number
  title?: string
  reward_amount?: number
  url: string 
  description?: string
}

interface CompletedTaskData {
  id: number
  user: number
  task: number
}
  

interface TaskJoinState {
  taskId: number
  joinedAt: number
  canClaim: boolean
}

const CLAIM_DELAY_MS = 10000 // 30 seconds in milliseconds

const Task = () => {

  const { user } = useTelegram()
  const { mutate: completeTask, isPending } = useTask()
  const { data, isLoading, refetch } = useTaskGet()
  const [joinedTasks, setJoinedTasks] = useState<TaskJoinState[]>([])
  const taskData = data?.data as TaskData[] | undefined

  const {
    data: completedData,
    isLoading: isLoadingCompleted,
    refetch: completedRefresh,
  } = useCompletedTaskGet({ user_id: 1713487542 })
  const myCompletedData = completedData?.data?.data as CompletedTaskData[] | undefined


  const [initialSelectedCompletedData, setInitialSelectedCompletedData] = useState<SelectedTaskData>({
    id: 0,
    title: "",
    reward_amount: 0,
    url: "",
    description: ""
  })

  const handleSelect = (task: SelectedTaskData) =>{
    setInitialSelectedCompletedData(task);
    (document.getElementById("my_modal_2") as HTMLDialogElement)?.showModal()
  }


  useEffect(() => {
    const savedJoinedTasks = localStorage.getItem("joinedTasks")
    if (savedJoinedTasks) {
      try {
        setJoinedTasks(JSON.parse(savedJoinedTasks))
      } catch (error) {
        console.error("Failed to parse joined tasks from localStorage", error)
      }
    }
  }, [])

  // Update localStorage whenever joinedTasks changes
  useEffect(() => {
    if (joinedTasks.length > 0) {
      localStorage.setItem("joinedTasks", JSON.stringify(joinedTasks))
    }
  }, [joinedTasks])


  // const clearLocalStorage = () => {
  //   localStorage.removeItem("joinedTasks")
  //   setJoinedTasks([])
  //   toast.success("Task data cleared successfully")
  // }

  // Check if tasks can be claimed (after delay)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      const updatedJoinedTasks = joinedTasks.map((task) => {
        if (!task.canClaim && now - task.joinedAt >= CLAIM_DELAY_MS) {
          return { ...task, canClaim: true }
        }
        return task
      })

      if (JSON.stringify(updatedJoinedTasks) !== JSON.stringify(joinedTasks)) {
        setJoinedTasks(updatedJoinedTasks)
      }
    }, 5000) // Check every 5 seconds

    return () => clearInterval(interval)
  }, [joinedTasks])

  const handleJoinTask = (taskId: number, taskUrl: string) => {
    if (!user?.id) {
      console.error("User not logged in")
      return
    };

    const now = Date.now()
    setJoinedTasks((prev) => [...prev.filter((t) => t.taskId !== taskId), { taskId, joinedAt: now, canClaim: false }]);
    window.open(taskUrl, "_blank");
    (document.getElementById("my_modal_2") as HTMLDialogElement)?.close()
  }

  const handleClaimReward = (taskId: number) => {
    if (!user?.id) {
      console.error("User not logged in")
      return
    }
    completeTask(
      {
        user_id: user.id,
        task_id: taskId,
      },
      {
        onSuccess: () => {
          (document.getElementById("my_modal_1") as HTMLDialogElement)?.showModal()
          refetch()
          completedRefresh()
          setJoinedTasks((prev) => prev.filter((task) => task.taskId !== taskId))
        },
        onError: (error) => {
          console.log("Failed to claim reward:", error)
          toast.error("An error occurred while claiming your reward")
        },
      },
    )
  }

  // Helper function to determine if a task can be claimed
  const getTaskStatus = (taskId: number): "notJoined" | "joined" | "canClaim" => {
    const joinedTask = joinedTasks.find((task) => task.taskId === taskId)

    if (!joinedTask) return "notJoined"
    if (joinedTask.canClaim) return "canClaim"
    return "joined"
  }

  // Helper function to get time remaining before claim is available
  const getTimeRemaining = (joinedAt: number): string => {
    const elapsed = Date.now() - joinedAt
    const remaining = Math.max(0, CLAIM_DELAY_MS - elapsed)
    const seconds = Math.ceil(remaining / 1000)
    return `${seconds}s`
  }

  const [isCompleted, setIsCompleted] = useState(1)
  // ============= GETTING COMPLETED TASK =============

  return (
    <div className="p-5 text-sm bg-gray-100 h-screen overflow-y-scroll">
      <ToastContainer theme="light" autoClose={4000} />
      <div className="text-center pt-3">
        <h2 className="text-2xl font-semibold">Task</h2>
        <p className="text-base font-light text-neutral-500 pt-2">
          Get Rewarded for Completing <br /> a task
        </p>
      </div>

      <div className="bg-gray-50 border border-gray-200 flex items-center text-xs mt-2 justify-between p-2 rounded-md">
        <div
          className={`${isCompleted === 1 ? "bg-blue-100 p-3" : ""} w-full rounded-md`}
          onClick={() => setIsCompleted(1)}
        >
          <h2 className={`${isCompleted === 1 ? " text-blue-700" : ""} text-center`}>Active</h2>
        </div>

        <div
          className={`${isCompleted === 2 ? "bg-blue-100 p-3" : ""} w-full rounded-md`}
          onClick={() => setIsCompleted(2)}
        >
          <h2 className={`${isCompleted === 2 ? "text-blue-700" : ""} text-center`}>Completed</h2>
        </div>
      </div>

      {isLoading && isLoadingCompleted ? (
        <Loading />
      ) : (
        <>
          {isCompleted === 1 && (
            <div className="mt-5 mb-24 rounded-lg">
              {taskData && taskData.length > 0 ? (
                taskData
                  .filter((task) => {
                    return !myCompletedData?.some(
                      (completedTask) => completedTask.task === task.id && completedTask.user === user?.id,
                    )
                  })
                  .map((task, index) => {
                    const status = getTaskStatus(task.id)
                    const joinedTask = joinedTasks.find((t) => t.taskId === task.id)

                    return (
                      <div key={index} className="flex justify-between mb-3 p-3 rounded-2xl bg-white">
                        <div className="flex gap-3 items-center">
                          <p className="bg-neutral-50 border border-neutral-200 text-neutral-500 rounded-full p-3 text-lg">
                            <FiCheckCircle />
                          </p>
                          <div>
                            <h3 className="text-[12px] font-semibold">{task.title}</h3>
                            <p className="text-green-600 text-xs">+{task.reward_amount} Kubot</p>
                            {status === "joined" && joinedTask && (
                              <p className="text-[11px] text-blue-400">
                                Available to claim in: {getTimeRemaining(joinedTask.joinedAt)}
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          {status === "canClaim" ? (
                            <> 
                              {!isPending ? 
                              
                                <RoundedButton
                                  text={"Claim"}
                                  onClick={() => handleClaimReward(task.id)}
                                /> :

                                <div className="text-blue-700 bg-blue-100 border border-blue-200 p-1.5 pb-0 px-4 rounded-full">
                                  <span className="loading loading-dots loading-xs"></span>
                                </div>
                              }
                            </>
                          ) : status === "joined" ? (
                              <div className="bg-blue-700 p-1.5 pb-0 px-4 rounded-full text-white">
                                <span className="loading loading-dots loading-xs"></span>
                              </div>
                          ) : (
                            <RoundedSolidButton text="Join" onClick={() => {handleSelect(task)}} />
                          )}
                        </div>
                      </div>
                    )
                  })
              ) : (
                <div className="text-center py-5">No tasks available</div>
              )}
            </div>
          )}

          {isCompleted === 2 && (
            <div className="mt-5 mb-24 bg-neutral-50 p-3 rounded-lg">
              {taskData && myCompletedData && myCompletedData.length > 0 ? (
                taskData
                  .filter((task) => {
                    return myCompletedData.some(
                      (completedTask) => completedTask.task === task.id && completedTask.user === user?.id,
                    )
                  })
                  .map((task, index) => {
                    return (
                      <div key={index} className="flex justify-between mb-5 pb-3 border-b border-neutral-200">
                        <div className="flex gap-3 items-center">
                          <p className="bg-neutral-100 border border-neutral-300 text-neutral-500 rounded-md p-4 text-lg">
                            <SiRakuten />
                          </p>
                          <div>
                            <h3 className="text-[12px] font-semibold">{task.title}</h3>
                            <p className="text-gray-500 text-xs">+{task.reward_amount} Kubot</p>
                            <p className="text-[10px] text-green-600">Completed</p>
                          </div>
                        </div>

                        <div>
                          <RoundedButton text="Claimed" />
                        </div>
                      </div>
                    )
                  })
              ) : (
                <div className="text-center py-5">No completed tasks</div>
              )}
            </div>
          )}
        </>
      )}

      {/* <button className="btn" onClick={clearLocalStorage}>Clear Locale Data</button> */}

      <dialog id="my_modal_2" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box !h-[47%] px-10">
          <h3 className="font-semibold text-lg text-center pt-5">Perfom Task <span className="text-green-600 text-xs font-medium">+5 (kubot)</span></h3>
          
          <div className="pt-5">
            <div className="w-28 h-28 flex justify-center m-auto">
              <img src={token} alt="" />
            </div>
            <div className="pt-5 text-center space-y-2 text-sm">
              <h2 className="text-sm font-semibold flex m-auto justify-center items-center gap-2">
                <MdTaskAlt className="text-xl font-semibold text-green-600"/>{initialSelectedCompletedData?.title}
              </h2>
              <h2 className="text-xs flex m-auto justify-center items-center gap-1 text-neutral-400">
                {initialSelectedCompletedData?.description}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 !w-full pt-8">
            <RoundedButtonFull text="Close" onClick={()=>(document.getElementById("my_modal_2") as HTMLDialogElement)?.close()}/>
            <RoundedSolidButtonFull text="Perfom Task" onClick={()=>handleJoinTask(initialSelectedCompletedData?.id, initialSelectedCompletedData?.url)}/>
          </div>
        </div>
        
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <p className="text-4xl text-center p-3 bg-green-100 text-green-700 border border-green-300 w-fit  rounded-full flex m-auto justify-center">
            <IoCheckmarkDoneOutline  />
          </p>
          
          <div className="text-sm text-center pt-5">
            <h3 className="font-medium text-base">Token Claimed Successfully 🎉</h3>
            <p className="text-xs text-neutral-500 pt-3">Congratulations token has been claimed</p>
          </div>

          <div className="flex items-center pt-5">
            <RoundedSolidButtonFull text="Close" onClick={()=>(document.getElementById("my_modal_1") as HTMLDialogElement)?.close()}/>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default Task

