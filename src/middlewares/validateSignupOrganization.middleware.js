import Joi from "joi";

const signupSchema = Joi.object({
  org_name: Joi.string().min(5).max(100).required().messages({
    "string.empty": "Organization name is required",
    "string.min": "Organization name must be at least 5 characters",
  }),
  org_abbreviation: Joi.string().min(2).max(10).required().messages({
    "string.empty": "Organization abbreviation name is required",
    "string.min": "abbreviation name must be at least 2 characters",
  }),
  user_name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Chief name is required",
  }),

  account_email: Joi.string()
    .email({ tlds: { allow: false } }) //tlds =>Top-Level Domains
    .required()
    .messages({
      "string.email": "Please enter a valid email address",
      "string.empty": "Email is required",
    }),

  org_description: Joi.string().min(20).required().messages({
    "string.min": "Description must be at least 20 characters",
    "string.empty": "Description is required",
  }),

  org_social_link: Joi.string().uri().allow("").messages({
    "string.uri": "Please enter a valid URL",
  }),

  location: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  })
    .required()
    .messages({
      "any.required": "Organization location is required",
    }),  

});


export const validateSignupOrganization = (req, res, next) => {
  if (req.body.location && typeof req.body.location === 'string') {
    try {
      req.body.location = JSON.parse(req.body.location);
    } catch (e) {
      const err = new Error("Invalid location format");
      err.statusCode = 400;
      return next(err);
    }
  }
    const { error } = signupSchema.validate(req.body);

  if (error) {
    const err = new Error(error.details[0].message);
    err.statusCode = 400;
    return next(err);
  }
   if (!req.file) {
    const err = new Error("Organization logo is required");
    err.statusCode = 400;
    return next(err);
  }
  next();
};
