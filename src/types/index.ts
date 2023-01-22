export interface User {
  id: string;
  login: string;
  email: string;
  name: string;
  company: string;
  location: string;
  bio: string;
  avatarUrl: string;
  createdAt: string;
  repositories: {
    totalCount: number;
  };
}
