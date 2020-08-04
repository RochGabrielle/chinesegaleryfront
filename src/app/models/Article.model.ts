export class Article {
  constructor(
    public title: string,
    public birth: number,
    public price: number,
    public category: number,
    public material: number,
    public discount: number,
    public artist: number,
    public dynasty: number,
    public en_gb: string,  
    public fr_fr: string,
    public sizes: any[] ,
    public file: string,
    public fileSource: File,
  ) {}
}