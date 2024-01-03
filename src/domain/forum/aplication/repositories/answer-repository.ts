import { PaginationParams } from '@/core/repositories/pagination-param'
import { Answer } from '../../enterprise/entities/answer'

export interface AnswerRepository {
  findById(id: string): Promise<Answer | null>
  create(answer: Answer): Promise<void>
  findManyQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]>
  save(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
}
