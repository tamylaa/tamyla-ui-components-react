/**
 * InputGroup Component - React wrapper for InputGroupFactory
 */

import { createFactoryComponent } from '../../core/factory/factory-bridge';
import { responsiveSpacing } from '../../utils/responsive-utils';

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

const InputGroup = (props: InputGroupProps) => {
  return createFactoryComponent<InputGroupProps>('InputGroup', 'InputGroupFactory')({
    ...props,
    componentType: 'InputFactory'
  });
};

export default InputGroup;
