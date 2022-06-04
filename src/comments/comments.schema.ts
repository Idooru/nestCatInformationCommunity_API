import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty, IsPositive, IsString } from "class-validator";
import { Document, SchemaOptions, Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Comments extends Document {
  @ApiProperty({
    description: "작성한 고양이 id",
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: "cats",
  })
  author: string;

  @ApiProperty({
    description: "댓글 컨텐츠",
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  contents: string;

  @ApiProperty({
    description: "좋아요 수",
  })
  @Prop({
    default: 0,
  })
  @IsNotEmpty()
  @IsPositive()
  likeCount: number;

  @ApiProperty({
    description: "작성 대상 (게시물, 정보글)",
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: "cats",
  })
  info: Types.ObjectId;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
