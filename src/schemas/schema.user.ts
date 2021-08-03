import {Prop , Schema, SchemaFactory } from '@nestjs/mongoose'
import {  Document } from 'mongoose'
import * as bcrypt from 'mongoose-bcrypt'

@Schema()
export class User extends Document {
  @Prop()
  email:string;
  @Prop()
  name:string;
  @Prop()
  password:string;
  verifyPassword: Function;
}

export const UserSchema = SchemaFactory.createForClass(User)
UserSchema.plugin(bcrypt)
