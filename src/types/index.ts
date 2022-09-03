import type { Marketplace } from "@thirdweb-dev/sdk";
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
  bio: string;
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
  animation_url: string;
  type: string;
  attributes: any;
  marketplace: Marketplace;
}

export interface IPackAttribute {
  value: string;
  trait_type: string;
}

export type IStar = {
  x: number;
  y: number;
  z: number;
  xPrev: number;
  yPrev: number;
}