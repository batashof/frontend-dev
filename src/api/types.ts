import { ReactElement, ReactNode } from 'react';

export type AuthProviderConfig = {
  page403Renderer: () => ReactElement;
};

export type AuthProviderProps = {
  config: AuthProviderConfig;
  children: ReactNode;
};

type ProtectedRouteBaseProps = {
  children: ReactElement;
  permission: PermissionName[];
};

export type AuthProviderContextType = {
  isNotAccess: boolean;
  config: AuthProviderConfig;
};

type ProtectedRouteAllProps = ProtectedRouteBaseProps & {
  allowedWhen: 'all';
};

type ProtectedRouteAnyProps = ProtectedRouteBaseProps & {
  allowedWhen: 'any';
};

export interface CustomFetchConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS';
  params?: Record<string, any>;
  data?: Record<string, any>;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

export type ProtectedRouteProps = ProtectedRouteAllProps | ProtectedRouteAnyProps;
