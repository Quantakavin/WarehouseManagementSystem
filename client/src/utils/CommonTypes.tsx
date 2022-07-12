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
  RmaID: number;
  DateTime: string;
  CompanyID: number;
  ContactPerson: string;
  ContactNo: number;
  RMANo: string;
  SupplierRMA: string;
  SalesmanID: string;
  RmaStatusID: number;
  CustomerEmail: string;
  Company: string;
  ItemCode: string;
  InvoiceNo: string;
  DoNo: string;
  DateOfPurchase: string;
  ReturnReason: string;
  Instructions: string;
  CourseOfAction: string;
  RmaProductPK: number;
}

export type ActionMenuItem = {
  name: string;
  url?: string;
  icon: React.ReactNode;
  delete: boolean;
};
