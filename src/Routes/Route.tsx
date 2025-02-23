import Friends from '@/pages/Friends/Friend'
import Home from '@/pages/Home/Home'
import LeaderBoard from '@/pages/LeaderBoard/LeaderBoard'
import Task from '@/pages/Task/Task'
import Wallet from '@/pages/Wallet/Wallet'
import { Routes, Route } from 'react-router-dom'

const AllRoute = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/task" element={<Task />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/leader" element={<LeaderBoard />} />
            <Route path="/wallet" element={<Wallet />} />
        </Routes>
    </div>
  )
}

export default AllRoute