import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { worker } from 'mocks/browser';
import HomePage from './HomePage';

// MSW 서버를 테스트 전에 시작하고, 테스트 후에 종료합니다.
beforeAll(() => worker.listen());
afterEach(() => worker.resetHandlers());
afterAll(() => worker.close());

describe('홈페이지 api 모킹 데이터 불러오기', () => {
  test('매칭글 api 데이터 불러오기', async () => {
    render(<HomePage/>)
    await screen.findByText('abc-123');
    expect(screen.getByText('abc-123')).toBeInTheDocument();
  })
})