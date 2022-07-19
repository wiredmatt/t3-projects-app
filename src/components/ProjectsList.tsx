import { FC } from "react";
import { trpc } from "../utils/trpc";
import Grid from "./Grid";
import ProjectCard from "./ProjectCard";

interface IProps {
  userId: string;
}

const ProjectsList: FC<IProps> = ({ userId }) => {
  const projects = trpc.useQuery([
    "project.getByUser",
    {
      userId,
      take: 6,
    },
  ]);

  const user = trpc.useQuery(["auth.me"]);

  return (
    <div className="w-full h-full pt-6 text-2xl text-blue-500 px-4">
      {projects.data && projects.data.length ? (
        <Grid cols={2}>
          {projects.data.map((p) => (
            <ProjectCard {...p} key={p.id} />
          ))}
        </Grid>
      ) : (
        <p>
          {projects.isLoading ? (
            "Loading..."
          ) : (
            <div className="py-1 -mt-4 relative">
              <div className=" opacity-40 ">
                <Grid cols={2}>
                  {[0, 1, 2, 3, 4, 5].map((n) => (
                    <div
                      className="h-32 leading-6 p-4 shadow-lg rounded-2xl bg-gray-600"
                      key={n}
                    ></div>
                  ))}
                </Grid>
              </div>
              <p className="text-gray-50 font-bold italic absolute top-40 md:right-40 bg-gray-800 rounded-xl p-2 mx-4">
                {user.data?.name} has no projects
              </p>
            </div>
          )}
        </p>
      )}
    </div>
  );
};

export default ProjectsList;
