/**
 * CampaignSelector Application - React wrapper for CampaignSelectorSystem
 */

import { createFactoryComponent } from '../core/factory-bridge';

interface CampaignSelectorProps {
  campaigns?: any[];
  selectedCampaign?: string;
  onCampaignSelect?: (campaign: any) => void;
  className?: string;
}

const CampaignSelector = createFactoryComponent<CampaignSelectorProps>(
  'CampaignSelector',
  'CampaignSelectorSystem'
);

export default CampaignSelector;
