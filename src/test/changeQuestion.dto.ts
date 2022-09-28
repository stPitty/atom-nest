import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from '../shared/enum/QuestionType';

export class ChangeQuestionDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  readonly _id: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
  })
  readonly title: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  readonly image: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
  })
  readonly type: QuestionType;

  @IsNotEmpty()
  @ApiProperty({
    type: [String],
    required: true,
  })
  readonly options: any[];

  @ApiProperty({
    type: String,
    required: false,
  })
  readonly answerDesc: string;
}
