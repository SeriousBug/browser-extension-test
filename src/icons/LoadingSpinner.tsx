import LoadingSpinnerIcon from "@assets/img/loading-spinner.svg";
import { forwardRef } from "react";

export const LoadingSpinner = forwardRef<
  SVGElement,
  React.SVGProps<SVGSVGElement>
>((props, ref) => {
  return <LoadingSpinnerIcon ref={ref} {...props} />;
});
LoadingSpinner.displayName = "LoadingSpinner";
