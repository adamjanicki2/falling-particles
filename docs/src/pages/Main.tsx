import { Link } from "@adamjanicki/ui";
import { importLib } from "src/codeSnippets";
import Header from "src/components/Heading";
import Para from "src/components/Para";
import Snippet from "src/components/Snippet";
import { ReactComponent as Logo } from "src/images/logo.svg";
import Playground from "src/sections/Playground";
import Usage from "src/sections/Usage";

const Main = () => (
  <div className="main-container">
    <h1 className="f1 tc">Let It Snow!</h1>
    <p className="f3 fw5 tc dark-gray">
      This library will help you make fun falling-based animations.
      <br />
      Checkout the docs and examples below to see what's available.
    </p>
    <Snippet lang="bash">npm install --save falling-particles</Snippet>
    <Header level={1}>Setup</Header>
    <Para>
      Minimal setup is required to use the library out of the box, you can
      simply import it and use it in any components you'd like. There are many
      ways to customize the particles to your liking, including changing the
      color, size, and speed of the particles. All of this information will be
      fully detailed below in the <Link to="#usage">usage section</Link>. You
      can also play around with the props and settings by visiting the{" "}
      <Link to="#playground">playground</Link> toward the bottom of the page.
    </Para>
    <Snippet>{importLib}</Snippet>
    <Usage />
    <Playground />
    <hr className="ba b--moon-gray mv3" />
    <Para>
      And that's all I got for you today. Hope you enjoy making fun animations
      with this library!
      <br />
      <br />
      Thanks,
      <br />
      Adam
    </Para>
    <Logo style={{ color: "#0070ff", height: 48 }} />
  </div>
);

export default Main;
