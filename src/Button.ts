import {
  Geometry,
  HexMouseEvent,
  Mouse,
  Polygon,
  SystemFont,
  TextBox,
  useDraw,
  useNewComponent,
  useType,
  Vector
} from "@hex-engine/2d";

export const Button = ({
  position,
  size,
  onClick
}: {
  position: Vector;
  size: Vector;
  onClick: (event: HexMouseEvent) => void;
}) => {
  useType(Button);

  const box = useNewComponent(() =>
    Geometry({
      shape: Polygon.rectangle(size),
      position
    })
  );
  const font = useNewComponent(() =>
    SystemFont({
      name: "Arial",
      size: 16
    })
  );
  const text = useNewComponent(() =>
    TextBox({
      size,
      font
    })
  );

  const mouse = useNewComponent(() => Mouse({ geometry: box }));
  mouse.onClick(onClick);

  useDraw(context => {
    context.fillStyle = "blue";
    box.shape.draw(context, "fill");
    text.drawText(context, "ADD");
  });
};
