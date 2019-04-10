export enum EntityType {
  BusinessUnit = 1,
    Account = 2,
    Projects = 3
}

export interface IEntity {
  entityId: string;
  entityValue: string;
}


// export interface IPowerOf3Result {
//   result: IPowerOf3;
// }
// export interface IPowerOf3Data {
//   data: IPowerOf3Result;
// }
export interface IPowerOf3Output
  {
    powerOf3: string,
    stack: string
    resourceCount: number
  }
