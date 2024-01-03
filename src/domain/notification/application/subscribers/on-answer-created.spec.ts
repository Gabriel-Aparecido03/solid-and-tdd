import { makeAnswer } from 'test/factories/make-answer'
import { OnAnswerCreated } from './on-answer-created'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repostiory'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-question-repository'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attchments-repostiory'
import {
  SendNotifcationUseCase,
  SendNotifcationUseCaseRequest,
  SendNotifcationUseCaseResponse,
} from '../use-cases/send-notification'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications.repository'
import { makeQuestion } from 'test/factories/make-question'
import { MockInstance } from 'vitest'
import { waitFor } from 'test/utils/wait-for'

let sendnotificationExecuteSpy: MockInstance<
  [SendNotifcationUseCaseRequest],
  Promise<SendNotifcationUseCaseResponse>
>

let inMemoryAnswersAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryQuestionsAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswerRepository
let inMemoryNotificationRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotifcationUseCase

describe('On Answer Created', () => {
  beforeEach(() => {
    inMemoryQuestionsAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionsAttachmentsRepository,
    )
    inMemoryAnswersAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswerRepository(
      inMemoryAnswersAttachmentsRepository,
    )
    inMemoryNotificationRepository = new InMemoryNotificationsRepository()
    sendNotificationUseCase = new SendNotifcationUseCase(
      inMemoryNotificationRepository,
    )

    sendnotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnAnswerCreated(inMemoryQuestionsRepository, sendNotificationUseCase)
  })

  it('should be send a notification when an answer is created', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

    inMemoryQuestionsRepository.create(question)
    inMemoryAnswersRepository.create(answer)

    await waitFor(() => {
      expect(sendnotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
