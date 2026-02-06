import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Shield, BarChart3, Activity, TrendingUp, TrendingDown,
  FileVideo, FileAudio, FileText, AlertTriangle, CheckCircle,
  Clock, Home as HomeIcon, FileSearch, Settings as SettingsIcon,
  History as HistoryIcon, Layout, XCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Sidebar navigation component
function Sidebar({ currentPath }: { currentPath: string }) {
  const navigate = useNavigate()

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Layout },
    { path: '/', label: 'Detection', icon: HomeIcon },
    { path: '/history', label: 'History', icon: HistoryIcon },
    { path: '/compliance', label: 'Compliance', icon: FileSearch },
    { path: '/settings', label: 'Settings', icon: SettingsIcon }
  ]

  return (
    <div className="w-64 bg-[#0A1628] border-r border-cyan-900/20 flex flex-col">
      <div className="p-6 border-b border-cyan-900/20">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-[#00D4FF]" />
          <div>
            <h1 className="text-xl font-bold text-white">DeepShield</h1>
            <p className="text-xs text-cyan-400">BFSI Security</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPath === item.path
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left",
                  isActive
                    ? "bg-cyan-500/10 text-[#00D4FF] border border-cyan-500/20"
                    : "text-gray-400 hover:bg-cyan-500/5 hover:text-cyan-300"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-cyan-900/20">
        <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="h-4 w-4 text-cyan-400" />
            <span className="text-xs font-medium text-cyan-400">System Status</span>
          </div>
          <p className="text-xs text-gray-400">All agents operational</p>
        </div>
      </div>
    </div>
  )
}

