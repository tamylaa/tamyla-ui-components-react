/**
 * Service Architecture Integration Demo
 * 
 * This file demonstrates how to configure and use the new enterprise service layer
 * with existing components, showing both production and test scenarios.
 */

import React, { useState } from 'react';
import { ServiceContainer } from '../core/ServiceContainer';
import { RestContentService } from '../services/implementations/RestContentService';
import { MockContentService } from '../services/implementations/MockContentService';
import { FetchHttpClient } from '../services/implementations/HttpClient';
import { EnhancedContentSharing } from './enhanced/EnhancedContentSharing';
import type { IContentService } from '../services/ContentService.interface';

/**
 * Configuration helper to set up the enterprise service layer
 */
const configureProductionServices = () => {
  // Configure HTTP client with production settings
  const httpClient = new FetchHttpClient({
    baseURL: 'https://api.tamyla.com',
    timeout: 30000,
    retries: 3,
    retryDelay: 1000,
    authToken: 'production-jwt-token'
  });

  // Configure production content service
  const contentService = new RestContentService(httpClient, {
    dataServiceBaseURL: 'https://data.tamyla.com',
    contentStoreBaseURL: 'https://content.tamyla.com',
    authToken: 'production-jwt-token'
  });

  // Register in service container
  ServiceContainer.register('IContentService', contentService);

  console.log('✅ Production services configured');
  return contentService;
};

/**
 * Configuration helper for testing with mock services
 */
const configureTestServices = () => {
  // Configure mock service with test data
  const mockService = new MockContentService({
    defaultDelay: 500, // Simulate network delay
    failureRate: 0.1, // 10% error rate for testing
    fileCount: 10,
    autoGenerateFiles: true
  });

  // Register in service container
  ServiceContainer.register('IContentService', mockService);

  console.log('✅ Test services configured');
  return mockService;
};

/**
 * Demo component showing service architecture integration
 */
