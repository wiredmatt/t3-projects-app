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
            <div className="py-1 -mt-4">
              <Grid cols={2}>
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <div
                    className="h-32 leading-6 p-4 shadow-lg rounded-2xl bg-purple-300"
                    key={n}
                  ></div>
                ))}
              </Grid>
            </div>
          )}
        </p>
      )}
    </div>
  );
};

export default ProjectsList;
