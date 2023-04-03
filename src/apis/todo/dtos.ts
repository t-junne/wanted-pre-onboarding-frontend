export interface CreateTodoDto {
  todo: string
}

export interface GetTodoDto {
  id: number
  todo: string
  isCompleted: boolean
  userId: number
}
