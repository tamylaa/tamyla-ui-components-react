import React, { useState } from 'react';
import { Button, Card, Badge } from '@tamyla/ui-components-react';
import AtomsDemo from './AtomsDemo.tsx';
import MoleculesDemo from './MoleculesDemo.tsx';
import OrganismsDemo from './OrganismsDemo.tsx';
import ApplicationsDemo from './ApplicationsDemo.tsx';
import FullApplicationDemo from './FullApplicationDemo.tsx';

function App() {
  const [activeDemo, setActiveDemo] = useState('atoms');

  const demos = [
    {
      id: 'atoms',
      title: '🧬 Atoms',
      description: 'Basic UI elements and building blocks',
      component: AtomsDemo
    },
    {
      id: 'molecules',
      title: '🧪 Molecules',
      description: 'Component combinations and functional units',
      component: MoleculesDemo
    },
    {
      id: 'organisms',
      title: '🦠 Organisms',
      description: 'Complex UI sections and layouts',
      component: OrganismsDemo
    },
    {
      id: 'applications',
      title: '🚀 Applications',
      description: 'Full page layouts and workflows',
      component: ApplicationsDemo
    },
    {
      id: 'full-app',
      title: '💼 Full Application',
      description: 'Complete project management application',
      component: FullApplicationDemo
    }
  ];

  const ActiveComponent = demos.find(demo => demo.id === activeDemo)?.component || AtomsDemo;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-white">UI Platform - Standard Mode</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-gray-600 text-white px-3 py-1 text-sm">
                🎨 Standard Mode
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80">
            <Card className="bg-black/20 backdrop-blur-lg border-white/10">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Atomic Design Demos</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Explore our component library organized by atomic design principles
                </p>
                <div className="space-y-3">
                  {demos.map((demo) => (
                    <button
                      key={demo.id}
                      onClick={() => setActiveDemo(demo.id)}
                      className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                        activeDemo === demo.id
                          ? 'bg-pink-600 text-white shadow-lg'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <h4 className="font-medium">{demo.title}</h4>
                      <p className="text-sm opacity-80 mt-1">{demo.description}</p>
                    </button>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <h4 className="text-white font-medium mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start border-white/20 text-white hover:bg-white/10">
                      📚 View Documentation
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start border-white/20 text-white hover:bg-white/10">
                      🎨 Theme Customizer
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start border-white/20 text-white hover:bg-white/10">
                      🔧 Component Playground
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
