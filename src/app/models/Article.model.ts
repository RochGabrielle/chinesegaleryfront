export class Article {
  constructor(
    public id: number,
    public title: string,
    public title_en_gb: string,
    public title_fr_fr: string,
    public title_cn_cn: string,
    public birth: number,
    public price: number,
    public category: number,
    public material: number,
    public discount: number,
    public artist: number,
    public dynasty: number,
    public museum: number,
    public en_gb: string,  
    public fr_fr: string,
    public cn_cn: string,
    public sizes: any[] ,
    public file: string,
    public fileSource: File,
  ) {}
}