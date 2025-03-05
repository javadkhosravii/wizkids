export const roles = ['boss', 'developer', 'designer', 'intern'] as const;

export type Role = typeof roles[number];

export interface Wizkid {
  name: string;
  email: string;
  role: Role;
  profilePicture: string;
  phoneNumber: string;
}
