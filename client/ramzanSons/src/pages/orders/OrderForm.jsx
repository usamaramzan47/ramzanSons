


const OrderForm = () => {
    // const demoProducts = [
    //     {
    //         id: 1,
    //         name: 'Plan Bread',
    //         sizes: ['Small', 'Medium', 'Large'],
    //         image: 'https://assets.bonappetit.com/photos/5c62e4a3e81bbf522a9579ce/16:9/w_2560%2Cc_limit/milk-bread.jpg', // Placeholder image URL
    //     },
    //     {
    //         id: 1,
    //         name: 'Plan Bread',
    //         sizes: ['Small', 'Medium', 'Large'],
    //         image: 'https://assets.bonappetit.com/photos/5c62e4a3e81bbf522a9579ce/16:9/w_2560%2Cc_limit/milk-bread.jpg', // Placeholder image URL
    //     },
    //     {
    //         id: 1,
    //         name: 'Plan Bread',
    //         sizes: ['Small', 'Medium', 'Large'],
    //         image: 'https://assets.bonappetit.com/photos/5c62e4a3e81bbf522a9579ce/16:9/w_2560%2Cc_limit/milk-bread.jpg', // Placeholder image URL
    //     },
    //     {
    //         id: 1,
    //         name: 'Plan Bread',
    //         sizes: ['Small', 'Medium', 'Large'],
    //         image: 'https://assets.bonappetit.com/photos/5c62e4a3e81bbf522a9579ce/16:9/w_2560%2Cc_limit/milk-bread.jpg', // Placeholder image URL
    //     },
    //     {
    //         id: 1,
    //         name: 'Plan Bread',
    //         sizes: ['Small', 'Medium', 'Large'],
    //         image: 'https://assets.bonappetit.com/photos/5c62e4a3e81bbf522a9579ce/16:9/w_2560%2Cc_limit/milk-bread.jpg', // Placeholder image URL
    //     },
    //     {
    //         id: 2,
    //         name: 'Milky Bread',
    //         sizes: ['Small', 'Medium', 'Large'],
    //         image: 'https://via.placeholder.com/50', // Placeholder image URL
    //     },
    // ];

    return (
        <>
            <ol className="flex items-center justify-around w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
                <li className="flex items-center text-green-500 dark:text-green-400">
                    <span className="flex items-center justify-center w-6 h-6 me-2 text-xs bg-green-200  ring-4 ring-white dark:ring-gray-900 dark:bg-green-900 border shrink-0 rounded-full">
                        <svg className="w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                        </svg>
                    </span>
                    Select <span className="hidden sm:inline-flex sm:ms-2">Shop</span>
                    <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
                    </svg>
                </li>
                <li className="flex items-center text-myblue-600 dark:text-myblue-500">
                    <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border shrink-0 border-blue-600 rounded-full  dark:border-blue-500">
                        2
                    </span>
                    Fill <span className="hidden sm:inline-flex sm:ms-2">Order</span>
                    <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
                    </svg>
                </li>
                <li className="flex items-center">
                    <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border shrink-0 border-gray-500 rounded-full  dark:border-gray-400">
                        3
                    </span>
                    Review
                </li>
            </ol>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-16 py-3">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Qty
                            </th>

                        </tr>
                    </thead>
                    <tbody>

                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="p-4">
                                <img src="https://assets.bonappetit.com/photos/5c62e4a3e81bbf522a9579ce/16:9/w_2560%2Cc_limit/milk-bread.jpg" className="w-16 md:w-32 max-w-full max-h-full" alt="Apple iMac" />
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                2P-Plan Bread
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <button className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                        <span className="sr-only">Quantity button</span>
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                        </svg>
                                    </button>
                                    <div className="ms-3">
                                        <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" required />
                                    </div>
                                    <button className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                        <span className="sr-only">Quantity button</span>
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                            {/* <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            $2499
                        </td>
                        <td className="px-6 py-4">
                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                        </td> */}
                        </tr>

                    </tbody>
                </table>
            </div>
        </>

    );
};

export default OrderForm;
