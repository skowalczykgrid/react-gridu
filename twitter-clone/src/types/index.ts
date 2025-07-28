export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Tweet {
  id: string;
  author_id: string;
  text: string;
  author?: User;
}
