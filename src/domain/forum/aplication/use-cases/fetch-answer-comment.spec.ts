import { FetchQuestionsAnswersUseCase } from './fetch-questions-answer'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { FetchQuestionCommentUseCase } from './fetch-question-comment'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comment'
import { FetchAnswerCommentUseCase } from './fetch-answer-comment'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: FetchAnswerCommentUseCase

describe('Fetch Question Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new FetchAnswerCommentUseCase(inMemoryAnswerCommentRepository)
  })

  it('should be able to fetch answers of questions', async () => {
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-01') }),
    )
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-01') }),
    )
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-01') }),
    )
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-01') }),
    )

    const result = await sut.execute({
      answerId: 'answer-01',
      page: 1,
    })
    expect(result.value?.answerComment).toHaveLength(4)
  })

  it('should be able to fetch paginated answers of questions', async () => {
    for (let index = 0; index < 22; index++) {
      await inMemoryAnswerCommentRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityId('answer-01') }),
      )
    }

    const result = await sut.execute({
      answerId: 'answer-01',
      page: 2,
    })
    expect(result.value?.answerComment).toHaveLength(2)
  })
})
