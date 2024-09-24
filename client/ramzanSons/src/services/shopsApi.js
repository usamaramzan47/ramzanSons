import axios from 'axios';

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const fetchShopsData = async () => {
    try {
        const response = await axios.get(`${VITE_API_URL}/shops/`);
        return response;
    } catch (error) {
        if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
            return { error: 'Network Error', message: 'Unable to connect to the server. Please check your network connection.' };
        }
        // Return error response for other issues
        return { error: 'An error occurred', message: error.message || 'Something went wrong' };
    }
};

// Create Shop (CREATE)
export const createShopData = async (ShopData) => {
    try {
        return await axios.post(`${VITE_API_URL}/shops/`, ShopData);
    } catch (error) {
        console.log(error)
        if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
            return { error: 'Network Error', message: 'Unable to connect to the server. Please check your network connection.' };
        }
        return { error: error, message: error.response.data.message };
    }
};

// Update Shop (UPDATE)
export const updateShopData = async (ShopId, ShopData) => {
    try {
        const response = await axios.put(`${VITE_API_URL}/shops/${ShopId}`, ShopData);
        return response
    } catch (error) {
        if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
            return { error: 'Network Error', message: 'Unable to connect to the server. Please check your network connection.' };
        }
        return { error: error, message: error.response.data.message };
    }
};

// Delete Shop (DELETE)
export const deleteShopData = async (ShopId) => {
    try {
        return await axios.delete(`${VITE_API_URL}/shops/${ShopId}`);
    } catch (error) {
        if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
            return { error: 'Network Error', message: 'Unable to connect to the server. Please check your network connection.' };
        }
        return { error: error, message: error.response.data.message };
    }
};