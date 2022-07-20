import { FC, PropsWithChildren } from "react";

interface IProps extends PropsWithChildren {
  cols?: number;
  rows?: number;
}

const Grid: FC<IProps> = ({ children, cols, rows }) => {
  return (
    <div
      className={`grid grid-cols-1 ${
        (cols && "md:grid-cols-" + cols) || "md:grid-cols-2"
      } ${rows && "grid-rows-" + rows} gap-4 ${
        cols && cols >= 2
          ? "justify-start items-start"
          : '"justify-center items-center"'
      } w-full h-full`}
    >
      {children}
    </div>
  );
};

export default Grid;
