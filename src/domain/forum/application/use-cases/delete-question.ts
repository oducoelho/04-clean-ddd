import { QuestionsRepository } from '../repositories/questions-repository'

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toSring()) {
      throw new Error('Nor allowed.')
    }

    await this.questionsRepository.delete(question)

    return {}
  }
}