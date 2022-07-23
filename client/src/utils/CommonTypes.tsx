import { AxiosResponse } from "axios";
import { UseMutationResult } from "react-query";

export type Option = {
  id: number;
  text: string;
  value: string | number | string[];
};

export interface Company {
  CompanyID: number;
  CompanyName: string;
}

export interface Feature {
  FeatureID: number;
  FeatureName: string;
}

export interface FeatureRight {
  FeatureRightID: number;
  FeatureRight: string;
}

export interface NotiFeature {
  NotiFeatureID: number;
  NotiFeature: string;
}

export interface NotiType {
  NotiTypeID: number;
  NotiType: string;
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
  RmaID: string;
  SupplierRMA: string;
  SalesmanID: string;
  RmaStatusID: number;
  Instruction: string;
}

export type ActionMenuItem = {
  name: string;
  url?: string;
  icon: React.ReactNode;
  delete: boolean;
  deleteFunction?: () => void;
  // deleteFunction?: UseMutationResult<AxiosResponse<any, any>, unknown, string, unknown>
};
