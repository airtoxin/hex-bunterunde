import {
  Canvas,
  Physics,
  ProceduralSfx,
  useChild,
  useNewComponent,
  useType,
  Vector
} from "@hex-engine/2d";
import Floor from "./Floor";
import Box from "./Box";
import { Button } from "./Button";

export default function Root() {
  useType(Root);

  const canvas = useNewComponent(() => Canvas({ backgroundColor: "white" }));
  canvas.fullscreen({ pixelZoom: 3 });

  const engine = useNewComponent(() =>
    Physics.Engine({
      debugDraw: true
    })
  );
  const sfx = useNewComponent(() =>
    ProceduralSfx(
      [
        [5434.442139, 0.851535, 0.286],
        [5141.052246, 0.496733, 0.346],
        [1429.266357, 1.0, 1.112],
        [2678.192139, 0.646166, 0.687],
        [5095.294189, 0.049253, 0.347],
        [5388.684082, 0.099274, 0.287],
        [5184.118652, 0.023394, 0.345],
        [5477.508545, 0.061101, 0.286],
        [5649.77417, 0.026886, 0.286],
        [5227.185059, 0.050205, 0.31],
        [5604.016113, 0.012521, 0.284],
        [5692.840576, 0.011661, 0.286],
        [5342.926025, 0.009492, 0.267],
        [5558.258057, 0.028714, 0.287],
        [7151.715088, 0.009401, 0.233],
        [5049.536133, 0.013756, 0.312],
        [5735.906982, 0.011548, 0.182]
      ].map(([frequency, amplitude, decay]) => ({
        frequency,
        amplitude,
        decay
      }))
    )
  );

  const canvasCenter = new Vector(
    canvas.element.width / 2,
    canvas.element.height / 2
  );

  useChild(() => Floor(canvasCenter.addY(100)));
  useChild(() => Box(canvasCenter, sfx.play));
  useChild(() =>
    Button({
      position: canvasCenter.subtractY(canvasCenter.y - 40),
      size: new Vector(80, 20),
      onClick: () => useChild(() => Box(new Vector(0, 0), sfx.play))
    })
  );
}
