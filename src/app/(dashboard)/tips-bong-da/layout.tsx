import { ReactNode } from "react";

const TipsBongDaLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-h-page overflow-auto">{children}</div>
  );
};

export default TipsBongDaLayout;
