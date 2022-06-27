export type Option = {
    text: string;
    value: string | number | string[];
};
  
export interface Company {
    CompanyID: number;
    CompanyName: string;
};
  
export interface UserGroup {
    UserGroupID: number;
    UserGroupName: string;
    UserGroupDesc: string;
};
  
export interface NotiGroup {
    NotiGroupID: number;
    NotiGroupName: string;
    NotiGroupDesc: string;
};