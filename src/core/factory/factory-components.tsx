/**
 * Factory Components - Pre-built React components for each factory
 */

import React from 'react';
import { FactoryBridge } from './factory-bridge-core';
import { factoryRegistry } from './factory-registry';
import type { FactoryComponentProps } from '../../types/factory';

// Utility function to create factory-based components
export function createFactoryComponent<T extends object>(
  factoryName: string,
  displayName?: string
): React.FC<T & FactoryComponentProps> {
  const Component: React.FC<T & FactoryComponentProps> = (props) => {
    const { config, onEvent, className, children, ...restProps } = props;

    // Check if factory is available
    if (!factoryRegistry.hasFactory(factoryName)) {
      return (
        <div style={{ color: 'red', padding: '10px', border: '1px solid red' }}>
          Factory {factoryName} not available
        </div>
      );
    }

    return (
      <FactoryBridge
        factory={factoryName}
        config={{ ...config, ...restProps }}
        onEvent={onEvent}
        className={className}
      >
        {children}
      </FactoryBridge>
    );
  };

  Component.displayName = displayName || `Factory${factoryName}`;
  return Component;
}

// Button Components
export const ReactButton = createFactoryComponent('Button', 'ReactButton');
export const ReactButtonPrimary = createFactoryComponent('ButtonPrimary', 'ReactButtonPrimary');
export const ReactButtonSecondary = createFactoryComponent('ButtonSecondary', 'ReactButtonSecondary');
export const ReactButtonGhost = createFactoryComponent('ButtonGhost', 'ReactButtonGhost');
export const ReactButtonDanger = createFactoryComponent('ButtonDanger', 'ReactButtonDanger');
export const ReactButtonSuccess = createFactoryComponent('ButtonSuccess', 'ReactButtonSuccess');

// Input Components
export const ReactInput = createFactoryComponent('Input', 'ReactInput');
export const ReactInputGroup = createFactoryComponent('InputGroup', 'ReactInputGroup');

// Card Components
export const ReactCard = createFactoryComponent('Card', 'ReactCard');

// Other Components
export const ReactActionCard = createFactoryComponent('ActionCard', 'ReactActionCard');
export const ReactSearchBar = createFactoryComponent('SearchBar', 'ReactSearchBar');
export const ReactContentCard = createFactoryComponent('ContentCard', 'ReactContentCard');
export const ReactFileList = createFactoryComponent('FileList', 'ReactFileList');
export const ReactNotification = createFactoryComponent('Notification', 'ReactNotification');
export const ReactSearchInterface = createFactoryComponent('SearchInterface', 'ReactSearchInterface');
export const ReactStatusIndicator = createFactoryComponent('StatusIndicator', 'ReactStatusIndicator');

// Application Components
export const ReactEnhancedSearch = createFactoryComponent('EnhancedSearch', 'ReactEnhancedSearch');
export const ReactCampaignSelector = createFactoryComponent('CampaignSelector', 'ReactCampaignSelector');
export const ReactContentManager = createFactoryComponent('ContentManager', 'ReactContentManager');
export const ReactTamylaUI = createFactoryComponent('TamylaUI', 'ReactTamylaUI');

// Reward System
export const ReactReward = createFactoryComponent('Reward', 'ReactReward');

// Organism Components
export const ReactOrganismFactory = createFactoryComponent('OrganismFactory', 'ReactOrganismFactory');
export const ReactOrganismTemplates = createFactoryComponent('OrganismTemplates', 'ReactOrganismTemplates');
