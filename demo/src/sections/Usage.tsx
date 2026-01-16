import { ui } from "@adamjanicki/ui";
import Heading from "src/components/Heading";
import Para from "src/components/Para";

const particleProps = [
  "colors",
  "shapes",
  "images",
  "numParticles",
  "sizeRange",
  "xSpeedRange",
  "ySpeedRange",
  "rotationRange",
] as const;

export default function Usage() {
  return (
    <ui.section id="usage-section">
      <Heading level={1}>Usage</Heading>
      <Para>
        There are a good amount of props you can customize to make this act the
        way you want to. The majority of the props relate to the particles
        themselves, and a handful relate to customizing the container that's
        wrapped around the canvas element.
      </Para>
      <Heading level={2}>Particle Props</Heading>
      <Para>
        The props thay you can apply to the particles include:{" "}
        {particleProps.map((prop, i) => (
          <ui.span key={prop}>
            {i > 0 && ", "}
            <ui.code>{prop}</ui.code>
          </ui.span>
        ))}
        . <ui.code>colors</ui.code> is an array of valid CSS colors that the
        particles will be selected randomly from; <ui.code>shapes</ui.code> is
        an array of shapes that the particles can be; <ui.code>images</ui.code>{" "}
        is an array of image URLs that the particles can be;{" "}
        <ui.code>numParticles</ui.code> is the number of particles that will be
        rendered; <ui.code>sizeRange</ui.code> is an object with{" "}
        <ui.code>min</ui.code> and <ui.code>max</ui.code> properties that
        determine the range of sizes the particles can be;{" "}
        <ui.code>xSpeedRange</ui.code> is an object with <ui.code>min</ui.code>{" "}
        and <ui.code>max</ui.code> properties that determine the range of
        horizontal speeds the particles can have; <ui.code>ySpeedRange</ui.code>{" "}
        is an object with <ui.code>min</ui.code> and <ui.code>max</ui.code>{" "}
        properties that determine the range of vertical speeds the particles can
        have; <ui.code>rotationRange</ui.code> is an object with{" "}
        <ui.code>min</ui.code> and <ui.code>max</ui.code> properties that
        determine the range of rotation speeds the particles can have.
      </Para>
      <Heading level={2}>Container Props</Heading>
      <Para>
        The props that you can apply to the container include:{" "}
        <ui.code>style</ui.code> and <ui.code>className</ui.code>.{" "}
        <ui.code>style</ui.code> is an object of CSS properties that will be
        applied to the container div; <ui.code>className</ui.code> is a string
        that will be applied as a class name to the container div. The purpose
        of wrapping a container div around the actual canvas is that typical CSS
        width and height attributes don't really work on canvas elements, so you
        can use the container div to control the size of the canvas, and the
        canvas will automatically resize to fit the container!
      </Para>
    </ui.section>
  );
}
