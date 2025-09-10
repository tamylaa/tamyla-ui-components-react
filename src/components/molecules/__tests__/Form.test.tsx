import React from 'react';
import { render } from '@testing-library/react';
import Form, { FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField, FormInput, FormTextarea } from '../Form';

describe('Form Compound Component Exports', () => {
  test('Form compound component exports are available', () => {
    // Test that compound component properties exist
    expect(Form.Item).toBeDefined();
    expect(Form.Label).toBeDefined();
    expect(Form.Control).toBeDefined();
    expect(Form.Description).toBeDefined();
    expect(Form.Message).toBeDefined();
    expect(Form.Input).toBeDefined();
    expect(Form.Textarea).toBeDefined();
  });

  test('Form named exports are available', () => {
    // Test that named exports exist (backward compatibility)
    expect(FormItem).toBeDefined();
    expect(FormLabel).toBeDefined();
    expect(FormControl).toBeDefined();
    expect(FormDescription).toBeDefined();
    expect(FormMessage).toBeDefined();
    expect(FormField).toBeDefined();
    expect(FormInput).toBeDefined();
    expect(FormTextarea).toBeDefined();
  });

  test('Form compound component renders without crashing', () => {
    const { container } = render(
      <Form name="test" error="">
        <Form.Item>
          <Form.Label>Test Label</Form.Label>
          <Form.Control>
            <Form.Input name="test" />
          </Form.Control>
          <Form.Description>This is a test description</Form.Description>
          <Form.Message />
        </Form.Item>
      </Form>
    );

    expect(container.firstChild).toBeTruthy();
  });
});
