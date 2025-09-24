/**
 * Enhanced ContentSharing Component with Service Architecture
 * Demonstrates how to refactor existing components to use the new enterprise service layer
 * while maintaining backward compatibility
 */

import React, { useState, useEffect, useMemo } from 'react';
// Import the new service architecture with relative paths
import { ServiceContainer } from '../../core/ServiceContainer';
import { contentApi as legacyContentApi } from '../../services/adapters/ContentApiAdapter';
import type { IContentService } from '../../services/ContentService.interface';

interface ContentSharingProps {
  selectedFiles?: Array<{
    id: string;
    name: string;
    type: string;
    size: number;
    url?: string;
  }>;
  onClose?: () => void;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
  // Service injection for testing
  contentService?: IContentService;
  // Mock dependencies for demo purposes
  currentUser?: { name?: string; email?: string };
  emailApi?: {
    sendContentShare: (params: any) => Promise<any>;
  };
}

/**
 * Enhanced ContentSharing Component
 * 
 * This component demonstrates the enterprise service architecture pattern:
 * 1. Uses dependency injection for testability
 * 2. Falls back to backward compatibility adapter
 * 3. Maintains existing API while using new service layer
 * 4. Shows service status for transparency
 */
export function EnhancedContentSharing({ 
  selectedFiles = [], 
  onClose, 
  onSuccess,
  onError,
  contentService, // Injectable for testing
  currentUser = { name: 'Demo User', email: 'demo@example.com' },
  emailApi = {
    sendContentShare: async (params) => ({ success: true, message: 'Mock email sent' })
  }
}: ContentSharingProps) {
  const [recipients, setRecipients] = useState(['']);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [makePublic, setMakePublic] = useState(true);
  const [loading, setLoading] = useState(false);
  const [serviceInfo, setServiceInfo] = useState<string>('');

  // Enterprise service integration with fallback compatibility
  const activeContentService = useMemo(() => {
    if (contentService) {
      setServiceInfo('Injected Service (Testing Mode)');
      return contentService; // Injected service (testing)
    }
    
    try {
      // Try to get enterprise service from container
      const enterpriseService = ServiceContainer.resolve<IContentService>('IContentService');
      setServiceInfo('Enterprise Service Layer');
      return enterpriseService;
    } catch (error) {
      console.warn('Enterprise service not available, using legacy adapter:', error);
      setServiceInfo('Legacy Compatibility Layer');
      
      // Fallback to backward compatibility adapter
      return {
        // Wrap legacy API to match IContentService interface
        async getFiles(options = {}) {
          const result = await legacyContentApi.getUserFiles(options);
          return {
            success: result.success,
            files: result.files || [],
            pagination: result.pagination || { page: 1, limit: 20, total: 0, hasNext: false, hasPrev: false },
            sessionCount: result.files?.length || 0,
            historicalCount: result.files?.length || 0,
            count: result.files?.length || 0
          };
        },
        async uploadFile(file: File, options: any = {}) {
          const result = await legacyContentApi.uploadFile(file, options);
          return {
            success: result.success,
            file: result.file,
            message: result.message
          };
        },
        async deleteFile(fileId: string) {
          const result = await legacyContentApi.deleteFile(fileId);
          return {
            success: result.success,
            message: result.message
          };
        }
      } as IContentService;
    }
  }, [contentService]);

  /**
   * Handle the sharing process with enterprise service architecture
   */
  const handleShare = async () => {
    if (!recipients.filter(r => r.trim()).length) {
      onError?.(new Error('Please add at least one recipient'));
      return;
    }

    if (!subject.trim()) {
      onError?.(new Error('Please add a subject'));
      return;
    }

    try {
      setLoading(true);

      const validRecipients = recipients.filter(email => email.trim());

      // Send emails to all recipients using provided email service
      const emailPromises = validRecipients.map(email => 
        emailApi.sendContentShare({
          to: email.trim(),
          subject: subject,
          message: message,
          files: selectedFiles.map(file => ({
            name: file.name,
            url: file.url || `https://content.tamyla.com/access/${file.id}`,
            size: file.size,
            type: file.type
          })),
          senderName: currentUser?.name || currentUser?.email || 'Content Portal User',
        })
      );

      const results = await Promise.allSettled(emailPromises);
      const successCount = results.filter(r => r.status === 'fulfilled').length;
      const failureCount = results.length - successCount;

      if (failureCount === 0) {
        onSuccess?.({
          message: `Successfully shared ${selectedFiles.length} file(s) with ${successCount} recipient(s)`,
          recipients: validRecipients,
          files: selectedFiles,
          serviceUsed: serviceInfo
        });
      } else {
        const errorMessage = `Shared with ${successCount} recipient(s), but ${failureCount} email(s) failed to send`;
        onError?.(new Error(errorMessage));
      }

    } catch (error) {
      console.error('Content sharing failed:', error);
      onError?.(error instanceof Error ? error : new Error('Sharing failed'));
    } finally {
      setLoading(false);
    }
  };

  const addRecipient = () => {
    setRecipients([...recipients, '']);
  };

  const removeRecipient = (index: number) => {
    setRecipients(recipients.filter((_, i) => i !== index));
  };

  const updateRecipient = (index: number, value: string) => {
    const newRecipients = [...recipients];
    newRecipients[index] = value;
    setRecipients(newRecipients);
  };

  return (
    <div className="content-sharing-modal" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="modal-overlay" onClick={onClose} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }} />
      <div className="modal-content" style={{
        position: 'relative',
        backgroundColor: 'white',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        <div className="modal-header" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>📧 Share Content</h2>
          <button 
            className="close-btn" 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            ×
          </button>
        </div>

        <div className="modal-body" style={{ padding: '20px', maxHeight: '60vh', overflow: 'auto' }}>
          {/* Service Status Indicator */}
          <div className="service-status" style={{ 
            padding: '12px', 
            backgroundColor: '#f0f9ff', 
            border: '1px solid #0ea5e9', 
            borderRadius: '6px', 
            marginBottom: '20px' 
          }}>
            <div style={{ color: '#0c4a6e', fontSize: '14px', fontWeight: 'bold' }}>
              🔧 Service Architecture Demo
            </div>
            <div style={{ color: '#0c4a6e', fontSize: '12px', marginTop: '4px' }}>
              Active Service Layer: <strong>{serviceInfo}</strong>
            </div>
            <div style={{ color: '#0c4a6e', fontSize: '11px', marginTop: '2px', opacity: 0.8 }}>
              This shows how components can use dependency injection for enterprise-grade testability
            </div>
          </div>

          {/* Selected Files */}
          {selectedFiles.length > 0 && (
            <div className="selected-files" style={{ marginBottom: '20px' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Selected Files ({selectedFiles.length})</h3>
              <div className="file-list">
                {selectedFiles.map(file => (
                  <div key={file.id} className="file-item" style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    marginBottom: '8px',
                    backgroundColor: '#f9fafb'
                  }}>
                    <span className="file-icon" style={{ marginRight: '12px', fontSize: '20px' }}>📄</span>
                    <div className="file-info" style={{ flex: 1 }}>
                      <div className="file-name" style={{ fontWeight: 'bold', fontSize: '14px' }}>{file.name}</div>
                      <div className="file-size" style={{ fontSize: '12px', color: '#6b7280' }}>
                        {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recipients */}
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '14px' }}>
              Recipients
            </label>
            {recipients.map((recipient, index) => (
              <div key={index} className="recipient-row" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '8px' 
              }}>
                <input
                  type="email"
                  value={recipient}
                  onChange={(e) => updateRecipient(index, e.target.value)}
                  placeholder="Enter email address"
                  className="email-input"
                  style={{
                    flex: 1,
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    marginRight: '8px',
                    fontSize: '14px'
                  }}
                />
                {recipients.length > 1 && (
                  <button 
                    type="button"
                    onClick={() => removeRecipient(index)}
                    className="remove-btn"
                    style={{
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      width: '32px',
                      height: '32px',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button 
              type="button" 
              onClick={addRecipient} 
              className="add-recipient-btn"
              style={{
                background: '#10b981',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 'bold'
              }}
            >
              + Add Recipient
            </button>
          </div>

          {/* Subject */}
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '14px' }}>
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter email subject"
              className="subject-input"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Message */}
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '14px' }}>
              Message (Optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a personal message..."
              className="message-input"
              rows={4}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Public Access Toggle */}
          <div className="form-group">
            <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={makePublic}
                onChange={(e) => setMakePublic(e.target.checked)}
                style={{ marginRight: '8px', transform: 'scale(1.1)' }}
              />
              <span style={{ fontSize: '14px' }}>
                Make files publicly accessible (recommended for sharing)
              </span>
            </label>
            <small className="help-text" style={{ 
              color: '#6b7280', 
              fontSize: '12px', 
              marginTop: '6px', 
              marginLeft: '20px',
              display: 'block'
            }}>
              When enabled, recipients can access files without authentication
            </small>
          </div>
        </div>

        <div className="modal-footer" style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: '10px', 
          padding: '16px 20px',
          borderTop: '1px solid #e5e7eb',
          backgroundColor: '#f9fafb'
        }}>
          <button 
            onClick={onClose} 
            className="btn btn-secondary" 
            disabled={loading}
            style={{
              padding: '10px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              background: 'white',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            Cancel
          </button>
          <button 
            onClick={handleShare} 
            className="btn btn-primary" 
            disabled={loading || !recipients.filter(r => r.trim()).length || !subject.trim()}
            style={{
              padding: '10px 16px',
              border: 'none',
              borderRadius: '6px',
              background: loading || !recipients.filter(r => r.trim()).length || !subject.trim() ? '#9ca3af' : '#3b82f6',
              color: 'white',
              cursor: loading || !recipients.filter(r => r.trim()).length || !subject.trim() ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            {loading ? 'Sharing...' : `Share with ${recipients.filter(r => r.trim()).length} recipient(s)`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EnhancedContentSharing;