import Heading from "src/components/Heading";
import Para from "src/components/Para";
import FallingParticles from "src/lib";

const particleProps = [
  "colors",
  "shapes",
  "images",
  "numParticles",
  "sizeRange",
  "xSpeedRange",
  "ySpeedRange",
  "rotationRange",
];

export default function Usage() {
  return (
    <section id="usage-section">
      <Heading level={1}>Usage</Heading>
      <Para>
        There are a good amount of props you can customize to make this act the
        way you want to. The majority of the props relate to the particles
        themselves, and a handful relate to customizing the container that's
        wrapped around the canvas element.
      </Para>
      <Heading level={2}>Particle Props</Heading>
      The props thay you can apply to the particles include:{" "}
      {particleProps.map((prop, i) => (
        <span key={prop}>
          {i > 0 && ", "}
          <code>{prop}</code>
        </span>
      ))}
      . <code>colors</code> is an array of valid CSS colors that the particles
      will be selected randomly from; <code>shapes</code> is an array of shapes
      that the particles can be; <code>images</code> is an array of image URLs
      that the particles can be; <code>numParticles</code> is the number of
      particles that will be rendered; <code>sizeRange</code> is an object with{" "}
      <code>min</code> and <code>max</code> properties that determine the range
      of sizes the particles can be; <code>xSpeedRange</code> is an object with{" "}
      <code>min</code> and <code>max</code> properties that determine the range
      of horizontal speeds the particles can have; <code>ySpeedRange</code> is
      an object with <code>min</code> and <code>max</code> properties that
      determine the range of vertical speeds the particles can have;{" "}
      <code>rotationRange</code> is an object with <code>min</code> and{" "}
      <code>max</code> properties that determine the range of rotation speeds
      the particles can have.
      <Heading level={2}>Container Props</Heading>
      The props that you can apply to the container include: <code>
        style
      </code>{" "}
      and <code>className</code>. <code>style</code> is an object of CSS
      properties that will be applied to the container div;{" "}
      <code>className</code> is a string that will be applied as a class name to
      the container div. The purpose of wrapping a container div around the
      actual canvas is that typical CSS width and height attributes don't really
      work on canvas elements, so you can use the container div to control the
      size of the canvas, and the canvas will automatically resize to fit the
      container!
      <Heading level={2}>Examples</Heading>
      Below you will find examples ranging from simple to complex, along with
      renderings of what they look like. The examples are meant to give you an
      idea of what you can do with this library, and to give you a starting
      point for your own customizations. If you want to test some of them
      yourself, try adjusting some of the props below.
      <FallingParticles style={{ backgroundColor: "#111" }} />
    </section>
  );
}
