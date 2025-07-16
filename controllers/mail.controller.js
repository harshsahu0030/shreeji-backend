import { Mail } from "../model/mail.mode.js";
import { ApiError } from "../utils/apiError.utils.js";
import { ApiResponse } from "../utils/apiResponse.utlis.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { sendMail } from "../utils/sendmail.utils.js";

const contactMailController = asyncHandler(async (req, res, next) => {
  const { email, name, message, contact } = req.body;

  if (!email || !name || !message || !contact) {
    return next(new ApiError(401, "All fields are required"));
  }

  let subject = `Thanks for reaching out! Shreeji Tech Solutions`;
  let text = `
Hi ${name},
I am Harsh,

Thank you for contacting me. We have received your message and will review your inquiry promptly.
You can expect a response within 1–2 business days.

Kind regards,  
${process.env.USER_NAME}
${process.env.USER_EMAIL}
info@shreejitechsolutions.in
${process.env.CONTACT_NO}
`;

  const mail = await Mail.create({ name, email, message });

  if (!mail) {
    return next(new ApiError(500, "Something went wrong"));
  }

  await Promise.allSettled([
    sendMail({ email, subject, text }),
    sendMail({
      email: process.env.USER_EMAIL,
      subject: "Contact from Shreeji Tech Solution",
      text: `
Name: ${name}
Email: ${email}
Contact : ${contact}
Message: ${message}
      `,
    }),
  ]);

  return res.status(200).json(new ApiResponse(200, { email, name, message }));
});

export { contactMailController };
