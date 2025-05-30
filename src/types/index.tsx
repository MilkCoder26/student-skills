export type Student = {
  id: number
  name: string
  classe: string
  niveau: number
  competence: string
  sexe: string
  skills: string[]
  email: string
  phone_number: string
  bio: string
}

export type Service = {
  id: number
  title: string
  description: string
  price: string
  student_id: number
  category_id: number
  price_range: string
}

export type Category = {
  id: number
  name: string
}
