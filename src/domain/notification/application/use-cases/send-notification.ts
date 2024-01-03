import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Either, right } from '@/either'
import { Notification } from '../../enterprise/entities/notification'
import { NotificationsRepository } from '../repositories/notifications-repository'

export interface SendNotifcationUseCaseRequest {
  recipientId: string
  title: string
  content: string
}

export type SendNotifcationUseCaseResponse = Either<
  null,
  {
    notification: Notification
  }
>

export class SendNotifcationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    content,
    title,
  }: SendNotifcationUseCaseRequest): Promise<SendNotifcationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityId(recipientId),
      content,
      title,
    })

    await this.notificationsRepository.create(notification)

    return right({
      notification,
    })
  }
}
