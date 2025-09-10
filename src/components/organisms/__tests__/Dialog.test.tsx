import React from 'react';
import { render } from '@testing-library/react';
import Dialog, { Dialog as NamedDialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '../Dialog';

describe('Dialog Compound Component Exports', () => {
  test('Dialog compound component exports are available', () => {
    // Test that compound component properties exist
    expect(Dialog.Trigger).toBeDefined();
    expect(Dialog.Content).toBeDefined();
    expect(Dialog.Header).toBeDefined();
    expect(Dialog.Title).toBeDefined();
    expect(Dialog.Description).toBeDefined();
    expect(Dialog.Footer).toBeDefined();
    expect(Dialog.Close).toBeDefined();
  });

  test('Dialog named exports are available', () => {
    // Test that named exports exist (backward compatibility)
    expect(NamedDialog).toBeDefined();
    expect(DialogTrigger).toBeDefined();
    expect(DialogContent).toBeDefined();
    expect(DialogHeader).toBeDefined();
    expect(DialogTitle).toBeDefined();
    expect(DialogDescription).toBeDefined();
    expect(DialogFooter).toBeDefined();
    expect(DialogClose).toBeDefined();
  });

  test('Dialog compound component renders without crashing', () => {
    const { container } = render(
      <Dialog open={true}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Test Dialog</Dialog.Title>
            <Dialog.Description>This is a test dialog</Dialog.Description>
          </Dialog.Header>
          <Dialog.Footer>
            <Dialog.Close>Close</Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    );

    expect(container.firstChild).toBeTruthy();
  });
});
