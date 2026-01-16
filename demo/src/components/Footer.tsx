import { Link, ui } from "@adamjanicki/ui";

export default function Footer() {
  return (
    <ui.footer
      vfx={{
        axis: "x",
        align: "center",
        justify: "center",
        paddingY: "xxl",
        borderTop: true,
      }}
    >
      <ui.p vfx={{ fontWeight: 5 }}>
        Est. 2023 Built from scratch by{" "}
        <Link to="https://adamjanicki.xyz" newTab>
          Adam
        </Link>
      </ui.p>
    </ui.footer>
  );
}
