/**
 * Loading Components Test Suite
 * Tests for Skeleton, HoverCard, Popover components
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../../test-utils/test-setup';
import { jest } from '@jest/globals';
import {
  Skeleton,
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  Popover,
  PopoverTrigger,
  PopoverContent
} from '../Loading';

// Mock Redux hooks
const mockDispatch = jest.fn();
const _mockAddNotification = jest.fn();

// Mock the uiActions to return proper action objects
jest.mock('../../../store/store', () => ({
  uiActions: {
    addNotification: jest.fn().mockImplementation((payload) => ({
      type: 'ui/addNotification',
      payload
    }))
  }
}));

jest.mock('../../../store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
}));

describe('Loading Components', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  describe('Skeleton', () => {
    it('renders with default props', () => {
      render(<Skeleton data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toHaveClass('animate-pulse', 'rounded-md', 'bg-muted');
    });

    it('renders with custom className', () => {
      render(<Skeleton className="custom-skeleton" data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('custom-skeleton');
    });

    it('dispatches analytics notification when enabled', () => {
      render(
        <Skeleton enableAnalytics={true} analyticsEvent="skeleton-test" />
      );

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'ui/addNotification',
        payload: {
          type: 'info',
          title: 'Skeleton Analytics',
          message: 'Skeleton rendered: skeleton-test',
          autoClose: true,
          duration: 1000
        }
      });
    });

    it('passes through additional props', () => {
      render(<Skeleton data-testid="skeleton-test" />);
      expect(screen.getByTestId('skeleton-test')).toBeInTheDocument();
    });
  });

  describe('HoverCard', () => {
    it('renders children correctly', () => {
      render(
        <HoverCard>
          <HoverCardTrigger>Trigger</HoverCardTrigger>
          <HoverCardContent>Content</HoverCardContent>
        </HoverCard>
      );

      expect(screen.getByText('Trigger')).toBeInTheDocument();
    });

    it('shows content on mouse enter and hides on mouse leave', async () => {
      render(
        <HoverCard>
          <HoverCardTrigger>Trigger</HoverCardTrigger>
          <HoverCardContent>Content</HoverCardContent>
        </HoverCard>
      );

      const trigger = screen.getByText('Trigger');
      const hoverCard = trigger.parentElement;

      // Initially content should not be visible
      expect(screen.queryByText('Content')).not.toBeInTheDocument();

      // Mouse enter should show content
      fireEvent.mouseEnter(hoverCard!);
      await waitFor(() => {
        expect(screen.getByText('Content')).toBeInTheDocument();
      });

      // Mouse leave should hide content
      fireEvent.mouseLeave(hoverCard!);
      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
      });
    });

    it('respects controlled open state', () => {
      render(
        <HoverCard open={true}>
          <HoverCardTrigger>Trigger</HoverCardTrigger>
          <HoverCardContent>Content</HoverCardContent>
        </HoverCard>
      );

      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('calls onOpenChange when state changes', () => {
      const onOpenChange = jest.fn();
      render(
        <HoverCard onOpenChange={onOpenChange}>
          <HoverCardTrigger>Trigger</HoverCardTrigger>
          <HoverCardContent>Content</HoverCardContent>
        </HoverCard>
      );

      const hoverCard = screen.getByText('Trigger').parentElement;
      fireEvent.mouseEnter(hoverCard!);

      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it('dispatches analytics notification when opened and enabled', async () => {
      render(
        <HoverCard enableAnalytics={true} analyticsEvent="hover-test">
          <HoverCardTrigger>Trigger</HoverCardTrigger>
          <HoverCardContent>Content</HoverCardContent>
        </HoverCard>
      );

      const hoverCard = screen.getByText('Trigger').parentElement;
      fireEvent.mouseEnter(hoverCard!);

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith({
          type: 'ui/addNotification',
          payload: {
            type: 'info',
            title: 'HoverCard Analytics',
            message: 'HoverCard opened: hover-test',
            autoClose: true,
            duration: 1000
          }
        });
      });
    });
  });

  describe('HoverCardTrigger', () => {
    it('renders with correct styling', () => {
      render(<HoverCardTrigger>Trigger</HoverCardTrigger>);
      const trigger = screen.getByText('Trigger');
      expect(trigger).toHaveClass('cursor-pointer');
    });

    it('passes through additional props', () => {
      render(<HoverCardTrigger data-testid="trigger-test">Trigger</HoverCardTrigger>);
      expect(screen.getByTestId('trigger-test')).toBeInTheDocument();
    });
  });

  describe('HoverCardContent', () => {
    it('renders with correct positioning classes', () => {
      render(<HoverCardContent>Content</HoverCardContent>);
      const content = screen.getByText('Content');
      expect(content).toHaveClass('absolute', 'z-50', 'w-64');
    });

    it('applies different side positions correctly', () => {
      render(<HoverCardContent side="top">Content</HoverCardContent>);
      const content = screen.getByText('Content');
      expect(content).toHaveClass('bottom-full', 'mb-2');
    });

    it('applies different alignments correctly', () => {
      render(<HoverCardContent align="end">Content</HoverCardContent>);
      const content = screen.getByText('Content');
      expect(content).toHaveClass('right-0');
    });
  });

  describe('Popover', () => {
    it('renders children correctly', () => {
      render(
        <Popover>
          <PopoverTrigger>Trigger</PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      );

      expect(screen.getByText('Trigger')).toBeInTheDocument();
    });

    it('shows content when open is true', () => {
      render(
        <Popover open={true}>
          <PopoverTrigger>Trigger</PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      );

      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('hides content when open is false', () => {
      render(
        <Popover open={false}>
          <PopoverTrigger>Trigger</PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      );

      expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });

    it('calls onOpenChange when state changes', () => {
      const onOpenChange = jest.fn();
      render(
        <Popover onOpenChange={onOpenChange}>
          <PopoverTrigger>Trigger</PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      );

      const trigger = screen.getByText('Trigger');
      fireEvent.click(trigger);

      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it('dispatches analytics notification when opened and enabled', () => {
      render(
        <Popover enableAnalytics={true} analyticsEvent="popover-test">
          <PopoverTrigger>Trigger</PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      );

      const trigger = screen.getByText('Trigger');
      fireEvent.click(trigger);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'ui/addNotification',
        payload: {
          type: 'info',
          title: 'Popover Analytics',
          message: 'Popover opened: popover-test',
          autoClose: true,
          duration: 1000
        }
      });
    });
  });

  describe('PopoverTrigger', () => {
    it('renders as button with correct styling', () => {
      render(<PopoverTrigger>Trigger</PopoverTrigger>);
      const trigger = screen.getByRole('button');
      expect(trigger).toHaveClass('cursor-pointer');
      expect(trigger).toHaveTextContent('Trigger');
    });

    it('passes through additional props', () => {
      render(<PopoverTrigger data-testid="popover-trigger">Trigger</PopoverTrigger>);
      expect(screen.getByTestId('popover-trigger')).toBeInTheDocument();
    });
  });

  describe('PopoverContent', () => {
    it('renders with correct styling when open', () => {
      render(<PopoverContent isOpen={true}>Content</PopoverContent>);
      const content = screen.getByText('Content');
      expect(content).toHaveClass('absolute', 'z-50', 'w-72');
    });

    it('does not render when not open', () => {
      render(<PopoverContent isOpen={false}>Content</PopoverContent>);
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });

    it('applies different side positions correctly', () => {
      render(<PopoverContent isOpen={true} side="right">Content</PopoverContent>);
      const content = screen.getByText('Content');
      expect(content).toHaveClass('left-full', 'ml-2');
    });

    it('applies different alignments correctly', () => {
      render(<PopoverContent isOpen={true} align="center">Content</PopoverContent>);
      const content = screen.getByText('Content');
      expect(content).toHaveClass('left-1/2', '-translate-x-1/2');
    });
  });
});
