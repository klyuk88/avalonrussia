export const useContacts = async () => {
  const config = useRuntimeConfig()
  try {
    const {data} = await useFetch(`/api/contacts-page`, { baseURL: config.apiURL })
    return data.value.data.attributes
  } catch (error) {
    console.log(error);
    return {}
    
  }
  
}
