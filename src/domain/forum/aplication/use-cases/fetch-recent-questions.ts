import { Either, right } from '@/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepostiory } from '../repositories/question-repository'

interface FetchRecentQuestionsUseCaseRequest {
  page: number
}

type FetchRecentQuestionsUseCaseResponse = Either<
  null,
  {
    questions: Question[]
  }
>
export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepostiory) {}

  async execute({
    page,
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecents({ page })

    return right({
      questions,
    })
  }
}
