import { PaginationParams } from '@/core/repositories/pagination-param'
import { AnswerCommentRepository } from '@/domain/forum/aplication/repositories/answer-comment-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentRepository
  implements AnswerCommentRepository
{
  public items: AnswerComment[] = []

  async findById(id: string) {
    const answer = this.items.find((item) => item.id.toString() === id)
    if (!answer) return null
    return answer
  }

  async findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<AnswerComment[]> {
    const questions = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async delete(answerComment: AnswerComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === answerComment.id,
    )
    this.items.splice(itemIndex, 1)
  }
}
