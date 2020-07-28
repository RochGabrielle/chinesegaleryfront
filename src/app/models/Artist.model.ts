export class Artist {
  constructor(
    public name: string,
    public birth: string,
    public death: string,
    public en_gb: string,
    public fr_fr: string,
    public dynasty: string[],
    public entity: string
  ) {}
}