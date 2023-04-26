import { ReactNode } from "react";

export default ({ children }: { children: ReactNode }) => {
  return <section className="pt-20">{children}</section>;
};
