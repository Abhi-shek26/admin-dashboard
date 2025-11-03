import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';

/**
 * @param req 
 * @param res 
 * @returns
 */
export const requireAdmin = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Session | null> => {
  const session = await getSession({ req });

  if (!session || session.user?.email !== 'admin@aariyatech.com') {
    res.status(403).json({ error: 'Forbidden: You do not have permission to access this resource.' });
    return null;
  }

  return session;
};
