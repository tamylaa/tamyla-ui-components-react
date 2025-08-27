/**
 * InputGroup Component - React wrapper for InputGroupFactory
 */
/// <reference types="react" />
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
declare const InputGroup: import("react").FC<InputGroupProps>;
export default InputGroup;
//# sourceMappingURL=InputGroup.d.ts.map