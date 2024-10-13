import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchShopGroups, createShopGroup, updateShopGroup, deleteShopGroup, fetchShopGroupsById } from '../../services/shopGroupsApi';

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
export const fetchGroupsById = createAsyncThunk(
    'shopGroupsById/fetch',
    async ({ groupId }, { rejectWithValue }) => {
        try {
            const response = await fetchShopGroupsById(groupId);
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
export const createGroup = createAsyncThunk(
    'shopGroup/createshopGroup',
    async ({ newGroup }, { rejectWithValue }) => {
        try {
            const response = await createShopGroup(newGroup); // Make API call to create shopGroup
            if (response.error) {
                return rejectWithValue(response.message);
            }
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to create shopGroup');
        }
    }
);

// Update a product (UPDATE)
export const updateGroup = createAsyncThunk(
    'shopGroup/update',
    async ({ groupId, UpdateGroupData }, { rejectWithValue }) => {
        try {
            const response = await updateShopGroup(groupId, UpdateGroupData); // Make API call to update product
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
export const deleteGroup = createAsyncThunk(
    'product/deleteProduct',
    async (groupId, { rejectWithValue }) => {
        try {
            const response = await deleteShopGroup(groupId); // Make API call to delete product
            if (response.error) {
                return rejectWithValue(response.error.response.data.message ?? 'unexpected error occered!');
            }
            // Return a full response or message from API, not just groupId
            return groupId;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to delete product');
        }
    }
);

const ProductsSlice = createSlice({
    name: 'shopGroup',
    initialState: {
        shopGroupsData: [], // Array to store products
        status: 'idle', // idle | loading | succeeded | failed
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
            // Fetch products (READ)
            .addCase(fetchGroups.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGroups.fulfilled, (state, action) => {
                state.shopGroupsData = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchGroups.rejected, (state, action) => {
                state.error = action.payload || 'Failed to fetch products';
                state.status = 'failed';
            })
            // Fetch ShopGroupsById (READ)
            .addCase(fetchGroupsById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGroupsById.fulfilled, (state, action) => {
                state.shopGroupsData = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchGroupsById.rejected, (state, action) => {
                state.error = action.payload || 'Failed to fetch groups';
                state.status = 'failed';
            })

            // Create product (CREATE)
            .addCase(createGroup.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createGroup.fulfilled, (state, action) => {
                state.shopGroupsData.push(action.payload); // Add new rates to state
                state.status = 'succeeded';
            })
            .addCase(createGroup.rejected, (state, action) => {
                state.error = action.payload || 'Failed to create New Group';
                state.status = 'failed';
            })

            // Update product (UPDATE)
            .addCase(updateGroup.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateGroup.fulfilled, (state, action) => {
                const index = state.shopGroupsData.findIndex(
                    (shopGroup) => shopGroup.group_id === action.payload.group_id
                );
                if (index !== -1) {
                    state.shopGroupsData[index] = action.payload; // Update the groupData in state
                }
                state.status = 'succeeded';
            })
            .addCase(updateGroup.rejected, (state, action) => {
                state.error = action.payload || 'Failed to update group';
                state.status = 'failed';
            })

            // Delete product (DELETE)
            .addCase(deleteGroup.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteGroup.fulfilled, (state, action) => {
                state.shopGroupsData = state.shopGroupsData.filter(
                    (shopGroup) => shopGroup.group_id !== action.payload
                );
                state.status = 'succeeded';
            })
            .addCase(deleteGroup.rejected, (state, action) => {
                state.error = action.payload || 'Failed to delete group';
                state.status = 'failed';
            });
    },
});

export const { resetError, resetStatus } = ProductsSlice.actions; // Make sure resetError is exported here


export default ProductsSlice.reducer;
