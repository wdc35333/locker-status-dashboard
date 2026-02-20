import { BoxItem } from './box';

import formatUnixTimestamp, { formatPhoneNumber } from '@/client/utils';

interface ModalProps {
  item: BoxItem;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Modal({ item, setIsOpen }: ModalProps) {
  return (
    <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/35"
        role="presentation"
        onClick={() => setIsOpen(false)}
        >
          <div
            className="w-[320px] rounded-lg bg-white p-4 shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-label={`Box ${item.box_id} 상세 정보`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold text-zinc-900">
                보관함 {item.box_id} 상세 정보
              </h3>
              <button
                type="button"
                className="rounded border border-zinc-300 px-2 py-1 text-xs text-zinc-700"
                onClick={() => setIsOpen(false)}
              >
                닫기
              </button>
            </div>
            <dl className="space-y-2 text-sm text-zinc-800">
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">휴대폰 번호</dt>
                <dd>{formatPhoneNumber(item.courier_mobile_num)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">일회용 비밀번호</dt>
                <dd>{item.onetime_password ?? '-'}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">시작일시</dt>
                <dd>{formatUnixTimestamp(item.box_starting_date)}</dd>
              </div>
            </dl>
          </div>
        </div>
  );
}
