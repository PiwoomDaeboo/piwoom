import {
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
  UseSuspenseInfiniteQueryOptions,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query'

import { AxiosError } from 'axios'

export type QueryHookParams<
  T extends CustomRequestFn,
  Error = AxiosError<any>,
  TData = RequestFnReturn<T>,
  OriginData = RequestFnReturn<T>,
  Variables = Parameter<T>,
> = {
  options?: Omit<
    UseQueryOptions<OriginData, Error, TData>,
    'queryKey' | 'queryFn'
  >
} & OptionalVariables<Variables>

export type InfiniteQueryHookParams<
  T extends CustomRequestFn,
  Error = AxiosError<any>,
  TData = RequestFnReturn<T>,
  OriginData = RequestFnReturn<T>,
  Variables = Parameter<T>,
> = {
  options?: Partial<
    Omit<
      UseInfiniteQueryOptions<OriginData, Error, TData, any, any>,
      'queryKey' | 'queryFn'
    >
  >
} & OptionalVariables<Variables>

export type MutationHookParams<
  T extends CustomRequestFn,
  Error = AxiosError<any>,
  Data = RequestFnReturn<T>,
  Variables = Parameter<T>,
> = {
  options?: Omit<
    UseMutationOptions<Data, Error, Variables>,
    'mutationFn' | 'mutationKey'
  >
}

export type OptionalVariables<T> =
  undefined extends T ? { variables?: T } : { variables: T }

export type Parameter<T> = T extends (param: infer U) => any ? U : never

export type CustomRequestFn = (variables?: any) => Promise<any>

export type RequestFnReturn<T extends CustomRequestFn> = Awaited<ReturnType<T>>

export type SuspenseQueryHookParams<
  T extends CustomRequestFn,
  Error = AxiosError<any>,
  TData = RequestFnReturn<T>,
  OriginData = RequestFnReturn<T>,
  Variables = Parameter<T>,
> = {
  options?: Omit<
    UseSuspenseQueryOptions<OriginData, Error, TData>,
    'queryKey' | 'queryFn'
  >
} & OptionalVariables<Variables>

export type SuspenseInfiniteQueryHookParams<
  T extends CustomRequestFn,
  Error = AxiosError<any>,
  TData = RequestFnReturn<T>,
  OriginData = RequestFnReturn<T>,
  Variables = Parameter<T>,
> = {
  options?: Partial<
    Omit<
      UseSuspenseInfiniteQueryOptions<OriginData, Error, TData, any, any>,
      'queryKey' | 'queryFn'
    >
  >
} & OptionalVariables<Variables>
