import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-param'
import { QuestionAttachmentsRepository } from '@/domain/forum/aplication/repositories/question-attachments-repository'
import { QuestionsRepostiory } from '@/domain/forum/aplication/repositories/question-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepostiory {
  public items: Question[] = []

  constructor(
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  async findById(id: string) {
    const question = this.items.find((item) => item.id.toString() === id)
    if (!question) return null
    return question
  }

  async findbySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug)

    if (!question) return null

    return question
  }

  async findManyRecents({ page }: PaginationParams) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async save(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)
    this.items[itemIndex] = question
    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async create(question: Question) {
    this.items.push(question)
    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async delete(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)
    this.items.splice(itemIndex, 1)

    this.questionAttachmentsRepository.deleteManyByQuestionId(
      question.id.toString(),
    )
  }
}
