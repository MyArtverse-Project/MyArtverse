// From https://github.com/kuroji-fusky/SponsorExplorer/blob/29e120a/client/src/types/routeParams.ts#L3-L17
type DefaultSearchParams = { [key: string]: string | string[] | undefined }

/**
 * A type generic wrapper for implementing typed Next.js routes
 * 
 * Starting in Next.js 15, parameters are now asynchronous, they return
 * a Promise type
 * 
 * @template Params Route parameters
 * @template SearchParams URL search parameters
 */
export interface DefineRouteParams<Params extends Record<string, unknown> | null = Record<string, never>, SearchParams extends object = DefaultSearchParams> {
  params: Promise<Params>
  searchParams: Promise<SearchParams>
}
