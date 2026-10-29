import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins"

const client = new MongoClient(process.env.MONGODB_URL!);
const db = client.db('wanderlast');

export const auth = betterAuth({


     emailAndPassword: { 
    enabled: true, 
  }, 






  database: mongodbAdapter(db, {
    client,
  }),






plugins: [jwt()],
    session : {
      cookieCache : {
        enabled : true,
        strategy : 'jwt',
        maxAge: 7*24*60*60
      }
    },




});




// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "@better-auth/mongo-adapter";

// const client = new MongoClient(process.env.MONGODB_URL!);
// const db = client.db('wanderlast');

// export const auth = betterAuth({
//   database: mongodbAdapter(db),

//   emailAndPassword: {
//     enabled: true,
//   },
// });