import { useRouter } from "next/router";
import { FC } from "react";

interface IProps {}

const Slug: FC<IProps> = ({}) => {
  const { query } = useRouter();

  return (
    <div>
      {query["user"]} | {query["slug"]}
    </div>
  );
};

export default Slug;
