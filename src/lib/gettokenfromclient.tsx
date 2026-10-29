import React from 'react';
import { authClient } from "@/lib/auth-client";

const gettokenfromclient = async() => {


    const { data} = await authClient.token()

const token = data?.token



    return token;
        
};

export default gettokenfromclient;