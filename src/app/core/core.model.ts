import { IEntity } from '../dashboard/dashboard.model';

export interface IBreadCrumb{
  path: string;
  route: string;
  entity: IEntity;
}

export interface ISearchResult{
  id : number;
  name : string;
  accountId : string;
}
export interface ISummaryCount{
  acc_count : number;
  project_count : number;
}
export interface IRevenueCost{
    year: number;
    costAmountSum: number;
    sowAmountSum: number;
}
export interface IRevenueCostBreakdown{
  accountID: number;
  accountName: string;
  costAmountSum: number;
  sowAmountSum: number;
}
export interface IProjectSearchResult{
  id : number;
  name : string;
  accountId : string;
  projectType: string;
  type?: number;
  accountName: string;
  buName: string;
}
export interface Message{
  severity: string;
  message : string;
}
