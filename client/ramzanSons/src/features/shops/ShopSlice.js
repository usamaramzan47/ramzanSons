import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchShopsData, deleteShopData, updateShopData, createShopData } from '../../services/shopsApi';

// Fetch Shops (READ)
export const fetchShops = createAsyncThunk(
    'product/fetchShops',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchShopsData();
            if (response.error) {
                return rejectWithValue(response.message);
            }
            return response?.data; // retrun the fetch data
        } catch (error) {
            return rejectWithValue(error.message || 'Something went wrong');
        }
    }
);

// Create a Shop (CREATE)
export const createShop = createAsyncThunk(
    'Shop/createShop',
    async ({ shopData }, { rejectWithValue }) => {
        try {
            const response = await createShopData(shopData); // Make API call to create product
            if (response.error) {
                return rejectWithValue(response.message);
            }
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to create product');
        }
    }
);

// Update a Shop (UPDATE)
export const updateShop = createAsyncThunk(
    'Shop/updateShop',
    async ({ shopId, shopData }, { rejectWithValue }) => {
        try {
            const response = await updateShopData(shopId, shopData); // Make API call to update product
            if (response.error) {
                return rejectWithValue(response.message);
            }
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to update product');
        }
    }
);

// Delete a product (DELETE)
export const deletShop = createAsyncThunk(
    'product/deleteProduct',
    async (shopId, { rejectWithValue }) => {
        try {
            const response = await deleteShopData(shopId); // Make API call to delete product
            if (response.error) {
                return rejectWithValue(response.message);
            }
            return shopId; // Return the deleted product ID to update the state
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to delete product');
        }
    }
);

const ShopsSlice = createSlice({
    name: 'Shops',
    initialState: {
        ShopsData: [], // Array to store Shops
        status: 'idle', // idle | loading | succeeded | failed
        error: '',
    },
    reducers: {
        resetError: (state) => {
            state.error = ''
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Shops (READ)
            .addCase(fetchShops.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchShops.fulfilled, (state, action) => {
                state.ShopsData = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchShops.rejected, (state, action) => {
                state.error = action.payload || 'Failed to fetch Shops';
                state.status = 'failed';
            })

            // // Create product (CREATE)
            .addCase(createShop.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createShop.fulfilled, (state, action) => {
                state.ShopsData.push(action.payload); // Add new product to state
                state.status = 'succeeded';
            })
            .addCase(createShop.rejected, (state, action) => {
                state.error = action.payload || 'Failed to create product';
                state.status = 'failed';
            })

            // Update product (UPDATE)
            .addCase(updateShop.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateShop.fulfilled, (state, action) => {
                const index = state.ShopsData.findIndex(
                    (shop) => shop.shop_id === action.payload.shop_id
                );
                if (index !== -1) {
                    state.ShopsData[index] = action.payload; // Update the product in state
                }
                state.status = 'succeeded';
            })
            .addCase(updateShop.rejected, (state, action) => {
                state.error = action.payload || 'Failed to update product';
                state.status = 'failed';
            })

            // Delete product (DELETE)
            .addCase(deletShop.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deletShop.fulfilled, (state, action) => {
                state.ShopsData = state.ShopsData.filter(
                    (shop) => shop.shop_id !== action.payload
                );
                state.status = 'succeeded';
            })
            .addCase(deletShop.rejected, (state, action) => {
                state.error = action.payload || 'Failed to delete shop';
                state.status = 'failed';
            });
    },
});

export const { resetError } = ShopsSlice.actions; //resetError is exported here


export default ShopsSlice.reducer;
