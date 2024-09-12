import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductsData, createProductData, updateProductData, deleteProductData } from '../../services/productsApi';

// Fetch products (READ)
export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
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
export const createProduct = createAsyncThunk(
    'product/createProduct',
    async ({productData}, { rejectWithValue }) => {
        try {
            const response = await createProductData(productData); // Make API call to create product
            if (response.error) {
                return rejectWithValue(response.message);
            }
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to create product');
        }
    }
);

// Update a product (UPDATE)
export const updateProduct = createAsyncThunk(
    'product/updateProduct',
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
export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
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

const ProductsSlice = createSlice({
    name: 'products',
    initialState: {
        productsData: [], // Array to store products
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
            // Fetch products (READ)
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
            })

            // Create product (CREATE)
            .addCase(createProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.productsData.push(action.payload); // Add new product to state
                state.status = 'succeeded';
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.error = action.payload || 'Failed to create product';
                state.status = 'failed';
            })

            // Update product (UPDATE)
            .addCase(updateProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.productsData.findIndex(
                    (product) => product.product_id === action.payload.product_id
                );
                if (index !== -1) {
                    state.productsData[index] = action.payload; // Update the product in state
                }
                state.status = 'succeeded';
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.error = action.payload || 'Failed to update product';
                state.status = 'failed';
            })

            // Delete product (DELETE)
            .addCase(deleteProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.productsData = state.productsData.filter(
                    (product) => product.product_id !== action.payload
                );
                state.status = 'succeeded';
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.error = action.payload || 'Failed to delete product';
                state.status = 'failed';
            });
    },
});

export const { resetError } = ProductsSlice.actions; // Make sure resetError is exported here


export default ProductsSlice.reducer;
