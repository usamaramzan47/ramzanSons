import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductsData, updateProductData, deleteProductData } from '../../services/productsApi';
import { createOrderDetailData } from '../../services/orderDetailApi';

// Fetch orders (READ)
export const fetchOrders = createAsyncThunk(
    'product/fetchOrders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchProductsData();
            if (response.error) {
                return rejectWithValue(response.message);
            }
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.message || 'Something went wrong');
        }
    }
);

// Create a product (CREATE)
export const createOrderDetail = createAsyncThunk(
    'orderDetail/createOrderDetail',
    async ({ orderPayload }, { rejectWithValue }) => {
        try {
            const response = await createOrderDetailData(orderPayload); // Make API call to create orderDetail
            if (response.error) {
                return rejectWithValue(response.message);
            }
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to create product');
        }
    }
);

// Update a order (UPDATE)
export const updateOrder = createAsyncThunk(
    'product/updateOrder',
    async ({ productId, productData }, { rejectWithValue }) => {
        try {
            const response = await updateProductData(productId, productData); // Make API call to update product
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
export const deleteOrder = createAsyncThunk(
    'product/deleteOrder',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await deleteProductData(productId); // Make API call to delete product
            if (response.error) {
                return rejectWithValue(response.message);
            }
            return productId; // Return the deleted product ID to update the state
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to delete product');
        }
    }
);

const orderDetailSlice = createSlice({
    name: 'orderDetail',
    initialState: {
        ordersDetailData: [], // Array to store orderDetail
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
            // Fetch orders (READ)
            .addCase(fetchOrders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.ordersDetailData = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.error = action.payload || 'Failed to fetch orders';
                state.status = 'failed';
            })

            // Create order (CREATE)
            .addCase(createOrderDetail.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createOrderDetail.fulfilled, (state, action) => {
                state.ordersDetailData.push(action.payload); // Add new order to state
                state.status = 'succeeded';
            })
            .addCase(createOrderDetail.rejected, (state, action) => {
                state.error = action.payload || 'Failed to create product';
                state.status = 'failed';
            })

            // Update product (UPDATE)
            .addCase(updateOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                const index = state.ordersDetailData.findIndex(
                    (product) => product.product_id === action.payload.product_id
                );
                if (index !== -1) {
                    state.ordersDetailData[index] = action.payload; // Update the product in state
                }
                state.status = 'succeeded';
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.error = action.payload || 'Failed to update product';
                state.status = 'failed';
            })

            // Delete product (DELETE)
            .addCase(deleteOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.ordersDetailData = state.ordersDetailData.filter(
                    (product) => product.product_id !== action.payload
                );
                state.status = 'succeeded';
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.error = action.payload || 'Failed to delete product';
                state.status = 'failed';
            });
    },
});

export const { resetError } = orderDetailSlice.actions; // Make sure resetError is exported here


export default orderDetailSlice.reducer;
