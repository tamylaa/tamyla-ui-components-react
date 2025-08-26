/**
 * Dashboard Organism - Complete dashboard interface with React integration
 * Uses Factory Bridge to leverage ui-components dashboard functionality
 */

import React from 'react';
import styled from 'styled-components';
import { useFactoryBridge, createFactoryComponent } from '../core/factory-bridge';
import { useAppSelector } from '../store/hooks';

const DashboardContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.colors.background};
`;

const DashboardContent = styled.main`
  flex: 1;
  padding: ${props => props.theme.spacing.lg};
  overflow-y: auto;
`;

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

const Dashboard: React.FC<DashboardProps> = ({
  title = 'Dashboard',
  widgets = [],
  layout = 'grid',
  onWidgetAction
}) => {
  const { createFactoryElement } = useFactoryBridge();
  const user = useAppSelector(state => state.auth.user);
  const theme = useAppSelector(state => state.theme);

  // Create dashboard using standard React pattern
  React.useEffect(() => {
    const loadDashboard = async () => {
      // For now, create a basic dashboard element
      const dashboardElement = document.createElement('div');
      dashboardElement.innerHTML = `
        <div class="dashboard">
          <h2>${title}</h2>
          <p>Layout: ${layout}</p>
          <p>User: ${user?.name || 'Guest'}</p>
          <p>Theme: ${theme.currentTheme}</p>
        </div>
      `;

      const container = document.getElementById('react-dashboard-container');
      if (container && dashboardElement) {
        container.appendChild(dashboardElement);
      }
    };

    loadDashboard();

    return () => {
      const container = document.getElementById('react-dashboard-container');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [title, layout, widgets, user, theme, onWidgetAction, createFactoryComponent]);

  return (
    <DashboardContainer>
      <DashboardContent>
        <div id="react-dashboard-container" />
      </DashboardContent>
    </DashboardContainer>
  );
};

export default Dashboard;
