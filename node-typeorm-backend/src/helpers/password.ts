import crypto from 'crypto';

export const comparePasswords = (password: string, salt: string, hash: string): boolean => {
  return encryptPassword(password, salt) === hash;
};

export const encryptPassword = (password: string, salt: string): string => {
  return crypto.createHmac('sha1', salt).update(password).digest('hex');
};

export const generateSalt = (): string => {
  return crypto.randomBytes(16).toString('hex');
};
