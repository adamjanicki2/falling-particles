import { ui } from "@adamjanicki/ui";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
};

export default function Para({ children }: Props) {
  return <ui.p vfx={{ lineHeight: "m" }}>{children}</ui.p>;
}
