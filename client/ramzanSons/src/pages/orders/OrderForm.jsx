import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useNetworkStatus from '../../hooks/useNetworkStatus';
import { fetchProducts } from '../../features/products/PorductSlice';
import { toast } from 'react-toastify';
import ListLoading from '../../components/global/loading/ListLoading';
import { createOrder } from '../../features/orders/orderSlice';
import { createOrderDetail } from '../../features/orders/orderDetailSlice';
import SuccessBox from '../../components/global/successPopUp/SuccessBox';
import { updateOrderStatusInDB } from '../../features/Shops/ShopSlice';

const OrderGrid = () => {

    const location = useLocation();
    const shopId = location.state?.id;
    const dispatch = useDispatch();
    const [order, setOrder] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showSuccessBox, setShowSuccessBox] = useState(false);
    const productsData = useSelector((state) => state.products.productsData);
    const productStatus = useSelector((state) => state.products.status);
    const productError = useSelector((state) => state.products.error);

    const isOnline = useNetworkStatus();

    // if page refresh fetch prods again
    useEffect(() => {
        if (productStatus === 'idle' && isOnline) {
            dispatch(fetchProducts());
        }

    }, [dispatch, productStatus, isOnline]);

    if (productStatus === 'loading') {
        <ListLoading />
    }

    if (productError !== '') {
        toast.error(productError);
    }

    // Function to handle quantity changes for each product
    const handleQuantityChange = (productId, quantity) => {
        setOrder(prevOrder => {
            // Check if the product already exists in the order
            const existingProductIndex = prevOrder.findIndex(item => item.product_id === productId);

            // If the product is found, update its quantity, otherwise add it
            if (existingProductIndex > -1) {
                const updatedOrder = [...prevOrder];
                updatedOrder[existingProductIndex] = {
                    ...updatedOrder[existingProductIndex],
                    quantity: quantity ? parseInt(quantity) : 0,
                };
                return updatedOrder;
            } else {
                return [
                    ...prevOrder,
                    { product_id: productId, quantity: quantity ? parseInt(quantity) : 0 }
                ];
            }
        });
    };

    const placeConfirmOrder = async () => {
        const orderData = { shop_id: shopId, order_taker_name: 'usama ramzan' };
        // generate order id
        const res = await dispatch(createOrder({ orderData }))
        const order_id = res?.payload?.order_id
        if (order_id) {
            const orderPayload = {
                order_id: order_id,
                products: order,
            };
            // store order data 
            const resDetail = await dispatch(createOrderDetail({ orderPayload }));
            if (resDetail?.meta?.requestStatus === 'fulfilled') {
                const resStatus = await dispatch(updateOrderStatusInDB({ shopId, newStatus: "Completed" }));
                if (resStatus?.meta?.requestStatus === 'fulfilled') {
                    toast.success('order place successful!');
                    setShowPopup(false);
                    setShowSuccessBox(!showSuccessBox);
                }
                else {
                    toast.error('something wrong to update the orderStatus');
                    setShowPopup(false);
                }
            }
            else {
                toast.error('something wrong. order not placed!');
                setShowPopup(false);
            }
        } else {
            toast.error('something wrong.order not created !')
        }

        setShowPopup(false)
    }

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
            <form onSubmit={() => setShowPopup(true)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {productsData.length > 0 && productsData.map((product, index) => (
                        <div key={index} className="relative p-2 border border-gray-300 rounded-lg dark:border-gray-600">
                            {/* Image with black shade */}
                            <div
                                className="w-full h-40 bg-cover bg-center rounded-lg relative overflow-hidden"
                                style={{
                                    backgroundImage: `url(${product?.img})`,
                                }}
                            >
                                <div className="absolute inset-0 bg-black opacity-35 rounded-lg"></div>
                                <span className="text-slate-100 hover:text-black hover:scale-150 transition-transform duration-200 font-semibold text-lg relative z-10 flex items-center justify-center h-full">
                                    {product?.product_name}
                                </span>
                            </div>

                            {/* Input for quantity */}
                            <div className="mt-2">
                                <input
                                    type="number"
                                    min="0"
                                    onChange={(e) => handleQuantityChange(product?.product_id, e.target.value)}
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
            {
                showPopup && (
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
                            {order.length > 0 ? (
                                <ul className=''>
                                    <li className='flex justify-between font-bold mb-6 border-b'>
                                        Name <span>Quantity</span>
                                    </li>
                                    {order.map((item) => (
                                        <li key={item.product_id} className="mb-2 flex justify-between border-b">
                                            {productsData.length > 0 && productsData.find(p => p?.product_id === parseInt(item.product_id))?.product_name}
                                            <span>
                                                {item.quantity ?? 0}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No items selected.</p>
                            )}
                            <div className="flex justify-between mt-4">
                                {order.length > 0 &&

                                    <button onClick={placeConfirmOrder} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Confirm
                                    </button>

                                }
                                <button onClick={() => setShowPopup(false)} type="button" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                showSuccessBox &&
                < SuccessBox title={"Order place Successful"} link={'/orderTaking'} />
            }

        </div >
    );
};

export default OrderGrid;
