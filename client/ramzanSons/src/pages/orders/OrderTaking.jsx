import { useState } from 'react';

const demoShops = [
    { id: '1', name: 'Shop A', address: '123 Main St', contact: '123-456-7890' },
    { id: '2', name: 'Shop B', address: '456 Elm St', contact: '987-654-3210' },
    { id: '3', name: 'Shop C', address: '789 Maple St', contact: '555-123-4567' },
    { id: '4', name: 'Shop D', address: '101 Oak St', contact: '555-987-6543' },
    // Add more demo shops as needed
];

const demoProducts = [
    'Bread', 'Rusk', 'Cookies', 'Cake', 'Muffins', 'Pastries', 'Donuts', 'Bagels', 'Baguettes', 'Croissants', 'Danish', 'Tarts', 'Brownies'
];

function App() {
    const [shopId, setShopId] = useState('');
    const [shopName, setShopName] = useState('');
    const [shopDetails, setShopDetails] = useState(null);
    const [order, setOrder] = useState({});
    const [showPopup, setShowPopup] = useState(false);

    const handleShopSearch = () => {
        const foundShop = demoShops.find(shop => shop.id === shopId || shop.name.toLowerCase().includes(shopName.toLowerCase()));
        setShopDetails(foundShop);
    };

    const handleQuantityChange = (product, increment) => {
        setOrder(prevOrder => {
            const newQuantity = (prevOrder[product] || 0) + increment;
            if (newQuantity <= 0) {
                const { [product]: removed, ...rest } = prevOrder;
                return rest;
            }
            return { ...prevOrder, [product]: newQuantity };
        });
    };

    const handleOrderSubmit = () => {
        setShowPopup(true);
    };

    const confirmOrder = () => {
        alert('Order submitted!');
        setShowPopup(false);
        // Clear order and form logic here
        setOrder({});
    };

    return (
        <div className="min-h-screen p-4 dark:bg-gray-800 dark:text-white">
            <div className="flex mb-6">
                <div className="w-1/3 pr-4">
                    <h2 className="text-xl font-bold mb-2">Select Shop</h2>
                    <input
                        type="text"
                        placeholder="Shop ID"
                        value={shopId}
                        onChange={(e) => setShopId(e.target.value)}
                        className="w-full mb-2 p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                    />
                    <input
                        type="text"
                        placeholder="Shop Name"
                        value={shopName}
                        onChange={(e) => setShopName(e.target.value)}
                        className="w-full mb-2 p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                    />
                    <button
                        onClick={handleShopSearch}
                        className="w-full p-2 bg-green-500 text-white rounded dark:bg-green-600"
                    >
                        Search Shop
                    </button>

                    {shopDetails && (
                        <div className="mt-4 p-4 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700">
                            <h3 className="text-lg font-bold">{shopDetails.name}</h3>
                            <p>ID: {shopDetails.id}</p>
                            <p>Address: {shopDetails.address}</p>
                            <p>Contact: {shopDetails.contact}</p>
                        </div>
                    )}
                </div>

                {shopDetails && <div className="w-2/3 pl-4">
                    <h2 className="text-xl font-bold mb-2">Order Form</h2>
                    <div className="mb-4">
                        <h3 className="text-lg font-bold mb-2">Products</h3>
                        {demoProducts.map(product => (
                            <div key={product} className="flex items-center justify-between mb-2 p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700">
                                <span>{product}</span>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => handleQuantityChange(product, -1)}
                                        className="px-2 py-1 bg-red-500 text-white rounded dark:bg-red-600"
                                    >
                                        -
                                    </button>
                                    <span className="mx-2">{order[product] || 0}</span>
                                    <button
                                        onClick={() => handleQuantityChange(product, 1)}
                                        className="px-2 py-1 bg-green-500 text-white rounded dark:bg-green-600"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleOrderSubmit}
                        className="w-full p-2 bg-blue-500 text-white rounded dark:bg-blue-600"
                    >
                        Submit Order
                    </button>

                    {/* Order Preview Popup */}
                    {showPopup && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-1/3">
                                <h3 className="text-lg font-bold mb-4">Order Preview</h3>
                                <div className="mb-4">
                                    {Object.entries(order).map(([product, qty]) => (
                                        qty > 0 && (
                                            <div key={product} className="flex justify-between mb-2">
                                                <span>{product}</span>
                                                <span>{qty}</span>
                                            </div>
                                        )
                                    ))}
                                </div>
                                <div className="flex justify-between">
                                    <button
                                        onClick={confirmOrder}
                                        className="px-4 py-2 bg-green-500 text-white rounded dark:bg-green-600"
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        onClick={() => setShowPopup(false)}
                                        className="px-4 py-2 bg-red-500 text-white rounded dark:bg-red-600"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>}
            </div>
        </div>
    );
}

export default App;
