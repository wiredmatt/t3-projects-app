import { FC, PropsWithChildren } from "react";

interface IProps extends PropsWithChildren {
  cols?: number;
  rows?: number;
}

const Grid: FC<IProps> = ({ children, cols, rows }) => {
  return (
    <div
      className={`grid ${cols && "grid-cols-" + cols} ${
        rows && "grid-rows-" + rows
      } gap-4 items-center justify-center`}
    >
      {children}
    </div>
  );
};

export default Grid;
