export class User {
  constructor(
    public pseudo: string,
    public email: string,
    public password: string,
    public role? : string
  ) {}
}