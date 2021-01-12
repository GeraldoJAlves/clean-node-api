import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { AddSurvey, AddSurveyParams } from './db-add-survey-protocols'

export class DbAddSurvey implements AddSurvey {
  constructor (private readonly addSurveyRepository: AddSurveyRepository) {}

  async add (data: AddSurveyParams): Promise<void> {
    await this.addSurveyRepository.add(data)
  }
}
