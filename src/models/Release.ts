import Realm, { BSON } from "realm";

export class Release extends Realm.Object {
  _id: BSON.ObjectId = new BSON.ObjectId();
  name!: string;
  value!: number;
  date!: string;
  userId!: string;
  createdAt: Date = new Date();

  static primaryKey = "_id";
}
