import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { CatsModule } from "../cats/cats.module";
import { MulterModule } from "@nestjs/platform-express";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),

    PassportModule.register({ defaultStrategy: "jwt", session: false }),

    MulterModule.register({ dest: "./upload" }),

    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1y" },
    }),

    forwardRef(() => CatsModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
