export class group
{

  users : string[];

  constructor(public name : string,  public desc : string, number : number){
    this.users = new Array<string>();
  }
}
