import { Injectable } from "@nestjs/common";
import { CatsRepository } from "../cats/cats.repository";

@Injectable()
export class AuthService {
  constructor(private readonly catsRepository: CatsRepository) {}
}
