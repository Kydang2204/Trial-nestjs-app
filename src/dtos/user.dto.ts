import {
  IsEmail, IsNotEmpty, Length,
} from 'class-validator';

export class UserDto {
  id? :string;

  @Length(3, 10)
  name?:string;

  @IsEmail()
  email:string;

  @IsNotEmpty()
  password:string;
}
