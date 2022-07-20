import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { trpc } from "../../utils/trpc";

const Slug: FC = () => {
  const { query } = useRouter();

  const q = ((query.slug as string[]) || []).join("/");

  const projectQuery = trpc.useQuery([
    "projects.getBySlug",
    {
      slug: q,
    },
  ]);

  return (
    <div className="w-full h-screen mx-6 py-4">
      <div className="lg:py-12">
        <h1 className="text-3xl md:text-[4rem] lg:text-5xl leading-normal font-extrabold text-gray-700 text-center">
          {projectQuery.data?.title}
        </h1>
        <span className="text-end leading-normal w-full">
          by {q.split("/")[0]}
        </span>
      </div>
      <div>
        <Text>{projectQuery.data?.fullDescription}</Text>
      </div>
    </div>
  );
};

export default Slug;
