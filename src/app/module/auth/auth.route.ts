import { NextFunction, Request, Response, Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { AuthController } from "./auth.controller";
import { PatientValidation } from "./auth.validation";
import { validateRequest } from "../../middleware/validatRequest";

const router = Router();

router.post(
  "/register",
 validateRequest(PatientValidation.PatientRegisterZodSchema),
  AuthController.registerPatient,
);
router.post("/login", 
	validateRequest(PatientValidation.loginZodSchema),
	AuthController.loginUser);
router.get(
  "/me",
  auth(Role.ADMIN, Role.DOCTOR, Role.PATIENT, Role.SUPER_ADMIN),
  AuthController.getMe,
);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/google", AuthController.googleLogin);
export const AuthRoutes = router;
