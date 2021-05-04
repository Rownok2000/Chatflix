export class group
{

  users : string[];

  constructor(public name : string,  public desc : string, public number : number){
    this.users = new Array<string>();
  }
}
