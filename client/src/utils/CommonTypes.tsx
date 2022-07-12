export type Option = {
  id: number;
  text: string;
  value: string | number | string[];
};

export interface Company {
  CompanyID: number;
  CompanyName: string;
}

export interface UserGroup {
  UserGroupID: number;
  UserGroupName: string;
  UserGroupDesc: string;
}

export interface NotiGroup {
  NotiGroupID: number;
  NotiGroupName: string;
  NotiGroupDesc: string;
}

export interface RMA {
  CompanyID: number;
  ContactPerson: string;
  ContactNo: number;
  RMANo: string;
  SupplierRMA: string;
  SalesmanID: string;
  RmaStatusID: number;
  Instruction: string;
}

export type ActionMenuItem = { 
  name: string, 
  url?: string, 
  icon: React.ReactNode, 
  delete: boolean 
};