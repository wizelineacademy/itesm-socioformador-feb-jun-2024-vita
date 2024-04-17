export { default } from "next-auth/middleware"

//Agregar rutas que deben ser protegidas
export const config = { 
    matcher: [
        "/home",
        "/nutrition/:path*"
    ] 
}