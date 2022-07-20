import { Project } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";

const ProjectCard: FC<Project> = (project) => {
  return (
    <section className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{project.title}</h2>
      <p className="text-sm text-gray-600">{project.shortDescription}...</p>
      <div className="space-x-4">
        <a
          className="mt-3 text-sm underline text-violet-500 decoration-dotted underline-offset-2"
          href={
            project.externalUrl?.startsWith("http")
              ? project.externalUrl
              : "https://" + project.externalUrl || ""
          }
          target="_blank"
          rel="noreferrer"
        >
          View on Github
        </a>
        <Link href={`/projects/${project.slug}`}>
          <a
            className="mt-3 text-sm underline text-violet-500 decoration-dotted underline-offset-2"
            target="_blank"
            rel="noreferrer"
          >
            Read More
          </a>
        </Link>
      </div>
    </section>
  );
};

export default ProjectCard;

// <a
// href={
//   project.externalUrl?.startsWith("http")
//     ? project.externalUrl
//     : "https://" + project.externalUrl || ""
// }
// className="px-2 w-full block rounded-lg bg-gray-900 hover:shadow-lg font-semibold text-white py-2"
// >
// View on Github
// </a>
// <a
// href={project.slug}
// className="px-2 w-full block rounded-lg bg-gray-900 hover:shadow-lg font-semibold text-white py-2"
// >
// Read More
// </a>
