/**
 * @model this file use for model
 */
export interface UserBasic {
  _id: string;
  userID: string;
  profileImageURL:string;
  profileImageDest: string;
  name:string;
  mobile: String,
  email:string; 
  gender: String,
  dob: Date; 
  street: String,  
  city: String,
  postcode: String,
  country: String,
  addressCoordinates: {
    latitude: Number,
    longitude: Number
  }, 
  status: string;    
  isBlocked: boolean;
  type: String
}


export interface UserBasicData {
  isSuccess: boolean;
  error: string;
  message: string;
  user?: UserBasic;
}

export interface UsersBasicData {
  isSuccess: boolean;
  error: string;
  message: string;
  data?: UserBasic[];
}