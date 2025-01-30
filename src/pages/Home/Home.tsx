import { MainButton, MainButtonDisable, MainButtonLight, RoundedButton } from '@/Compnents/CustomButton'
import { useEffect, useState } from 'react'
import chargeone from '../../assets/charge (1).png'
import chargetwo from '../../assets/charge2.png'
import chargethree from '../../assets/charge3.png'
import chargefour from '../../assets/charge (4).png'
import chargefive from '../../assets/charge5.png'
import chargesix from '../../assets/charge6.png'
import { IoIosTimer } from "react-icons/io";
import { SiRakuten } from "react-icons/si";

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string
        initDataUnsafe: {
          user?: {
            id: number
            first_name: string
            last_name?: string
            username?: string
            language_code?: string
            image?: string
          }
        }
      }
    }
  }
}

const chargingLevels = [chargeone, chargetwo, chargethree, chargefour, chargefive, chargesix];

const Home = () => {
  const [user, setUser] = useState<{
    id: number
    first_name: string
    last_name?: string
    username?: string
    language_code?: string
    photo_url?: string
  } | null>(null)

  const [level, setLevel] = useState(0);
  const [isCharging, setIsCharging] = useState(false);
  const [countdown, setCountdown] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const telegramUser = window.Telegram.WebApp.initDataUnsafe.user;
      if (telegramUser) {
        setUser(telegramUser);
      }
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;
    let timer: NodeJS.Timeout;

    if (isCharging) {
      setCountdown(300); // Reset countdown to 5 minutes

      interval = setInterval(() => {
        setLevel((prev) => (prev + 1) % chargingLevels.length); // Loops through images
      }, 1000); // Change every second

      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setIsCharging(false);
            clearInterval(interval);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      timeout = setTimeout(() => {
        setIsCharging(false);
        clearInterval(interval);
        clearInterval(timer);
      }, 300000); // Stop charging after 5 minutes
    }

    return () => {
      clearInterval(interval);
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [isCharging]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className='p-5 text-sm relative'>
      <div className='flex items-center gap-3'>
        <div className='w-10 h-10 bg-neutral-200 rounded-full flex overflow-hidden'>
          <img src={user?.photo_url} className='w-full h-full object-cover' alt="user avatar" />
        </div>
        <div>
          <h2 className='font-semibold'>{user?.first_name} {user?.last_name}</h2>
          <p className='text-xs text-neutral-600'>@{user?.username}</p>
        </div>
        <div className='ml-auto'>
          <RoundedButton text='Level 1' />
        </div>
      </div>

      <div className='flex flex-col gap-4 items-center pt-[5rem] justify-center'>
        <div className='flex items-center gap-2 mb-10'>
          <p className='bg-[#016FEC] text-white rounded-md p-2.5 text-sm'><SiRakuten /></p>
          <p className='text-2xl font-medium'>0</p>
        </div>

        <div className='w-[26%] '>
          <img
            src={chargingLevels[level]}
            alt="Charging Level"
            className="w-full transition-opacity duration-500 ease-in-out"
          />
        </div>

        <p className='flex items-center gap-2 bg-neutral-100 px-4 py-2 text-sm rounded-full'>
          <IoIosTimer className='text-lg' />
          {formatTime(countdown)}
        </p>
      </div>

      <div className='w-[90%] space-y-2 fixed bottom-[7rem]'>
        <MainButtonLight text='Check your earnings' />
        {
            isCharging
             ? <MainButtonDisable text='Mining in Progress . .' />
              : <MainButton text='Start Mining' onClick={() => setIsCharging(true)}/>
        }
      </div>
    </div>
  );
};

export default Home;
