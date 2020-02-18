import {
  useType,
  useNewComponent,
  Geometry,
  Polygon,
  Vector,
  Physics,
  useDraw
} from "@hex-engine/2d";
import Draggable from "./Draggable";

export default function Box(position: Vector, onCollide: () => void) {
  useType(Box);

  const geometry = useNewComponent(() =>
    Geometry({
      shape: Polygon.rectangle(new Vector(25, 25)),
      position: position.clone()
    })
  );

  const body = useNewComponent(() => Physics.Body(geometry));
  useNewComponent(() => Draggable(geometry));

  body.onCollision(onCollide);

  useDraw(context => {
    context.fillStyle = "black";
    geometry.shape.draw(context, "fill");
  });
}
