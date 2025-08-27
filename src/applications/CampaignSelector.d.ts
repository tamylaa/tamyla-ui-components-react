/**
 * CampaignSelector Application - React wrapper for CampaignSelectorSystem
 */
/// <reference types="react" />
interface CampaignSelectorProps {
    campaigns?: any[];
    selectedCampaign?: string;
    onCampaignSelect?: (campaign: any) => void;
    className?: string;
}
declare const CampaignSelector: import("react").FC<CampaignSelectorProps>;
export default CampaignSelector;
//# sourceMappingURL=CampaignSelector.d.ts.map