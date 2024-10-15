import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { fetchGroupsById } from '../../features/shopGroups/shopGroupSlice';
import { toast } from 'react-toastify'
import useNetworkStatus from '../../hooks/useNetworkStatus';
import { fetchProducts } from '../../features/products/PorductSlice';
import { createPrice, deletePrice, updatePrice } from '../../features/groupPrices/shopPricesSlice';

function DetailPricing() {
    const location = useLocation();
    const { item } = location.state || {};
    const dispatch = useDispatch();
    const isOnline = useNetworkStatus();

    const productStatus = useSelector((state) => state.products.status);

    useEffect(() => {
        if (productStatus === 'idle' && isOnline)
            dispatch(fetchProducts());
        dispatch(fetchGroupsById({ groupId: item.group_id }));
    }, [dispatch]);

    const shopGroupData = useSelector((state) => state.groupPrice.groupPriceData);
    const shopGroupError = useSelector((state) => state.groupPrice.error);
    const shopGroupStatus = useSelector((state) => state.groupPrice.status);

    // display products list 
    const productsData = useSelector((state) => state.products.productsData);

    const modalRef = useRef(null); // Reference to the modal container
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDel, setIsOpenDel] = useState(false);
    const [delError, setDelError] = useState('');
    const [delPrice, setDelPrice] = useState(null);
    const [editPrice, setEditPrice] = useState(null);
    const [newPrice, setNewPrice] = useState({          // create new product price data
        group_id: item.group_id,
        product_id: '',
        price: 1
    });
    // handle focus on input fileds of pop_up
    useEffect(() => {
        if (isOpen && modalRef.current) {
            const focusableElements = modalRef.current.querySelectorAll('input, button');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            const trapFocus = (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus(); // Move focus to the last element
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus(); // Move focus to the first element
                    }
                }
            };

            document.addEventListener('keydown', trapFocus);

            // Focus the first element when modal opens
            firstElement.focus();

            return () => {
                document.removeEventListener('keydown', trapFocus);
            };
        }
    }, [isOpen]);

    var filteredProductList = [];
    // filter products List
    if (Array.isArray(productsData) && Array.isArray(shopGroupData) && productsData.length > 0 && shopGroupData.length > 0) {
        filteredProductList = productsData?.filter(
            (product) => !shopGroupData?.some((groupProduct) => groupProduct.product_id === product.product_id)
        );
    } else
        filteredProductList = productsData


    if (shopGroupStatus === 'loading') {
        return (
            <div>loading group Data... </div>
        )
    }
    // handle input values
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPrice((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // hanlde submit logic for create new group
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPrice.product_id === '' && editPrice === null) {
            toast.warn("Please select a product!")
            return;
        }
        try {
            if (editPrice === null) { // edit case
                const res = dispatch(createPrice({ newPrice }));
                if (res?.arg?.newPrice === newPrice && !shopGroupError)
                    toast.success("successful created!")
                else
                    toast.error(shopGroupError)
            } else { // update case
                const NumberPrice = Number(newPrice.price);
                const res = dispatch(updatePrice({ priceId: editPrice, price: NumberPrice }));
                if (res?.arg?.priceId === editPrice && !shopGroupError)
                    toast.success("successful Update!")
                setEditPrice(null)
            }
        } catch (error) {
            toast.error("error occered!", error)
        }
        setNewPrice({
            group_id: item.group_id,
            product_id: '',
            price: 1
        }); // Reset after submission
        setIsOpen(false);
    };
    const handleDel_popUp = () => {
        //open same dialog box
        setIsOpen(!isOpen)
        setIsOpenDel(!isOpenDel)
        newPrice.product_id = ''

    }
    const handleDelete = (e) => {
        e.preventDefault();

        if (newPrice.product_id == (delPrice == null ? '' : delPrice.product_id)) {
            // Dispatch the delete action
            dispatch(deletePrice(delPrice.shop_price_id));
            // handleClearError();
            setDelError('')
            setIsOpen(!isOpen)
            setIsOpenDel(!isOpenDel)
            newPrice.product_id = ''
            setDelPrice(null)
            toast.success('Successful Delete!')

        } else {
            setDelError("Name Does Not Match");
        }
    };

    return (
        <>
            {/* pop up */}
            {
                isOpen && (
                    <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center z-10">
                        <form
                            ref={modalRef}
                            onSubmit={isOpenDel ? handleDelete : handleSubmit}
                            className="bg-white dark:bg-[#1E293B] dark:text-white p-6 rounded shadow-lg w-96 h-max sticky top-20 space-y-2"
                        >
                            <h2 className="text-lg font-bold mb-4">{isOpenDel ? 'Confirm Delete' : editPrice === null ? 'New Group' : 'Edit Price'}</h2>
                            {isOpenDel && <p className="mb-4 text-sm">To confirm deletion of the Price <strong className='text-red-500'>{delPrice?.product_id}</strong>, please enter the Product id below:</p>}
                            <label htmlFor="products" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{isOpenDel ? 'Enter ID' : editPrice === null ? 'Select an option' : 'Set New Price'}</label>
                            {!isOpenDel && editPrice === null &&
                                < select onChange={handleChange} name='product_id' id="products" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value=''>Choose a Product</option>
                                    {filteredProductList.length > 0 ? filteredProductList?.map((prod, index) => (
                                        <option key={index} value={prod.product_id}>{prod.product_name}</option>
                                    )) :
                                        <option disabled>No Product</option>
                                    }
                                </select>}

                            {isOpenDel && < input
                                className="border p-2 w-full mb-4 dark:bg-[#1E293B]"
                                placeholder="Enter product id"
                                value={newPrice.product_id}
                                required
                                name='product_id'
                                onChange={handleChange}
                            />}
                            {delError && <p className="text-red-500 mb-4">{delError}</p>}
                            {!isOpenDel &&
                                <input
                                    type='number'
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter price.."
                                    value={newPrice.price}
                                    min={1}
                                    required
                                    name='price'
                                    onChange={handleChange}
                                />}
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                                    onClick={() => {
                                        setIsOpen(false);
                                        setIsOpenDel(false);
                                        setDelError('');
                                        setEditPrice(null);
                                        setNewPrice({ price: 1 })
                                    }}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className={`bg-${isOpenDel ? 'red' : 'blue'}-500 text-white px-4 py-2 rounded`}>
                                    {isOpenDel ? 'Delete' : editPrice === null ? 'Create' : 'Update'}
                                </button>
                            </div>
                        </form >
                    </div >
                )
            }
            <div className='p-4'>
                <div className="wrap flex justify-between">
                    <h1 className='font-bold text-3xl mb-10 dark:text-slate-200'>{item.group_name}</h1>
                    <div className="btn_wrap float-end">
                        <button
                            type="button"
                            onClick={() => { setIsOpen(!isOpen); newPrice.product_id = '' }}
                            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                        >
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Create New Product
                            </span>
                        </button>
                    </div>
                </div>
                <label htmlFor="desc" className='text-slate-400'>description</label>
                <p className='text-black/70 border-y mb-2 dark:text-slate-200'>{item.description}</p>
                <div className="wrapp">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Product Id
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Product Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(shopGroupData) && shopGroupData.length > 0 ? shopGroupData?.map((item, index) => (
                                    <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item.product_id}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.product_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.price}
                                        </td>
                                        <td className="px-6 py-4 flex gap-5">
                                            {/* edit  */}
                                            <span onClick={() => { setIsOpen(!isOpen); setNewPrice({ price: item.price }); setEditPrice(item.shop_price_id) }} className="cursor-pointer font-medium text-myblue-600 dark:text-blue-500 hover:underline">Edit</span>
                                            {/* delete  */}
                                            <svg onClick={() => { setDelPrice(item); handleDel_popUp() }} className='cursor-pointer hover:scale-125 transition-transform duration-100' name='ic_delete' xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#EA3323"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>

                                        </td>
                                    </tr>
                                )) :
                                    <tr className=''>
                                        <td className='p-4'><p className=' text-red-400'>{shopGroupData?.message}</p></td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div >
        </>
    )
}

export default DetailPricing
