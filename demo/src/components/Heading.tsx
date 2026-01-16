import "src/components/heading.css";

import { Link, ui } from "@adamjanicki/ui";

type Props = {
  children: string;
  level: 1 | 2;
};

const headingToId = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/gi, "");

export default function Heading({ children, level }: Props) {
  const id = headingToId(children);
  const Component = ui[`h${level}`];
  return (
    <Component
      id={id}
      className="has-octo-within"
      vfx={{ axis: "x", align: "center", width: "full" }}
    >
      <Link className="octo" to={`#${id}`}>
        #
      </Link>
      {children}
    </Component>
  );
}
