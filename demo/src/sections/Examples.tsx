import { Link } from "@adamjanicki/ui";
import { images, leaves, neon, snow } from "src/codeSnippets";
import Heading from "src/components/Heading";
import HiddenSnippet from "src/components/HiddenSnippet";
import Para from "src/components/Para";
import FallingParticles from "falling-particles";

export default function Examples() {
  return (
    <section id="examples-container">
      <Heading level={1}>Examples</Heading>
      <Para>
        Below you will find examples ranging from simple to complex, along with
        renderings of what they look like. The examples are meant to give you an
        idea of what you can do with this library, and to give you a starting
        point for your own customizations. If you want to test some of them
        yourself, you can head over to my{" "}
        <Link
          target="_blank"
          rel="noreferrer"
          to="https://adamjanicki.xyz/react-playground"
        >
          React Playground
        </Link>{" "}
        to import the library and start playing around with it.
      </Para>
      <Heading level={2}>Classic Snow</Heading>
      <FallingParticles style={{ backgroundColor: "#111" }} />
      <HiddenSnippet>{snow}</HiddenSnippet>
      <Heading level={2}>Falling Leaves</Heading>
      <FallingParticles
        colors={["red", "orange", "yellow"]}
        xSpeedRange={{
          min: 1,
          max: 3,
        }}
        ySpeedRange={{
          min: 1,
          max: 3,
        }}
        rotationRange={{
          min: -1,
          max: 1,
        }}
        shapes={["circle", "triangle"]}
        style={{ backgroundColor: "#e0e0e0" }}
      />
      <HiddenSnippet>{leaves}</HiddenSnippet>
      <Heading level={2}>Custom Shapes</Heading>
      <FallingParticles
        xSpeedRange={{
          min: 2,
          max: 4,
        }}
        rotationRange={{
          min: -5,
          max: -5,
        }}
        shapes={["circle", "square", "triangle"]}
        colors={["magenta", "cyan", "yellow"]}
        style={{ backgroundColor: "#111" }}
      />
      <HiddenSnippet>{neon}</HiddenSnippet>
      <Heading level={2}>Images</Heading>
      <FallingParticles
        xSpeedRange={{
          min: 2,
          max: 4,
        }}
        rotationRange={{
          min: -2,
          max: 5,
        }}
        sizeRange={{
          min: 10,
          max: 20,
        }}
        images={[
          "https://static-00.iconduck.com/assets.00/snowflake-emoji-447x512-o823v80t.png",
        ]}
      />
      <HiddenSnippet>{images}</HiddenSnippet>
    </section>
  );
}
