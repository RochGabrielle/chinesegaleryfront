export class Article {
  constructor(
    public title: string,
    public date: string,
    public dynasty: string,
    public material: string,  
    public description: string,
    public discount: number,
    public price: number,
    public length: number,
    public width: number,
    public artist: string,
    public category?: string[],
    public theme?: string[],
    
  ) {}
}