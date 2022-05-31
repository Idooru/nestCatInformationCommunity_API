import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Document, SchemaOptions } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  @ApiProperty({
    example: "shere1765@gmail.com",
    description: "email",
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: "Idooru",
    description: "name",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Prop({
    required: true,
    unique: true,
  })
  name: string;

  @ApiProperty({
    example: "password1234",
    description: "password",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Prop({
    required: true,
  })
  password: string;

  @IsString()
  @Prop({
    default:
      "https://github.com/amamov/NestJS-solid-restapi-boilerplate/raw/main/docs/images/1.jpeg",
  })
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    name: string;
    email: string;
    imgUrl: string;
  };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual("readOnlyData").get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
  };
});
