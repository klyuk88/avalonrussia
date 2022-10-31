export const useModal = () => useState<boolean>('modal', () => false)
export const useModalText = () => useState<object>("modalText", () => {
  return {
    title: "Оставьте заявку",
    subTitle: "Заполните пожалуйста форму ниже"
  }
})