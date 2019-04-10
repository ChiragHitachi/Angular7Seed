export interface AuthData {
  email: string;
  password: string;
}

export class Logging {
    level: string;
    task: string;
    component: string;
    api: string;
    message: string;
    description: string;
    browser: string;
    device: string;
}

export interface IError{
  result_code: string;
  message: string;
  status: string;
  contract: string;
}

export interface IRole{
  roleId : number;
  roleName: string;
}

export interface IFunctions{
  funtionName: string;
  roleName: string;
}
