import { useQuery } from "@tanstack/react-query"
import { makeAuthorizedRequest } from "@utils/makeAuthorizedRequest";

const fetchData = async (type, page) => {
  let endpoint = '';
  if (type === 'best') {
    endpoint = `/api/v1/best-roommate-matchingposts?page=${page}`;
  } else if (type === 'new') {
    endpoint = `/api/v1/matchingposts?page=${page}`;
  } else if (type === 'mypost') {
    endpoint = `/api/v1/my-matchingposts?page=${page}`;
  } else if (type === 'imminent') {
    endpoint = `/api/v1/deadline-imminent-matchingposts?page=${page}`;
  } else if (type === 'come-matchingrequests') {
    endpoint = `/api/v1/come-matchingrequests?page=${page}`;
  } else if (type === 'my-matchingrequests') {
    endpoint = `/api/v1/my-matchingrequests?page=${page}`;
  }
  try {
    const response = await makeAuthorizedRequest(`${endpoint}`)
    console.log(`${type}훅:`, response.data)
    return response.data
  } catch(error) {
    console.error(error)
  }
}

export const useMatchingPosts = (type, page = 0) => {
  return useQuery({
    queryKey: ['matchingPosts', type, page],
    queryFn: () => fetchData(type, page),
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
    enabled: (type !== 'search' && type !== 'filters'), //type이 search거나 filters일때 쿼리 X
  })
}