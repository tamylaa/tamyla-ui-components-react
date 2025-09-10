/**
 * Full Aimport React, { useState } from 'react';
import { Button, Input, Card, Badge, Progress, Alert, Avatar } from '@tamyla/ui-components-react';cation Demo - Complete Project Management Application
 *
 * This demo showcases a complete, real-world application using only the available
 * UI components: Button, Input, Card, Badge, Progress, Alert, and Avatar.
 *
 * Features:
 * - Project Management Dashboard
 * - Task Management with Kanban Board
 * - Team Member Management
 * - Interactive Forms and State Management
 * - Professional UI Design
 */

import React, { useState } from 'react';
import { Button, Input, Card, Badge, Progress, Alert, Avatar } from '@tamyla/ui-components-react';

// TypeScript Interfaces
interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high' | 'critical';
  progress: number;
  team: string[];
  budget: number;
  spent: number;
}

interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee: string;
  dueDate: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
}

const FullApplicationDemo: React.FC = () => {
  // State Management
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form States
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  // Alert System
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Sample Data - Projects
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'E-commerce Platform',
      description: 'Complete e-commerce solution with React and Node.js',
      status: 'active',
      priority: 'high',
      progress: 75,
      team: ['john.doe', 'jane.smith', 'mike.johnson'],
      budget: 150000,
      spent: 112500
    },
    {
      id: '2',
      name: 'Mobile App Development',
      description: 'Cross-platform mobile application using React Native',
      status: 'planning',
      priority: 'medium',
      progress: 25,
      team: ['sarah.wilson', 'david.brown'],
      budget: 80000,
      spent: 20000
    },
    {
      id: '3',
      name: 'Data Analytics Dashboard',
      description: 'Advanced analytics platform for business intelligence',
      status: 'completed',
      priority: 'high',
      progress: 100,
      team: ['alex.garcia', 'emily.davis', 'tom.anderson'],
      budget: 120000,
      spent: 118000
    },
    {
      id: '4',
      name: 'Security Audit System',
      description: 'Comprehensive security monitoring and audit system',
      status: 'on-hold',
      priority: 'critical',
      progress: 40,
      team: ['chris.taylor', 'lisa.martinez'],
      budget: 200000,
      spent: 80000
    }
  ]);

  // Sample Data - Tasks
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      projectId: '1',
      title: 'Implement user authentication',
      description: 'Set up JWT-based authentication system',
      status: 'done',
      priority: 'high',
      assignee: 'john.doe',
      dueDate: '2025-09-10'
    },
    {
      id: '2',
      projectId: '1',
      title: 'Design product catalog UI',
      description: 'Create responsive product listing and detail pages',
      status: 'in-progress',
      priority: 'medium',
      assignee: 'jane.smith',
      dueDate: '2025-09-15'
    },
    {
      id: '3',
      projectId: '1',
      title: 'Set up payment gateway',
      description: 'Integrate Stripe payment processing',
      status: 'todo',
      priority: 'high',
      assignee: 'mike.johnson',
      dueDate: '2025-09-20'
    },
    {
      id: '4',
      projectId: '2',
      title: 'Create wireframes',
      description: 'Design mobile app wireframes and user flows',
      status: 'review',
      priority: 'medium',
      assignee: 'sarah.wilson',
      dueDate: '2025-09-12'
    },
    {
      id: '5',
      projectId: '3',
      title: 'Data visualization components',
      description: 'Build interactive charts and graphs',
      status: 'done',
      priority: 'high',
      assignee: 'alex.garcia',
      dueDate: '2025-08-30'
    },
    {
      id: '6',
      projectId: '4',
      title: 'Security vulnerability scan',
      description: 'Automated security scanning implementation',
      status: 'in-progress',
      priority: 'critical',
      assignee: 'chris.taylor',
      dueDate: '2025-09-25'
    }
  ]);

  // Sample Data - Team Members
  const [teamMembers] = useState<TeamMember[]>([
    {
      id: 'john.doe',
      name: 'John Doe',
      role: 'Full Stack Developer',
      email: 'john.doe@company.com',
      avatar: 'JD',
      status: 'online'
    },
    {
      id: 'jane.smith',
      name: 'Jane Smith',
      role: 'Frontend Developer',
      email: 'jane.smith@company.com',
      avatar: 'JS',
      status: 'online'
    },
    {
      id: 'mike.johnson',
      name: 'Mike Johnson',
      role: 'Backend Developer',
      email: 'mike.johnson@company.com',
      avatar: 'MJ',
      status: 'busy'
    },
    {
      id: 'sarah.wilson',
      name: 'Sarah Wilson',
      role: 'UI/UX Designer',
      email: 'sarah.wilson@company.com',
      avatar: 'SW',
      status: 'offline'
    },
    {
      id: 'david.brown',
      name: 'David Brown',
      role: 'Mobile Developer',
      email: 'david.brown@company.com',
      avatar: 'DB',
      status: 'online'
    },
    {
      id: 'alex.garcia',
      name: 'Alex Garcia',
      role: 'Data Analyst',
      email: 'alex.garcia@company.com',
      avatar: 'AG',
      status: 'online'
    },
    {
      id: 'emily.davis',
      name: 'Emily Davis',
      role: 'Product Manager',
      email: 'emily.davis@company.com',
      avatar: 'ED',
      status: 'busy'
    },
    {
      id: 'chris.taylor',
      name: 'Chris Taylor',
      role: 'Security Engineer',
      email: 'chris.taylor@company.com',
      avatar: 'CT',
      status: 'online'
    }
  ]);

  // Helper Functions
  const getStatusBadge = (status: string) => {
    const statusConfig: { [key: string]: { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string } } = {
      'planning': { variant: 'outline', label: 'Planning' },
      'active': { variant: 'default', label: 'Active' },
      'completed': { variant: 'secondary', label: 'Completed' },
      'on-hold': { variant: 'destructive', label: 'On Hold' },
      'todo': { variant: 'outline', label: 'To Do' },
      'in-progress': { variant: 'default', label: 'In Progress' },
      'review': { variant: 'secondary', label: 'Review' },
      'done': { variant: 'secondary', label: 'Done' }
    };

    const config = statusConfig[status] || { variant: 'outline', label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig: { [key: string]: { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string } } = {
      'low': { variant: 'outline', label: 'Low Priority' },
      'medium': { variant: 'default', label: 'Medium Priority' },
      'high': { variant: 'secondary', label: 'High Priority' },
      'critical': { variant: 'destructive', label: 'Critical Priority' }
    };

    const config = priorityConfig[priority] || { variant: 'outline', label: priority };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  // Event Handlers
  const handleCreateProject = () => {
    if (!newProjectName.trim() || !newProjectDescription.trim()) {
      setAlertMessage('⚠️ Please fill in all required fields');
      setShowAlert(true);
      return;
    }

    const newProject: Project = {
      id: Date.now().toString(),
      name: newProjectName,
      description: newProjectDescription,
      status: 'planning',
      priority: 'medium',
      progress: 0,
      team: [],
      budget: 50000,
      spent: 0
    };

    setProjects([...projects, newProject]);
    setNewProjectName('');
    setNewProjectDescription('');
    setShowProjectForm(false);
    setAlertMessage(`✅ Project "${newProject.name}" created successfully!`);
    setShowAlert(true);
  };

  const handleCreateTask = () => {
    if (!newTaskTitle.trim() || !newTaskDescription.trim()) {
      setAlertMessage('⚠️ Please fill in all required fields');
      setShowAlert(true);
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      projectId: selectedProject || projects[0]?.id || '1',
      title: newTaskTitle,
      description: newTaskDescription,
      status: 'todo',
      priority: 'medium',
      assignee: teamMembers[0]?.id || 'unassigned',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setShowTaskForm(false);
    setAlertMessage(`✅ Task "${newTask.title}" created successfully!`);
    setShowAlert(true);
  };

  // Data Filtering
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTasks = tasks.filter(task =>
    selectedProject ? task.projectId === selectedProject : true
  );

  // Dashboard Statistics
  const dashboardStats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'active').length,
    completedProjects: projects.filter(p => p.status === 'completed').length,
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.status === 'done').length,
    overdueTasks: tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'done').length,
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
    totalSpent: projects.reduce((sum, p) => sum + p.spent, 0)
  };

  // Render Functions
  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">📊 Project Management Dashboard</h1>
        <p className="text-lg text-gray-600">Welcome back! Here's what's happening with your projects.</p>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <h3 className="text-4xl font-bold text-blue-600 mb-2">{dashboardStats.totalProjects}</h3>
          <p className="text-gray-600 font-medium">Total Projects</p>
          <div className="mt-2 text-sm text-gray-500">
            {dashboardStats.activeProjects} active, {dashboardStats.completedProjects} completed
          </div>
        </Card>

        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <h3 className="text-4xl font-bold text-green-600 mb-2">{dashboardStats.completedTasks}</h3>
          <p className="text-gray-600 font-medium">Tasks Completed</p>
          <div className="mt-2 text-sm text-gray-500">
            {Math.round((dashboardStats.completedTasks / dashboardStats.totalTasks) * 100)}% completion rate
          </div>
        </Card>

        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <h3 className="text-4xl font-bold text-purple-600 mb-2">{teamMembers.filter(m => m.status === 'online').length}</h3>
          <p className="text-gray-600 font-medium">Team Online</p>
          <div className="mt-2 text-sm text-gray-500">
            {teamMembers.length} total members
          </div>
        </Card>

        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <h3 className="text-4xl font-bold text-red-600 mb-2">{dashboardStats.overdueTasks}</h3>
          <p className="text-gray-600 font-medium">Overdue Tasks</p>
          <div className="mt-2 text-sm text-gray-500">
            Require immediate attention
          </div>
        </Card>
      </div>

      {/* Budget Overview */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">💰 Budget Overview</h2>
        <div className="mb-4">
          <div className="flex justify-between text-lg mb-2">
            <span>Total Budget Utilization</span>
            <span className="font-bold">
              ${dashboardStats.totalSpent.toLocaleString()} / ${dashboardStats.totalBudget.toLocaleString()}
            </span>
          </div>
          <Progress
            value={(dashboardStats.totalSpent / dashboardStats.totalBudget) * 100}
            className="w-full h-3"
          />
          <div className="mt-2 text-sm text-gray-600">
            {Math.round((dashboardStats.totalSpent / dashboardStats.totalBudget) * 100)}% of total budget utilized
          </div>
        </div>
      </Card>

      {/* Recent Projects */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">🚀 Recent Projects</h2>
          <Button onClick={() => setActiveTab('projects')}>View All Projects</Button>
        </div>
        <div className="space-y-4">
          {projects.slice(0, 3).map(project => (
            <div key={project.id} className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-gray-900">{project.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                </div>
                <div className="ml-4">
                  {getStatusBadge(project.status)}
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Progress</span>
                  <span className="font-bold">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="w-full" />
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {getPriorityBadge(project.priority)}
                </div>
                <div className="flex gap-2">
                  {project.team.slice(0, 4).map(memberId => {
                    const member = teamMembers.find(m => m.id === memberId);
                    return member ? (
                      <Avatar key={memberId} size="sm" className="border-2 border-white">
                        {member.avatar}
                      </Avatar>
                    ) : null;
                  })}
                  {project.team.length > 4 && (
                    <Avatar size="sm" className="bg-gray-300">
                      +{project.team.length - 4}
                    </Avatar>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Upcoming Deadlines */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">⏰ Upcoming Deadlines</h2>
          <Button onClick={() => setActiveTab('tasks')}>View All Tasks</Button>
        </div>
        <div className="space-y-3">
          {tasks
            .filter(task => task.status !== 'done')
            .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
            .slice(0, 5)
            .map(task => {
              const isOverdue = new Date(task.dueDate) < new Date();
              const assignee = teamMembers.find(m => m.id === task.assignee);

              return (
                <div key={task.id} className={`border-l-4 pl-4 py-3 ${isOverdue ? 'border-red-500 bg-red-50' : 'border-blue-500 bg-blue-50'}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">{task.title}</h5>
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      <div className="flex gap-2 mt-2">
                        {getStatusBadge(task.status)}
                        {getPriorityBadge(task.priority)}
                        <Badge variant={isOverdue ? 'destructive' : 'outline'}>
                          {isOverdue ? '🚨 Overdue' : `📅 Due: ${task.dueDate}`}
                        </Badge>
                      </div>
                    </div>
                    {assignee && (
                      <div className="ml-4 text-center">
                        <Avatar size="sm">{assignee.avatar}</Avatar>
                        <div className="text-xs text-gray-500 mt-1">{assignee.name.split(' ')[0]}</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </Card>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      {/* Projects Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">🚀 Projects</h1>
          <p className="text-gray-600 mt-1">Manage and track all your projects</p>
        </div>
        <Button onClick={() => setShowProjectForm(true)} className="bg-blue-600 hover:bg-blue-700">
          ➕ Create Project
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <Input
          placeholder="🔍 Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex gap-2">
          <Badge variant="outline">All ({projects.length})</Badge>
          <Badge variant="default">Active ({projects.filter(p => p.status === 'active').length})</Badge>
          <Badge variant="secondary">Completed ({projects.filter(p => p.status === 'completed').length})</Badge>
        </div>
      </div>

      {/* Project Creation Form */}
      {showProjectForm && (
        <Card className="p-6 border-2 border-blue-200 bg-blue-50">
          <h3 className="text-lg font-semibold mb-4">📝 Create New Project</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Project Name *</label>
              <Input
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="Enter a descriptive project name"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <Input
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
                placeholder="Describe the project goals and scope"
                className="w-full"
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleCreateProject} className="bg-green-600 hover:bg-green-700">
                ✅ Create Project
              </Button>
              <Button variant="outline" onClick={() => setShowProjectForm(false)}>
                ❌ Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <Card key={project.id} className="p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
              {getStatusBadge(project.status)}
            </div>

            <p className="text-gray-600 mb-4 text-sm">{project.description}</p>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Progress</span>
                <span className="font-bold">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="w-full h-2" />
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">💰 Budget:</span>
                <span className="font-medium">${project.budget.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">💸 Spent:</span>
                <span className={project.spent > project.budget * 0.9 ? 'text-red-600 font-bold' : 'font-medium'}>
                  ${project.spent.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">👥 Team Size:</span>
                <span className="font-medium">{project.team.length} members</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              {getPriorityBadge(project.priority)}
              <div className="flex gap-1">
                {project.team.slice(0, 3).map(memberId => {
                  const member = teamMembers.find(m => m.id === memberId);
                  return member ? (
                    <Avatar key={memberId} size="sm" className="border border-gray-300">
                      {member.avatar}
                    </Avatar>
                  ) : null;
                })}
                {project.team.length > 3 && (
                  <Avatar size="sm" className="bg-gray-400 text-white">
                    +{project.team.length - 3}
                  </Avatar>
                )}
              </div>
            </div>

            <div className="pt-4 border-t space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedProject(project.id);
                  setActiveTab('tasks');
                }}
                className="w-full"
              >
                📋 View Tasks ({tasks.filter(t => t.projectId === project.id).length})
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card className="p-12 text-center">
          <h3 className="text-xl font-medium text-gray-500 mb-2">No projects found</h3>
          <p className="text-gray-400 mb-4">Try adjusting your search or create a new project</p>
          <Button onClick={() => setShowProjectForm(true)}>Create Your First Project</Button>
        </Card>
      )}
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-6">
      {/* Tasks Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📋 Tasks</h1>
          {selectedProject && (
            <p className="text-gray-600 mt-1">
              Project: <span className="font-medium">{projects.find(p => p.id === selectedProject)?.name}</span>
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setSelectedProject(null)}>
            🔄 All Projects
          </Button>
          <Button onClick={() => setShowTaskForm(true)} className="bg-green-600 hover:bg-green-700">
            ➕ Create Task
          </Button>
        </div>
      </div>

      {/* Task Creation Form */}
      {showTaskForm && (
        <Card className="p-6 border-2 border-green-200 bg-green-50">
          <h3 className="text-lg font-semibold mb-4">📝 Create New Task</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Task Title *</label>
              <Input
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Enter a clear, actionable task title"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <Input
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                placeholder="Describe what needs to be done"
                className="w-full"
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleCreateTask} className="bg-green-600 hover:bg-green-700">
                ✅ Create Task
              </Button>
              <Button variant="outline" onClick={() => setShowTaskForm(false)}>
                ❌ Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {['todo', 'in-progress', 'review', 'done'].map(status => {
          const statusTasks = filteredTasks.filter(t => t.status === status);
          const statusIcons = {
            'todo': '📝',
            'in-progress': '⚡',
            'review': '👀',
            'done': '✅'
          };

          return (
            <div key={status}>
              <div className="bg-gray-100 p-4 rounded-lg mb-4 text-center">
                <h3 className="font-semibold text-gray-800 capitalize">
                  {statusIcons[status as keyof typeof statusIcons]} {status.replace('-', ' ')} ({statusTasks.length})
                </h3>
              </div>
              <div className="space-y-4">
                {statusTasks.map(task => {
                  const assignee = teamMembers.find(m => m.id === task.assignee);
                  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done';

                  return (
                    <Card key={task.id} className={`p-4 hover:shadow-lg transition-shadow ${isOverdue ? 'border-red-300 bg-red-50' : ''}`}>
                      <div className="mb-3">
                        <h5 className="font-medium text-gray-900 mb-1">{task.title}</h5>
                        <p className="text-sm text-gray-600">{task.description}</p>
                      </div>

                      <div className="flex justify-between items-center mb-3">
                        {getPriorityBadge(task.priority)}
                        <span className={`text-xs ${isOverdue ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                          {isOverdue ? '🚨 Overdue!' : `📅 ${task.dueDate}`}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="text-xs">
                          {projects.find(p => p.id === task.projectId)?.name || 'Unknown Project'}
                        </Badge>
                        {assignee && (
                          <div className="flex items-center gap-2">
                            <Avatar size="sm">{assignee.avatar}</Avatar>
                            <span className="text-xs text-gray-600">{assignee.name.split(' ')[0]}</span>
                          </div>
                        )}
                      </div>
                    </Card>
                  );
                })}

                {statusTasks.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <p className="text-sm">No tasks in {status.replace('-', ' ')}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-6">
      {/* Team Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">👥 Team Members</h1>
          <p className="text-gray-600 mt-1">Meet your project team and track their availability</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          ➕ Invite Member
        </Button>
      </div>

      {/* Team Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <h3 className="text-2xl font-bold text-green-600">{teamMembers.filter(m => m.status === 'online').length}</h3>
          <p className="text-sm text-gray-600">🟢 Online</p>
        </Card>
        <Card className="p-4 text-center">
          <h3 className="text-2xl font-bold text-orange-600">{teamMembers.filter(m => m.status === 'busy').length}</h3>
          <p className="text-sm text-gray-600">🟡 Busy</p>
        </Card>
        <Card className="p-4 text-center">
          <h3 className="text-2xl font-bold text-gray-600">{teamMembers.filter(m => m.status === 'offline').length}</h3>
          <p className="text-sm text-gray-600">⚫ Offline</p>
        </Card>
        <Card className="p-4 text-center">
          <h3 className="text-2xl font-bold text-blue-600">{teamMembers.length}</h3>
          <p className="text-sm text-gray-600">👥 Total</p>
        </Card>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map(member => {
          const memberTasks = tasks.filter(task => task.assignee === member.id && task.status !== 'done');
          const completedTasks = tasks.filter(task => task.assignee === member.id && task.status === 'done').length;

          return (
            <Card key={member.id} className="p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <Avatar size="lg" className="mr-4">
                  {member.avatar}
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{member.name}</h4>
                  <p className="text-sm text-gray-600">{member.role}</p>
                  <Badge
                    variant={member.status === 'online' ? 'default' : member.status === 'busy' ? 'secondary' : 'outline'}
                    className="mt-1"
                  >
                    {member.status === 'online' ? '🟢' : member.status === 'busy' ? '🟡' : '⚫'} {member.status}
                  </Badge>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">📧 {member.email}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Active Tasks:</span>
                  <span className="font-medium">{memberTasks.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Completed:</span>
                  <span className="font-medium text-green-600">{completedTasks}</span>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="font-medium mb-2 text-sm">Current Tasks:</h5>
                <div className="space-y-2 max-h-24 overflow-y-auto">
                  {memberTasks.slice(0, 3).map(task => (
                    <div key={task.id} className="bg-gray-50 p-2 rounded text-xs">
                      <div className="font-medium text-gray-900">{task.title}</div>
                      <div className="flex justify-between items-center mt-1">
                        {getStatusBadge(task.status)}
                        {getPriorityBadge(task.priority)}
                      </div>
                    </div>
                  ))}
                  {memberTasks.length === 0 && (
                    <p className="text-xs text-gray-500 italic">No active tasks</p>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  💬 Message
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  👤 Profile
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );

  // Main Application Render
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Application Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <h2 className="text-2xl font-bold text-blue-600">💼 ProjectFlow</h2>
              <nav className="flex gap-2">
                {[
                  { id: 'dashboard', label: '📊 Dashboard', description: 'Overview' },
                  { id: 'projects', label: '🚀 Projects', description: 'Manage' },
                  { id: 'tasks', label: '📋 Tasks', description: 'Track' },
                  { id: 'team', label: '👥 Team', description: 'Members' }
                ].map(tab => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? 'default' : 'ghost'}
                    onClick={() => setActiveTab(tab.id)}
                    className={activeTab === tab.id ? 'bg-blue-600 text-white' : ''}
                  >
                    {tab.label}
                  </Button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="relative">
                🔔
                {dashboardStats.overdueTasks > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 text-xs">
                    {dashboardStats.overdueTasks}
                  </Badge>
                )}
              </Button>
              <Button variant="outline" size="sm">⚙️</Button>
              <Avatar>AD</Avatar>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6">
        {/* Global Alert System */}
        {showAlert && (
          <Alert className="mb-6 border-l-4 border-blue-500 bg-blue-50">
            <div className="flex justify-between items-center">
              <span className="text-blue-800">{alertMessage}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAlert(false)}
                className="text-blue-600 hover:text-blue-800"
              >
                ✕
              </Button>
            </div>
          </Alert>
        )}

        {/* Dynamic Content Rendering */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'projects' && renderProjects()}
        {activeTab === 'tasks' && renderTasks()}
        {activeTab === 'team' && renderTeam()}
      </div>
    </div>
  );
};

export default FullApplicationDemo;
