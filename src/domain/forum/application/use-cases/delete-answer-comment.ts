import { Either, left, right } from '@/core/either'
import { AnswerCommentsRepository } from '../repositories/answer-commnets-repository'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

// eslint-disable-next-line @typescript-eslint/ban-types
type DeleteAnswerCommentUseCaseResponse = Either<string, {}>

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      return left('Answer not found.')
    }

    if (answerComment.authorId.toSring() !== authorId) {
      return left('Not allowed.')
    }

    await this.answerCommentsRepository.delete(answerComment)

    return right({})
  }
}
