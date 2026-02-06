import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Shield, FileSearch, Download, Filter, Calendar as CalendarIcon,
  BarChart3, PieChart, TrendingUp, FileText, Activity,
  Home as HomeIcon, Settings as SettingsIcon, Search,
  AlertTriangle, CheckCircle, Clock, ChevronRight, Layout,
  History as HistoryIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

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
        <h2 className="text-lg font-semibold text-white">Compliance Center</h2>
        <p className="text-xs text-gray-400">Audit logs, reports, and analytics</p>
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

// Mock data for audit logs
const mockAuditLogs = [
  {
    id: '1',
    timestamp: '2024-06-21 11:15:10',
    mediaType: 'Video',
    threatLevel: 'high',
    isDeepfake: true,
    confidence: 86,
    user: 'security@bank.com',
    action: 'Flagged for review'
  },
  {
    id: '2',
    timestamp: '2024-06-21 10:42:33',
    mediaType: 'Audio',
    threatLevel: 'medium',
    isDeepfake: false,
    confidence: 42,
    user: 'fraud@bank.com',
    action: 'Passed verification'
  },
  {
    id: '3',
    timestamp: '2024-06-21 09:18:55',
    mediaType: 'Text',
    threatLevel: 'low',
    isDeepfake: false,
    confidence: 15,
    user: 'compliance@bank.com',
    action: 'Approved'
  },
  {
    id: '4',
    timestamp: '2024-06-20 16:30:22',
    mediaType: 'Video',
    threatLevel: 'high',
    isDeepfake: true,
    confidence: 91,
    user: 'security@bank.com',
    action: 'Escalated to fraud team'
  },
  {
    id: '5',
    timestamp: '2024-06-20 14:55:17',
    mediaType: 'Audio',
    threatLevel: 'medium',
    isDeepfake: true,
    confidence: 68,
    user: 'kyc@bank.com',
    action: 'Rejected verification'
  }
]

// Threat level badge component
function ThreatBadge({ level }: { level: string }) {
  const configs = {
    high: { color: 'text-red-400 border-red-500/20 bg-red-500/10', label: 'HIGH' },
    medium: { color: 'text-yellow-400 border-yellow-500/20 bg-yellow-500/10', label: 'MEDIUM' },
    low: { color: 'text-green-400 border-green-500/20 bg-green-500/10', label: 'LOW' },
    none: { color: 'text-gray-400 border-gray-500/20 bg-gray-500/10', label: 'NONE' }
  }

  const config = configs[level as keyof typeof configs] || configs.none

  return (
    <Badge variant="outline" className={config.color}>
      {config.label}
    </Badge>
  )
}

