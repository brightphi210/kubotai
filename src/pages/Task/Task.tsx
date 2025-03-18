"use client"

import { RoundedButton, RoundedSolidButton } from "@/Compnents/CustomButton"
import Loading from "@/Compnents/Loading"
import useTask from "@/hooks/mutations/useTask"
import useTaskGet from "@/hooks/queries/useTaskGet"
import { useTelegram } from "@/Providers/TelegramContext"
import { useEffect, useState } from "react"
import { SiRakuten } from "react-icons/si"
import { toast, ToastContainer } from "react-toastify"

// Define proper types for our data
interface TaskData {
  id: number
  title: string
  reward_amount: number
  completed: boolean
  url: string // URL where the user will perform the task
}

interface TaskJoinState {
  taskId: number
  joinedAt: number // timestamp when the user joined
  canClaim: boolean
}

const CLAIM_DELAY_MS = 60000 // 1 minute in milliseconds

const Task = () => {
  const { user } = useTelegram()
  const { mutate: completeTask, isPending } = useTask()
  const { data, isLoading } = useTaskGet()
  const [joinedTasks, setJoinedTasks] = useState<TaskJoinState[]>([])

  const taskData = data?.data as TaskData[] | undefined

  // Load joined tasks from localStorage on component mount
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
    }

    // Record that the user has joined this task
    const now = Date.now()
    setJoinedTasks((prev) => [...prev.filter((t) => t.taskId !== taskId), { taskId, joinedAt: now, canClaim: false }])

    // Redirect to the task URL
    window.open(taskUrl, "_blank")
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
          toast.success("Reward claimed successfully")
          // Remove from joined tasks after claiming
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

  return (
    <div className="p-5 text-sm">
        <ToastContainer theme="light" autoClose={4000} />
      <div className="text-center pt-5">
        <h2 className="text-3xl font-semibold">Task</h2>
        <p className="text-lg font-light text-neutral-500 pt-2">
          Get Rewarded <br /> for Completing a task
        </p>
      </div>

      <div className="bg-neutral-100 flex items-center mt-2 justify-between p-2 rounded-lg">
        <div className="p-3 bg-blue-100 w-full rounded-lg">
          <h2 className="text-center text-[#016FEC]">Active</h2>
        </div>

        <div className="p-3 w-full rounded-xl">
          <h2 className="text-center">Completed</h2>
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="mt-5 mb-24 bg-neutral-50 p-3 rounded-lg">
          {taskData && taskData.length > 0 ? (
            taskData.map((task, index) => {
              const status = getTaskStatus(task.id)
              const joinedTask = joinedTasks.find((t) => t.taskId === task.id)

              return (
                <div key={index} className="flex justify-between mb-5 pb-3 border-b border-neutral-200">
                  <div className="flex gap-3 items-center">
                    <p className="bg-neutral-100 border border-neutral-200 text-neutral-500 rounded-md p-3 text-base">
                      <SiRakuten />
                    </p>
                    <div>
                      <h3 className="text-[12px] font-semibold">{task.title}</h3>
                      <p className="text-gray-500 text-xs">+{task.reward_amount} Kubot</p>
                      {status === "joined" && joinedTask && (
                        <p className="text-xs text-blue-500">
                          Available to claim in: {getTimeRemaining(joinedTask.joinedAt)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    {status === "canClaim" ? (
                      <RoundedButton
                        text={isPending ? "Claiming..." : "Claim"}
                        onClick={() => handleClaimReward(task.id)}
                      />
                    ) : status === "joined" ? (
                      <RoundedButton text="Waiting..."/>
                    ) : (
                      <RoundedSolidButton text="Join" onClick={() => handleJoinTask(task.id, task.url)} />
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
    </div>
  )
}

export default Task

