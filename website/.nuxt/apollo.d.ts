import type { ClientConfig } from "@nuxtjs/apollo"
declare const clients: Record<string, ClientConfig>
declare const clientAwareness: boolean
declare const proxyCookies: boolean
declare const cookieAttributes: ClientConfig['cookieAttributes']
export default { clients, clientAwareness, proxyCookies, cookieAttributes }