export interface User{
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  sports: string;
  level: string;
  isPrivate: boolean;
  role: string;
  photo: string | null;
}
