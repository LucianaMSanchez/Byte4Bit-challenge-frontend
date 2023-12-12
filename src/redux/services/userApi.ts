import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {User} from '@/interfaces/User'

export const userApi = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:3001/api',
    }),
    endpoints: (builder) => ({
      createUser: builder.mutation<User, Partial<User>>({
        query: (newUser) => ({
          url: '/users',
          method: 'POST',
          body: newUser,
        }),
      }),
      updateUser: builder.mutation<User, { id: string, newUser: User }>({
        query: ({id, newUser}) => ({
          url: `/users/${id}`,
          method: 'PUT',
          body: newUser
        })
      }),
    }),
  });

export const {useCreateUserMutation, useUpdateUserMutation} = userApi

