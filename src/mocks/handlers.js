import { http, HttpResponse } from 'msw'
import { matchingPostsData } from './api/data/matchingPostsData'
import { bestRoommateMatchingPostsData } from './api/data/bestRoommateMatchingPostsData'
import { myMatchingPostsData } from './api/data/myMatchingPostsData'
import {matchingPostData} from './api/data/matcingPostData'
export const handlers = [
  // By calling "http.get()" we're instructing MSW
  // to capture all outgoing "GET /posts" requests
  // and execute the given response resolver when they
  // happen.
  //룸메이트 매칭글 전체 조회
  http.get('/api/v1/matchingposts', () => {
    // Response resolver allows you to react to captured requests,
    // respond with mock responses or passthrough requests entirely.
    // For now, let's just print a message to the console.
    return HttpResponse.json(matchingPostsData)
  }),
  //베스트 룸메이트 조회
  http.get('/api/v1/best-roommate-matchingposts', () => {
    return HttpResponse.json(bestRoommateMatchingPostsData)
  }),
  //내가 올린 매칭글 조회
  http.get('/api/v1/my-matchingposts', () => {
    return HttpResponse.json(matchingPostsData)
  }),
  //마감임박 매칭글 조회
  http.get('/api/v1/deadline-imminent-matchingposts', () => {
    return HttpResponse.json(bestRoommateMatchingPostsData)
  }),
  //특정 룸메이트 매칭글 조회
  http.get('/api/v1/matchingposts/:matchingpostid', () => {
    return HttpResponse.json(bestRoommateMatchingPostsData)
  }),
]