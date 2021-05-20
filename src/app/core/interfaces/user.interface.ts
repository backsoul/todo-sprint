export class UserInterface {
  uid: string;
  name: string | null;
  photoUrl: string | null;
  email: string | null;
  constructor(
    uid: string,
    name: string | null,
    photoUrl: string | null,
    email: string | null
  ) {
    this.uid = uid;
    this.name = name;
    this.photoUrl = photoUrl;
    this.email = email;
  }
}
