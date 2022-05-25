import { InjectModel } from "@nestjs/mongoose";
import { Cat } from "./cats.schema";
import { Model } from "mongoose";
import { Injectable, HttpException } from "@nestjs/common";
import { CatRequestDto } from "./dto/cats.request.dto";

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existByEmail(email: string): Promise<boolean> {
    try {
      const result = await this.catModel.exists({ email });
      return result;
    } catch (err) {
      throw new HttpException("db error", 400);
    }
  }

  async existByName(name: string): Promise<boolean> {
    try {
      const result = await this.catModel.exists({ name });
      return result;
    } catch (err) {
      throw new HttpException("db error", 400);
    }
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    try {
      return await this.catModel.create(cat);
    } catch (err) {
      throw new HttpException("db error", 400);
    }
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    try {
      return await this.catModel.findOne({ email });
    } catch (err) {
      throw new HttpException("db error", 400);
    }
  }

  async findCatByIdWithoutPassword(catId: string): Promise<Cat | null> {
    try {
      return await this.catModel.findById(catId).select("-password");
    } catch (err) {
      throw new HttpException("db error", 400);
    }
  }
}
