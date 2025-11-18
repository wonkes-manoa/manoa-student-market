import NextAuth from 'next-auth/next';
import authOptions from '@/lib/authOptions';

console.log('E');

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
