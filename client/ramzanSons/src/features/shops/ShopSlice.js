import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchShopsData, deleteShopData, updateShopData, createShopData } from '../../services/shopsApi';

// Fetch Shops (READ)
export const fetchShops = createAsyncThunk(
    'shop/fetchShops',
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
            const response = await createShopData(shopData); // Make API call to create shop
            if (response.error) {
                return rejectWithValue(response.message);
            }
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to create shop');
        }
    }
);

// Update a Shop (UPDATE)
export const updateShop = createAsyncThunk(
    'Shop/updateShop',
    async ({ shopId, shopData }, { rejectWithValue }) => {
        try {
            const response = await updateShopData(shopId, shopData); // Make API call to update shop
            if (response.error) {
                return rejectWithValue(response.message);
            }
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to update shop');
        }
    }
);
// Update order status in DB and Redux
export const updateOrderStatusInDB = createAsyncThunk(
    'shop/updateOrderStatus',
    async ({ shopId, newStatus }, { rejectWithValue }) => {
        try {
            const response = await updateShopData(shopId, { order_status: newStatus });
            if (response.error) {
                return rejectWithValue(response.message);
            }
            return { shopId, newStatus }; // Return both the shopId and newStatus for the reducer
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to update order status');
        }
    }
);

// Delete a shop (DELETE)
export const deletShop = createAsyncThunk(
    'shop/deleteshop',
    async (shopId, { rejectWithValue }) => {
        try {
            const response = await deleteShopData(shopId); // Make API call to delete shop
            if (response.error) {
                return rejectWithValue(response.message);
            }
            return shopId; // Return the deleted shop ID to update the state
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to delete shop');
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

            // // Create shop (CREATE)
            .addCase(createShop.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createShop.fulfilled, (state, action) => {
                state.ShopsData.push(action.payload); // Add new shop to state
                state.status = 'succeeded';
            })
            .addCase(createShop.rejected, (state, action) => {
                state.error = action.payload || 'Failed to create shop';
                state.status = 'failed';
            })

            // Update shop (UPDATE)
            .addCase(updateShop.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateShop.fulfilled, (state, action) => {
                const index = state.ShopsData.findIndex(
                    (shop) => shop.shop_id === action.payload.shop_id
                );
                if (index !== -1) {
                    state.ShopsData[index] = action.payload; // Update the shop in state
                }
                state.status = 'succeeded';
            })
            .addCase(updateShop.rejected, (state, action) => {
                state.error = action.payload || 'Failed to update shop';
                state.status = 'failed';
            })

            // Update order status (UPDATE)
            .addCase(updateOrderStatusInDB.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateOrderStatusInDB.fulfilled, (state, action) => {
                const { shopId, newStatus } = action.payload; // Get the payload
                const index = state.ShopsData.findIndex(shop => shop.shop_id === shopId);
                if (index !== -1) {
                    state.ShopsData[index].order_status = newStatus; // Update the order_status in state
                }
                state.status = 'succeeded';
            })
            .addCase(updateOrderStatusInDB.rejected, (state, action) => {
                state.error = action.payload || 'Failed to update order status';
                state.status = 'failed';
            })

            // Delete shop (DELETE)
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
