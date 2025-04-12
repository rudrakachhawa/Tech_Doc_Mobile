// src/api/pagesApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBaseQuery } from './rtkQueryInterceptor';

export const pagesApi = createApi({
    reducerPath: 'pagesApi',
    baseQuery: customFetchBaseQuery('https://doc-rtc-369544787296.asia-south1.run.app/content/4343'),
    endpoints: (builder) => ({
        getPageHtml: builder.query<{ steps: { [key: string]: string[] }, collectionJson: { [collectionId: string]: { id: string, name: string, description: string, rootParentId: string } }, pagesJson: { [pageId: string]: { type: number, collectionId: string, id: string, child: string[], name: string, description: string } } }, string>({
            query: (pageId) => ({
                url: '',
                method: 'POST',
                body: { pageIds: [pageId] }
            }),
            transformResponse: (response: { data: any }) => {
                console.log(Object.values(response.docs)[0])
                return Object.values(response.docs)[0]
            }
        }),
    }),
});

export const { useGetPageHtmlQuery } = pagesApi;
