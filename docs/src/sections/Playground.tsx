import Heading from "src/components/Heading";
import Para from "src/components/Para";
import FallingParticles from "src/lib";

export default function Playground() {
  return (
    <section id="playground-section">
      <Heading level={1}>Playground</Heading>
      <Para>Coming soon...</Para>
      <FallingParticles
        colors={["magenta", "cyan", "yellow"]}
        numParticles={300}
        xSpeedRange={{ min: 2, max: 4 }}
        ySpeedRange={{ min: 2, max: 4 }}
        shapes={["circle", "square", "triangle"]}
        rotationRange={{ min: 1, max: 4 }}
        sizeRange={{ min: 5, max: 10 }}
        style={{ backgroundColor: "black" }}
      />
      <FallingParticles
        className="bordering br4"
        colors={["red"]}
        images={[
          "https://adamovies.com/images/logo512.png",
          "https://adamjanicki.xyz/images/logo512.png",
        ]}
        sizeRange={{ min: 20, max: 30 }}
      />
    </section>
  );
}
