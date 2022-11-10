export default defineNuxtRouteMiddleware(() => {
  const menu = useMenu()
  if(menu) {
    menu.value = false
  }
  
})