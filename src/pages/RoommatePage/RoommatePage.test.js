import {fetchMatchingPosts} from './RoommatePage'
import MockAxios from "jest-mock-axios";
afterEach(() => {
  MockAxios.reset();
});

test('fetchMatchingPosts 호출 시 예상 응답을 반환한다', async () => {
  const mockResponse = {
    data: [
      {
        star: 5,
        major: "컴퓨터전자시스템공학부",
        studentNo: "19",
        name: "설희관",
        title: "룸메 구해요",
        dDay: 7,
        dong: "A동",
        roomSize: "2인실",
        matchingStatus: "매칭 대기"
      }
    ]
  };

  // 요청이 보내지면 모킹된 응답을 반환하도록 설정
  MockAxios.get.mockResolvedValue(mockResponse);

  const result = await fetchMatchingPosts();

  // API 함수가 올바른 데이터를 반환하는지 확인
  expect(result).toEqual(mockResponse);

  // 실제로 '/api/v1/matchingposts' 경로로 요청이 보내졌는지 확인
  expect(MockAxios.get).toHaveBeenCalledTimes(1);
  expect(MockAxios.get).toHaveBeenCalledWith('/api/v1/matchingposts');
});