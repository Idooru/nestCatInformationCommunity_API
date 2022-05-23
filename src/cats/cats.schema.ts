import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Document, SchemaOptions } from "mongoose";

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  @IsEmail()
  @IsNotEmpty()
  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Prop({
    required: true,
    unique: true,
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Prop({
    required: true,
  })
  password: string;

  @IsString()
  @Prop()
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    name: string;
    email: string;
  };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual("readOnlyData").get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  };
});
