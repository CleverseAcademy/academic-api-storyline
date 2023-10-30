import bcryptjs from "bcryptjs";

export const bcrypted = (password: string): string => {
  const salt = bcryptjs.genSaltSync(12);
  return bcryptjs.hashSync(password, salt);
};

export const verifyPassword = (password: string, hashVal: string) =>
  bcryptjs.compareSync(password, hashVal);
