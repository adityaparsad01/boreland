import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button Component', () => {
  test('renders button with correct text and handles click', async () => {
    const handleClick = vi.fn();
    
    render(<Button onClick={handleClick}>Click Me</Button>);
    
    const buttonElement = screen.getByRole('button', { name: /Click Me/i });
    expect(buttonElement).toBeInTheDocument();
    
    await userEvent.click(buttonElement);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders with primary variant styles by default', () => {
    render(<Button>Primary Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /Primary Button/i });
    expect(buttonElement).toHaveClass('bg-primary');
  });

  test('renders with secondary variant styles when specified', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /Secondary Button/i });
    expect(buttonElement).toHaveClass('border-secondary');
    expect(buttonElement).not.toHaveClass('bg-primary');
  });
});
