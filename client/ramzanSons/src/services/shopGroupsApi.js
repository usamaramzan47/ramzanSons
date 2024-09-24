import axios from 'axios';

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const fetchShopGroups = async () => {
    try {
        const response = await axios.get(`${VITE_API_URL}/shopGroups/`);
        return response;
    } catch (error) {
        if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
            return { error: 'Network Error', message: 'Unable to connect to the server. Please check your network connection.' };
        }
        // Return error response for other issues
        return { error: 'An error occurred', message: error.message || 'Something went wrong' };
    }
};
export const fetchShopGroupsById = async (groupId) => {
    try {
        const response = await axios.get(`${VITE_API_URL}/shopGroups/${groupId}`);
        return response;
    } catch (error) {
        console.log(error)
        if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
            return { error: 'Network Error', message: 'Unable to connect to the server. Please check your network connection.' };
        }
        // Return error response for other issues
        return { error: 'An error occurred', message: error.message || 'Something went wrong' };
    }
};

// Create Product (CREATE)
export const createShopGroup = async (shopGroupData) => {
    try {
        return await axios.post(`${VITE_API_URL}/shopGroups/`, shopGroupData);
    } catch (error) {
        console.log(error)
        if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
            return { error: 'Network Error', message: 'Unable to connect to the server. Please check your network connection.' };
        }
        return { error: error, message: error.response.data.message };
    }
};

// Update Product (UPDATE)
export const updateShopGroup = async (groupId, shopgroupData) => {
    try {
        return await axios.put(`${VITE_API_URL}/shopGroups/${groupId}`, shopgroupData);
    } catch (error) {
        if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
            return { error: 'Network Error', message: 'Unable to connect to the server. Please check your network connection.' };
        }
        return { error: 'Network Error', message: 'Unable to update the product.' };
    }
};

// Delete Product (DELETE)
export const deleteShopGroup = async (groupId) => {
    try {
        return await axios.delete(`${VITE_API_URL}/shopGroups/${groupId}`);
    } catch (error) {
        if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
            return { error: 'Network Error', message: 'Unable to connect to the server. Please check your network connection.' };
        }
        return { error: error, message: error.response.data.message };
    }
};