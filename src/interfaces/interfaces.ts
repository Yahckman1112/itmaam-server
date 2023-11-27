export interface PackageProps {
  packageName: string;
  makkahHotelName: string;
  madinahHotelName: string;
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
  pronoun:string
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
}

export interface UserProps {
  _id:string
  fullName:string,
  userName:string,
  email:string,
  password: string,
  generateAuthToken: ()
}

