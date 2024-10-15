import { useEffect, useState } from 'react';
import { fetchShops, deletShop, resetError } from '../../features/Shops/ShopSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useNetworkStatus from '../../hooks/useNetworkStatus';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';

function Shops() {

    const dispatch = useDispatch();
    const [enteredProductName, setEnteredProductName] = useState('');
    const [delShop, setDelShop] = useState(null);
    const [isOpenDel, setisOpenDel] = useState(false);
    const [delError, setDelError] = useState('');

    const ShopsData = useSelector((state) => state.shops.ShopsData);
    const Shopstatus = useSelector((state) => state.shops.status);
    const shopError = useSelector((state) => state.shops.error);
    const isOnline = useNetworkStatus();

    useEffect(() => {

        if (Shopstatus === 'idle' && isOnline) {
            dispatch(fetchShops());
        }
        shopError !== '' && toast.error(shopError);

    }, [dispatch, Shopstatus]);

    const handleDelete = () => {
        if (enteredProductName === delShop.shop_name) {
            // Dispatch the delete action
            dispatch(deletShop(delShop.shop_id));
            handleClearError();
            toast.success('Successful Delete!')

        } else {
            setDelError("Name Does Not Match");
        }
    };

    // Clear the error when a user dismisses it
    const handleClearError = () => {
        dispatch(resetError());
        setDelError('')
        setisOpenDel(false);
        setEnteredProductName('')
    };

    if (!isOnline) {
        return (

            <div className="wrapper flex flex-col items-center justify-center border-2 h-full">
                <div id="alert-2" className="flex items-center justify-around w-full p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div className="ms-3 text-sm font-medium">
                        You are offline. Please check your internet connection.
                    </div>
                    <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-2" aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>
            </div>
        );

    }
    return (
        <section className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
            <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
                <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                    <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
                        <div className="w-full md:w-1/2">
                            <form className="flex items-center">
                                <label htmlFor="simple-search" className="sr-only">Search</label>
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search Shop..." required="" />
                                </div>
                            </form>
                        </div>
                        <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                            <Link to={'/newShop'}>
                                <button type="button" className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                    <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                    </svg>
                                    Add new Shop
                                </button>
                            </Link>
                            <button type="button" className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                </svg>
                                Export
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-3">ID</th>
                                    <th scope="col" className="px-4 py-3">Shop</th>
                                    <th scope="col" className="px-4 py-3">Owner</th>
                                    <th scope="col" className="px-4 py-3">Address</th>
                                    <th scope="col" className="px-4 py-3">Phone</th>
                                    <th scope="col" className="px-4 py-3">Created At</th>
                                    <th scope="col" className="px-4 py-3">Actions</th>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    ShopsData?.length > 0 && ShopsData?.map((item) => (
                                        <tr key={item.shop_id} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.shop_id}</td>
                                            <Link to={'/shopDetails'} state={{ item }}>
                                                <div scope="row" className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <img src={item.img} alt="img" className="w-auto h-8 mr-3 rounded-full" />
                                                    {item.shop_name}
                                                </div>
                                            </Link>
                                            <td className="px-4 py-2">
                                                <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">{item.owner}</span>
                                            </td>
                                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <span>{item.shop_address}</span>
                                            </td>
                                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.shop_num}</td>
                                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.createdat}</td>
                                            {/* actions  */}
                                            <td>
                                                <div className="flex items-center justify-center space-x-3">
                                                    {/* edit icon  */}
                                                    <Link to='/editShop' state={{ item }}>
                                                        <span className="cursor-pointer flex items-center justify-center px-2 py-1 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 hover:scale-50 transition-all duration-300">
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z" /></svg>
                                                        </span>
                                                    </Link>
                                                    {/* del icon  */}
                                                    <svg onClick={() => { setDelShop(item); setisOpenDel(true) }} className="cursor-pointer bg-red-100 m-2 hover:bg-red-200 hover:scale-50 transition-all duration-300 rounded-md px-2 " xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#EA3323"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                                                </div>
                                            </td>
                                        </tr>))}
                            </tbody>
                        </table>
                    </div>
                    <nav className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0" aria-label="Table navigation">
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            Showing
                            <span className="font-semibold text-gray-900 dark:text-white">1-10</span>
                            of
                            <span className="font-semibold text-gray-900 dark:text-white">1000</span>
                        </span>
                        <div className="flex items-center space-x-4">
                            <h5>
                                <span className="text-gray-500">Total Shops: </span>
                                <span className="dark:text-white">{ShopsData?.length}</span>
                            </h5>
                        </div>
                        <ul className="inline-flex items-stretch -space-x-px">
                            <li>
                                <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="sr-only">Previous</span>
                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                            </li>
                            <li>
                                <a href="#" aria-current="page" className="z-10 flex items-center justify-center px-3 py-2 text-sm leading-tight border text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="sr-only">Next</span>
                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            {/* delete pop up  */}
            {
                isOpenDel && <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
                        <p className="mb-4">To confirm deletion of the product <strong>{delShop.shop_name}</strong>, please enter the product name below:</p>
                        <input
                            type="text"
                            className="border p-2 w-full mb-4"
                            value={enteredProductName}
                            onChange={(e) => setEnteredProductName(e.target.value)}
                            placeholder="Enter product name"
                        />
                        {delError && <p className="text-red-500 mb-4">{delError}</p>}
                        {shopError && <p className="text-red-500 mb-4"> {shopError}</p>}
                        <div className="flex justify-end">
                            <button
                                onClick={() => handleClearError()}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                            // onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            }
        </section >
    )
}

export default Shops
