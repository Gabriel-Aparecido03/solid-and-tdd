import { Either, right } from '@/either'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentRepository } from '../repositories/answer-comment-repository'

interface FetchAnswerCommentUseCaseRequest {
  answerId: string
  page: number
}
type FetchAnswerCommentUseCaseResponse = Either<
  null,
  {
    answerComment: AnswerComment[]
  }
>

export class FetchAnswerCommentUseCase {
  constructor(private answerCommentRepository: AnswerCommentRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentUseCaseRequest): Promise<FetchAnswerCommentUseCaseResponse> {
    const answerComment = await this.answerCommentRepository.findManyByAnswerId(
      answerId,
      {
        page,
      },
    )

    return right({
      answerComment,
    })
  }
}
