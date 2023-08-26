import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface FetchQuestionAnswerUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionAnswerUseCaseResponse {
  answer: Answer[]
}

export class FetchQuestionAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswerUseCaseRequest): Promise<FetchQuestionAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return {
      answer,
    }
  }
}
