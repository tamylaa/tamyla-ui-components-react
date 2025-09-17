/**
 * MobileSidebar Component - React wrapper for MobileSidebar organism
 * Provides mobile navigation sidebar with gestures and accessibility
 */

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { styled } from 'styled-components';
import { responsiveSizes, touchUtilities, combineResponsive } from '../../utils/responsive-utils';
import { createThemeStyles, combineThemeClasses } from '../../utils/theme-utils';
import {
  safeCreateElement,
  safeDocumentAddEventListener,
  safeDocumentRemoveEventListener,
  isBrowser
} from '../../utils/ssr-safe';

// TODO: Import when properly exported from ui-components
// import { MobileSidebar as MobileSidebarFactory } from '@tamyla/ui-components';

interface NavigationItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: string;
  children?: NavigationItem[];
}

export interface MobileSidebarProps {
  // Position and layout
  position?: 'left' | 'right' | 'top' | 'bottom';
  width?: string | number;
  height?: string | number;

  // Behavior
  backdrop?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  closeOnNavigation?: boolean;
  swipeGestures?: boolean;

  // Animation
  animationDuration?: number;
  animationType?: 'slide' | 'fade' | 'push' | 'overlay';

  // Content
  title?: string;
  navigation?: NavigationItem[];

  // Visibility
  isOpen?: boolean;

  // Event handlers
  onOpen?: () => void;
  onClose?: () => void;
  onNavigate?: (item: NavigationItem) => void;

  // Accessibility
  focusManagement?: boolean;
  ariaLabel?: string;

  // Styling
  className?: string;
  style?: React.CSSProperties;
  theme?: 'light' | 'dark' | 'auto';
}

export interface MobileSidebarHandle {
  // Sidebar control
  open: () => void;
  close: () => void;
  toggle: () => void;

  // State
  isOpen: () => boolean;

  // Navigation
  setNavigation: (navigation: NavigationItem[]) => void;
  navigateTo: (href: string) => void;

  // Content
  setTitle: (title: string) => void;

  // Access to underlying sidebar
  getSidebar: () => HTMLElement | null;
}

const SidebarContainer = styled.div<{ $isOpen: boolean; $position: string; $width: string; $height: string }>`
  position: fixed;
  top: 0;
  background: var(--surface-primary, #fff);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;

  ${({ $position, $width, $height, $isOpen }) => {
    const translateX = $isOpen ? '0' : ($position === 'left' ? '-100%' : '100%');
    const translateY = $isOpen ? '0' : ($position === 'top' ? '-100%' : '100%');

    switch ($position) {
      case 'left':
        return `
          left: 0;
          width: ${$width};
          height: ${$height};
          transform: translateX(${translateX});
        `;
      case 'right':
        return `
          right: 0;
          width: ${$width};
          height: ${$height};
          transform: translateX(${translateX});
        `;
      case 'top':
        return `
          top: 0;
          width: 100%;
          height: ${$height};
          transform: translateY(${translateY});
        `;
      case 'bottom':
        return `
          bottom: 0;
          width: 100%;
          height: ${$height};
          transform: translateY(${translateY});
        `;
      default:
        return `
          left: 0;
          width: ${$width};
          height: ${$height};
          transform: translateX(${translateX});
        `;
    }
  }}
`;

const SidebarHeader = styled.div<{ theme: string }>`
  padding: ${responsiveSizes.card.sm};
  border-bottom: 1px solid var(--border, #eee);
  background: var(--surface-secondary, #f8f9fa);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SidebarTitle = styled.h3<{ theme: string }>`
  margin: 0;
  color: var(--text-primary, #333);
  font-size: 18px;
  font-weight: 600;
`;

const CloseButton = styled.button<{ theme: string }>`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--text-primary, #333);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background: var(--surface-hover, #f0f0f0);
  }
`;

const SidebarNav = styled.nav`
  flex: 1;
  padding: 8px 0;
  overflow-y: auto;
