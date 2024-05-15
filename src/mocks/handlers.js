import { http, HttpResponse } from 'msw'
import { matchingPostsData } from './api/data/matchingPostsData'
import { bestRoommateMatchingPostsData } from './api/data/bestRoommateMatchingPostsData'
import { myMatchingPostsData } from './api/data/myMatchingPostsData'
import {matchingPostData} from './api/data/matcingPostData'
import { newsData } from './api/data/newsData'
import { reviewsData } from './api/data/reviewsData'
import { profileData } from './api/data/profileData'
import { likeData } from './api/data/likeData'

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
    return HttpResponse.json(matchingPostsData)
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
  //기숙사 소식 조회
  http.get('/api/v1/news', () => {
    return HttpResponse.json(newsData)
  }),
  //유저 전체 리뷰 조회
  http.get('/api/v1/:memberId/reviews', () => {
    return HttpResponse.json(reviewsData)
  }),
  //유저 프로필 조회
  http.get('/api/v1/member/profile/:memberId', () => {
    return HttpResponse.json(profileData)
  }),
  //유저가 좋아요한 목록 조회
  http.get('/api/v1/member/like', () => {
    return HttpResponse.json(likeData)
  }),
  
]