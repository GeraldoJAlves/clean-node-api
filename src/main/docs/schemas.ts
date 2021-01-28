import {
  accountSchema,
  errorSchema,
  loginParamsSchema,
  signUpParamsSchema,
  surveyAnswerSchema,
  surveyResultAnswerSchema,
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
  surveyResultAnswer: surveyResultAnswerSchema,
  error: errorSchema,
  survey: surveySchema,
  surveys: surveysSchema,
  surveyAnswer: surveyAnswerSchema,
  surveyResult: surveyResultSchema
}
