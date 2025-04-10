// src/api/interceptor.ts
import axios from 'axios';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { $ReduxCoreType } from '../../../types/redux/reduxCore';

export const customFetchBaseQuery = (
    baseUrl: string
): BaseQueryFn<any, unknown, unknown> => {
    const baseQuery = fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as $ReduxCoreType;
            const token = state.userInfo.proxyAuthToken

            // if (token) {
            headers.set('proxy_auth_token', 'dEt0WnNYdVUzQmNsd1hJRUtmdzczNWdmMHB2NlhjU1AvdVBUN21peTFrWkxJd1FQUTZCNmZaTC91L2o0RFRJRXJEbjV6SmlWNnNPVTJQRTRiVGNWWER5VEFCMm54NkxGa0pMenRFVVd1N3hWdm5HaW51c1Vvc0tHVWpLMzU0QXYzVzNCYi9SeitYMEVES1R2N3h5UkhaMncvdHY0T3RORHZadlZOV0pEdnA4PQ==');
            // }

            return headers;
        },
    });

    return async (args, api, extraOptions) => {
        return baseQuery(args, api, extraOptions);
    };
};
