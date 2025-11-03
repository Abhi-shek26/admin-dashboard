import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (
          credentials?.email === 'admin@aariyatech.com' &&
          credentials?.password === 'admin123'
        ) {
          return { id: '1', name: 'Admin', email: 'admin@aariyatech.com' };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/admin/login', 
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
