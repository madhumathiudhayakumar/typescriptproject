import * as Yup  from 'yup'


const skillsList = ["HTML", "CSS", "React"]

export const registerSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Name must only contain letters and spaces")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be 8+ characters, 1 uppercase, 1 number, 1 special char"
    )
    .required("Password is required"),

  gender: Yup.string().required("Gender is required"),

  skils: Yup.array()
  .of(Yup.string().oneOf(skillsList)) // each selected skill must be one of the allowed list
  .min(1, "At least one skill must be selected")
  .required("Skills are required"),


  dob: Yup.string()
    .required("Date of Birth is required")
    .test("dob", "Future dates not allowed", (value) => {
      return new Date(value || '') <= new Date();
    }),

  age: Yup.number()
    .required("Age is required")
    .positive("Age must be positive")
    .integer("Age must be an integer")
    .min(1, "Age must be at least 1"),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone number is required"),

  profile: Yup.mixed().nullable(),

  document: Yup.mixed().nullable(),

  country: Yup.string().required("Country is required"),

  role: Yup.string().required("Role is required"),
});
