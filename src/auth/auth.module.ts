import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { readFileSync } from 'fs'

import { AuthenticateController } from 'src/controllers/authenticate-controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { PrismaService } from 'src/prisma/prisma.service'
import { Env } from 'src/env'

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService<Env, true>) {
        const privateKeyPath = config.get('JWT_PRIVATE_KEY', { infer: true })
        const publicKeyPath = config.get('JWT_PUBLIC_KEY', { infer: true })

        if (!privateKeyPath || !publicKeyPath) {
          throw new Error('JWT key paths are not defined')
        }

        const privateKey = readFileSync(privateKeyPath, 'utf8')
        const publicKey = readFileSync(publicKeyPath, 'utf8')

        return {
          privateKey,
          publicKey,
          signOptions: {
            algorithm: 'RS256'
          }
        }
      }
    }),
  ],
  controllers: [AuthenticateController],
  providers: [PrismaService],
})
export class AuthModule {}
