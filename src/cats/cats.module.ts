import { Module, forwardRef } from "@nestjs/common";
import { CatsController } from "./controller/cats.controller";
import { CatsService } from "./service/cats.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Cat, CatSchema } from "./cats.schema";
import { CatsRepository } from "./cats.repository";
import { AuthModule } from "src/auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    MulterModule.register({
      dest: "./upload",
    }),
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
