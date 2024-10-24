import axios from 'axios';

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const fetchAllOrders = async () => {
    try {
        const response = await axios.get(`${VITE_API_URL}/orders/`);
        return response;
    } catch (error) {
        if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
            return { error: 'Network Error', message: 'Unable to connect to the server. Please check your network connection.' };
        }
        // Return error response for other issues
        return { error: 'An error occurred', message: error.message || 'Something went wrong' };
    }
};

// Create order (CREATE)
export const createOrderData = async (orderData) => {
    try {
        return await axios.post(`${VITE_API_URL}/orders/`, orderData);
    } catch (error) {
        console.log(error)
        if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
            return { error: 'Network Error', message: 'Unable to connect to the server. Please check your network connection.' };
        }
        return { error: error, message: error.response.data.message };
    }
};

// Update Product (UPDATE)
export const updateProductData = async (productId, productData) => {
    try {
        return await axios.put(`${VITE_API_URL}/products/${productId}`, productData);
    } catch (error) {
        if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
            return { error: 'Network Error', message: 'Unable to connect to the server. Please check your network connection.' };
        }
        return { error: 'Network Error', message: 'Unable to update the product.' };
    }
};

// Delete Product (DELETE)
export const deleteProductData = async (productId) => {
    try {
        return await axios.delete(`${VITE_API_URL}/products/${productId}`);
    } catch (error) {
        if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
            return { error: 'Network Error', message: 'Unable to connect to the server. Please check your network connection.' };
        }
        return { error: error, message: error.response.data.message };
    }
};