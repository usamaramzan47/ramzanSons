import { useState } from "react";

const OrderPage = () => {
    const [shopDetails] = useState({
        id: "001",
        name: "Shop ABC",
        address: "123 Main Street",
        contact: "123-456-7890",
    });

    const [orderDetails, setOrderDetails] = useState({
        product: "",
        quantity: "",
        price: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="flex h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
            {/* Left Side: Live Preview */}
            <div className="w-1/2 p-8">
                <h2 className="text-2xl font-bold mb-4">Live Preview</h2>
                <div className="bg-gray-200 p-4 rounded mb-4 dark:bg-gray-700">
                    <p><strong>Product:</strong> {orderDetails.product || "N/A"}</p>
                    <p><strong>Quantity:</strong> {orderDetails.quantity || "N/A"}</p>
                    <p><strong>Price:</strong> {orderDetails.price || "N/A"}</p>
                </div>
                <h2 className="text-2xl font-bold mb-4">Shop Details</h2>
                <p className="mb-2"><strong>ID:</strong> {shopDetails.id}</p>
                <p className="mb-2"><strong>Name:</strong> {shopDetails.name}</p>
                <p className="mb-2"><strong>Address:</strong> {shopDetails.address}</p>
                <p><strong>Contact:</strong> {shopDetails.contact}</p>
            </div>

            {/* Right Side: Order Input */}
            <div className="w-1/2 p-8">
                <h2 className="text-2xl font-bold mb-4">Order Input</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Product Name</label>
                    <select
                        name="product"
                        value={orderDetails.product}
                        onChange={handleChange}
                        className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
                    >
                        <option value="">Select a product</option>
                        <option value="Bread">Bread</option>
                        <option value="Rusk">Rusk</option>
                        <option value="Cake">Cake</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={orderDetails.quantity}
                        onChange={handleChange}
                        className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
                        placeholder="Enter quantity"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={orderDetails.price}
                        onChange={handleChange}
                        className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
                        placeholder="Enter price"
                    />
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
