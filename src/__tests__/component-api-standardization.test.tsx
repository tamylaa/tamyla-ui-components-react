/**
 * Component API Standardization Tests
 * Tests that all components support shadcn/ui-style compound patterns
 */

import React from 'react';
import { render } from '@testing-library/react';
import Card from '../components/atoms/Card';
import Dialog from '../components/organisms/Dialog';
import FormField from '../components/molecules/Form';
import * as indexExports from '../index';

describe('Component API Standardization', () => {
  describe('Card Component - Compound API', () => {
    it('should support compound component access', () => {
      expect(Card.Header).toBeDefined();
      expect(Card.Title).toBeDefined();
      expect(Card.Content).toBeDefined();
    });

    it('should have consistent component references', () => {
      // Test that compound components are properly attached
      expect(Card.Header).toBeDefined();
      expect(Card.Title).toBeDefined();
      expect(Card.Content).toBeDefined();
    });

    it('should render compound components correctly', () => {
      const { getByText } = render(
        <Card>
          <Card.Header>
            <Card.Title>Test Title</Card.Title>
          </Card.Header>
          <Card.Content>Test Content</Card.Content>
        </Card>
      );

      expect(getByText('Test Title')).toBeTruthy();
      expect(getByText('Test Content')).toBeTruthy();
    });
  });

  describe('Dialog Component - Compound API', () => {
    it('should support compound component access', () => {
      expect(Dialog.Trigger).toBeDefined();
      expect(Dialog.Content).toBeDefined();
      expect(Dialog.Header).toBeDefined();
      expect(Dialog.Title).toBeDefined();
      expect(Dialog.Description).toBeDefined();
      expect(Dialog.Footer).toBeDefined();
      expect(Dialog.Close).toBeDefined();
    });

    it('should have consistent component references', () => {
      // Test that compound components are properly attached
      expect(Dialog.Trigger).toBeDefined();
      expect(Dialog.Content).toBeDefined();
      expect(Dialog.Header).toBeDefined();
      expect(Dialog.Title).toBeDefined();
      expect(Dialog.Description).toBeDefined();
      expect(Dialog.Footer).toBeDefined();
      expect(Dialog.Close).toBeDefined();
    });

    it('should render compound components correctly', () => {
      const { getByText } = render(
        <Dialog>
          <Dialog.Trigger>Open Dialog</Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Test Dialog</Dialog.Title>
              <Dialog.Description>Test Description</Dialog.Description>
            </Dialog.Header>
            <Dialog.Footer>
              <Dialog.Close>Close</Dialog.Close>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>
      );

      expect(getByText('Open Dialog')).toBeTruthy();
    });
  });

  describe('Form Component - Compound API', () => {
    it('should support compound component access', () => {
      expect(FormField.Item).toBeDefined();
      expect(FormField.Label).toBeDefined();
      expect(FormField.Control).toBeDefined();
      expect(FormField.Description).toBeDefined();
      expect(FormField.Message).toBeDefined();
      expect(FormField.Input).toBeDefined();
      expect(FormField.Textarea).toBeDefined();
    });

    it('should have consistent component references', () => {
      // Test that compound components are properly attached
      expect(FormField.Item).toBeDefined();
      expect(FormField.Label).toBeDefined();
      expect(FormField.Control).toBeDefined();
      expect(FormField.Description).toBeDefined();
      expect(FormField.Message).toBeDefined();
      expect(FormField.Input).toBeDefined();
      expect(FormField.Textarea).toBeDefined();
    });

    it('should render compound components correctly', () => {
      const { getByText, getByPlaceholderText } = render(
        <FormField name="test">
          <FormField.Item>
            <FormField.Label>Test Field</FormField.Label>
            <FormField.Control>
              <FormField.Input name="test" placeholder="Test input" />
            </FormField.Control>
            <FormField.Description>Test description</FormField.Description>
            <FormField.Message />
          </FormField.Item>
        </FormField>
      );

      expect(getByText('Test Field')).toBeTruthy();
      expect(getByPlaceholderText('Test input')).toBeTruthy();
      expect(getByText('Test description')).toBeTruthy();
    });
  });

  describe('Import Pattern Compatibility', () => {
    it('should support named imports from main package', () => {
      // This test verifies that the main index.ts exports work
      expect(indexExports.Card).toBeDefined();
      expect(indexExports.CardHeader).toBeDefined();
      expect(indexExports.CardTitle).toBeDefined();
      expect(indexExports.CardContent).toBeDefined();

      expect(indexExports.Dialog).toBeDefined();
      expect(indexExports.DialogTrigger).toBeDefined();
      expect(indexExports.DialogContent).toBeDefined();
      expect(indexExports.DialogHeader).toBeDefined();
      expect(indexExports.DialogTitle).toBeDefined();
      expect(indexExports.DialogDescription).toBeDefined();
      expect(indexExports.DialogFooter).toBeDefined();
      expect(indexExports.DialogClose).toBeDefined();

      expect(indexExports.FormItem).toBeDefined();
      expect(indexExports.FormLabel).toBeDefined();
      expect(indexExports.FormControl).toBeDefined();
      expect(indexExports.FormDescription).toBeDefined();
      expect(indexExports.FormMessage).toBeDefined();
      expect(indexExports.FormField).toBeDefined();
      expect(indexExports.FormInput).toBeDefined();
      expect(indexExports.FormTextarea).toBeDefined();
    });

    it('should support named imports from components index', () => {
      expect(indexExports.Card).toBeDefined();
      expect(indexExports.CardHeader).toBeDefined();
      expect(indexExports.Dialog).toBeDefined();
      expect(indexExports.DialogFooter).toBeDefined();
      expect(indexExports.FormField).toBeDefined();
      expect(indexExports.FormInput).toBeDefined();
    });
  });

  describe('Backward Compatibility', () => {
    it('should maintain existing import patterns', () => {
      // Test that existing code still works
      expect(() => {
        render(<Card><Card.Content>Test</Card.Content></Card>);
      }).not.toThrow();

      expect(() => {
        render(
          <Dialog>
            <Dialog.Trigger>Open</Dialog.Trigger>
            <Dialog.Content>Test</Dialog.Content>
          </Dialog>
        );
      }).not.toThrow();
    });
  });
});
