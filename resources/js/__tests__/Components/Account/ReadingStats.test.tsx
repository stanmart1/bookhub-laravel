import { render, screen } from '@testing-library/react';
import ReadingStats from '../../../Components/Account/ReadingStats';
import TestWrapper from '../../../Testing/TestWrapper';
import { vi } from 'vitest';

// Mock Recharts because it has issues rendering in a JSDOM environment
vi.mock('recharts', async () => {
    const OriginalModule = await vi.importActual('recharts');
    return {
        ...OriginalModule,
        ResponsiveContainer: ({ children }) => <div style={{width: '100%', height: '100%'}}>{children}</div>,
    };
});


describe('ReadingStats', () => {
  it('renders the chart with a title', () => {
    render(
      <TestWrapper>
        <ReadingStats />
      </TestWrapper>
    );

    expect(screen.getByText('Monthly Reading Statistics')).toBeInTheDocument();
  });
});
