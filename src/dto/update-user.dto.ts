import {
  IsEmail, Length, IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @Length(3, 10)
  @IsOptional()
  name :string;

  @IsOptional()
  @IsEmail()
  email ?:string;

  @IsOptional()
  @Length(4)
  password ?:string;
}
