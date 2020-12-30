import { AddSurveyModel } from '../../../../domain/usecases/add-survey'

export interface AddSurveyRepository {
  add: (addAccount: AddSurveyModel) => Promise<void>
}
