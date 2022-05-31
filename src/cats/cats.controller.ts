import {
  Body,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { Controller, Get, Post } from "@nestjs/common";
import { HttpExceptionFilter } from "src/common/exceptions/http-exception.filter";
import { SuccessInterceptor } from "src/common/interceptors/success.interceptor";
import { CatsService } from "./cats.service";
import { CatRequestDto } from "./dto/cats.request.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ReadOnlyCatDto } from "./dto/cat.dto";
import { AuthService } from "../auth/auth.service";
import { LoginRequestDto } from "../auth/dto/login.request.dto";
import { JwtAuthGuard } from "../auth/jwt/jwt.guard";
import { CurrentUser } from "../common/decorator/user.decorator";
import { Cat } from "./cats.schema";
import { FilesInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "../common/utils/multer.options";

@Controller("cats")
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "현재 고양이 가져오기" })
  @Get()
  getCurrentCat(@CurrentUser() cat: Cat) {
    return cat.readOnlyData;
  }

  @ApiResponse({
    status: 500,
    description: "Server Error..",
  })
  @ApiResponse({
    status: 200,
    description: "Success",
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: "회원가입" })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: "로그인" })
  @Post("login")
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogin(data);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "고양이 사진 업로드하기" })
  @UseInterceptors(FilesInterceptor("image", 10, multerOptions("cats")))
  @Post("upload")
  uploadCatImg(
    @UploadedFiles() files: Express.Multer.File[],
    @CurrentUser() cat: Cat,
  ) {
    console.log(files[0]);
    // return { image: `http://localhost:8002/media/cats/${files[0].filename}` };
    return this.catsService.uploadImg(cat, files);
  }

  @Get("getAllCats")
  getAllCats() {
    return this.catsService.getAllCats();
  }
}
