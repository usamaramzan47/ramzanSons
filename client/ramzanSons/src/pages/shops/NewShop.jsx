import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createShop } from '../../features/shops/ShopSlice';
import { fetchGroups } from '../../features/shopGroups/shopGroupSlice';
import SuccessBox from '../../components/global/successPopUp/SuccessBox';
import { toast } from 'react-toastify';

function NewShop() {

    const dispatch = useDispatch();
    useEffect(() => {

        if (shopGroupStatus === 'idle')
            dispatch(fetchGroups());

    }, [dispatch]);

    const shopGroupData = useSelector((state) => state.shopGroup.shopGroupsData);
    const shopStatus = useSelector((state) => state.shops.status);
    const shopGroupStatus = useSelector((state) => state.shopGroup.status);
    const shopError = useSelector((state) => state.shops.error);

    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        shop_name: '',
        img: '',
        owner: '',
        shop_address: '',
        shop_num: '',
        shop_description: '',
        groupId: '',
        group_name: ''
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
        dispatch(createShop({ shopData: formData }));
        setIsOpen(true)
        toast.success('successfull Create!')
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <div className="max-w-lg w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    New Shop
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="wrapp flex justify-between gap-10">

                        <div className="left space-y-4">
                            {/* Shop Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Shop Name
                                </label>
                                <input
                                    type="text"
                                    name="shop_name"
                                    value={formData.shop_name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                                    placeholder='shop name..'
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
                                    placeholder='shop image..'
                                />
                            </div>

                            {/* owner */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Owner Name
                                </label>
                                <input
                                    name="owner"
                                    value={formData.owner}
                                    onChange={handleChange}
                                    required
                                    placeholder='owner name..'
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                                />
                            </div>

                            {/* shop_address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Shop Address
                                </label>
                                <input
                                    name="shop_address"
                                    value={formData.shop_address}
                                    onChange={handleChange}
                                    required
                                    placeholder='shop address..'
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                                />
                            </div>
                            {/* shop_num */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Shop Call Number
                                </label>
                                <input
                                    name="shop_num"
                                    value={formData.shop_num}
                                    onChange={handleChange}
                                    placeholder='order number..'
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                                />
                            </div>
                        </div>
                        <div className="right space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Group
                                </label>
                                <select
                                    name="groupId"
                                    value={formData.groupId}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                                >
                                    <option value=''>--select--</option>
                                    {shopGroupData?.map((group) => (
                                        <option key={group.group_id} value={group.group_id}>{group.group_name}</option>
                                    ))
                                    }

                                </select>
                            </div>
                            {/* Shop Desc */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Shop Description
                                </label>
                                <textarea
                                    type="text"
                                    name="shop_description"
                                    value={formData.shop_description}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                                    placeholder='shop desc ...'
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-between float-end">
                        {shopStatus === 'loading' && <span>status:{shopStatus}</span>}
                        <button
                            type="submit"
                            className={`px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-300 ${shopStatus === 'loading' && 'cursor-not-allowed'}`}
                            disabled={shopStatus === 'loading'}
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
                {shopError && <span>shopError: {shopError}</span>}
            </div>
            {isOpen && <SuccessBox title={"Successful Updated!"} isOpen={true} setIsOpen={setIsOpen} link={'/shops'} />}
        </div>
    );
}

export default NewShop
