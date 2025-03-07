export const roles = ["boss", "developer", "designer", "intern"] as const;

export type Role = (typeof roles)[number];

export interface Wizkid {
  id: string;
  name: string;
  email: string;
  role: Role;
  profilePicture: string;
  phoneNumber: string;
  fired?: boolean;
  unfired?: boolean;
  password: string;
}
