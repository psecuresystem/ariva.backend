import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true })
  phoneNumber: string;

  @Prop()
  password: string;

  @Prop({ default: 0 })
  balance?: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
