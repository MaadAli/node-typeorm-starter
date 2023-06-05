import Joi from "joi"

export type requestPart = 'body' | 'params' | 'query'

export type requestSchema = {
  [key in requestPart]: Joi.ObjectSchema
}