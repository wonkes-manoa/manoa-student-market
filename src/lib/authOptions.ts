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
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'john@foo.com',
        },
        password: {
          label: 'Password',
          type: 'password' },
      },
      async authorize(credentials) {
        console.log('F');
        if (!credentials?.username || !credentials.password) {
          console.log('MISSING CREDENTIAL');
          return null;
        }
        console.log('BEGIN QUERY');
        const account = await prisma.account.findUnique({
          where: {
            Username: credentials.username,
          },
        });
        console.log('QUERY SUCCESS');
        if (!account) {
          return null;
        }

        const isPasswordValid = credentials.password === account.Password;
        if (!isPasswordValid) {
          return null;
        }
        console.log('PASSED CREDENTIAL CHECKS');
        return {
          id: `${account.AccountID}`,
          email: account.EmailAddress,
          randomKey: account.Privilege,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    //   error: '/auth/error',
    //   verifyRequest: '/auth/verify-request',
    //   newUser: '/auth/new-user'
  },
  callbacks: {
    session: ({ session, token }) => {
      // console.log('Session Callback', { session, token })
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      // console.log('JWT Callback', { token, user })
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
