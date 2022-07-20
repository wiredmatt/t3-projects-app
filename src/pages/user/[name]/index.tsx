import { createSSGHelpers } from "@trpc/react/ssg";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";
import { MdNoteAdd } from "react-icons/md";
import superjson from "superjson";
import ProjectsList from "../../../components/ProjectsList";
import Search from "../../../components/Search";
import UserCard from "../../../components/UserCard";
import { appRouter } from "../../../server/router";
import { createContext } from "../../../server/router/context";
import { trpc } from "../../../utils/trpc";

const Index: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  name,
}) => {
  const userQuery = trpc.useQuery(["users.getByName", { name }]);
  const { data: session } = useSession();

  return (
    <main className="container mx-auto lg:flex lg:flex-col items-center justify-center h-screen p-4">
      <h1 className="lg:py-12 text-3xl md:text-[4rem] lg:text-5xl leading-normal font-extrabold text-gray-700 text-center">
        {name}&apos;s Personal <span className="text-purple-300">Projects</span>{" "}
      </h1>

      <Search />

      <div className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full pb-4">
        <div className="flex flex-col lg:flex-row w-full h-full space-y-8 lg:space-y-0">
          <UserCard {...userQuery.data!} />

          <ProjectsList userId={userQuery.data!.id} />

          {session?.user?.id === userQuery.data!.id && (
            <Link href="/projects/new">
              <a className="border border-gray-500 h-full w-full md:w-96 md:h-64 lg:w-1/2 lg:h-full self-center text-white px-3 py-3 rounded-md bg-gray-100 transition hover:bg-gray-300 focus:bg-gray-200 active:bg-gray-300 flex justify-center items-center">
                <MdNoteAdd size={128} color="black" />
              </a>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ name: string }>
) {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson, // optional - adds superjson serialization
  });
  const name = context.params?.name as string;

  // prefetch `post.byId`
  await ssg.fetchQuery("users.getByName", {
    name: name,
  });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      name,
    },
    revalidate: 1,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const users =
    (await prisma?.user.findMany({
      include: {
        projects: true,
      },
    })) || [];

  return {
    paths: users.map((u) => ({
      params: {
        name: u.name,
      },
    })),
    // https://nextjs.org/docs/basic-features/data-fetching#fallback-blocking
    fallback: "blocking",
  };
};

export default Index;
