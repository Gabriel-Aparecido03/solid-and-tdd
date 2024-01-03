import { FetchQuestionsAnswersUseCase } from './fetch-questions-answer'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comment-repository'
import { FetchQuestionCommentUseCase } from './fetch-question-comment'
import { makeQuestionComment } from 'test/factories/make-question-comment'

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: FetchQuestionCommentUseCase

describe('Fetch Question Comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new FetchQuestionCommentUseCase(inMemoryQuestionCommentRepository)
  })

  it('should be able to fetch answers of questions', async () => {
    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId('question-01') }),
    )
    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId('question-01') }),
    )
    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId('question-01') }),
    )
    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId('question-01') }),
    )

    const result = await sut.execute({
      questionId: 'question-01',
      page: 1,
    })
    expect(result.value?.questionsComment).toHaveLength(4)
  })

  it('should be able to fetch paginated answers of questions', async () => {
    for (let index = 0; index < 22; index++) {
      await inMemoryQuestionCommentRepository.create(
        makeQuestionComment({ questionId: new UniqueEntityId('question-01') }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-01',
      page: 2,
    })
    expect(result.value?.questionsComment).toHaveLength(2)
  })
})
