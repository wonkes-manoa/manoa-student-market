/* eslint-disable arrow-body-style */
import { compare } from 'bcrypt';
import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Username and Password',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'john@foo.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        const account = await prisma.account.findUnique({
          where: { Username: credentials.username },
        });

        if (!account) return null;

        const isPasswordValid = await compare(credentials.password, account.Password);
        if (!isPasswordValid) return null;

        return {
          id: `${account.AccountID}`,
          email: account.EmailAddress,
          username: account.Username,
          randomKey: account.Privilege,
        };
      },
    }),
  ],

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },

  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
          username: token.username as string,
          randomKey: token.randomKey as string, // <-- must match what you returned in authorize
        },
      };
    },

    jwt: ({ token, user }) => {
      if (user) {
        const u = user as any;
        return {
          ...token,
          id: u.id,
          email: u.email,
          username: u.username,
          randomKey: u.randomKey, // <-- match authorize
        };
      }
      return token;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
