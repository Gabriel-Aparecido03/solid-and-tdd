import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-question-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comment-repository'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attchments-repostiory'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: CommentOnQuestionUseCase

describe('Comment on Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      authorId: question.authorId.toString(),
      content: 'example of content',
      questionId: question.id.toString(),
    })

    expect(inMemoryQuestionCommentRepository.items[0].content).toEqual(
      'example of content',
    )
  })
})
