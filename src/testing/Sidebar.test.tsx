// Sidebar.test.tsx
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import Sidebar from '../components/Sidebar/Sidebar';

describe('Sidebar', () => {
  test('renders Sidebar with correct title', () => {
    render(<Sidebar show={true} />);

    const titleElement = screen.getByText(/coligo/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders all list items', () => {
    render(<Sidebar show={true} />);

    const items = [
      "Dashboard",
      "Schedule",
      "Courses",
      "Gradebook",
      "Performance",
      "Announcement"
    ];

    items.forEach(item => {
      const listItem = screen.getByText(item);
      expect(listItem).toBeInTheDocument();
    });
  });
});
