import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import { verifyPassword } from '../../../lib/auth';

export default NextAuth({
  pages: {
    signIn: ['/users', '/businesses', '/test'],
  },
  secret: process.env.SECRET,
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        await dbConnect();

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('Username!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error('Password!');
        }

        return { email: user.email };
      },
    }),
  ],
});
