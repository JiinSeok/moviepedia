import { useLocale } from "../contexts/LocaleContext";

const dict = {
  ko: {
    'confirm button': '확인',
    'cancel button': '취소',
    'edit button': '수정',
    'delete button': '삭제',
  },
  en: {
    'confirm button': 'OK',
    'cancel button': 'Cancel',
    'edit button': 'Edit',
    'delete button': 'Delete',
  },
};

function useTranslate() {
  const locale = useLocale();
  const translate = (key) => dict[locale][key] || '';
  return translate; // 상태의 로직을 커스텀 Hook 안에 숨기고, 필요한 값이나 함수만 노출시키는 React의 추천 방식
}

export default useTranslate;