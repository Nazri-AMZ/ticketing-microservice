import mongoose, { mongo } from "mongoose";

// An interface that describes the properties that required to create a User
interface UserAttributes {
  email: string;
  password: string;
}

// An interface that describes the properties that a User model has
// ! Just for describing function. Dont add the `email` or `password` as we are extending the Model
interface UserModel extends mongoose.Model<UserDocument> {
  build: (attributes: UserAttributes) => UserDocument;
}

// An interface that describes the properties that a User Document has
interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
        // delete ret.__v;
      },
      versionKey: false, // same as delete ret.__v
    },
  }
);

UserSchema.statics.build = (attributes: UserAttributes) => {
  return new User(attributes);
};

const User = mongoose.model<UserDocument, UserModel>("User", UserSchema);

export { User };
