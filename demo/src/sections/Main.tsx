import { Box, Icon, Link, ui } from "@adamjanicki/ui";
import { architect } from "@adamjanicki/ui/icons";
import { importLib } from "src/codeSnippets";
import Header from "src/components/Heading";
import Para from "src/components/Para";
import Snippet from "src/components/Snippet";
import Examples from "src/sections/Examples";
import Usage from "src/sections/Usage";

export default function Main() {
  return (
    <Box className="main-container">
      <ui.h1 vfx={{ textAlign: "center", fontSize: "xxl" }}>Let It Snow!</ui.h1>
      <ui.p
        vfx={{
          color: "muted",
          textAlign: "center",
          fontWeight: 5,
          fontSize: "l",
        }}
      >
        This library will help you make fun falling-based animations.
        <ui.br />
        Checkout the docs and examples below to see what's available.
      </ui.p>
      <Snippet lang="bash">npm install --save falling-particles</Snippet>
      <Header level={1}>Setup</Header>
      <Para>
        Minimal setup is required to use the library out of the box, you can
        simply import it and use it in any components you'd like. There are many
        ways to customize the particles to your liking, including changing the
        color, size, and speed of the particles. All of this information will be
        fully detailed below in the <Link to="#usage">usage section</Link>. You
        can also check out the <Link to="#examples">examples</Link> to see some
        of the possibilities.
      </Para>
      <Snippet>{importLib}</Snippet>
      <Usage />
      <Examples />
      <Para>
        And that's all I got for you today. Hope you enjoy making fun animations
        with this library!
        <ui.br />
        <ui.br />
        Thanks,
        <ui.br />
        Adam
      </Para>
      <Icon
        icon={architect}
        size="xl"
        style={{ color: "var(--aui-link-color)" }}
      />
    </Box>
  );
}
