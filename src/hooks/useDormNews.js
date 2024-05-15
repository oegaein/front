import { useQuery } from "@tanstack/react-query"
import { API } from "@utils/api";

const fetchData = async () => {
  try {
    const response = await API.get(`/api/v1/news`)
    console.log(response)
    return response.data.data
  } catch(error) {
    console.error(error)
  }
}
//type: best/new/mypost
export const useDormNews = () => {
  return useQuery({
    queryKey: ['dormNews'],
    queryFn: fetchData,
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
  })
}