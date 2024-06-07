export { default } from 'next-auth/middleware'

//Agregar rutas que deben ser protegidas
export const config = {
  matcher: [
    '/home',
    '/home/:path',
    '/nutrition',
    '/nutrition/:path*',
    '/exercise',
    '/exercise/:path*',
    '/sleep',
    '/sleep/:path*',
    '/conversation',
    '/reminders',
    '/reminders/:path*',
    '/social',
    '/social/:path*',
  ],
}
