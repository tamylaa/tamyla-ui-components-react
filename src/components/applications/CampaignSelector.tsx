/**
 * CampaignSelector Application - React wrapper for CampaignSelectorSystem
 */

import { createFactoryComponent } from '../../core/factory/factory-bridge';

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  budget?: number;
  targetAudience?: string;
  metrics?: {
    impressions: number;
    clicks: number;
    conversions: number;
  };
}

interface CampaignSelectorProps {
  campaigns?: Campaign[];
  selectedCampaign?: string;
  onCampaignSelect?: (campaign: Campaign) => void;
  className?: string;
}

const CampaignSelector = createFactoryComponent<CampaignSelectorProps>(
  'CampaignSelector',
  'CampaignSelectorSystem'
);

export default CampaignSelector;
