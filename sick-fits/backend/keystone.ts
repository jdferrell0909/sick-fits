import "dotenv/config";
import { config, createSchema } from "@keystone-next/keystone/schema";
import { User } from "./schemas/User";
import { Product } from "./schemas/Product";
import { ProductImage } from "./schemas/ProductImage";
import { createAuth } from "@keystone-next/auth";
import { withItemData, statelessSessions } from '@keystone-next/keystone/session';
import 'dotenv/config';
import { insertSeedData } from "./seed-data";

const databaseURL =
  process.env.DATABASE_URL || "mongodb://localhost/keystone-sick-fits-tutorial";

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, //how long to stay signed in
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
    //TODO add in initial roles
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: "mongoose",
      url: databaseURL,
      async onConnect(keystone) {
        console.log('connected to db');
        if(process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      },
    },
    lists: createSchema({
      // schema items here
      User,
      Product,
      ProductImage,
    }),
    ui: {
      // show UI only for people who pass
      isAccessAllowed: ({ session }) => {
        // console.log(session);
        return session?.data
      },
    },
    session: withItemData(statelessSessions(sessionConfig), {
      User: `id name email`
    })
  })
);
