import { PaginationParams } from '@/core/repositories/pagination-param'
import { Question } from '../../enterprise/entities/question'

export interface QuestionsRepostiory {
  findById(id: string): Promise<Question | null>
  findbySlug(slug: string): Promise<Question | null>
  findManyRecents(params: PaginationParams): Promise<Question[]>
  save(question: Question): Promise<void>
  create(question: Question): Promise<void>
  delete(question: Question): Promise<void>
}
