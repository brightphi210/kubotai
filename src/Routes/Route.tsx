import Friends from '@/pages/Friends/Friend'
import Home from '@/pages/Home/Home'
import Task from '@/pages/Task/Task'
import { Routes, Route } from 'react-router-dom'

const AllRoute = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/task" element={<Task />} />
            <Route path="/friends" element={<Friends />} />
        </Routes>
    </div>
  )
}

export default AllRoute