declare const PRODUCTION: boolean
declare const SENTRY_DSN: string

declare module "*.svg" {
  const content: any
  export default content
}
