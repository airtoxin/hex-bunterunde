import {
  useType,
  useNewComponent,
  useEntity,
  Geometry,
  Physics,
  Mouse,
  Vector,
  Keyboard,
} from "@hex-engine/2d";

export default function Draggable(geometry: ReturnType<typeof Geometry>) {
  useType(Draggable);

  const physics = useEntity().getComponent(Physics.Body);

  const mouse = useNewComponent(Mouse);
  const keyboard = useNewComponent(Keyboard);

  let originalStatic = false;
  let isDragging = false;
  const startedDraggingAt = new Vector(0, 0);

  mouse.onDown((event) => {
    if (keyboard.pressed.has("Shift")) {
      if (physics) {
        originalStatic = physics.body.isStatic;
        physics.setStatic(true);
      }
      isDragging = true;
      startedDraggingAt.mutateInto(event.pos);
    }
  });

  mouse.onMove((event) => {
    if (isDragging) {
      geometry.position.addMutate(event.pos.subtract(startedDraggingAt));
    }
  });

  mouse.onUp(() => {
    if (physics) {
      physics.setStatic(originalStatic);
    }
    isDragging = false;
  });
}
