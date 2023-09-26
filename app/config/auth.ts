import { PathMap } from "app/common/lib/page/route";

export interface IRouteAuthConfig {
  protected: boolean;
  allowedRoles: ('USER')[];
  isJWTValid?: boolean;
}

export let routeAuthTemplate: IRouteAuthConfig = {
  protected: false,
  allowedRoles: ['USER']
};

export let _routes = [
  'home',
  'publications',
  'notifications',
  'query',
  'profile',
  'query',
  'store',
  'storeItem',
] as const;

export const customPathConfig: Partial<PathMap> = {
  query: {
    ...routeAuthTemplate,
    protected: true
  },
  profile: {
    ...routeAuthTemplate,
    protected: true
  },
}
