/**
 * InputGroup Component - React wrapper for InputGroupFactory
 */

import { createFactoryComponent } from '../core/factory-bridge';

interface InputGroupProps {
  inputs?: Array<{
    type?: string;
    name?: string;
    placeholder?: string;
    required?: boolean;
  }>;
  layout?: 'horizontal' | 'vertical' | 'inline';
  spacing?: 'tight' | 'normal' | 'loose';
  validation?: boolean;
  className?: string;
}

const InputGroup = createFactoryComponent<InputGroupProps>(
  'InputGroup',
  'InputGroupFactory'
);

export default InputGroup;
