import { is } from "zod/locales";
import { Role } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../config";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExists = await prisma.user.findFirst({
      where: {
        role: Role.SUPER_ADMIN,
      },
    });
    if (isSuperAdminExists) {
      console.log("Super Admin already exists");
      return;
    }

    const name = config.super_admin_name;
    const email = config.super_admin_email;
    const password = config.super_admin_password;
    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds),
    );
    if (name || email || password) {
      console.log("name , email or password not found in env file");
    }
    const superAdmin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: Role.SUPER_ADMIN,
        needPasswordChange: false,
        status: "ACTIVE",
        emailVerified: true,
      },
    });
    console.log(" Super Admin created", superAdmin);
  } catch (error) {
    console.log(error);
    await prisma.user.delete({
      where: {
        email: config.super_admin_email,
      },
    });
  }
};
