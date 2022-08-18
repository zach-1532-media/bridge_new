/* eslint-disable no-unneeded-ternary */
/* eslint-disable object-shorthand */
/* eslint-disable no-param-reassign */
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import Business from '../../../models/Business';
import { verifyPassword } from '../../../lib/auth';

export default NextAuth({
  pages: {
    signIn: ['/login'],
  },
  secret: process.env.SECRET,
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        await dbConnect();

        const user = await User.findOne({ email: credentials.email });
        const business = await Business.findOne({ email: credentials.email });

        const data = user ? user : business;

        if (!user && !business) {
          throw new Error('Username!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          data.password,
        );

        if (!isValid) {
          throw new Error('Password!');
        }

        const id = data._id.toString();

        return {
          email: data.email,
          sessionName: data.sessionName,
          avatar: data.avatar,
          id: id,
          type: user ? 'user' : 'business',
          businessName: data.businessName,
        };
      },
    }),
  ],
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token = user;
      }
      return token;
    },
    async session(session, token) {
      session = token;
      return session;
    },
  },
});
