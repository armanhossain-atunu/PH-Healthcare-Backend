import z from "zod";

 const PatientRegisterZodSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long").max(10),
  email: z.email(),
  password: z
    .string()
    .min(8," Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
   .regex(/[a-z]/ , "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  patient: z
    .object({
      contactNumber: z.string().optional(),
    })
    .optional(),
});

const loginZodSchema = z.object({
   email: z.email(),
  password: z
    .string()
    .min(8," Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
   .regex(/[a-z]/ , "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
})
export const PatientValidation ={
  PatientRegisterZodSchema,
  loginZodSchema
};