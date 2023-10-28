import Link from "next/link";
import getCurrentUser from "./actions/getCurrentUser";
import getRecipes from "./actions/getRecipes";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import Recipes from "./components/Recipes";
import Filters from "./components/Filters";
import Halloween from "./components/holidays/Halloween";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentUser = await getCurrentUser();

  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const limit =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 9;

  let searchQuery: { [key: string]: string[] } | undefined = undefined;

  // Check if searchParams has values and initialize searchQuery accordingly
  if (typeof searchParams === "object" && searchParams !== null) {
    searchQuery = {};

    for (const key in searchParams) {
      if (searchParams.hasOwnProperty(key)) {
        const value = searchParams[key];
        searchQuery[key] =
          typeof value === "string"
            ? value.split(",").map((item) => item.trim())
            : [];
      }
    }
  } else {
    searchQuery = undefined;
  }

  const recipes = await getRecipes({ page, limit, query: searchQuery });

  const lastPage = Math.ceil(recipes.recipesQty / limit);

  return (
    <ClientOnly>
      <Container>
        <Halloween />
        <div className="pt-16">
        <Filters />
        {recipes.safeRecipes.length === 0 && <EmptyState />}

        {/* Display recipes */}
        {/* @ts-ignore */}
        <Recipes recipes={recipes.safeRecipes} currentUser={currentUser} />

        {/* Pagination */}
        {lastPage !== 1 && recipes.safeRecipes.length !== 0 && (
          <div className="flex justify-center gap-4 pb-8 pt-2">
          {page > 1 && (
            <Link
              href={{
                pathname: "/",
                // @ts-ignore
                query: {
                  ...(searchQuery ? { ...searchQuery } : {}),
                  page: page > 1 ? page - 1 : 1,
                },
              }}
              className="rounded-lg bg-orange-500 py-2 md:py-2 text-md md:text-lg font-bold  text-white hover:opacity-80
            transition text-center
            w-28"
            >
              Previous
            </Link>
          )}
              {page !== lastPage && (
            <Link
              href={{
                pathname: "/",
                // @ts-ignore
                query: {
                  ...(searchQuery ? { ...searchQuery } : {}),
                  page: page !== lastPage ? page + 1 : lastPage,
                },
              }}
              className="rounded-lg bg-orange-500 py-2 md:py-2 text-md md:text-lg font-bold  text-white hover:opacity-80
            transition text-center
            w-28"
            >
                  Next
                </Link>
              )}
            </div>
          )}
          </div>
      </Container>
    </ClientOnly>
  );
}