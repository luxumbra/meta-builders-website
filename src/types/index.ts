export interface ITeamMember {
  name: string;
  image: string;
  role: string;
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
  price: string;
  currency: string;
  image: string;
  buyContract: string;
  consultingHours: number;
  includedServices: IService[];
}
