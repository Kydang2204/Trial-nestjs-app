import {
  IsEmail, IsNotEmpty, Length,
} from 'class-validator';

export class UserDto {
  @Length(3, 10)
  name?:string;

  @IsEmail()
  email:string;

  @IsNotEmpty()
  @Length(4)
  password:string;
}
