import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchShopGroups } from '../../services/shopGroupsApi';
import { createGroupPrice, deleteGroupPrice, fetchGroupPricesById, updateGroupPrice } from '../../services/shopPriceApi';

// Fetch products (READ)
export const fetchGroups = createAsyncThunk(
    'shopGroups/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchShopGroups();
            if (response.error) {
                return rejectWithValue(response.message);
            }
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.message || 'Something went wrong');
        }
    }
);
// Fetch ShopGroup By Id(READ)
export const fetchGroupsPriceById = createAsyncThunk(
    'shopGroupsById/fetch',
    async ({ groupId }, { rejectWithValue }) => {
        try {
            const response = await fetchGroupPricesById(groupId);
            if (response.error) {
                return rejectWithValue(response.message);
            }
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.message || 'Something went wrong');
        }
    }
);

// Create a shopGroup (CREATE)
export const createPrice = createAsyncThunk(
    'shopGroup/createGroupPrice',
    async ({ newPrice }, { rejectWithValue }) => {
        try {
            const response = await createGroupPrice(newPrice); // Make API call to create shopPrices
            if (response.error) {
                return rejectWithValue(response.message);
            }
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to create shopGroup');
        }
    }
);

// Update a Price (UPDATE)
export const updatePrice = createAsyncThunk(
    'groupPrice/update',
    async ({ priceId, price }, { rejectWithValue }) => {
        try {
            const response = await updateGroupPrice(priceId, price); // Make API call to update product
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
export const deletePrice = createAsyncThunk(
    'price/deleteprice',
    async (priceId, { rejectWithValue }) => {
        try {
            const response = await deleteGroupPrice(priceId); // Make API call to delete price
            if (response.error) {
                return rejectWithValue(response.message);
            }
            return priceId; // Return the deleted price ID to update the state
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to delete product');
        }
    }
);

const GroupPriceSlice = createSlice({
    name: 'shopGroupPrice',
    initialState: {
        groupPriceData: [], // Array to store priceData
        status: 'idle', // idle | loading | succeeded | failed
        loading: false,
        error: '',
    },
    reducers: {
        resetError: (state) => {
            state.error = ''
        },
        resetStatus: (state) => {
            state.status = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch price (READ)
            .addCase(fetchGroups.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(fetchGroups.fulfilled, (state, action) => {
                state.groupPriceData = action.payload;
                state.status = 'succeeded';
                state.loading = false
            })
            .addCase(fetchGroups.rejected, (state, action) => {
                state.error = action.payload || 'Failed to fetch products';
                state.status = 'failed';
                state.loading = false
            })
            // Fetch ShopGroupsById (READ)
            .addCase(fetchGroupsPriceById.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(fetchGroupsPriceById.fulfilled, (state, action) => {
                state.groupPriceData = action.payload;
                state.status = 'succeeded';
                state.loading = false;
            })
            .addCase(fetchGroupsPriceById.rejected, (state, action) => {
                state.error = action.payload || 'Failed to fetch groups';
                state.status = 'failed';
                state.loading = false;
            })

            // Create price (CREATE)
            .addCase(createPrice.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(createPrice.fulfilled, (state, action) => {
                if (Array.isArray(state.groupPriceData)) {
                    state.groupPriceData.push(action.payload); // Add new product to the existing array
                } else {
                    state.groupPriceData = [action.payload]; // Ensure it's an array if it's not
                }
                state.status = 'succeeded';
                state.loading = false;
            })
            .addCase(createPrice.rejected, (state, action) => {
                state.error = action.payload || 'Failed to create New Group';
                state.status = 'failed';
                state.loading = false;
            })

            // Update price (UPDATE)
            .addCase(updatePrice.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(updatePrice.fulfilled, (state, action) => {
                const index = state.groupPriceData.findIndex(
                    (shopGroup) => shopGroup.shop_price_id === action.payload.shop_price_id
                );
                if (index !== -1) {
                    state.groupPriceData[index] = action.payload; // Update the product in state
                }
                state.status = 'succeeded';
                state.loading = false;
            })
            .addCase(updatePrice.rejected, (state, action) => {
                state.error = action.payload || 'Failed to update group';
                state.status = 'failed';
                state.loading = false;
            })

            // Delete price (DELETE)
            .addCase(deletePrice.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(deletePrice.fulfilled, (state, action) => {
                state.groupPriceData = state.groupPriceData.filter(
                    (shopGroupPrice) => shopGroupPrice.shop_price_id !== action.payload
                );
                state.status = 'succeeded';
                state.loading = false;
            })
            .addCase(deletePrice.rejected, (state, action) => {
                console.log(action.payload, 'payload!')
                state.error = action.payload || 'Failed to delete group';
                state.status = 'failed';
                state.loading = false;
            });
    },
});

export const { resetError, resetStatus } = GroupPriceSlice.actions; // Make sure resetError is exported here


export default GroupPriceSlice.reducer;
