import { Either, right } from '@/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repositories/answer-repository'

interface FetchQuestionsAnswersUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionsAnswersUseCaseResponse = Either<
  null,
  {
    questions: Answer[]
  }
>

export class FetchQuestionsAnswersUseCase {
  constructor(private answersRepostiory: AnswerRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionsAnswersUseCaseRequest): Promise<FetchQuestionsAnswersUseCaseResponse> {
    const questions = await this.answersRepostiory.findManyQuestionId(
      questionId,
      { page },
    )

    return right({
      questions,
    })
  }
}
