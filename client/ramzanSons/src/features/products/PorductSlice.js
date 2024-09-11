import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductsData } from '../../services/productsApi';

export const fetchProducts = createAsyncThunk('product/fetchProducts', async (_, { rejectWithValue }) => {
    try {
        const response = await fetchProductsData();
        if (!response || response.status !== 200) {
            console.log(response)
            throw new Error(response);
        }
        return response?.data;
    } catch ({err}) {
        console.log(err.message)
        return rejectWithValue(err.message || 'Something went wrong');
    }

});

const ProductsSlice = createSlice({
    name: 'products',
    initialState: {
        productsData: {},
        status: 'idle', // idle | loading | succeeded | failed
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.productsData = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchProducts.rejected, (state, action) => {

                state.error = action.payload || 'Failed to fetch products';
                state.status = 'failed';
            });
    },
});

export default ProductsSlice.reducer;