export function ServiceArchitectureDemo() {
  const [serviceMode, setServiceMode] = useState<'production' | 'test' | 'injection'>('test');
  const [isConfigured, setIsConfigured] = useState(false);
  const [currentService, setCurrentService] = useState<IContentService | null>(null);
  const [showSharing, setShowSharing] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Sample files for demo
  const sampleFiles = [
    {
      id: 'demo-file-1',
      name: 'quarterly-report.pdf',
      type: 'application/pdf',
      size: 1500000,
      url: 'https://demo.tamyla.com/files/quarterly-report.pdf'
    },
    {
      id: 'demo-file-2',
      name: 'marketing-presentation.pptx',
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      size: 3200000,
      url: 'https://demo.tamyla.com/files/marketing-presentation.pptx'
    }
  ];

  /**
   * Configure services based on selected mode
   */
  const handleConfigure = async () => {
    try {
      let service: IContentService;

      switch (serviceMode) {
        case 'production':
          service = configureProductionServices();
          break;
        case 'test':
          service = configureTestServices();
          break;
        case 'injection':
          // Create a custom service for injection demo
          service = new MockContentService({
            defaultDelay: 100,
            failureRate: 0,
            fileCount: 5,
            autoGenerateFiles: true
          });
          break;
        default:
          throw new Error('Unknown service mode');
      }

      setCurrentService(service);
      setIsConfigured(true);
      setNotification({
        type: 'success',
        message: `Service layer configured in ${serviceMode} mode`
      });

    } catch (error) {
      setNotification({
        type: 'error',
        message: `Failed to configure services: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  };

  /**
   * Test the service layer by calling methods
   */
  const testServiceLayer = async () => {
    if (!currentService) return;

    try {
      // Test getFiles method
      const filesResult = await currentService.getFiles({ page: 1, limit: 10 });
      console.log('Service test - getFiles result:', filesResult);

      setNotification({
        type: 'success',
        message: `Service test successful: Retrieved ${filesResult.files.length} files`
      });

    } catch (error) {
      setNotification({
        type: 'error',
        message: `Service test failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  };

  /**
   * Handle sharing success
   */
  const handleSharingSuccess = (result: any) => {
    setShowSharing(false);
    setNotification({
      type: 'success',
      message: `${result.message} (Service: ${result.serviceUsed})`
    });
  };

  /**
   * Handle sharing error
   */
  const handleSharingError = (error: Error) => {
    setNotification({
      type: 'error',
      message: `Sharing failed: ${error.message}`
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        🏗️ Enterprise Service Architecture Demo
      </h1>

      <div style={{ 
        backgroundColor: '#f0f9ff', 
        border: '1px solid #0ea5e9', 
        borderRadius: '8px', 
        padding: '16px', 
        marginBottom: '24px' 
      }}>
        <h2 style={{ fontSize: '18px', color: '#0c4a6e', marginBottom: '8px' }}>
          Architecture Overview
        </h2>
        <p style={{ color: '#0c4a6e', fontSize: '14px', margin: 0 }}>
          This demo shows how components can use dependency injection to work with different service implementations:
          production REST services, test mocks, or injected services. The component automatically adapts to whatever
          service layer is configured.
        </p>
      </div>

      {/* Service Mode Selection */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
          1. Choose Service Mode
        </h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          {(['production', 'test', 'injection'] as const).map(mode => (
            <label key={mode} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="radio"
                value={mode}
                checked={serviceMode === mode}
                onChange={(e) => setServiceMode(e.target.value as typeof serviceMode)}
                style={{ marginRight: '6px' }}
              />
              <span style={{ fontSize: '14px', textTransform: 'capitalize' }}>
                {mode === 'injection' ? 'Dependency Injection' : mode}
              </span>
            </label>
          ))}
        </div>
        <button
          onClick={handleConfigure}
          style={{
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Configure Services
        </button>
      </div>

      {/* Service Status */}
      {isConfigured && (
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
            2. Service Layer Status
          </h3>
          <div style={{
            padding: '12px',
            backgroundColor: '#f0fdf4',
            border: '1px solid #22c55e',
            borderRadius: '6px',
            marginBottom: '10px'
          }}>
            <div style={{ color: '#15803d', fontSize: '14px', fontWeight: 'bold' }}>
              ✅ Services Configured
            </div>
            <div style={{ color: '#15803d', fontSize: '12px', marginTop: '4px' }}>
              Mode: {serviceMode} • Container: {ServiceContainer.isRegistered('IContentService') ? 'Ready' : 'Not Ready'}
            </div>
          </div>
          <button
            onClick={testServiceLayer}
            style={{
              padding: '8px 16px',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              marginRight: '10px'
            }}
          >
            Test Service Layer
          </button>
          <button
            onClick={() => setShowSharing(true)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#8b5cf6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Demo Enhanced Component
          </button>
        </div>
      )}

      {/* Sample Files */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
          3. Sample Files for Demo
        </h3>
        <div style={{ display: 'grid', gap: '8px' }}>
          {sampleFiles.map(file => (
            <div key={file.id} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              backgroundColor: '#f9fafb'
            }}>
              <span style={{ marginRight: '10px', fontSize: '16px' }}>📄</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{file.name}</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      {notification && (
        <div style={{
          padding: '12px',
          backgroundColor: notification.type === 'success' ? '#f0fdf4' : '#fef2f2',
          border: `1px solid ${notification.type === 'success' ? '#22c55e' : '#ef4444'}`,
          borderRadius: '6px',
          marginBottom: '20px'
        }}>
          <div style={{
            color: notification.type === 'success' ? '#15803d' : '#dc2626',
            fontSize: '14px'
          }}>
            {notification.type === 'success' ? '✅' : '❌'} {notification.message}
          </div>
        </div>
      )}

      {/* Enhanced Content Sharing Modal */}
      {showSharing && (
        <EnhancedContentSharing
          selectedFiles={sampleFiles}
          contentService={serviceMode === 'injection' ? currentService || undefined : undefined}
          onSuccess={handleSharingSuccess}
          onError={handleSharingError}
          onClose={() => setShowSharing(false)}
          currentUser={{ name: 'Demo User', email: 'demo@tamyla.com' }}
          emailApi={{
            sendContentShare: async (params) => {
              console.log('Mock email sent:', params);
              return { success: true, message: 'Email sent via mock service' };
            }
          }}
        />
      )}

      {/* Architecture Explanation */}
      <div style={{ marginTop: '40px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
          🔧 How It Works
        </h3>
        <div style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6' }}>
          <ol style={{ paddingLeft: '20px', margin: 0 }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>Service Container:</strong> Manages dependency injection and service lifecycle
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Service Interfaces:</strong> Define contracts that all implementations must follow
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Multiple Implementations:</strong> REST services for production, mocks for testing
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Backward Compatibility:</strong> Legacy adapter bridges old and new architectures
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Component Flexibility:</strong> Components work with any service implementation
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default ServiceArchitectureDemo;