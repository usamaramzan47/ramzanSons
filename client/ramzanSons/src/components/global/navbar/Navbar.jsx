import React ,{ useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../theme/Theme';
import { toggleSidebar } from '../sidebar/ToggleRedux';

function Navbar() {

  useEffect(() => {
    console.log(' navbar Component did mount!');

    // Cleanup function
    return () => {
      console.log('navbar Component did unmount!');
    };
  }, []); // Empty dependency array means this runs once on mount and cleanup on unmount

  const [isOpen, setIsOpen] = useState(false);

  const theme = useSelector((state) => state.theme);
  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  const currentPage = useSelector((state) => state.currentPage);

  const dispatch = useDispatch();

  return (
    <>
      <div className='p-2 w-full flex justify-between items-center border-b-1 bg-white dark:bg-slate-800 dark:text-slate-200 z-10'>
        <div className="left flex flex-col items-end gap-1">
          <div className="wrapper flex items-center">
            <img src="/icons/ic_menu_bar.svg" alt="icon" className='p-2 cursor-pointer hover:bg-sidebarHover hover:rounded-full' onClick={() => dispatch(toggleSidebar())} />
            <span className="text-md font-normal font-poppins">{currentPage}</span>
            {/* <span className="text-lg font-semibold font-poppins">Hello, {title.name} 👋</span>
            <span className='text-[10px] font-semibold text-[#878787]'>{title.wish}</span> */}
          </div>
        </div>
        <div className="right flex items-center gap-3 relative right-6">
          <div className="item relative h-full flex justify-start " onClick={handleToggle}>
            <img src={`/icons/ic_${theme}Mode.svg`} alt="icon" className='p-2 hover:bg-sidebarHover rounded-full cursor-pointer' />
          </div>
          <div className="item relative h-full flex justify-start">
            <img src="/icons/ic_setting.svg" alt="icon" className='p-2 hover:bg-sidebarHover rounded-full cursor-pointer' />
            <div className="batch absolute flex items-center justify-center right-0 w-4 h-4 bg-[#FF0000] text-white rounded-full">
              <span className='text-[10px] absolute '>2</span>
            </div>
          </div>
          <div className="item relative h-full flex justify-start">
            <img src="/icons/ic_bell.svg" alt="icon" className='p-2 hover:bg-sidebarHover rounded-full cursor-pointer' />
            <div className="batch absolute flex items-center justify-center right-0  w-4 h-4 bg-[#FF0000] text-white rounded-full">
              <span className='text-[10px] absolute '>2</span>
            </div>
          </div>
          <div className="user flex items-center gap-1">
            <img src="/profile.jpeg" alt="img" className='w-8 h-8 rounded-full object-cover cursor-pointer' onClick={() => setIsOpen(!isOpen)} />
          </div>

          <section className={`${isOpen ? 'flex' : 'hidden'} absolute top-12 right-0 bg-[#6956E5] text-white rounded`}>
            <ul className='px-6 py-4 flex flex-col gap-4'>
              <div className="flex gap-2 border-b-1 border-black p-1">
                <img src="/icons/bell.svg" alt="" className='w-4' />
                <li className='cursor-pointer'>notification</li>
              </div>
              <div className="flex gap-2 border-b-1 border-black p-1">
                <img src="/icons/logout.svg" alt="" className='w-4' />
                <li className='cursor-pointer'>logout</li>
              </div>
            </ul>
          </section>
        </div>
      </div>
    </>

  )
}

export default React.memo(Navbar) 
