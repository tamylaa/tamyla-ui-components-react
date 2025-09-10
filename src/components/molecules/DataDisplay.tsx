/**
 * Data Display Components - Table, Calendar
 * shadcn/ui inspired with Redux integration
 */

import React, { forwardRef } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { uiActions } from '../../store/store';
import { cn } from '../../utils/classnames';
import { responsiveSizes } from '../../utils/responsive-utils';

// Explicit DOM type imports for ESLint
type HTMLTableElement = globalThis.HTMLTableElement;
type HTMLTableSectionElement = globalThis.HTMLTableSectionElement;
type HTMLTableRowElement = globalThis.HTMLTableRowElement;
type HTMLTableCellElement = globalThis.HTMLTableCellElement;
type HTMLTableCaptionElement = globalThis.HTMLTableCaptionElement;

// Table Components
export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  // Your unique Redux integration
  enableAnalytics?: boolean;
  analyticsEvent?: string;
}

const Table = forwardRef<HTMLTableElement, TableProps>(({
  enableAnalytics = false,
  analyticsEvent,
  className,
  ...props
}, ref) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (enableAnalytics) {
      dispatch(uiActions.addNotification({
        type: 'info',
        title: 'Table Analytics',
        message: `Table rendered: ${analyticsEvent}`,
        autoClose: true,
        duration: 1000
      }));
    }
  }, [enableAnalytics, analyticsEvent, dispatch]);

  return (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn('w-full caption-bottom text-sm sm:text-base', className)}
        {...props}
      />
    </div>
  );
});

Table.displayName = 'Table';

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(({
  className,
  ...props
}, ref) => (
  <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
));

TableHeader.displayName = 'TableHeader';

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(({
  className,
  ...props
}, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
));

TableBody.displayName = 'TableBody';

export interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(({
  className,
  ...props
}, ref) => (
  <tfoot
    ref={ref}
    className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
    {...props}
  />
));

TableFooter.displayName = 'TableFooter';

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(({
  className,
  ...props
}, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
      className
    )}
    {...props}
  />
));

TableRow.displayName = 'TableRow';

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}

const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(({
  className,
  ...props
}, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
      className
    )}
    {...props}
  />
));

TableHead.displayName = 'TableHead';

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(({
  className,
  ...props
}, ref) => (
  <td
    ref={ref}
    className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
    {...props}
  />
));

TableCell.displayName = 'TableCell';

export interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {}

const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(({
  className,
  ...props
}, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-muted-foreground', className)}
    {...props}
  />
));

TableCaption.displayName = 'TableCaption';

// Calendar Component
export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  selected?: Date;
  onDateSelect?: (date: Date | undefined) => void;
  mode?: 'single' | 'multiple' | 'range';
  disabled?: (date: Date) => boolean;
  // Your unique Redux integration
  enableAnalytics?: boolean;
  analyticsEvent?: string;
}

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(({
  selected,
  onDateSelect,
  mode = 'single',
  disabled,
  enableAnalytics = false,
  analyticsEvent,
  className,
  ...props
}, ref) => {
  const dispatch = useAppDispatch();
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  React.useEffect(() => {
    if (enableAnalytics) {
      dispatch(uiActions.addNotification({
        type: 'info',
        title: 'Calendar Analytics',
        message: `Calendar rendered: ${analyticsEvent}`,
        autoClose: true,
        duration: 1000
      }));
    }
  }, [enableAnalytics, analyticsEvent, dispatch]);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDay();

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isSelected = (date: Date) => {
    if (!selected) return false;
    return date.toDateString() === selected.toDateString();
  };

  const isDisabled = (date: Date) => {
    return disabled ? disabled(date) : false;
  };

  const handleDateClick = (date: Date) => {
    if (isDisabled(date)) return;
    onDateSelect?.(date);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div
      ref={ref}
      className={cn('p-3 bg-[var(--surface-primary)] border-[var(--border)] rounded-md', className)}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-1 hover:bg-accent rounded-md"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <h2 className="text-sm font-medium">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        <button
          onClick={nextMonth}
          className="p-1 hover:bg-accent rounded-md"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground p-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Previous month days */}
        {Array.from({ length: firstDayOfMonth }, (_, i) => {
          const prevMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), -firstDayOfMonth + i + 1);
          return (
            <button
              key={`prev-${i}`}
              className="text-center text-xs p-2 text-muted-foreground hover:bg-accent rounded-md"
              disabled
            >
              {prevMonthDate.getDate()}
            </button>
          );
        })}

        {/* Current month days */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1);
          const isToday = date.toDateString() === new Date().toDateString();

          return (
            <button
              key={i}
              onClick={() => handleDateClick(date)}
              disabled={isDisabled(date)}
              className={cn(
                'text-center text-xs p-2 rounded-md transition-colors',
                isSelected(date) && 'bg-[var(--primary)] text-[var(--primary-foreground)]',
                isToday && !isSelected(date) && 'bg-accent text-accent-foreground',
                !isSelected(date) && !isToday && 'hover:bg-accent',
                isDisabled(date) && 'text-muted-foreground cursor-not-allowed'
              )}
            >
              {i + 1}
            </button>
          );
        })}

        {/* Next month days */}
        {Array.from({ length: 6 - lastDayOfMonth }, (_, i) => (
          <button
            key={`next-${i}`}
            className="text-center text-xs p-2 text-muted-foreground hover:bg-accent rounded-md"
            disabled
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
});

Calendar.displayName = 'Calendar';

// Export all components
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  Calendar
};
