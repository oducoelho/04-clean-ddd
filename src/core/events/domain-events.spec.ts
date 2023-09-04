/* eslint-disable @typescript-eslint/no-unused-vars */
import { vi } from 'vitest'
import { AggregateRoot } from '../entitites/aggregate-root'
import { UniqueEntityID } from '../entitites/unique-entity-id'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  public aggregate: CustomAggregate // eslint-disable-line

  constructor(aggregate: CustomAggregate) {
    this.ocurredAt = new Date()
    this.aggregate = aggregate
  }

  public getAggregateId(): UniqueEntityID {
    return this.aggregate.id
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

describe('domain events', () => {
  it('should be able to dispatch and listen to event', () => {
    const callbackSpy = vi.fn()

    // subscriber cadastrado (ouvindo o eventoo de 'resposta criada)
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    // estou criando uma reposta porem SEM salvar no banco
    const aggregate = CustomAggregate.create()

    // estou assegurando que o evento foi criado porem nao foi disparado
    expect(aggregate.domainEvents).toHaveLength(1)

    // estou salvando a resposta no banco de dados e assim disparando o evento
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // o subscriber ouve o evento e faz o que precisa ser feito com o dado
    expect(callbackSpy).toHaveBeenCalled()
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
