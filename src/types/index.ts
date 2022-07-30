import type { Json, Marketplace } from "@thirdweb-dev/sdk";
import { JsonObject } from "@thirdweb-dev/sdk";
import type { BigNumber } from "ethers"

export interface ITeamMember {
  name: string;
  image: string;
  role?: string;
  bio?: string;
  twitter?: string;
  linkedin?: string;
  email?: string;
}

export interface IPartner {
  name: string;
  image: string;
  url: string;
}

export interface IService {
  name: string;
  title?: string;
  description?: string;
  icon?: string;
}

export interface IPackage {
  id: string;
  name: string;
  description: string;
  displayPrice: string;
  value: BigNumber;
  address: string;
  currency: string;
  currencySymbol: string;
  image: string;
  type: string;
  attributes: any;
  marketplace: Marketplace;
}

export interface IPackAttribute {
  value: string;
  trait_type: string;
}
