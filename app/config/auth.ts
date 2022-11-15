import { validateJWT } from "app/common/lib/jwt";

type PathConfig = {
  protected: boolean;
  allowedRoles: ['USER']
}
let pathConfig: PathConfig = {
  protected: false,
  allowedRoles: ['USER']
};

let routes = [
  '_default',
  'reset',
  'publications',
  //'notifications',
  'login',
  'query',
  'profile',
  'query',
  'store',
] as const;

// creating types from array
// https://github.com/microsoft/TypeScript/issues/28046#issuecomment-431871542
type RouteType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer RouteType
>
  ? RouteType
  : never

type Routes = RouteType<typeof routes>

// key in obj with specific values
// https://stackoverflow.com/questions/13315131/enforcing-the-type-of-the-indexed-members-of-a-typescript-object
type PathMap = {
  [key in Routes]: PathConfig;
};

let routesWithConfig = routes.map(path => ({ [path]: pathConfig }));
export const protectedPaths: PathMap = {
  ...(Object.assign({}, ...(routesWithConfig))),
  query: {
    ...pathConfig,
    protected: true
  },
  profile: {
    ...pathConfig,
    protected: true
  }
}

export const getProtectedPath = async (name: Routes, context: { req: any; res: any; }) => {
  return {
    pathConfig: protectedPaths?.[name],
    isAuthorized: await validateJWT(context.req, context.res)
  }
}
