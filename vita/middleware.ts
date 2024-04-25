export { default } from "next-auth/middleware"

//Agregar rutas que deben ser protegidas
export const config = { 
    matcher: [
        "/home",
        "/home/:path",
        "/nutrition",
        "/nutrition/:path*",
        "/exercise",
        "/exercise/:path*",
        "/conversation*",
        "/reminders",
        "/reminders/:path*"
    ] 
}