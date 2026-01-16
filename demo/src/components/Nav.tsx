import "src/components/nav.css";

import { Box, Hamburger, Icon, Link, ui, UnstyledLink } from "@adamjanicki/ui";
import { architect } from "@adamjanicki/ui/icons";
import { useState } from "react";

type NavlinkProps = {
  to: string;
  children: React.ReactNode;
};

export default function Nav() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  function Navlink(props: NavlinkProps) {
    return (
      <ui.li className="navlink-li">
        <Link className="navlink" onClick={closeMenu} {...props} />
      </ui.li>
    );
  }

  return (
    <ui.nav
      vfx={{
        axis: "x",
        align: "center",
        justify: "between",
        width: "full",
        paddingY: "s",
        paddingX: "l",
      }}
      className="nav"
    >
      <Box
        vfx={{ axis: "x", align: "center", justify: "between" }}
        className="bar-container"
      >
        <UnstyledLink className="nav-title" to="/" onClick={closeMenu}>
          <Box className="desktop">falling-particles</Box>
          <Icon icon={architect} size="l" className="mobile" />
        </UnstyledLink>
        <Box className="mobile">
          <Hamburger open={open} onClick={() => setOpen(!open)} />
        </Box>
      </Box>
      <ui.ul
        vfx={{ axis: "x", align: "center", margin: "none" }}
        className="desktop link-container"
        style={{ display: open ? "flex" : undefined }}
      >
        <Navlink to="#installation">Installation</Navlink>
        <Navlink to="#usage">Usage</Navlink>
        <Navlink to="#examples">Examples</Navlink>
      </ui.ul>
    </ui.nav>
  );
}
