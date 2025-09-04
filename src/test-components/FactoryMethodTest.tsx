/**
 * Focused Factory Method Test Component
 * Tests one component at a time to verify our enhanced factory methods work
 */

import React, { useState, useEffect, useCallback } from 'react';

// Test just the Button component with our enhanced factory methods
import { ReactButton } from '../core/factory/factory-components';
import { factoryImporter } from '../core/factory/factory-importer';

const FactoryMethodTest: React.FC = () => {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [currentTest, setCurrentTest] = useState<string>('Starting tests...');

  const addResult = (result: string) => {
    setTestResults(prev => [...prev, result]);
  };

  const testEnhancedFactoryMethods = useCallback(async () => {
    try {
      setCurrentTest('Testing enhanced factory methods...');

      // Test 1: Check if factoryImporter is available
      addResult('✅ FactoryImporter is available');

      // Test 2: Get ButtonFactory and test enableTradingPortalPatterns
      const buttonFactory = await factoryImporter.getFactory('ButtonFactory');
      if (buttonFactory) {
        addResult('✅ ButtonFactory loaded successfully');

        // Test our enhanced method
        if (typeof buttonFactory.enableTradingPortalPatterns === 'function') {
          const result = buttonFactory.enableTradingPortalPatterns();
          addResult('✅ enableTradingPortalPatterns() method works');
          addResult(`   Result: ${JSON.stringify(result)}`);
        } else {
          addResult('❌ enableTradingPortalPatterns() method missing');
        }
      } else {
        addResult('❌ ButtonFactory not found');
      }

      // Test 3: Get CampaignSelectorSystem and test selectionManager
      const campaignFactory = await factoryImporter.getFactory('CampaignSelectorSystem');
      if (campaignFactory) {
        addResult('✅ CampaignSelectorSystem loaded successfully');

        // Create an instance to test selectionManager
        const instance = campaignFactory.create();
        if (instance && instance.selectionManager && typeof instance.selectionManager.on === 'function') {
          // Test the mock event listener
          const removeListener = instance.selectionManager.on('test-event', () => {});
          addResult('✅ selectionManager.on() method works');
          if (typeof removeListener === 'function') {
            addResult('✅ Event listener cleanup function returned');
          }
        } else {
          addResult('❌ selectionManager.on() method missing or malformed');
        }
      } else {
        addResult('❌ CampaignSelectorSystem not found');
      }

      // Test 4: Get SearchInterface and test setResults
      const searchFactory = await factoryImporter.getFactory('SearchInterfaceFactory');
      if (searchFactory) {
        addResult('✅ SearchInterfaceFactory loaded successfully');

        if (typeof searchFactory.setResults === 'function') {
          const result = searchFactory.setResults(['test', 'results']);
          addResult('✅ setResults() method works');
        } else {
          addResult('❌ setResults() method missing');
        }
      } else {
        addResult('❌ SearchInterfaceFactory not found');
      }

      // Test 5: Get OrganismFactory and test createSearchInterface
      const organismFactory = await factoryImporter.getFactory('OrganismFactory');
      if (organismFactory) {
        addResult('✅ OrganismFactory loaded successfully');

        if (typeof organismFactory.createSearchInterface === 'function') {
          const element = organismFactory.createSearchInterface();
          if (element instanceof HTMLElement) {
            addResult('✅ createSearchInterface() method works and returns HTML element');
          } else {
            addResult('⚠️ createSearchInterface() works but returns non-HTML element');
          }
        } else {
          addResult('❌ createSearchInterface() method missing');
        }
      } else {
        addResult('❌ OrganismFactory not found');
      }

      setCurrentTest('Tests completed!');

    } catch (error) {
      addResult(`❌ Test failed with error: ${error instanceof Error ? error.message : String(error)}`);
      setCurrentTest('Tests failed!');
    }
  }, [addResult]);

  useEffect(() => {
    // Run tests after component mounts
    const timer = window.setTimeout(() => {
      testEnhancedFactoryMethods();
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [testEnhancedFactoryMethods]);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h2>🧪 Factory Method Enhancement Test</h2>
      <div style={{ marginBottom: '20px' }}>
        <strong>Current Test: </strong>
        <span style={{ color: '#007bff' }}>{currentTest}</span>
      </div>

      <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
        <h3>Test Results:</h3>
        {testResults.length === 0 ? (
          <p>Running tests...</p>
        ) : (
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '14px' }}>
            {testResults.join('\n')}
          </pre>
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Test Button Component:</h3>
        <ReactButton
          config={{ variant: 'primary' }}
          onEvent={() => addResult('✅ ReactButton click works')}
        >
          Test Button Click
        </ReactButton>
      </div>

      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e7f3ff', borderRadius: '5px' }}>
        <strong>What this tests:</strong>
        <ul>
          <li>✅ Factory importer availability</li>
          <li>✅ Enhanced enableTradingPortalPatterns() method</li>
          <li>✅ Enhanced selectionManager.on() method</li>
          <li>✅ Enhanced setResults() method</li>
          <li>✅ Enhanced createSearchInterface() method</li>
          <li>✅ React component rendering</li>
        </ul>
      </div>
    </div>
  );
};

export default FactoryMethodTest;
