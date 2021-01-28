export const surveyResultAnswerSchema = {
  type: 'object',
  properties: {
    answer: {
      type: 'string'
    },
    image: {
      type: 'string'
    },
    percent: {
      type: 'number'
    },
    count: {
      type: 'number'
    }
  },
  required: ['answer', 'percent', 'count']
}
