export class group
{

  users : string[];

  constructor(public name : string,  public desc : string, public number : number, public currentNumber: number){
    this.users = new Array<string>();
  }
}
