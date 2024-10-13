import axios from 'axios';

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const fetchShopGroups = async () => {
    try {
        const response = await axios.get(`${VITE_API_URL}/shopPrices/`);
        return response;
    } catch (error) {
        if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
            return { error: 'Network Error', message: 'Unable to connect to the server. Please check your network connection.' };
        }
        // Return error response for other issues
        return { error: 'An error occurred', message: error.message || 'Something went wrong' };
    }
};
export const fetchGroupPricesById = async (groupId) => {
    try {
        const response = await axios.get(`${VITE_API_URL}/shopPrices/${groupId}`);
        return response;
    } catch (error) {
        if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
            return { error: 'Network Error', message: 'Unable to connect to the server. Please check your network connection.' };
        }
        // Return error response for other issues
        return { error: 'An error occurred', message: error.message || 'Something went wrong' };
    }
};

// Create shopGroup (CREATE)
export const createGroupPrice = async (newPrice) => {
    try {
        const res = await axios.post(`${VITE_API_URL}/shopPrices/`, { newPrice });
        return res;
    } catch (error) {
        console.log(error)
        if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
            return { error: 'Network Error', message: 'Unable to connect to the server. Please check your network connection.' };
        }
        return { error: error, message: error.response.data.message };
    }
};

// Update Product (UPDATE)
export const updateGroupPrice = async (priceId, price) => {
    try {
        return await axios.put(`${VITE_API_URL}/shopPrices/${priceId}`, { price });
    } catch (error) {
        console.log(error, 'error api call')
        if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
            return { error: 'Network Error', message: 'Unable to connect to the server. Please check your network connection.' };
        }
        return { error: 'Network Error', message: 'Unable to update the product.' };
    }
};

// Delete price (DELETE)
export const deleteGroupPrice = async (priceId) => {
    try {
        return await axios.delete(`${VITE_API_URL}/shopPrices/${priceId}`);
    } catch (error) {
        if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
            return { error: 'Network Error', message: 'Unable to connect to the server. Please check your network connection.' };
        }
        return { error: error, message: error.response.data.message };
    }
};