export interface PersonFormInterface {
  first_name: string;
  last_name: string;
  dni: string;
  sex_id: number;
  phone_number: number;
  address: string;
  birth_date: Date;
  email: string;
}

export interface PersonInterface extends PersonFormInterface {
  id: number;
}
