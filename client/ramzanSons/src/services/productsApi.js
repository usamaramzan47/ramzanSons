import axios from 'axios';

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const fetchProductsData = async () => {
    try {
        return await axios.get(`${VITE_API_URL}products/`);

    } catch (error) {

        if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
            // Return a custom message without revealing server details
            return { error: 'Network Error!', message: 'Unable to connect to the server. Please check your network connection.' };
        }
        // Generic error for other types of errors
        return { error: 'An error occurred. Please try again later.' };
    }
};
