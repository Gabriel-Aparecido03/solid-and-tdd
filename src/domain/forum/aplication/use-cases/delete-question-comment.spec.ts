import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comment-repository'
import { DeleteCommentOnQuestionUseCase } from './delete-question-comment'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: DeleteCommentOnQuestionUseCase

describe('Delete Comment on Question', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new DeleteCommentOnQuestionUseCase(inMemoryQuestionCommentRepository)
  })

  it('should be able to delete question comment', async () => {
    const questionComment = makeQuestionComment()

    await inMemoryQuestionCommentRepository.create(questionComment)

    await sut.execute({
      questionId: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
    })

    expect(inMemoryQuestionCommentRepository.items).toHaveLength(0)
  })

  it('not should be able to delete question comment from another user', async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityId('author-01'),
    })

    await inMemoryQuestionCommentRepository.create(questionComment)

    const result = await sut.execute({
      questionId: questionComment.id.toString(),
      authorId: 'wrong-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
