export interface Task {
    id: number,
    title: string,
    desc: string,
}
  
export interface User {
  name: string,
  email: string,
  password: string,
  darkMode: boolean,
  tasks: Task[]
}
