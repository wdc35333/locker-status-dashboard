'use client';

import { useState } from 'react';

import Modal from './modal';

export interface LockerShape { // 보관함 모양 인터페이스
  txt: string;
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface BoxItem { // 보관함 아이템 인터페이스
  box_id: number;
  box_status: number;
  box_broken_status: number;
  box_starting_date: number;
  box_expiry_date: number;
  courier_mobile_num: string | null;
  onetime_password: string | null;
  shape: LockerShape;
}

export interface BoxProps { // 보관함 컴포넌트 인터페이스
  item: BoxItem;
  scaleX: number;
  scaleY: number;
}

const getStatusColorClassName = (boxStatus: number, brokenStatus: number) => { // 상태에 따라 색상 클래스 반환
  if (brokenStatus === 1) { // 고장
    return 'border-red-500 bg-red-100 text-red-700';
  }

  if (boxStatus === 0) { // 고장이 아니고, 비어있는 경우
    return 'border-emerald-500 bg-emerald-100 text-emerald-700';
  }

  return 'border-blue-500 bg-blue-100 text-blue-700'; // 고장이 아니고, 사용 중인 경우
};

export default function Box({ item, scaleX, scaleY }: BoxProps) { // 보관함 컴포넌트
  const { shape, box_status: boxStatus, box_broken_status: brokenStatus } = item;
  const statusColorClassName = getStatusColorClassName(boxStatus, brokenStatus);
  const [isOpen, setIsOpen] = useState(false);

  const style = {
    left: `${shape.left * scaleX}px`,
    top: `${shape.top * scaleY}px`,
    width: `${shape.width * scaleX}px`,
    height: `${shape.height * scaleY}px`,
  };

  return (
    <>
      <button
        type="button"
        className={[
          'absolute flex items-center justify-center rounded border text-sm font-semibold cursor-pointer',
          statusColorClassName,
        ].join(' ')}
        style={style}
        title={`Box ${item.box_id}`}
        onClick={() => setIsOpen(true)}
      >
        {item.box_id}
      </button>
      {isOpen && <Modal item={item} setIsOpen={setIsOpen} />} {/* 모달 */}
    </>
  );
}