// Top Navigation Tabs
function TopNav({ currentPath }: { currentPath: string }) {
  const navigate = useNavigate()

  const tabs = [
    { path: '/dashboard', label: 'Dashboard', icon: Layout },
    { path: '/', label: 'Detection', icon: Shield },
    { path: '/history', label: 'History', icon: HistoryIcon },
    { path: '/compliance', label: 'Compliance', icon: FileSearch },
    { path: '/settings', label: 'Settings', icon: SettingsIcon }
  ]

  return (
    <div className="bg-[#0A1628] border-b border-cyan-900/20">
      <div className="flex items-center gap-1 px-6">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = currentPath === tab.path
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 border-b-2 transition-colors",
                isActive
                  ? "border-[#00D4FF] text-[#00D4FF]"
                  : "border-transparent text-gray-400 hover:text-cyan-300"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Header component
function Header() {
  return (
    <div className="h-16 bg-[#0A1628] border-b border-cyan-900/20 flex items-center justify-between px-6">
      <div>
        <h2 className="text-lg font-semibold text-white">Dashboard Overview</h2>
        <p className="text-xs text-gray-400">Real-time analytics and detection insights</p>
      </div>
      <div className="flex items-center gap-4">
        <Badge variant="outline" className="border-green-500/20 text-green-400 bg-green-500/5">
          <div className="h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse" />
          Online
        </Badge>
      </div>
    </div>
  )
}

// Threat level badge component
function ThreatBadge({ level }: { level: string }) {
  const configs = {
    high: { color: 'text-red-400 border-red-500/20 bg-red-500/10', label: 'HIGH', icon: AlertTriangle },
    medium: { color: 'text-yellow-400 border-yellow-500/20 bg-yellow-500/10', label: 'MEDIUM', icon: AlertTriangle },
    low: { color: 'text-green-400 border-green-500/20 bg-green-500/10', label: 'LOW', icon: CheckCircle },
    none: { color: 'text-gray-400 border-gray-500/20 bg-gray-500/10', label: 'SAFE', icon: CheckCircle }
  }

  const config = configs[level as keyof typeof configs] || configs.none
  const Icon = config.icon

  return (
    <Badge variant="outline" className={config.color}>
      <Icon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>
  )
}

// Mock data for dashboard
const mockStats = {
  totalAnalyses: 1247,
  deepfakesDetected: 42,
  avgConfidence: 78.5,
  last24h: 156
}

const mockRecentActivity = [
  {
    id: '1',
    timestamp: '2024-06-21 14:23:10',
    mediaType: 'video',
    fileName: 'verification_call.mp4',
    threatLevel: 'high',
    confidence: 86,
    isDeepfake: true
  },
  {
    id: '2',
    timestamp: '2024-06-21 14:15:42',
    mediaType: 'audio',
    fileName: 'voice_auth.wav',
    threatLevel: 'medium',
    confidence: 62,
    isDeepfake: false
  },
  {
    id: '3',
    timestamp: '2024-06-21 13:58:33',
    mediaType: 'text',
    fileName: 'email_content.txt',
    threatLevel: 'low',
    confidence: 23,
    isDeepfake: false
  },
  {
    id: '4',
    timestamp: '2024-06-21 13:42:17',
    mediaType: 'video',
    fileName: 'kyc_video.mp4',
    threatLevel: 'high',
    confidence: 91,
    isDeepfake: true
  },
  {
    id: '5',
    timestamp: '2024-06-21 13:18:55',
    mediaType: 'audio',
    fileName: 'customer_call.mp3',
    threatLevel: 'none',
    confidence: 8,
    isDeepfake: false
  }
]

const weeklyData = [
  { day: 'Mon', detections: 42, deepfakes: 3 },
  { day: 'Tue', detections: 38, deepfakes: 2 },
  { day: 'Wed', detections: 51, deepfakes: 5 },
  { day: 'Thu', detections: 45, deepfakes: 4 },
  { day: 'Fri', detections: 62, deepfakes: 7 },
  { day: 'Sat', detections: 28, deepfakes: 1 },
  { day: 'Sun', detections: 35, deepfakes: 2 }
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [activeAlerts, setActiveAlerts] = useState(3)

  const detectionRate = ((mockStats.deepfakesDetected / mockStats.totalAnalyses) * 100).toFixed(1)

  const formatTimestamp = (isoString: string) => {
    return isoString.replace(' ', ' • ')
  }

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'video': return FileVideo
      case 'audio': return FileAudio
      case 'text': return FileText
      default: return FileText
    }
  }

  return (
    <div className="flex h-screen bg-[#0A1628]">
      <Sidebar currentPath="/dashboard" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav currentPath="/dashboard" />
        <Header />

        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-4 gap-6">
              <Card className="bg-[#0F1E33] border-cyan-900/20">
                <CardHeader className="pb-3">
                  <CardDescription className="text-gray-400 text-xs">Total Analyses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-between">
                    <div className="text-3xl font-bold text-white">{mockStats.totalAnalyses.toLocaleString()}</div>
                    <div className="flex items-center gap-1 text-green-400 text-sm">
                      <TrendingUp className="h-4 w-4" />
                      <span>12%</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Last 30 days</p>
                </CardContent>
              </Card>

              <Card className="bg-[#0F1E33] border-cyan-900/20">
                <CardHeader className="pb-3">
                  <CardDescription className="text-gray-400 text-xs">Deepfakes Detected</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-between">
                    <div className="text-3xl font-bold text-red-400">{mockStats.deepfakesDetected}</div>
                    <Badge variant="outline" className="border-red-500/30 text-red-400 text-xs">
                      {detectionRate}%
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Detection rate</p>
                </CardContent>
              </Card>

              <Card className="bg-[#0F1E33] border-cyan-900/20">
                <CardHeader className="pb-3">
                  <CardDescription className="text-gray-400 text-xs">Avg Confidence Score</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-between">
                    <div className="text-3xl font-bold text-cyan-400">{mockStats.avgConfidence}%</div>
                    <div className="flex items-center gap-1 text-cyan-400 text-sm">
                      <TrendingUp className="h-4 w-4" />
                      <span>3%</span>
                    </div>
                  </div>
                  <Progress value={mockStats.avgConfidence} className="h-1 mt-3" />
                </CardContent>
              </Card>

              <Card className="bg-[#0F1E33] border-cyan-900/20">
                <CardHeader className="pb-3">
                  <CardDescription className="text-gray-400 text-xs">Recent 24h Activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-between">
                    <div className="text-3xl font-bold text-white">{mockStats.last24h}</div>
                    <div className="flex items-center gap-1 text-green-400 text-sm">
                      <TrendingUp className="h-4 w-4" />
                      <span>8%</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Analyses processed</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-2 gap-6">
              {/* Detection Timeline Chart */}
              <Card className="bg-[#0F1E33] border-cyan-900/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-[#00D4FF]" />
                    Detection Timeline (7 Days)
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Daily detection volume and deepfake findings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between gap-3">
                    {weeklyData.map((item, i) => {
                      const maxDetections = Math.max(...weeklyData.map(d => d.detections))
                      const detectionHeight = (item.detections / maxDetections) * 100
                      const deepfakeHeight = (item.deepfakes / item.detections) * detectionHeight

                      return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                          <div className="w-full relative" style={{ height: '200px' }}>
                            <div className="absolute bottom-0 w-full flex flex-col">
                              <div
                                className="w-full bg-gradient-to-t from-red-500/80 to-red-400 rounded-t"
                                style={{ height: `${deepfakeHeight}%` }}
                              />
                              <div
                                className="w-full bg-gradient-to-t from-[#00D4FF]/80 to-cyan-400 rounded-t"
                                style={{ height: `${detectionHeight - deepfakeHeight}%` }}
                              />
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs font-medium text-gray-400">{item.day}</div>
                            <div className="text-xs text-gray-500">{item.detections}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-sm bg-cyan-400" />
                      <span className="text-xs text-gray-400">Total Detections</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-sm bg-red-400" />
                      <span className="text-xs text-gray-400">Deepfakes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Threat Level Distribution */}
              <Card className="bg-[#0F1E33] border-cyan-900/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Activity className="h-5 w-5 text-[#00D4FF]" />
                    Threat Level Distribution
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Breakdown by severity and media type
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Threat Level Breakdown */}
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-400" />
                          High Threat
                        </span>
                        <span className="text-white font-medium">18 (1.4%)</span>
                      </div>
                      <div className="h-2 bg-cyan-950/20 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: '14%' }} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-400" />
                          Medium Risk
                        </span>
                        <span className="text-white font-medium">87 (7.0%)</span>
                      </div>
                      <div className="h-2 bg-cyan-950/20 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: '28%' }} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          Low Risk
                        </span>
                        <span className="text-white font-medium">342 (27.4%)</span>
                      </div>
                      <div className="h-2 bg-cyan-950/20 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '45%' }} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-gray-400" />
                          No Threat
                        </span>
                        <span className="text-white font-medium">800 (64.2%)</span>
                      </div>
                      <div className="h-2 bg-cyan-950/20 rounded-full overflow-hidden">
                        <div className="h-full bg-gray-500 rounded-full" style={{ width: '80%' }} />
                      </div>
                    </div>
                  </div>

                  {/* Media Type Breakdown */}
                  <div className="pt-4 border-t border-cyan-900/20">
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Media Type Breakdown</h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-cyan-950/10 border border-cyan-900/20 rounded-lg p-3 text-center">
                        <FileVideo className="h-5 w-5 mx-auto mb-2 text-cyan-400" />
                        <div className="text-lg font-bold text-white">58%</div>
                        <div className="text-xs text-gray-400">Video</div>
                      </div>
                      <div className="bg-cyan-950/10 border border-cyan-900/20 rounded-lg p-3 text-center">
                        <FileAudio className="h-5 w-5 mx-auto mb-2 text-cyan-400" />
                        <div className="text-lg font-bold text-white">28%</div>
                        <div className="text-xs text-gray-400">Audio</div>
                      </div>
                      <div className="bg-cyan-950/10 border border-cyan-900/20 rounded-lg p-3 text-center">
                        <FileText className="h-5 w-5 mx-auto mb-2 text-cyan-400" />
                        <div className="text-lg font-bold text-white">14%</div>
                        <div className="text-xs text-gray-400">Text</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats & Recent Activity Row */}
            <div className="grid grid-cols-3 gap-6">
              {/* Quick Stats */}
              <Card className="bg-[#0F1E33] border-cyan-900/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Activity className="h-5 w-5 text-[#00D4FF]" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-cyan-950/10 border border-cyan-900/20 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">Most Common Threat</span>
                      <Badge variant="outline" className="text-xs">Video</Badge>
                    </div>
                    <p className="text-sm text-white font-medium">Facial Deepfake</p>
                  </div>

                  <div className="bg-cyan-950/10 border border-cyan-900/20 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">Detection Accuracy</span>
                      <Badge variant="outline" className="border-green-500/30 text-green-400 text-xs">
                        97.9%
                      </Badge>
                    </div>
                    <Progress value={97.9} className="h-2" />
                  </div>

                  <div className="bg-cyan-950/10 border border-cyan-900/20 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">Active Alerts</span>
                      <Badge variant="outline" className="border-red-500/30 text-red-400 text-xs">
                        {activeAlerts}
                      </Badge>
                    </div>
                    <p className="text-sm text-white font-medium">Requires attention</p>
                  </div>

                  <Button
                    onClick={() => navigate('/history')}
                    variant="outline"
                    className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                  >
                    <HistoryIcon className="h-4 w-4 mr-2" />
                    View Full History
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity Feed */}
              <Card className="bg-[#0F1E33] border-cyan-900/20 col-span-2">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="h-5 w-5 text-[#00D4FF]" />
                    Recent Activity Feed
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Last 5 detection analyses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[280px]">
                    <div className="space-y-3">
                      {mockRecentActivity.map((activity) => {
                        const MediaIcon = getMediaIcon(activity.mediaType)
                        return (
                          <div
                            key={activity.id}
                            className="bg-cyan-950/10 border border-cyan-900/20 rounded-lg p-4 hover:bg-cyan-950/20 transition-colors"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <MediaIcon className="h-4 w-4 text-cyan-400" />
                                <span className="text-sm font-medium text-white">{activity.fileName}</span>
                              </div>
                              <ThreatBadge level={activity.threatLevel} />
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2 text-gray-400">
                                <Clock className="h-3 w-3" />
                                {formatTimestamp(activity.timestamp)}
                              </div>
                              <div className="flex items-center gap-3">
                                {activity.isDeepfake ? (
                                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                                    DEEPFAKE
                                  </Badge>
                                ) : (
                                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                                    AUTHENTIC
                                  </Badge>
                                )}
                                <span className={cn(
                                  "font-medium",
                                  activity.confidence >= 70 ? "text-red-400" :
                                  activity.confidence >= 40 ? "text-yellow-400" :
                                  "text-green-400"
                                )}>
                                  {activity.confidence}%
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
