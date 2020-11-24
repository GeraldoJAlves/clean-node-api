import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should return an account on success ', async () => {
    await request(app)
      .post('/api/v1/signup')
      .send({
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        passwordConfirm: 'any_password'
      })
      .expect(201)
  })
})
