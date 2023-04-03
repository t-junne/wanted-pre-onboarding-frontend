export interface CreateTodoDto {
  todo: string
}

export interface GetTodoDto {
  id: string
  todo: string
  isCompleted: boolean
  userId: number
}

export interface UpdateTodoDto {
  id: string
  todo: string
  isCompleted: boolean
}