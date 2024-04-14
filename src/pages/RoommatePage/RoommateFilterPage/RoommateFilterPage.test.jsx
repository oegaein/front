import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RoommateFilterPage from './RoommateFilterPage';

describe('YourComponent', () => {
  test('사용자가 인원을 선택할 때 상태가 올바르게 업데이트되어야 한다', () => {
    render(<RoommateFilterPage />);
    
    // '2인'과 '3인' 선택
    fireEvent.click(screen.getByTestId('2인'));
    fireEvent.click(screen.getByTestId('3인'));

    // '2인'과 '3인'이 선택되었는지 확인
    expect(screen.getByTestId('2인')).toBeChecked();
    expect(screen.getByTestId('3인')).toBeChecked();

    // '2인' 선택 해제
    fireEvent.click(screen.getByTestId('2인'));

    // '2인'이 선택 해제되었는지 확인
    expect(screen.getByTestId('2인')).not.toBeChecked();
    // '3인'은 여전히 선택되어 있는지 확인
    expect(screen.getByTestId('3인')).toBeChecked();
  });
  test('남성을 선택하면 A동과 E동만 선택 가능해야 한다', () => {
    render(<RoommateFilterPage />);

    // 남성 선택
    fireEvent.click(screen.getByLabelText('남성'));
    
    // A동과 E동이 선택 가능한지 확인
    expect(screen.getByLabelText('A동')).not.toBeDisabled();
    expect(screen.getByLabelText('E동')).not.toBeDisabled();

    // B동, C동, D동이 선택 불가능한지 확인
    expect(screen.getByLabelText('B동')).toBeDisabled();
    expect(screen.getByLabelText('C동')).toBeDisabled();
    expect(screen.getByLabelText('D동')).toBeDisabled();
  });
  test('남성을 선택하고 E동을 선택하면 호실 유형 선택이 가능해야 한다', () => {
    render(<RoommateFilterPage />);

    // 남성 선택
    fireEvent.click(screen.getByLabelText('남성'));

    // E동 선택
    fireEvent.click(screen.getByLabelText('E동'));

    // 호실 유형 체크박스가 렌더링되었는지 확인
    expect(screen.getByLabelText('2인실')).toBeInTheDocument();
    expect(screen.getByLabelText('4인실')).toBeInTheDocument();

    // 호실 유형 체크박스가 선택 가능한지 확인
    expect(screen.getByLabelText('2인실')).not.toBeDisabled();
    expect(screen.getByLabelText('4인실')).not.toBeDisabled();
  });
  test('남성을 선택하고 A, E동을 선택했다가 여자를 선택하면 A,E 동의 선택이 해제된다', () => {
    render(<RoommateFilterPage />);

    // 남성 선택
    fireEvent.click(screen.getByLabelText('남성'));

    // A, E동 선택
    fireEvent.click(screen.getByLabelText('E동'));
    fireEvent.click(screen.getByLabelText('A동'));

    // 기숙사 동 체크박스가 체크되었는지 확인
    expect(screen.getByLabelText('E동')).toBeChecked();
    expect(screen.getByLabelText('A동')).toBeChecked();

    expect(screen.getByLabelText('B동')).toBeDisabled();
    expect(screen.getByLabelText('C동')).toBeDisabled();
    expect(screen.getByLabelText('D동')).toBeDisabled();

    //여성 선택
    fireEvent.click(screen.getByLabelText('여성'));

    // 기숙사 동 체크박스가 선택 가능한지 확인
    expect(screen.getByLabelText('E동')).not.toBeChecked();
    expect(screen.getByLabelText('A동')).not.toBeChecked();
    expect(screen.getByLabelText('E동')).toBeDisabled();
    expect(screen.getByLabelText('A동')).toBeDisabled();

    expect(screen.getByLabelText('B동')).not.toBeDisabled();
    expect(screen.getByLabelText('C동')).not.toBeDisabled();
    expect(screen.getByLabelText('D동')).not.toBeDisabled();
  });
});