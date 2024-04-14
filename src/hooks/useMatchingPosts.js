import { useQuery } from "@tanstack/react-query"
import { API } from "@utils/api";

const fetchData = async (type) => {
  let endpoint = '';
  if (type === 'best') {
    endpoint = '/api/v1/best-roommate-matchingposts';
  } else if (type === 'new') {
    endpoint = '/api/v1/matchingposts';
  } else if (type === 'mypost') {
    endpoint = '/api/v1/my-matchingposts';
  } else if (type === 'imminent') {
    endpoint = '/api/v1/deadline-imminent-matchingposts';
  }
  try {
    const response = await API.get(`${endpoint}`)
    console.log('훅:', response.data.data)
    return response.data.data
  } catch(error) {
    console.error(error)
  }
}
//type: best/new/mypost
export const useMatchingPosts = (type) => {
  return useQuery({
    queryKey: ['matchingPosts', type],
    queryFn: () => fetchData(type),
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
  })
}