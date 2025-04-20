import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { API } from '@utils/api';

interface DormNews {
	id: number; // 뉴스 항목의 고유 ID
	title: string; // 뉴스 제목
	url: string;
	createdAt: string;
}

const fetchData = async (): Promise<DormNews[]> => {
	try {
		const response = await API.get(`/api/v1/news`);
		return response.data.data;
	} catch (error) {
		console.error('Failed to fetch news:', error); // 로깅
		return []; // 빈 배열 반환
		// 또는
		// throw new Error("Failed to fetch news"); // 에러 다시 던지기
	}
};
//type: best/new/mypost
export const useDormNews = (): UseQueryResult<DormNews[]> => {
	return useQuery({
		queryKey: ['dormNews'],
		queryFn: fetchData,
		staleTime: 0,
		gcTime: 5 * 60 * 1000,
	});
};
