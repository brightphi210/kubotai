import { useState } from "react";
import { GoHome } from "react-icons/go";
import { CiViewList } from "react-icons/ci";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { PiTrophy } from "react-icons/pi";
import { IoWalletOutline } from "react-icons/io5";
import { Link } from "react-router-dom";



const BottomSheet = () => {
    const [activeTab, setActiveTab] = useState("Home");
  
    return (
      <div className="fixed bottom-0 border-t border-gray-300 w-full text-[7px] bg-white">
        <div className="flex items-center gap-3 justify-between p-3 px-4">
          {[
            { name: "Home", icon: <GoHome className="text-2xl" />, link: '/' },
            { name: "Task", icon: <CiViewList className="text-2xl" />, link: '/task' },
            { name: "Friends", icon: <MdOutlinePeopleAlt className="text-2xl" />, link: '/friends' },
            { name: "Leaders", icon: <PiTrophy className="text-2xl" />, link: '/leader' },
            { name: "Wallet", icon: <IoWalletOutline className="text-2xl" />, link: '/wallet' },
          ].map((tab) => (
            <Link to={`${tab?.link}` }>
            <div
              key={tab.name}
              className={`flex flex-col w-12 h-11 items-center rounded-md justify-center cursor-pointer transition-all ease-in-out duration-300 ${
                activeTab === tab.name
                  ? "bg-blue-700 text-white "
                  : "text-neutral-500"
              }`}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.icon}
              <p>{tab.name}</p>
            </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };
  
  export default BottomSheet;
  