import { Suspense } from "react";

const SuspenseWrapper = ({ children }) => {
  return (
    <Suspense>
      <div>{children}</div>
    </Suspense>
  );
};

export default SuspenseWrapper;
