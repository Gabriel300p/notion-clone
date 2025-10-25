import { FC } from "react";

interface layoutProps {
  children: React.ReactNode;
  params: any;
}

const layout: FC<layoutProps> = ({ children, params }) => {
  return <main className="flex overflow-hidden h-screen">{children}</main>;
};

export default layout;
