import { Link } from "@adamjanicki/ui";
import React from "react";
import "src/components/heading.css";

type Props = {
  level: number;
  children: string;
};

function HashLink({ id }: { id: string }) {
  return (
    <Link className="octo" to={`#${id}`}>
      #
    </Link>
  );
}

function headingToId(heading: string) {
  return heading
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "");
}

const Heading = ({ level, children }: Props) => {
  const id = headingToId(children);
  return React.createElement(
    `h${level}`,
    { id, className: "has-octo-within flex items-center" },
    <HashLink id={id} />,
    children
  );
};

export default Heading;
