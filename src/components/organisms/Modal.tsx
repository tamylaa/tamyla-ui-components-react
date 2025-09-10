/**
 * Modal Component - React wrapper for Modal organism system
 * Provides comprehensive modal dialogs with accessibility and animations
 */

import React, { useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from 'react';
import { ErrorBoundaryEnhanced, withErrorBoundary } from '../molecules/ErrorBoundaryEnhanced';
import { dynamicImportUIComponents } from '../../utils/dynamic-ui-components';
import logger from '../../utils/logger';

export interface ModalProps {
  // Modal configuration
  title?: string;
  content?: string | React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';
  type?: 'default' | 'confirm' | 'alert' | 'form' | 'loading';
  showClose?: boolean;

  // Behavior
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  autoFocus?: boolean;

  // Visibility
  isOpen?: boolean;

  // Event handlers
  onOpen?: () => void;
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;

  // Form modal specific
  onSubmit?: (formData: Record<string, string | number | boolean | File>) => void;

  // Custom styling
  className?: string;
  style?: React.CSSProperties;

  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export interface ModalHandle {
  // Modal control methods
  open: () => void;
  close: () => void;
  toggle: () => void;

  // State methods
  isOpen: () => boolean;
  focus: () => void;

  // Content methods
  setTitle: (title: string) => void;
  setContent: (content: string) => void;

  // Access to underlying modal
  getModal: () => HTMLElement | null;
}

export const Modal = forwardRef<ModalHandle, ModalProps>(({
  title = '',
  content = '',
  size = 'md',
  type = 'default',
  showClose = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  autoFocus = true,
  isOpen = false,
  onOpen,
  onClose,
  onConfirm,
  onCancel,
  onSubmit,
  className,
  style,
  ariaLabel: _ariaLabel,
  ariaDescribedBy: _ariaDescribedBy
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const cleanupFunctionsRef = useRef<(() => void)[]>([]);
  const [mounted, setMounted] = React.useState(false);

  // Cleanup function
  const cleanup = useCallback(() => {
    // Abort any pending async operations
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    // Run all registered cleanup functions
    cleanupFunctionsRef.current.forEach(cleanupFn => {
      try {
        cleanupFn();
      } catch (error) {
        logger.error('Modal cleanup function error:', error, 'Modal');
      }
    });
    cleanupFunctionsRef.current = [];

    // Clean up DOM elements
    if (modalRef.current) {
      // Remove event listeners
      const modalElement = modalRef.current;
      if (modalElement.parentNode) {
        modalElement.parentNode.removeChild(modalElement);
      }
      modalRef.current = null;
    }

    // Clear container
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    setMounted(false);
  }, []);

  useEffect(() => {
    // TODO: Enable when ui-components Modal is fixed
    // eslint-disable-next-line no-console
    console.warn('Modal component: ui-components ModalFactory is currently disabled due to bugs. Using placeholder implementation.');

    // For now, create a basic modal placeholder
    if (!containerRef.current) return;

    const modalElement = document.createElement('div');
    modalElement.className = `tmyl-modal-placeholder ${className || ''}`;
    modalElement.innerHTML = `
      <div class="tmyl-modal-backdrop" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: ${isOpen ? 'flex' : 'none'};
        align-items: center;
        justify-content: center;
        z-index: 9999;
      ">
        <div class="tmyl-modal-dialog" style="
          background: white;
          border-radius: 8px;
          padding: 24px;
          max-width: 500px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        ">
          <div class="tmyl-modal-header" style="margin-bottom: 16px;">
            <h2 style="margin: 0; color: #333;">${title}</h2>
            ${showClose ? '<button class="tmyl-modal-close" style="float: right; background: none; border: none; font-size: 24px; cursor: pointer;">&times;</button>' : ''}
          </div>
          <div class="tmyl-modal-content">
            Modal content will be rendered here when ui-components Modal is fixed.
          </div>
          ${type === 'confirm' ? `
            <div class="tmyl-modal-footer" style="margin-top: 24px; text-align: right;">
              <button class="tmyl-modal-cancel" style="margin-right: 8px; padding: 8px 16px; border: 1px solid #ccc; background: white; cursor: pointer; border-radius: 4px;">Cancel</button>
              <button class="tmyl-modal-confirm" style="padding: 8px 16px; background: #007bff; color: white; border: none; cursor: pointer; border-radius: 4px;">Confirm</button>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    // Add event listeners
    const backdrop = modalElement.querySelector('.tmyl-modal-backdrop');
    const closeBtn = modalElement.querySelector('.tmyl-modal-close');
    const cancelBtn = modalElement.querySelector('.tmyl-modal-cancel');
    const confirmBtn = modalElement.querySelector('.tmyl-modal-confirm');

    if (closeOnBackdrop && backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          handleClose();
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', handleClose);
    }

    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        onCancel?.();
        handleClose();
      });
    }

    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        onConfirm?.();
        handleClose();
      });
    }

    function handleClose() {
      if (backdrop) {
        (backdrop as HTMLElement).style.display = 'none';
      }
      onClose?.();
    }

    containerRef.current.appendChild(modalElement);
    modalRef.current = modalElement;
    setMounted(true);

    // Handle open state
    if (isOpen && onOpen) {
      onOpen();
    }

    return () => {
      if (modalElement.parentNode) {
        modalElement.parentNode.removeChild(modalElement);
      }
    };

  }, [title, content, size, type, showClose, closeOnBackdrop, closeOnEscape,
    autoFocus, isOpen, onOpen, onClose, onConfirm, onCancel, onSubmit, className]);

  // Update modal visibility
  useEffect(() => {
    if (mounted && modalRef.current) {
      const backdrop = modalRef.current.querySelector('.tmyl-modal-backdrop');
      if (backdrop) {
        (backdrop as HTMLElement).style.display = isOpen ? 'flex' : 'none';
      }
    }
  }, [isOpen, mounted]);

  // Expose methods to parent components
  useImperativeHandle(ref, () => ({
    open: () => {
      if (mounted && modalRef.current) {
        const backdrop = modalRef.current.querySelector('.tmyl-modal-backdrop');
        if (backdrop) {
          (backdrop as HTMLElement).style.display = 'flex';
        }
      }
      onOpen?.();
    },
    close: () => {
      if (mounted && modalRef.current) {
        const backdrop = modalRef.current.querySelector('.tmyl-modal-backdrop');
        if (backdrop) {
          (backdrop as HTMLElement).style.display = 'none';
        }
      }
      onClose?.();
    },
    toggle: () => {
      if (mounted && modalRef.current) {
        const backdrop = modalRef.current.querySelector('.tmyl-modal-backdrop');
        if (backdrop) {
          const isCurrentlyOpen = (backdrop as HTMLElement).style.display !== 'none';
          (backdrop as HTMLElement).style.display = isCurrentlyOpen ? 'none' : 'flex';
          if (isCurrentlyOpen) {
            onClose?.();
          } else {
            onOpen?.();
          }
        }
      }
    },
    isOpen: () => {
      if (mounted && modalRef.current) {
        const backdrop = modalRef.current.querySelector('.tmyl-modal-backdrop');
        return backdrop ? (backdrop as HTMLElement).style.display !== 'none' : false;
      }
      return false;
    },
    focus: () => {
      if (mounted && modalRef.current) {
        const dialog = modalRef.current.querySelector('.tmyl-modal-dialog');
        if (dialog) {
          (dialog as HTMLElement).focus();
        }
      }
    },
    setTitle: (newTitle: string) => {
      if (mounted && modalRef.current) {
        const titleElement = modalRef.current.querySelector('.tmyl-modal-header h2');
        if (titleElement) {
          titleElement.textContent = newTitle;
        }
      }
    },
    setContent: (newContent: string) => {
      // Content updates should be handled via props, not direct DOM manipulation
      logger.warn('Modal.setContent() is deprecated. Use props to update content.', undefined, 'Modal');
    },
    getModal: () => modalRef.current
  }), [mounted, onOpen, onClose]);

  return (
    <div
      ref={containerRef}
      className={`tmyl-modal-container ${className || ''}`}
      style={style}
    />
  );
});

Modal.displayName = 'Modal';

export default Modal;
