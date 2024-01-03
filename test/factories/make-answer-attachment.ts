import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  AnswerAttachment,
  AnswerAttachmentProps,
} from '@/domain/forum/enterprise/entities/answer-attachment'

export function makeAnswerAttachments(
  overrider: Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntityId,
) {
  const answerAttachments = AnswerAttachment.create(
    {
      attachmentId: new UniqueEntityId(),
      answerId: new UniqueEntityId(),
      ...overrider,
    },
    id,
  )

  return answerAttachments
}
