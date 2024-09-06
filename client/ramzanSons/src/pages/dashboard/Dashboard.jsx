import { useEffect } from "react";

function Dashboard() {
  useEffect(() => {
    console.log(' dashboard Component did mount!');

    // Cleanup function
    return () => {
      console.log('dashboard Component did unmount!');
    };
  }, []); // Empty dependency array means this runs once on mount and cleanup on unmount

  return (
    <div className="flex flex-col w-full h-full items-center justify-center font-bold text-lg text-blackGray dark:text-slate-200">
      Comming Soon ...
    </div>
  )
}

export default Dashboard
