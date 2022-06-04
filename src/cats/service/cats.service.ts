import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CatRequestDto } from "../dto/cats.request.dto";
import { CatsRepository } from "../cats.repository";

import * as bcrypt from "bcrypt";
import { Cat } from "../cats.schema";

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExistWithEmail = await this.catsRepository.existByEmail(email);
    const isCatExistWithName = await this.catsRepository.existByName(name);

    if (isCatExistWithEmail || isCatExistWithName) {
      throw new UnauthorizedException("해당하는 고양이는 이미 존재합니다.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });
    return cat.readOnlyData;
  }

  async uploadImg(cat: Cat, files: Express.Multer.File[]) {
    const fileName = `cats/${files[0].filename}`;

    console.log(fileName);
    const newCat = await this.catsRepository.findByIdAndUpdateImg(
      cat.id,
      fileName,
    );
    console.log(newCat);
    return newCat;
  }

  async getAllCats() {
    const cats: Cat[] = await this.catsRepository.findAllCats();
    return cats.map((idx) => idx.readOnlyData);
  }
}
