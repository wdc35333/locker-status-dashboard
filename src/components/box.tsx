export interface LockerShape {
  txt: string;
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface BoxItem {
  box_id: number;
  box_status: number;
  box_broken_status: number;
  shape: LockerShape;
}

export interface BoxProps {
  item: BoxItem;
  scaleX: number;
  scaleY: number;
}

const getStatusColorClassName = (boxStatus: number, brokenStatus: number) => {
  if (brokenStatus === 1) { // 고장
    return 'border-red-500 bg-red-100 text-red-700';
  }

  if (boxStatus === 0) { // 고장이 아니고, 비어있는 경우
    return 'border-emerald-500 bg-emerald-100 text-emerald-700';
  }

  return 'border-blue-500 bg-blue-100 text-blue-700'; // 고장이 아니고, 사용 중인 경우
};

export default function Box({ item, scaleX, scaleY }: BoxProps) {
  const { shape, box_status: boxStatus, box_broken_status: brokenStatus } = item;
  const statusColorClassName = getStatusColorClassName(boxStatus, brokenStatus);

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
        statusColorClassName,
      ].join(' ')}
      style={style}
      title={`Box ${item.box_id}`}
    >
      {shape.txt}
    </div>
  );
}
