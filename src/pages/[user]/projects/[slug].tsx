import { useRouter } from "next/router";
import { FC } from "react";

const Slug: FC = () => {
  const { query } = useRouter();

  return (
    <div>
      {query["user"]} | {query["slug"]}
    </div>
  );
};

export default Slug;
