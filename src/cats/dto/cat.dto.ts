import { ApiProperty, PickType } from "@nestjs/swagger";
import { Cat } from "../cats.schema";

export class ReadOnlyCatDto extends PickType(Cat, ["email", "name"] as const) {
  @ApiProperty({
    example: "123453313",
    description: "id",
    required: true,
  })
  id: string;
}