export default function Compliance() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterMediaType, setFilterMediaType] = useState('all')
  const [filterThreatLevel, setFilterThreatLevel] = useState('all')
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()
  const [complianceFramework, setComplianceFramework] = useState('sox')

  const filteredLogs = mockAuditLogs.filter((log) => {
    const matchesSearch = log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesMediaType = filterMediaType === 'all' || log.mediaType.toLowerCase() === filterMediaType
    const matchesThreatLevel = filterThreatLevel === 'all' || log.threatLevel === filterThreatLevel
    return matchesSearch && matchesMediaType && matchesThreatLevel
  })

  return (
    <div className="flex h-screen bg-[#0A1628]">
      <Sidebar currentPath="/compliance" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav currentPath="/compliance" />
        <Header />

        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <Tabs defaultValue="audit" className="space-y-6">
              <TabsList className="bg-cyan-950/20 border border-cyan-900/20">
                <TabsTrigger value="audit" className="data-[state=active]:bg-[#00D4FF]/10 data-[state=active]:text-[#00D4FF]">
                  <FileText className="h-4 w-4 mr-2" />
                  Audit Logs
                </TabsTrigger>
                <TabsTrigger value="reports" className="data-[state=active]:bg-[#00D4FF]/10 data-[state=active]:text-[#00D4FF]">
                  <Download className="h-4 w-4 mr-2" />
                  Reports
                </TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-[#00D4FF]/10 data-[state=active]:text-[#00D4FF]">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </TabsTrigger>
              </TabsList>

              {/* Audit Logs Tab */}
              <TabsContent value="audit" className="space-y-6">
                <Card className="bg-[#0F1E33] border-cyan-900/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <FileText className="h-5 w-5 text-[#00D4FF]" />
                      Audit Log
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Comprehensive detection history with filtering and search
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Filters */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label className="text-gray-300 text-xs">Search</Label>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Search logs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 bg-cyan-950/10 border-cyan-900/30 text-white placeholder:text-gray-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-300 text-xs">Media Type</Label>
                        <Select value={filterMediaType} onValueChange={setFilterMediaType}>
                          <SelectTrigger className="bg-cyan-950/10 border-cyan-900/30 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="audio">Audio</SelectItem>
                            <SelectItem value="text">Text</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-300 text-xs">Threat Level</Label>
                        <Select value={filterThreatLevel} onValueChange={setFilterThreatLevel}>
                          <SelectTrigger className="bg-cyan-950/10 border-cyan-900/30 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Levels</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-300 text-xs">Actions</Label>
                        <Button
                          variant="outline"
                          className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Export CSV
                        </Button>
                      </div>
                    </div>

                    {/* Audit Table */}
                    <div className="border border-cyan-900/20 rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-cyan-950/10 border-cyan-900/20 hover:bg-cyan-950/10">
                            <TableHead className="text-cyan-400">Timestamp</TableHead>
                            <TableHead className="text-cyan-400">Media Type</TableHead>
                            <TableHead className="text-cyan-400">Threat Level</TableHead>
                            <TableHead className="text-cyan-400">Detection</TableHead>
                            <TableHead className="text-cyan-400">Confidence</TableHead>
                            <TableHead className="text-cyan-400">User</TableHead>
                            <TableHead className="text-cyan-400">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredLogs.map((log) => (
                            <TableRow
                              key={log.id}
                              className="border-cyan-900/20 hover:bg-cyan-950/5"
                            >
                              <TableCell className="text-gray-300 text-sm">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-3 w-3 text-gray-500" />
                                  {log.timestamp}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-xs">
                                  {log.mediaType}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <ThreatBadge level={log.threatLevel} />
                              </TableCell>
                              <TableCell>
                                {log.isDeepfake ? (
                                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                                    DEEPFAKE
                                  </Badge>
                                ) : (
                                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                                    AUTHENTIC
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-gray-300 text-sm font-medium">
                                {log.confidence}%
                              </TableCell>
                              <TableCell className="text-gray-400 text-sm">
                                {log.user}
                              </TableCell>
                              <TableCell className="text-gray-300 text-sm">
                                {log.action}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {filteredLogs.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <FileSearch className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No logs match your filters</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reports Tab */}
              <TabsContent value="reports" className="space-y-6">
                <Card className="bg-[#0F1E33] border-cyan-900/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Download className="h-5 w-5 text-[#00D4FF]" />
                      Report Generator
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Generate compliance reports for regulatory frameworks
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-gray-300">Date Range</Label>
                          <div className="flex gap-2">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal bg-cyan-950/10 border-cyan-900/30",
                                    !dateFrom && "text-gray-500"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {dateFrom ? format(dateFrom, "PPP") : "From date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={dateFrom}
                                  onSelect={setDateFrom}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>

                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal bg-cyan-950/10 border-cyan-900/30",
                                    !dateTo && "text-gray-500"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {dateTo ? format(dateTo, "PPP") : "To date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={dateTo}
                                  onSelect={setDateTo}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-gray-300">Compliance Framework</Label>
                          <Select value={complianceFramework} onValueChange={setComplianceFramework}>
                            <SelectTrigger className="bg-cyan-950/10 border-cyan-900/30 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sox">SOX (Sarbanes-Oxley)</SelectItem>
                              <SelectItem value="pci-dss">PCI-DSS</SelectItem>
                              <SelectItem value="gdpr">GDPR</SelectItem>
                              <SelectItem value="iso27001">ISO 27001</SelectItem>
                              <SelectItem value="nist">NIST Cybersecurity Framework</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Button
                          className="w-full bg-[#00D4FF] hover:bg-[#00D4FF]/90 text-[#0A1628] font-semibold"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Generate Report
                        </Button>
                      </div>

                      <div className="bg-cyan-950/10 border border-cyan-900/20 rounded-lg p-6">
                        <h4 className="text-white font-medium mb-4">Report Preview</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Framework:</span>
                            <span className="text-white font-medium">
                              {complianceFramework === 'sox' ? 'SOX' :
                               complianceFramework === 'pci-dss' ? 'PCI-DSS' :
                               complianceFramework === 'gdpr' ? 'GDPR' :
                               complianceFramework === 'iso27001' ? 'ISO 27001' :
                               'NIST'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Period:</span>
                            <span className="text-white font-medium">
                              {dateFrom && dateTo
                                ? `${format(dateFrom, "MMM d")} - ${format(dateTo, "MMM d, yyyy")}`
                                : "Not selected"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Total Detections:</span>
                            <span className="text-white font-medium">247</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Deepfakes Found:</span>
                            <span className="text-red-400 font-medium">18</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Format:</span>
                            <span className="text-white font-medium">PDF with digital signature</span>
                          </div>
                        </div>

                        <div className="mt-6 p-3 bg-cyan-500/5 border border-cyan-500/20 rounded">
                          <p className="text-xs text-cyan-400">
                            Reports include audit trails, regulatory compliance mapping, and executive summaries.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-3 gap-6">
                  {/* Stat Cards */}
                  <Card className="bg-[#0F1E33] border-cyan-900/20">
                    <CardHeader className="pb-3">
                      <CardDescription className="text-gray-400 text-xs">Total Detections (30d)</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline gap-2">
                        <div className="text-3xl font-bold text-white">1,247</div>
                        <div className="flex items-center gap-1 text-green-400 text-sm">
                          <TrendingUp className="h-3 w-3" />
                          <span>12%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#0F1E33] border-cyan-900/20">
                    <CardHeader className="pb-3">
                      <CardDescription className="text-gray-400 text-xs">Deepfakes Detected</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline gap-2">
                        <div className="text-3xl font-bold text-red-400">42</div>
                        <div className="flex items-center gap-1 text-red-400 text-sm">
                          <TrendingUp className="h-3 w-3" />
                          <span>8%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#0F1E33] border-cyan-900/20">
                    <CardHeader className="pb-3">
                      <CardDescription className="text-gray-400 text-xs">False Positive Rate</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline gap-2">
                        <div className="text-3xl font-bold text-green-400">2.1%</div>
                        <div className="flex items-center gap-1 text-green-400 text-sm">
                          <TrendingUp className="h-3 w-3 rotate-180" />
                          <span>0.3%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-2 gap-6">
                  <Card className="bg-[#0F1E33] border-cyan-900/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-[#00D4FF]" />
                        Detection Volume Trends
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Daily detection activity over the last 30 days
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-end justify-between gap-2">
                        {[42, 38, 51, 45, 62, 48, 55, 39, 47, 58, 44, 51, 49, 56].map((value, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div
                              className="w-full bg-gradient-to-t from-[#00D4FF] to-cyan-400 rounded-t"
                              style={{ height: `${(value / 62) * 100}%` }}
                            />
                            <span className="text-xs text-gray-500">{i + 1}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#0F1E33] border-cyan-900/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <PieChart className="h-5 w-5 text-[#00D4FF]" />
                        Threat Type Distribution
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Breakdown by media type
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-300">Video Deepfakes</span>
                            <span className="text-white font-medium">58%</span>
                          </div>
                          <div className="h-2 bg-cyan-950/20 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 rounded-full" style={{ width: '58%' }} />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-300">Audio Deepfakes</span>
                            <span className="text-white font-medium">28%</span>
                          </div>
                          <div className="h-2 bg-cyan-950/20 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-500 rounded-full" style={{ width: '28%' }} />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-300">Text/AI-Generated</span>
                            <span className="text-white font-medium">14%</span>
                          </div>
                          <div className="h-2 bg-cyan-950/20 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-500 rounded-full" style={{ width: '14%' }} />
                          </div>
                        </div>

                        <div className="mt-6 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
                          <h5 className="text-sm font-medium text-cyan-400 mb-2">Key Insights</h5>
                          <ul className="space-y-1">
                            <li className="flex items-start gap-2 text-xs text-gray-300">
                              <ChevronRight className="h-3 w-3 mt-0.5 text-cyan-400 flex-shrink-0" />
                              Video deepfakes remain the primary threat vector
                            </li>
                            <li className="flex items-start gap-2 text-xs text-gray-300">
                              <ChevronRight className="h-3 w-3 mt-0.5 text-cyan-400 flex-shrink-0" />
                              Audio synthesis attacks increased 15% this month
                            </li>
                            <li className="flex items-start gap-2 text-xs text-gray-300">
                              <ChevronRight className="h-3 w-3 mt-0.5 text-cyan-400 flex-shrink-0" />
                              Detection accuracy improved to 97.9%
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
