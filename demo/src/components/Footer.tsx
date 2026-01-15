import { Link } from "@adamjanicki/ui";

const Footer = () => (
  <footer className="pv5 flex bt b--moon-gray bw1 items-center justify-center w-100">
    <p className="fw5 f5">
      Est. 2023 Built from scratch by{" "}
      <Link
        target="_blank"
        rel="noreferrer"
        className="link"
        to="https://adamjanicki.xyz"
      >
        Adam
      </Link>
    </p>
  </footer>
);

export default Footer;
