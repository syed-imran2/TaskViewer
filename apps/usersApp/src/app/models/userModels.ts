export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  gender?: string;
  dateOfBirth?: string;
  address?: Address;
}

export type FormData = {
  id: number | null;
  name: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  address: Address;
};

export const emptyForm = (): FormData => ({
  id: null,
  name: '',
  email: '',
  phone: '',
  gender: '',
  dateOfBirth: '',
  address: { street: '', city: '', state: '', country: '', zip: '' }
});