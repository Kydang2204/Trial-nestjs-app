import * as mongoose from 'mongoose';

import * as bcrypt from 'mongoose-bcrypt';

export const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
}, {
  versionKey: false,
});

mongoose.set('useFindAndModify', false);

UserSchema.plugin(bcrypt);
