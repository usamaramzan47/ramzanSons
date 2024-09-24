import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from '../../features/shopGroups/shopGroupSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Pricing() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGroups());

    }, [dispatch]);

    const shopGroupData = useSelector((state) => state.shopGroup.shopGroupsData);
    // const shopGroupError = useSelector((state) => state.shopGroup.error);
    const shopGroupStatus = useSelector((state) => state.shopGroup.status);

    if (shopGroupStatus === 'loading') {
        return (
            <div className="">Loading Groups...</div>
        )
    }

    return (
        <div className="p-4 flex flex-col">
            <div className="btn_wrap float-end">
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Create New Pricing
                    </span>
                </button>
            </div>
            <div className="wrapp flex gap-4 flex-wrap">
                {shopGroupData?.map((item) => (
                    < div key={item.group_id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <svg
                            className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3"
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="currentColor"
                        >
                            <path d="M600-320h120q17 0 28.5-11.5T760-360v-240q0-17-11.5-28.5T720-640H600q-17 0-28.5 11.5T560-600v240q0 17 11.5 28.5T600-320Zm40-80v-160h40v160h-40Zm-280 80h120q17 0 28.5-11.5T520-360v-240q0-17-11.5-28.5T480-640H360q-17 0-28.5 11.5T320-600v240q0 17 11.5 28.5T360-320Zm40-80v-160h40v160h-40Zm-200 80h80v-320h-80v320ZM80-160v-640h800v640H80Zm80-560v480-480Zm0 480h640v-480H160v480Z" />
                        </svg>

                        <Link to="/priceDetail" state={{ item }}>
                            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.group_name}</h5>
                        </Link>
                        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Go to this step by step guideline process on how to certify for your weekly benefits:</p>
                        <Link to="/priceDetail" state={{ item }} className="inline-flex font-medium items-center dark:text-slate-300 text-blue-600 hover:underline group">
                            Edit pricing
                            <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg] transition-all duration-200 group-hover:scale-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778" />
                            </svg>
                        </Link>
                    </div>
                ))
                }
            </div>

        </div >
    )
}

export default Pricing
