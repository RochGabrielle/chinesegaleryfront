export class Artist {
  constructor(
    public name: string,
    public name_cn: string,
    public birth: string,
    public death: string,
    public en_gb: string,
    public fr_fr: string,
    public cn_cn: string,
    public dynasty: string[],
    public entity: string
  ) {}
}