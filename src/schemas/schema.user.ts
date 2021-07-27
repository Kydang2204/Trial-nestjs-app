import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
}, {
  versionKey: false,
});

mongoose.set('useFindAndModify', false);
