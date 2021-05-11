import { Group } from './group.model';


export class User
{

  group : Group[];

  constructor(public name : string)
  {
    this.group = new Array<Group>();
  }
}
