import { User, Recipe, Review, Report } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt?: string;
  emailVerified?: string | null;
};

export type SafeRecipe = Omit<Recipe, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt?: string;
};

export type SafeReview = Omit<Review, "createdAt"> & {
  createdAt: string;
};

export type SafeReport = Omit<Report, "createdAt"> & {
  createdAt: string;
};