export const importLib = `
// in some component...
import FallingParticles from "falling-particles";

export default function App() {
  return (
    <>
      <FallingParticles />
      <h1>Let It Snow!</h1>
    </>
  );
}
`;

export const snow = `
import FallingParticles from "falling-particles";

<FallingParticles style={{ backgroundColor: "#111" }} />`;

export const leaves = `
import FallingParticles from "falling-particles";
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
/>`;

export const neon = `
import FallingParticles from "falling-particles";

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
/>`;

export const images = `
import FallingParticles from "falling-particles";

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
/>`;
