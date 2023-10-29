import prisma from "@/app/libs/prismadb";

interface IParams {
  recipeId?: string;
}

export default async function getReportsByRecipeId(params: IParams) {
  try {
    const { recipeId } = params;

    if (!recipeId) {
      throw new Error("Recipe ID is required");
    }

    const reports = await prisma.report.findMany({
      where: {
        recipeId,
      },
      include: {
        author: true,
      },
    });

    const safeReports = reports.map((report) => ({
      ...report,
      createdAt: report.createdAt.toISOString(),
    }));

    return safeReports;
  } catch (error: any) {
    throw new Error(`Failed to fetch reports: ${error.message}`);
  }
}
