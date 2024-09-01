import { Link } from 'react-router-dom';
import { useAppContext } from '../../../context/AppContext';
import { useEffect, useState } from 'react';


function Sidebar() {

    const currentUser = true;
    const { isSidebarCollapsed, setCurrentPage, currentPage } = useAppContext();

    const [localCollapsed, setLocalCollapsed] = useState(isSidebarCollapsed);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLocalCollapsed(!isSidebarCollapsed);
        }, 200);

        return () => clearTimeout(timer);  // Cleanup the timeout on unmount or state change
    }, [isSidebarCollapsed]);
    return (
        <div className={`left_side sticky top-0 transition-all duration-300 bg-sidebar dark:bg-slate-800 border-r ${localCollapsed ? 'w-0 p-0 overflow-hidden' : 'w-64 p-4 '} `} >
            <div className="logo flex items-center gap-1 w-max">
                <img src="/icons/logo_RS.png" alt="logo" className='w-6' />
                <Link to={"/"}>
                    <span className='text-black dark:text-slate-200 text-lg font-poppins font-semibold'>RamzanSons</span>
                </Link>
            </div>
            {
                currentUser &&
                <menu className='mt-5 flex flex-col gap-4'>
                    <span className='text-12 font-semibold text-spanText '>Dashboard</span>
                    <ul className='flex flex-col gap-2 ml-2 '>
                        <li className={`flex gap-1 p-1 rounded-xl items-center ${currentPage === 'Home' ? 'bg-sidebarHover dark:bg-slate-700' : ""} hover:bg-sidebarHover dark:hover:bg-slate-700`}>
                            <img src="/icons/ic_dashboard.svg" alt="icon" className='w-5' />
                            <Link to={"/"}>
                                <span className='font-normal text-blackGray text-14 dark:text-slate-200' onClick={() => setCurrentPage("Home")}>Home</span>
                            </Link>
                        </li>
                        <li className={`flex gap-1 p-1 rounded-xl items-center ${currentPage === 'Analytics' ? 'bg-sidebarHover dark:bg-slate-700' : ""} hover:bg-sidebarHover dark:hover:bg-slate-700`}>
                            <img src="/icons/ic_analstics.svg" alt="icon" className='w-5' />
                            <Link to={"/"}>
                                <span className='font-normal text-blackGray dark:text-slate-200 text-14' onClick={() => setCurrentPage("Analytics")}>Analytics</span>
                            </Link>
                        </li>
                        <li className={`flex gap-1 p-1 rounded-xl items-center ${currentPage === 'Sales' ? 'bg-sidebarHover dark:bg-slate-700' : ""} hover:bg-sidebarHover dark:hover:bg-slate-700`}>
                            <img src="/icons/ic_sales.svg" alt="icon" className='w-5' />
                            <Link to={"/"}>
                                <span className='font-normal text-blackGray text-14 dark:text-slate-200' onClick={() => setCurrentPage("Sales")}>Sales</span>
                            </Link>
                        </li>

                    </ul>
                    <hr />
                    <span className='text-12 font-semibold text-spanText '>Quick Menu</span>
                    <ul className='flex flex-col gap-2 ml-2'>
                        <li className={`flex gap-1 p-1 rounded-xl items-center ${currentPage === 'Users' ? 'bg-sidebarHover dark:bg-slate-700' : ""} hover:bg-sidebarHover dark:hover:bg-slate-700`}>
                            <img src="/icons/ic_users.svg" alt="icon" className='w-5' />
                            <Link to={"/"}>
                                <span className='font-normal text-blackGray text-14 dark:text-slate-200' onClick={() => setCurrentPage("Users")}>Users</span>
                            </Link>
                        </li>
                        <li className={`flex gap-1 p-1 rounded-xl items-center ${currentPage === 'Products' ? 'bg-sidebarHover dark:bg-slate-700' : ""} hover:bg-sidebarHover dark:hover:bg-slate-700`}>
                            <img src="/icons/ic_shop.svg" alt="icon" className='w-5' />
                            <Link to={"/"}>
                                <span className='font-normal text-blackGray text-14 dark:text-slate-200' onClick={() => setCurrentPage("Products")}>Products</span>
                            </Link>
                        </li>
                        <li className={`flex gap-1 p-1 rounded-xl items-center ${currentPage === 'Sales' ? 'bg-sidebarHover dark:bg-slate-700' : ""} hover:bg-sidebarHover dark:hover:bg-slate-700`}>
                            <img src="/icons/ic_sales.svg" alt="icon" className='w-5' />
                            <Link to={"/"}>
                                <span className='font-normal text-blackGray text-14 dark:text-slate-200' onClick={() => setCurrentPage("Sales")}>Sales</span>
                            </Link>
                        </li>
                        <li className={`flex gap-1 p-1 rounded-xl items-center ${currentPage === 'Invoice' ? 'bg-sidebarHover dark:bg-slate-700' : ""} hover:bg-sidebarHover dark:hover:bg-slate-700`}>
                            <img src="/icons/ic_bill.svg" alt="icon" className='w-5' />
                            <Link to={"/"}>
                                <span className='font-normal text-blackGray text-14 dark:text-slate-200' onClick={() => setCurrentPage("Invoice")}>Invoice</span>
                            </Link>
                        </li>
                        <li className={`flex gap-1 p-1 rounded-xl items-center ${currentPage === 'Reports' ? 'bg-sidebarHover dark:bg-slate-700' : ""} hover:bg-sidebarHover dark:hover:bg-slate-700`}>
                            <img src="/icons/ic_lineBar.svg" alt="icon" className='w-5' />
                            <Link to={"/"}>
                                <span className='font-normal text-blackGray text-14 dark:text-slate-200' onClick={() => setCurrentPage("Sales")}>Reports</span>
                            </Link>
                        </li>

                    </ul>
                </menu>
            }

        </div >
    )
}

export default Sidebar
