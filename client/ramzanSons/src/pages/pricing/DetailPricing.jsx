import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchGroupsById } from '../../features/shopGroups/shopGroupSlice';

function DetailPricing() {
    const location = useLocation();
    const { item } = location.state || {};
    const dispatch = useDispatch();

    const shopGroupData = useSelector((state) => state.shopGroup.shopGroupsData);
    // const shopGroupError = useSelector((state) => state.shopGroup.error);
    const shopGroupStatus = useSelector((state) => state.shopGroup.status);
    useEffect(() => {
        dispatch(fetchGroupsById({ groupId: item.group_id }));
    }, [dispatch]);

    if (shopGroupStatus === 'loading') {
        return (
            <div>loading group Data... </div>
        )
    }

    return (
        <div className='p-4'>
            <div className="wrap flex justify-between">
                <h1 className='font-bold text-3xl mb-10'>{item.group_name}</h1>
                <span className='text-myblue-600'>add new product</span>
            </div>
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
                            {shopGroupData.map((item, index) => (
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
                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-myblue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div >
    )
}

export default DetailPricing
