export interface CreateUserFormInputs {
  username: string;
  email: string;
  password: string;
  dni: number;
  name: string;
  last_name: string;
  role_id: number;
}

export interface ModifyUserFormInputs {
  user_id: number;
  username: string;
  email: string;
  dni: number;
  name: string;
  last_name: string;
  role_id: number;
}

export interface Shift {
  shift_id: number;
  shift_start: string;
  shift_end: string;
}