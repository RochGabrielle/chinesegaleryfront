export class Article {
  constructor(
    public title: string,
    public date: string,
    public dynasty: string,
    public material: string,
    public category?: string[],
    public theme?: string[],
    public description: string,
    public discount: integer,
    public price: float,
  ) {}
}