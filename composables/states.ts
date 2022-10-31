export const useMail = () => useState<string>('mail', () => 'info@avalonrussia.ru')
export const usePhone = () => useState<string>('phone', () => '8 (800) 550-14-61')
export const useAdress = () => useState<string>('adress', () => 'Москва ул. Летная 99')
export const useModal = () => useState<boolean>('modal', () => false)
export const useModalText = () => useState<object>("modalText", () => {
  return {
    title: "Оставьте заявку",
    subTitle: "Заполните пожалуйста форму ниже"
  }
})