import bcrypt from 'bcryptjs';

const hashpass = async (password: string) => {
  return await bcrypt.hash(password, 10);
}

const comparepass = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
}

export { hashpass, comparepass };