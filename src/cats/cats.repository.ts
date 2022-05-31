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

  async findByIdAndUpdateImg(id: string, fileName: string) {
    const cat = await this.catModel.findById(id);
    cat.imgUrl = `http://localhost:8002/media/${fileName}`;
    const newCat = await cat.save();
    console.log(newCat);
    return newCat.readOnlyData;
  }

  async findAllCats() {
    return await this.catModel.find({});
  }
}
