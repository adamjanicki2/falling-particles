import { useState } from "react";
import "src/components/nav.css";
import { Link, UnstyledLink, Hamburger } from "@adamjanicki/ui";
import { ReactComponent as Logo } from "src/images/logo.svg";

type NavlinkProps = {
  to: string;
  children: React.ReactNode;
};

const Nav = () => {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  const Navlink = (props: NavlinkProps) => (
    <li className="navlink-li">
      <Link className="navlink" onClick={closeMenu} {...props} />
    </li>
  );

  return (
    <nav className="flex items-center justify-between w-100 nav pv2 ph4">
      <div className="flex items-center justify-between bar-container">
        <UnstyledLink className="nav-title" to="#installation">
          <span className="desktop">falling-particles</span>
          <Logo style={{ height: 32 }} className="mobile" />
        </UnstyledLink>
        <div className="mobile">
          <Hamburger
            open={open}
            onClick={() => setOpen(!open)}
            duration={0.3}
          />
        </div>
      </div>
      <ul
        className="flex items-center desktop link-container ma0"
        style={{ display: open ? "flex" : undefined }}
      >
        <Navlink to="#installation">Installation</Navlink>
        <Navlink to="#usage">Usage</Navlink>
        <Navlink to="#examples">Examples</Navlink>
      </ul>
    </nav>
  );
};

export default Nav;
