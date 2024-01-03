import { Either, left, right } from '@/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepostiory } from '../repositories/question-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

type GetQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    question: Question
  }
>

export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepostiory) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findbySlug(slug)

    if (!question) return left(new ResourceNotFoundError())

    return right({ question })
  }
}
