import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IComment, IProduct } from '../models/ProductModel';

export const productApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
    tagTypes: ['Products', 'SingleProduct'],
    endpoints: build => ({
        getAllProducts: build.query<IProduct[], null>({ query: () => `products`, providesTags: ['Products'] }),
        addProduct: build.mutation<IProduct[], IProduct>({query: (payload) => ({
            url: 'products',
            method: 'POST',
            body: payload,
            headers: {
                'Content-type': 'application/json'
            },
            }),
            invalidatesTags: ['Products']
        }),
        getProductInfo: build.query<IProduct, string>({ query: (id) => `products/${id}`, providesTags: ['SingleProduct'] }),
        updateProductInfo: build.mutation<IProduct, IProduct>({query: (payload) => ({
            url: `products/${payload.id}`,
            method: 'PUT',
            body: payload,
            headers: {
                'Content-type': 'application/json'
            },
            }),
            invalidatesTags: ['SingleProduct']
        }),
        addComment: build.mutation<IComment, any>({query: (payload) => ({
            url: `products/${payload.comments[0].productId}`,
            method: 'PATCH',
            body: payload,
            headers: {
                'Content-type': 'application/json'
            },
            }),
            invalidatesTags: ['SingleProduct']
        }),
        deleteComment: build.mutation<IComment, any>({query: ([payload, productId]) => ({
            url: `products/${productId}`,
            method: 'PATCH',
            body: payload,
            headers: {
                'Content-type': 'application/json'
            },
            }),
            invalidatesTags: ['SingleProduct']
        }),
    }),
});

export const {
    useGetAllProductsQuery,
    useAddProductMutation,
    useGetProductInfoQuery,
    useUpdateProductInfoMutation,
    useAddCommentMutation,
    useDeleteCommentMutation,
} = productApi;