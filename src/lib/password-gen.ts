import bcrypt from 'bcryptjs'
export const passwordGenerator = async (password: string) => {
  const saltOrRounds = 10
  return bcrypt.hash(password, saltOrRounds)
}

export const passwordVerifier = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash)
}
