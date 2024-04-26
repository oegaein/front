import { fireEvent, render, screen, renderHook, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { expect, test, beforeAll, afterAll, afterEach } from "vitest";
import { server } from '../../mocks/node';
import RoommateSwiperList from './RoommateSwiperList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// MSW 서버를 테스트 전에 시작하고, 테스트 후에 종료합니다.
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});
const wrapper = ({children}) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)
describe('RoommateSwiperList api 모킹 데이터 불러오기', () => {
  test('매칭글 api 데이터 불러오기', async () => {
    render(<RoommateSwiperList type='new'/>, {wrapper})

    //findBy 메소드는 getBy + waitFor의 조합 
    const displayedData = await screen.findByText('설희관');
    expect(displayedData).toBeInTheDocument();
    // await waitFor(()=>screen.findByText('설희관'));
    // expect(screen.getByText('설희관')).toBeInTheDocument();
  })
})