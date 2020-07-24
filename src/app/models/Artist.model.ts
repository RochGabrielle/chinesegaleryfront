export class Artist {
  constructor(
    public name: string,
    public birth: string,
    public death: string,
    public description: string,
    public dynasty?: string[],
  ) {}
}