// import { Prisma } from '@prisma/client'
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'

// export class AuthService {
//   async register(email: string, password: string) {
//     const userExists = await Prisma.user.findUnique({
//       where: { email }
//     })

//     if (userExists) {
//       throw new Error('User already exists')
//     }

//     const hashedPassword = await bcrypt.hash(password, 8)

//     const user = await prisma.user.create({
//       data: {
//         email,
//         password: hashedPassword
//       }
//     })

//     return this.generateToken(user.id)
//   }

//   async login(email: string, password: string) {
//     const user = await prisma.user.findUnique({
//       where: { email }
//     })

//     if (!user) {
//       throw new Error('Invalid credentials')
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password)

//     if (!passwordMatch) {
//       throw new Error('Invalid credentials')
//     }

//     return this.generateToken(user.id)
//   }

//   private generateToken(userId: string) {
//     return jwt.sign(
//       { sub: userId },
//       process.env.JWT_SECRET as string,
//       { expiresIn: process.env.JWT_EXPIRES_IN }
//     )
//   }
// }
