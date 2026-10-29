import { auth } from "@/lib/auth";
import { headers } from "next/headers";



const gettokenfromserver = async() => {
    
     const jwrToken = await auth.api.getToken({ headers : await headers()})
// console.log(jwrToken?.token)


const token = jwrToken?.token


    return token;
};

export default gettokenfromserver;