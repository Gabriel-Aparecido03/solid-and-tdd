import { Either, right } from '@/either'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentRepository } from '../repositories/question-comment-repository'

interface FetchQuestionsAnswersUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionsAnswersUseCaseResponse = Either<
  null,
  {
    questionsComment: QuestionComment[]
  }
>

export class FetchQuestionCommentUseCase {
  constructor(private questionCommentRepository: QuestionCommentRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionsAnswersUseCaseRequest): Promise<FetchQuestionsAnswersUseCaseResponse> {
    const questionsComment =
      await this.questionCommentRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({
      questionsComment,
    })
  }
}
