const Joi = require('joi');
const AppError = require('../../utility/AppError');

const handleErrorValidate = async (validateFn, body, next) => {
  try {
    return await validateFn(body);
  } catch (err) {
    next(new AppError('', 400, 'joi', err));
  }
};

exports.signUpReq = async (body, next) => {
  const schema = Joi.object({
    username: Joi.string().required().example('chet'),
    email: Joi.string().email().required().example('test@gmail.com'),
    // password: Joi.string().required().valid('12345678'),
    password: Joi.string().required(),
    gender: Joi.string().required(),
    born: Joi.date().required(),
    phone: Joi.string(),
    location: Joi.array(),
    passion: Joi.object(),
    interested: Joi.string(),
    bio: Joi.string(),
    social: Joi.object(),
    userimageprofile: Joi.string(),
    userimage: Joi.array(),
    frind_id: Joi.array(),
    

  });
  return await schema
    .validateAsync(body)
    .catch((err) => next(new AppError('', 400, 'joi', err)));
};

exports.signInReq = async (body, next) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  return await schema
    .validateAsync(body)
    .catch((err) => next(new AppError('', 400, 'joi', err)));
};
