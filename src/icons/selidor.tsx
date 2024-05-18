import LogoLargeIcon from "@assets/img/selidor.svg";
import LogoSmallIcon from "@assets/img/selidor-small.svg";
import { DetailedHTMLProps, forwardRef } from "react";

export const LogoLarge = forwardRef<
  HTMLImageElement,
  DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
>((props, ref) => {
  return <img ref={ref} src={LogoLargeIcon} {...props} />;
});
LogoLarge.displayName = "LogoLarge";

export const LogoSmall = forwardRef<
  HTMLImageElement,
  DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
>((props, ref) => {
  return <img ref={ref} src={LogoSmallIcon} {...props} />;
});
LogoSmall.displayName = "LogoSmall";
