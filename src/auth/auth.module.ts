import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { CatsModule } from "../cats/cats.module";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt", session: false }),

    JwtModule.register({
      secret: "secret",
      signOptions: { expiresIn: "1y" },
    }),

    forwardRef(() => CatsModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
