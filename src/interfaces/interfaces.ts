export interface PackageProps {
  _id: any;
  packageName: string;
  makkahHotelName: string;
  madinahHotelName: string;
  time: number,
  registeredClient: number,
  totalSpace: number,
  price: Number;
  nullPrice: Number;
  overview: string;
}

export interface NewsProps {
  headLine: string;
  writer: string;
  Date?: string;
  news: string;
}

export interface ApplicantsProps {
  applicantsId:string
  pronoun:string
  firstName: string;
  lastName: string;
  gender: 'Male'| 'Female'
  package:string
  email: string;
  phone: number;
}

export interface UserProps {
  _id:string
  fullName:string,
  role:string,
  userName:string,
  email:string,
  password: string,
  isAdmin:boolean,
  generateAuthToken: ()=>any
}

