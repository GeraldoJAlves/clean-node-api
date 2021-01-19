import {
  accountSchema,
  errorSchema,
  loginParamsSchema,
  signUpParamsSchema,
  surveyAnswerSchema,
  addSurveyParamsSchema,
  saveSurveyResultParamsSchema,
  surveySchema,
  surveysSchema,
  surveyResultSchema
} from './schemas/'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  signUpParams: signUpParamsSchema,
  addSurveyParams: addSurveyParamsSchema,
  saveSurveyResultParams: saveSurveyResultParamsSchema,
  error: errorSchema,
  survey: surveySchema,
  surveys: surveysSchema,
  surveyAnswer: surveyAnswerSchema,
  surveyResult: surveyResultSchema
}
