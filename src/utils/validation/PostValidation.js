import Joi from "joi";

const postValidation = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    author: Joi.string().required()
});

export default postValidation;
