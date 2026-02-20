type LockerShape = {
  txt: string;
  left: number;
  top: number;
  width: number;
  height: number;
};

type BoxItem = {
  box_id: number;
  box_status: number;
  box_broken_status: number;
  shape: LockerShape;
};

type BoxProps = {
  item: BoxItem;
  scaleX: number;
  scaleY: number;
};

export default function Box({ item, scaleX, scaleY }: BoxProps) {
  const { shape, box_status: boxStatus, box_broken_status: brokenStatus } = item;

  const style = {
    left: `${shape.left * scaleX}px`,
    top: `${shape.top * scaleY}px`,
    width: `${shape.width * scaleX}px`,
    height: `${shape.height * scaleY}px`,
  };

  return (
    <div
      className={[
        'absolute flex items-center justify-center rounded border text-sm font-semibold',
      ].join(' ')}
      style={style}
      title={`Box ${item.box_id}`}
    >
      {shape.txt}
    </div>
  );
}
