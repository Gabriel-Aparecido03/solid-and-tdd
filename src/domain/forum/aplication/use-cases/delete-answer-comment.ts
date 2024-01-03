import { Either, left, right } from '@/either'
import { AnswerCommentRepository } from '../repositories/answer-comment-repository'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

interface DeleteCommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
type DeleteCommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  object
>

export class DeleteCommentOnAnswerUseCase {
  constructor(private answerCommentsRepository: AnswerCommentRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteCommentOnAnswerUseCaseRequest): Promise<DeleteCommentOnAnswerUseCaseResponse> {
    const answer = await this.answerCommentsRepository.findById(answerId)

    if (!answer) return left(new ResourceNotFoundError())

    if (answer.authorId.toString() !== authorId)
      return left(new NotAllowedError())

    await this.answerCommentsRepository.delete(answer)

    return right({})
  }
}
