import Heading from "src/components/Heading";
import Para from "src/components/Para";
import FallingParticles from "src/lib";

export default function Playground() {
  return (
    <section id="playground-section">
      <Heading level={1}>Playground</Heading>
      <Para>Coming soon...</Para>
      <FallingParticles className="bordering br4" colors={["red"]} />
    </section>
  );
}
