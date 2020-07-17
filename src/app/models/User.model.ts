export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public telephon: string,
    public interests?: string[]
  ) {}
}