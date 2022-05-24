import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { CatsRepository } from "../cats/cats.repository";
import { CatsModule } from "../cats/cats.module";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt", session: false }),

    JwtModule.register({
      secret: "secret",
      signOptions: { expiresIn: "1y" },
    }),

    CatsModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
