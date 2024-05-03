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
  } else if (type === 'come-matchingrequests') {
    endpoint = '/api/v1/come-matchingrequests';
  } else if (type === 'my-matchingrequests') {
    endpoint = '/api/v1/my-matchingrequests';
  }
  try {
    const accessToken = localStorage.getItem('token')
    const response = await API.get(`${endpoint}`, 
    // {
    //   headers: {
    //     'Authorization': 'Bearer ' + accessToken
    //   }
    // }
    )
    console.log('훅:', response.data)
    return response.data
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
    enabled: (type !== 'search' && type !== 'filters'), //type이 search거나 filters일때 쿼리 X
  })
}