import LogoLargeIcon from "@assets/img/selidor.svg";
import LogoSmallIcon from "@assets/img/selidor-small.svg";
import { forwardRef } from "react";

export const LogoLarge = forwardRef<SVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => {
    return <LogoLargeIcon ref={ref} {...props} />;
  },
);
LogoLarge.displayName = "LogoLarge";

export const LogoSmall = forwardRef<SVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => {
    return <LogoSmallIcon ref={ref} {...props} />;
  },
);
LogoSmall.displayName = "LogoSmall";
