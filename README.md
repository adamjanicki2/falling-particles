# Falling Particles

A simple React TypeScript component for creating falling animations (snow, confetti, etc)

_Check out the [demo site](https://adamjanicki.xyz/falling-particles)!_

## Installation

```bash
npm install falling-particles
```

## Usage

You can use this package with the default config, or pass in a lot of customizable props.

### Default

```tsx
import React from "react";
import FallingParticles from "falling-particles";

const App = () => {
  return (
    <div style={{ backgroundColor: "black", width: "100vw", height: "100vh" }}>
      <FallingParticles />
    </div>
  );
};

export default App;
```

### Custom

```tsx
import React from "react";
import FallingParticles from "falling-particles";

const App = () => {
  return (
    <div style={{ backgroundColor: "black", width: "100vw", height: "100vh" }}>
      <FallingParticles
        colors={["magenta", "cyan", "yellow"]}
        numParticles={300}
        xSpeedRange={{ min: 2, max: 4 }}
        ySpeedRange={{ min: 2, max: 4 }}
        shapes={["circle", "square", "triangle"]}
        rotationRange={{ min: 1, max: 4 }}
        sizeRange={{ min: 5, max: 10 }}
      />
    </div>
  );
};

export default App;
```

## Props

| Prop Name       | Type                  | Default Value                | Description                                                                                                                      |
| --------------- | --------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `colors`        | `string[]`            | `["#fff"]`                   | An array of colors to randomly choose from for the particles.                                                                    |
| `shapes`        | `string[]`            | `["circle"]`                 | An array of shapes to randomly choose from for the particles.                                                                    |
| `images`        | `string[]`            | `[]`                         | An array of image urls to randomly choose from for the particles.                                                                |
| `numParticles`  | `number`              | `120`                        | The number of particles to render.                                                                                               |
| `xSpeedRange`   | `Range`               | `{ min: -2.5, max: 2.5 }`    | The range of x-axis speeds to randomly choose from for the particles.                                                            |
| `ySpeedRange`   | `Range`               | `{ min: 1.5, max: 3 }`       | The range of y-axis speeds to randomly choose from for the particles.                                                            |
| `rotationRange` | `Range`               | `{ min: 0, max: 0 }`         | The range of rotations to randomly choose from for the particles.                                                                |
| `sizeRange`     | `Range`               | `{ min: 1, max: 6 }`         | The range of sizes to randomly choose from for the particles. _(Width for images, rectangles & triangles, diameter for circles)_ |
| `style`         | `React.CSSProperties` | See the default style config | A style object to apply to the container `canvas` element.                                                                       |
| `className`     | `string`              | `undefined`                  | A className to apply to the container `canvas` element.                                                                          |
