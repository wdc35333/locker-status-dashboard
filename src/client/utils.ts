export default function formatUnixTimestamp(timestamp: number) { // 유닉스 타임스탬프 포맷팅
  if (!timestamp) {
    return '-';
  }

  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function formatPhoneNumber(phoneNumber: string | null) { // 전화번호 포맷팅
  if (!phoneNumber) {
    return '-';
  }

  const digits = phoneNumber.replace(/\D/g, '');
  const matched = digits.match(/^(\d{3})(\d{4})(\d{4})$/);

  if (!matched) {
    return phoneNumber;
  }

  return `${matched[1]}-${matched[2]}-${matched[3]}`;
}
