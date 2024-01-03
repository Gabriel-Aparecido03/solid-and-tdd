import { DeleteCommentOnAnswerUseCase } from './delete-answer-comment'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comment'
import { expect } from 'vitest'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: DeleteCommentOnAnswerUseCase

describe('Delete Comment on Answer', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new DeleteCommentOnAnswerUseCase(inMemoryAnswerCommentRepository)
  })

  it('should be able to delete answer comment', async () => {
    const answerComment = makeAnswerComment()

    await inMemoryAnswerCommentRepository.create(answerComment)

    await sut.execute({
      answerId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    })

    expect(inMemoryAnswerCommentRepository.items).toHaveLength(0)
  })

  it('not should be able to delete answer comment from another user', async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityId('author-01'),
    })

    await inMemoryAnswerCommentRepository.create(answerComment)

    const result = await sut.execute({
      answerId: answerComment.id.toString(),
      authorId: 'wrong-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
