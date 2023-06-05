import Joi from 'joi'

export default {
  createUser: {
    body: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  }
}