`;

const NavItem = styled.a<{ theme: string; $active?: boolean }>`
  display: block;
  padding: ${responsiveSizes.card.sm};
  color: var(--text-primary, #333);
  text-decoration: none;
  border-bottom: 1px solid var(--border, #f0f0f0);
  transition: background-color 150ms ease;
  cursor: pointer;
  background: ${({ $active }) => $active ? 'var(--surface-hover, #f0f0f0)' : 'transparent'};

  &:hover {
    background: var(--surface-hover, #f8f9fa);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const NavIcon = styled.span`
  margin-right: 12px;
`;

const Backdrop = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${({ $isOpen }) => $isOpen ? 1 : 0};
  visibility: ${({ $isOpen }) => $isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
`;

export const MobileSidebar = forwardRef<MobileSidebarHandle, MobileSidebarProps>(({
  position = 'left',
  width = '280px',
  height = '100vh',
  backdrop = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  closeOnNavigation = true,
  swipeGestures = true,
  animationDuration = 300,
  animationType = 'slide',
  title = '',
  navigation = [],
  isOpen = false,
  onOpen,
  onClose,
  onNavigate,
  focusManagement = true,
  ariaLabel,
  className,
  style,
  theme = 'light'
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    if (!containerRef.current || !isBrowser()) return;

    // TODO: Replace with actual MobileSidebar when properly exported
    // eslint-disable-next-line no-console
    console.warn('MobileSidebar component: Using placeholder implementation. ui-components MobileSidebar needs to be properly exported.');

    const sidebarElement = safeCreateElement('div');
    if (!sidebarElement) return;

    sidebarElement.className = `tmyl-mobile-sidebar ${className || ''}`;

    const sidebarHTML = `
      <!-- Backdrop -->
      ${backdrop ? `
        <div class="tmyl-sidebar-backdrop" style="
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 998;
          opacity: ${isOpen ? '1' : '0'};
          visibility: ${isOpen ? 'visible' : 'hidden'};
          transition: opacity ${animationDuration}ms ease, visibility ${animationDuration}ms ease;
        "></div>
      ` : ''}

      <!-- Sidebar -->
      <div class="tmyl-sidebar-panel" style="
        position: fixed;
        ${position}: 0;
        top: ${position === 'top' || position === 'bottom' ? '0' : '0'};
        width: ${position === 'left' || position === 'right' ? width : '100%'};
        height: ${position === 'top' || position === 'bottom' ? height : '100vh'};
        background: ${theme === 'dark' ? '#1a1a1a' : '#ffffff'};
        box-shadow: ${position === 'right' ? '-2px 0 8px rgba(0,0,0,0.15)' : '2px 0 8px rgba(0,0,0,0.15)'};
        z-index: 999;
        transform: translate${position === 'left' || position === 'right' ? 'X' : 'Y'}(${isOpen ? '0' : (position === 'left' ? '-100%' : position === 'right' ? '100%' : position === 'top' ? '-100%' : '100%')});
        transition: transform ${animationDuration}ms ease;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
      ">
        <!-- Header -->
        ${title ? `
          <div class="tmyl-sidebar-header" style="
            padding: 16px 20px;
            border-bottom: 1px solid ${theme === 'dark' ? '#333' : '#eee'};
            background: ${theme === 'dark' ? '#222' : '#f8f9fa'};
          ">
            <h3 style="margin: 0; color: ${theme === 'dark' ? '#fff' : '#333'}; font-size: 18px; font-weight: 600;">${title}</h3>
            <button class="tmyl-sidebar-close" style="
              position: absolute;
              top: 12px;
              right: 16px;
              background: none;
              border: none;
              font-size: 24px;
              cursor: pointer;
              color: ${theme === 'dark' ? '#fff' : '#333'};
              width: 32px;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 4px;
            ">&times;</button>
          </div>
        ` : ''}

        <!-- Navigation -->
        <nav class="tmyl-sidebar-nav" style="flex: 1; padding: 8px 0;">
          ${navigation.map((item, index) => `
            <a href="${item.href || '#'}" class="tmyl-sidebar-nav-item" data-index="${index}" style="
              display: block;
              padding: 12px 20px;
              color: ${theme === 'dark' ? '#e0e0e0' : '#333'};
              text-decoration: none;
              border-bottom: 1px solid ${theme === 'dark' ? '#333' : '#f0f0f0'};
              transition: background-color 150ms ease;
            " onmouseover="this.style.backgroundColor='${theme === 'dark' ? '#333' : '#f8f9fa'}'" onmouseout="this.style.backgroundColor='transparent'">
              ${item.icon ? `<span class="icon" style="margin-right: 12px;">${item.icon}</span>` : ''}
              <span>${item.label}</span>
            </a>
          `).join('')}
        </nav>
      </div>
    `;

    sidebarElement.innerHTML = sidebarHTML;

    // Add event listeners
    const backdropElement = sidebarElement.querySelector('.tmyl-sidebar-backdrop');
    const closeBtn = sidebarElement.querySelector('.tmyl-sidebar-close');
    const navItems = sidebarElement.querySelectorAll('.tmyl-sidebar-nav-item');

    if (closeOnBackdrop && backdropElement) {
      backdropElement.addEventListener('click', handleClose);
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', handleClose);
    }

    navItems.forEach((item, index) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const navItem = navigation[index];
        if (navItem?.onClick) {
          navItem.onClick();
        }
        onNavigate?.(navItem);
        if (closeOnNavigation) {
          handleClose();
        }
      });
    });

    // Handle escape key
    function handleKeyDown(e: Event) {
      const keyEvent = e as globalThis.KeyboardEvent;
      if (closeOnEscape && keyEvent.key === 'Escape' && isOpen) {
        handleClose();
      }
    }

    if (closeOnEscape) {
      safeDocumentAddEventListener('keydown', handleKeyDown);
    }

    function handleClose() {
      onClose?.();
    }

    containerRef.current.appendChild(sidebarElement);
    sidebarRef.current = sidebarElement;
    setMounted(true);

    if (isOpen && onOpen) {
      onOpen();
    }

    return () => {
      if (sidebarElement.parentNode) {
        sidebarElement.parentNode.removeChild(sidebarElement);
      }
      if (closeOnEscape) {
        safeDocumentRemoveEventListener('keydown', handleKeyDown);
      }
    };

    /* TODO: Replace with actual MobileSidebar when properly exported
    try {
      sidebarRef.current = new MobileSidebarFactory({
        position,
        width,
        height,
        backdrop,
        closeOnBackdrop,
        closeOnEscape,
        closeOnNavigation,
        swipeGestures,
        animationDuration,
        animationType,
        title,
        navigation,
        onOpen,
        onClose,
        onNavigate,
        focusManagement,
        ariaLabel,
        theme,
        ...props
      });

      if (containerRef.current && sidebarRef.current?.element) {
        containerRef.current.appendChild(sidebarRef.current.element);
      }

      setMounted(true);
    } catch (error) {
      console.error('Failed to create MobileSidebar:', error);
    }
    */

  }, [position, width, height, backdrop, closeOnBackdrop, closeOnEscape, closeOnNavigation,
    swipeGestures, animationDuration, animationType, title, navigation, onOpen, onClose,
    onNavigate, focusManagement, ariaLabel, className, theme, isOpen]);  // Update sidebar visibility
  useEffect(() => {
    if (mounted && sidebarRef.current) {
      const backdropElement = sidebarRef.current.querySelector('.tmyl-sidebar-backdrop');
      const panel = sidebarRef.current.querySelector('.tmyl-sidebar-panel');

      if (backdropElement) {
        (backdropElement as HTMLElement).style.opacity = isOpen ? '1' : '0';
        (backdropElement as HTMLElement).style.visibility = isOpen ? 'visible' : 'hidden';
      }

      if (panel) {
        const translateDirection = position === 'left' || position === 'right' ? 'X' : 'Y';
        const translateValue = isOpen ? '0' : (
          position === 'left' ? '-100%' :
            position === 'right' ? '100%' :
              position === 'top' ? '-100%' : '100%'
        );
        (panel as HTMLElement).style.transform = `translate${translateDirection}(${translateValue})`;
      }
    }
  }, [isOpen, mounted, position]);

  // Expose methods to parent components
  useImperativeHandle(ref, () => ({
    open: () => {
      onOpen?.();
    },
    close: () => {
      onClose?.();
    },
    toggle: () => {
      if (isOpen) {
        onClose?.();
      } else {
        onOpen?.();
      }
    },
    isOpen: () => isOpen,
    setNavigation: (newNavigation: NavigationItem[]) => {
      if (mounted && sidebarRef.current) {
        const nav = sidebarRef.current.querySelector('.tmyl-sidebar-nav');
        if (nav) {
          nav.innerHTML = newNavigation.map((item, index) => `
            <a href="${item.href || '#'}" class="tmyl-sidebar-nav-item" data-index="${index}" style="
              display: block;
              padding: 12px 20px;
              color: ${theme === 'dark' ? '#e0e0e0' : '#333'};
              text-decoration: none;
              border-bottom: 1px solid ${theme === 'dark' ? '#333' : '#f0f0f0'};
              transition: background-color 150ms ease;
            ">
              ${item.icon ? `<span class="icon" style="margin-right: 12px;">${item.icon}</span>` : ''}
              <span>${item.label}</span>
            </a>
          `).join('');
        }
      }
    },
    navigateTo: (href: string) => {
      const navItem = navigation.find(item => item.href === href);
      if (navItem) {
        onNavigate?.(navItem);
        if (closeOnNavigation) {
          onClose?.();
        }
      }
    },
    setTitle: (newTitle: string) => {
      if (mounted && sidebarRef.current) {
        const titleElement = sidebarRef.current.querySelector('.tmyl-sidebar-header h3');
        if (titleElement) {
          titleElement.textContent = newTitle;
        }
      }
    },
    getSidebar: () => sidebarRef.current
  }), [mounted, navigation, onOpen, onClose, onNavigate, closeOnNavigation, theme, isOpen]);

  return (
    <div
      ref={containerRef}
      className={`tmyl-mobile-sidebar-container ${className || ''}`}
      style={style}
    />
  );
});

MobileSidebar.displayName = 'MobileSidebar';

export default MobileSidebar;
