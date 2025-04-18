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
            headers.set('Proxy_auth_token', 'Smg0YnIreXJ5bUZhNFlldDB3WkQyUlRJVTIvWHNlVkpGUFZRNU9UNGZpdXpRS3RCYlFBelB0TFVORjRpUk9IeUhuZG91aWo5d1lrR1V2R0ZBZGJFWEtMZ1FCa250MXBJOTg5SUJGLzkrVVdlRFdsenN2SDRLbEc4anBqQko1MmV6THNUTUdiWnhVRnJsMG9MQVpLa3Ivd0tzNzZ1NkhrWEtqZW9VUGlqcC9vPQ==');
            // headers.set('techdoc_auth', 'Smg0YnIreXJ5bUZhNFlldDB3WkQyUlRJVTIvWHNlVkpGUFZRNU9UNGZpdXpRS3RCYlFBelB0TFVORjRpUk9IeUhuZG91aWo5d1lrR1V2R0ZBZGJFWEtMZ1FCa250MXBJOTg5SUJGLzkrVVdlRFdsenN2SDRLbEc4anBqQko1MmV6THNUTUdiWnhVRnJsMG9MQVpLa3Ivd0tzNzZ1NkhrWEtqZW9VUGlqcC9vPQ==');
            // }

            return headers;
        },
    });

    return async (args, api, extraOptions) => {
        return baseQuery(args, api, extraOptions);
    };
};
