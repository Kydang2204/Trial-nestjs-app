import {
  Prop, Schema, SchemaFactory,
} from '@nestjs/mongoose';

import {
  Document,
} from 'mongoose';

import * as bcrypt from 'mongoose-bcrypt';

@Schema({
  versionKey: false,
})
export class User extends Document {
  @Prop({
    required: true, unique: true,
  })
  email:string;

  @Prop({
    required: true,
  })
  name:string;

  @Prop({
    required: true,
  })
  password:string;

  verifyPassword: (password:string) => boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(bcrypt);

