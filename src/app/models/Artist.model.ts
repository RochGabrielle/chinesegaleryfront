export class Artist {
  constructor(
    public id: number,  
    public name: string,
    public name_cn_cn: string,
    public birth: string,
    public death: string,
    public introduction_en_gb: string,
    public introduction_fr_fr: string,
    public introduction_cn_cn: string,
    public description_en_gb: string,
    public description_fr_fr: string,
    public description_cn_cn: string,
    public dynasty: string,
    public entity: string
  ) {}
}