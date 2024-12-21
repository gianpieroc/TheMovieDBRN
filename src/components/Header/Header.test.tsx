import {render, screen} from '@testing-library/react-native';
import {Header} from './Header';

describe('Header', () => {
  const mockLeftPress = jest.fn();
  const mockRightPress = jest.fn();
  const defaultProps = {
    title: '🎬 Movies',
    onLeftButtonPress: mockLeftPress,
    onRightButtonPress: mockRightPress,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the title correctly', () => {
    render(<Header {...defaultProps} />);
    expect(screen.queryAllByText('🎬 Movies')).toHaveLength(1);
  });

  it('shows left button when onLeftButtonPress is provided', () => {
    render(<Header {...defaultProps} />);
    const leftButton = screen.getByText('< Back');
    expect(leftButton).toBeTruthy();
  });

  it('shows right button when onRightButtonPress is provided', () => {
    render(<Header {...defaultProps} />);
    const rightButton = screen.getByText('Wishlist');
    expect(rightButton).toBeTruthy();
  });

  it('hides buttons when handlers are not provided', () => {
    render(
      <Header
        title="🎬 Movies"
        onLeftButtonPress={null}
        onRightButtonPress={null}
      />,
    );

    expect(screen.queryByRole('button', {name: /back/i})).toBeNull();
    expect(screen.queryByRole('button', {name: /wishlist/i})).toBeNull();
  });
});
