import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-question-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attchments-repostiory'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository

describe('Get Question by Slug', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able a question by slug', async () => {
    const newQuestion = makeQuestion({ title: 'example-question' })

    await inMemoryQuestionsRepository.create(newQuestion)
    const result = await sut.execute({ slug: 'example-question' })

    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: newQuestion.title,
      }),
    })
  })
})
