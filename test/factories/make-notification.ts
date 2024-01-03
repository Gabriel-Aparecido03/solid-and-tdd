import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Notification,
  NotificationProps,
} from '@/domain/notification/enterprise/entities/notification'

import { faker } from '@faker-js/faker'

export function makeNotification(
  overrider: Partial<NotificationProps> = {},
  id?: UniqueEntityId,
) {
  const notification = Notification.create(
    {
      recipientId: new UniqueEntityId(),
      content: faker.lorem.sentence(10),
      title: faker.lorem.sentence(4),
      ...overrider,
    },
    id,
  )

  return notification
}
