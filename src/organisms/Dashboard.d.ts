/**
 * Dashboard Organism - Complete dashboard interface with React integration
 * Uses Factory Bridge to leverage ui-components dashboard functionality
 */
import React from 'react';
interface DashboardProps {
    title?: string;
    widgets?: Array<{
        id: string;
        component: string;
        props?: Record<string, any>;
    }>;
    layout?: 'grid' | 'list' | 'cards';
    onWidgetAction?: (action: string, data: any) => void;
}
declare const Dashboard: React.FC<DashboardProps>;
export default Dashboard;
//# sourceMappingURL=Dashboard.d.ts.map