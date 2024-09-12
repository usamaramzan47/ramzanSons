import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../features/products/PorductSlice';
import SuccessBox from '../../components/global/successPopUp/SuccessBox';
import { toast } from 'react-toastify';

function NewProduct() {

    const dispatch = useDispatch();
    const productStatus = useSelector((state) => state.products.status);
    const productError = useSelector((state) => state.products.error);

    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        product_name: '',
        img: '',
        size: ''
    });

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic (e.g., API call)
        dispatch(createProduct({ productData: formData }));
        setIsOpen(true)
        toast.success('successfull Create!')
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">

            <div className="max-w-lg w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    New Product
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Product Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="product_name"
                            required
                            value={formData.product_name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                            placeholder='Enter product Name..'
                        />
                    </div>

                    {/* image URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Image URL
                        </label>
                        <input
                            type="text"
                            name="img"
                            value={formData.img}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                            placeholder='Product URL..'
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Size
                        </label>
                        <select
                            name="size"
                            value={formData.size}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        >
                            <option value=''>--Select--</option>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-between float-end">
                        {productStatus === 'loading' && <span>status:{productStatus}</span>}
                        <button
                            type="submit"
                            className={`px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-300 ${productStatus === 'loading' && 'cursor-not-allowed'}`}
                            disabled={productStatus === 'loading'}
                        >
                            Create
                        </button>
                    </div>
                </form>

                {productError && <span className='text-red-400'>{productError}</span>}
            </div>
            {isOpen && <SuccessBox title={"Successful Created!"} isOpen={true} setIsOpen={setIsOpen} />}
        </div>
    );
}

export default NewProduct
