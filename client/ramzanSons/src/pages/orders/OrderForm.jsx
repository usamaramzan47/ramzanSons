import { useState } from 'react';
import { Link } from 'react-router-dom';

const demoProducts = [
    { id: 1, name: 'Plan Bread', image: 'https://media.istockphoto.com/id/92206322/photo/sliced-loaf-of-bread-isolated-on-white.jpg?s=612x612&w=0&k=20&c=YJ7EVbkl5OLKG6pf_i4agjh-MsGrn4htLKkprlttzHM=' },
    { id: 2, name: 'Milky Bread', image: 'https://media.istockphoto.com/id/519474969/photo/bread-slice.jpg?s=612x612&w=0&k=20&c=jWoCo5x59LkjvJqJ9IEJsLgN_7EyOglNuAa_VPWmFCE=' },
    { id: 3, name: 'Whole Wheat Bread', image: 'https://www.goldmedalbakery.com/content/uploads/2019/12/Sandwich-White.jpg' },
    { id: 4, name: 'Multigrain Bread', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQZb9bjUQdd9k1B3cduzdpFb8FUbXnEi2P_kcPKqnFdx7bZNBkgK9Sa9v9xtYKywMVr8Q&usqp=CAU' },
    { id: 1, name: 'Plan Bread', image: 'https://media.istockphoto.com/id/92206322/photo/sliced-loaf-of-bread-isolated-on-white.jpg?s=612x612&w=0&k=20&c=YJ7EVbkl5OLKG6pf_i4agjh-MsGrn4htLKkprlttzHM=' },
    { id: 2, name: 'Milky Bread', image: 'https://media.istockphoto.com/id/519474969/photo/bread-slice.jpg?s=612x612&w=0&k=20&c=jWoCo5x59LkjvJqJ9IEJsLgN_7EyOglNuAa_VPWmFCE=' },
    { id: 3, name: 'Whole Wheat Bread', image: 'https://www.goldmedalbakery.com/content/uploads/2019/12/Sandwich-White.jpg' },
    { id: 4, name: 'Multigrain Bread', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQZb9bjUQdd9k1B3cduzdpFb8FUbXnEi2P_kcPKqnFdx7bZNBkgK9Sa9v9xtYKywMVr8Q&usqp=CAU' },
    { id: 1, name: 'Plan Bread', image: 'https://media.istockphoto.com/id/92206322/photo/sliced-loaf-of-bread-isolated-on-white.jpg?s=612x612&w=0&k=20&c=YJ7EVbkl5OLKG6pf_i4agjh-MsGrn4htLKkprlttzHM=' },
    { id: 2, name: 'Milky Bread', image: 'https://media.istockphoto.com/id/519474969/photo/bread-slice.jpg?s=612x612&w=0&k=20&c=jWoCo5x59LkjvJqJ9IEJsLgN_7EyOglNuAa_VPWmFCE=' },
    { id: 3, name: 'Whole Wheat Bread', image: 'https://www.goldmedalbakery.com/content/uploads/2019/12/Sandwich-White.jpg' },
    { id: 4, name: 'Multigrain Bread', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQZb9bjUQdd9k1B3cduzdpFb8FUbXnEi2P_kcPKqnFdx7bZNBkgK9Sa9v9xtYKywMVr8Q&usqp=CAU' },
];

const OrderGrid = () => {
    const [order, setOrder] = useState({});
    const [showPopup, setShowPopup] = useState(false);

    const handleQuantityChange = (productId, quantity) => {
        setOrder(prevOrder => ({
            ...prevOrder,
            [productId]: {
                ...prevOrder[productId],
                quantity: quantity ? parseInt(quantity) : 0,
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowPopup(true);
    };

    const closePopup = () => setShowPopup(false);

    const confirmedOrder = Object.entries(order).filter(([_, value]) => value.quantity > 0);

    return (
        <div className="p-4 dark:bg-gray-800 dark:text-white">
            <ol className="mb-2 flex items-center justify-around w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
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

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {demoProducts.map(product => (
                        <div key={product.id} className="relative p-2 border border-gray-300 rounded-lg dark:border-gray-600">
                            {/* Image with black shade */}
                            <div
                                className="w-full h-40 bg-cover bg-center rounded-lg relative overflow-hidden"
                                style={{
                                    backgroundImage: `url(${product.image})`,
                                }}
                            >
                                <div className="absolute inset-0 bg-black opacity-35 rounded-lg"></div>
                                <span className="text-slate-100 hover:text-black hover:scale-150 transition-transform duration-200 font-semibold text-lg relative z-10 flex items-center justify-center h-full">
                                    {product.name}
                                </span>
                            </div>

                            {/* Input for quantity */}
                            <div className="mt-2">
                                <input
                                    type="number"
                                    min="0"
                                    value={order[product.id]?.quantity || ''}
                                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                                    placeholder="Quantity"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-800"
                >
                    Submit Order
                </button>
            </form>

            {/* Order Preview Pop-up */}
            {showPopup && (

                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white lg:w-[50%] h-auto p-6 rounded-lg shadow-lg dark:bg-gray-800 dark:text-white">
                        <ol className="mb-2 flex items-center justify-around w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
                            <li className="flex items-center text-green-500 dark:text-green-400 text-sm">
                                <span className="flex items-center justify-center w-4 h-4 me-2 text-xs bg-green-200  ring-4 ring-white dark:ring-gray-700 dark:bg-green-900 border shrink-0 rounded-full">
                                    <svg className="w-2.5 h-2.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                    </svg>
                                </span>
                                Select <span className="hidden sm:inline-flex sm:ms-2">Shop</span>
                                <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
                                </svg>
                            </li>
                            <li className="flex items-center text-green-500 dark:text-green-400 text-sm">
                                <span className="flex items-center justify-center w-4 h-4 me-2 text-xs bg-green-200  ring-4 ring-white dark:ring-gray-700 dark:bg-green-900 border shrink-0 rounded-full">
                                    <svg className="w-2.5 h-2.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                    </svg>
                                </span>
                                Fill <span className="hidden sm:inline-flex sm:ms-2">Order</span>
                                <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
                                </svg>
                            </li>
                            <li className="flex items-center text-myblue-600 dark:text-myblue-500 text-sm">
                                <span className="flex items-center justify-center w-4 h-4 me-2 text-xs border shrink-0 border-blue-600 rounded-full  dark:border-blue-500">
                                    3
                                </span>
                                Review
                            </li>
                        </ol>
                        <h2 className="text-xl font-bold mb-4 text-center text-myblue-600">Confirm Your Order</h2>
                        {confirmedOrder.length > 0 ? (
                            <ul className=''>
                                <li className='flex justify-between font-bold mb-6 border-b'>
                                    Name <span>Quantity</span>
                                </li>
                                {confirmedOrder.map(([productId, productData]) => (
                                    <li key={productId} className="mb-2 flex justify-between border-b">
                                        {demoProducts.find(p => p.id === parseInt(productId))?.name}
                                        <span>
                                            {productData.quantity}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No items selected.</p>
                        )}
                        <div className="flex justify-between mt-4">
                            {confirmedOrder.length > 0 && < Link to={'/orderTaking'}>
                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Confirm</button>
                            </Link>}
                            <button onClick={closePopup} type="button" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Close</button>
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    );
};

export default OrderGrid;
