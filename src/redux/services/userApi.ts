import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {User} from '@/interfaces/User'

export const userApi = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost3001/api/users',
    }),
    endpoints: (builder) => ({
      createUser: builder.mutation<User, Partial<User>>({
        query: (newUser) => ({
          url: 'users',
          method: 'POST',
          body: newUser,
        }),
      }),
      updateUser: builder.mutation<User, { id: string }>({
        query: (id) => `users/${id}`,
      }),
    }),
  });

export const {useCreateUserMutation, useUpdateUserMutation} = userApi

