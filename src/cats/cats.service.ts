import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CatRequestDto } from "./dto/cats.request.dto";
import { Cat } from "./cats.schema";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}
  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExistWithEmail = await this.catModel.exists({ email });
    const isCatExistWithName = await this.catModel.exists({ name });

    if (isCatExistWithEmail || isCatExistWithName) {
      throw new UnauthorizedException("해당하는 고양이는 이미 존재합니다.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catModel.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }
}