import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/common/interface';
import { TokenLifetimeEnum } from 'src/common/enum';
import { UserModule } from 'src/user/user.module';
import { TokenService } from './token.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: (configService: ConfigService<AppConfig, true>) => ({
        secret: configService.get('jwt.accessSecret', { infer: true }),
        signOptions: {
          expiresIn: TokenLifetimeEnum.ACCESS,
        },
      }),
    }),
    UserModule,
  ],
  providers: [TokenService],
  exports: [JwtModule, TokenService],
})
export class TokenModule {}
