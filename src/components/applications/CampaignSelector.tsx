/**
 * CampaignSelector Application - React wrapper for CampaignSelectorSystem
 */

import { createFactoryComponent } from '../../core/factory/factory-bridge';

interface CampaignSelectorProps {
  campaigns?: Array<{
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
  }>;
  selectedCampaign?: string;
  onCampaignSelect?: (_campaign: { id: string; name: string; status: string; metrics?: { impressions: number; clicks: number; conversions: number; } }) => void;
  className?: string;
}

const CampaignSelector = createFactoryComponent<CampaignSelectorProps>(
  'CampaignSelector',
  'CampaignSelectorSystem'
);

export default CampaignSelector;
