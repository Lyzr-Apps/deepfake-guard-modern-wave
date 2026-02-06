import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import {
  Shield, Activity, Search, Download, Trash2, Filter,
  FileVideo, FileAudio, FileText, Clock, ChevronRight,
  Home as HomeIcon, FileSearch, Settings as SettingsIcon,
  History as HistoryIcon, Layout, AlertTriangle, CheckCircle,
  ChevronLeft, ChevronsLeft, ChevronsRight, Eye
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
        <h2 className="text-lg font-semibold text-white">Analysis History</h2>
        <p className="text-xs text-gray-400">Comprehensive detection archive and audit trail</p>
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
    high: { color: 'text-red-400 border-red-500/20 bg-red-500/10', label: 'HIGH' },
    medium: { color: 'text-yellow-400 border-yellow-500/20 bg-yellow-500/10', label: 'MEDIUM' },
    low: { color: 'text-green-400 border-green-500/20 bg-green-500/10', label: 'LOW' },
    none: { color: 'text-gray-400 border-gray-500/20 bg-gray-500/10', label: 'SAFE' }
  }

  const config = configs[level as keyof typeof configs] || configs.none

  return (
    <Badge variant="outline" className={cn("text-xs", config.color)}>
      {config.label}
    </Badge>
  )
}

// Mock history data
const mockHistoryData = [
  {
    id: 'RPT-2024-001',
    timestamp: '2024-06-21 14:23:10',
    mediaType: 'Video',
    fileName: 'verification_call.mp4',
    threatLevel: 'high',
    confidence: 86,
    status: 'completed',
    isDeepfake: true,
    findings: ['Facial artifacts detected', 'Temporal inconsistencies', 'GAN signatures present']
  },
  {
    id: 'RPT-2024-002',
    timestamp: '2024-06-21 14:15:42',
    mediaType: 'Audio',
    fileName: 'voice_auth.wav',
    threatLevel: 'medium',
    confidence: 62,
    status: 'completed',
    isDeepfake: false,
    findings: ['Minor spectral anomalies', 'Natural prosody patterns']
  },
  {
    id: 'RPT-2024-003',
    timestamp: '2024-06-21 13:58:33',
    mediaType: 'Text',
    fileName: 'email_content.txt',
    threatLevel: 'low',
    confidence: 23,
    status: 'completed',
    isDeepfake: false,
    findings: ['Natural language patterns', 'Low AI probability']
  },
  {
    id: 'RPT-2024-004',
    timestamp: '2024-06-21 13:42:17',
    mediaType: 'Video',
    fileName: 'kyc_video.mp4',
    threatLevel: 'high',
    confidence: 91,
    status: 'completed',
    isDeepfake: true,
    findings: ['Face swap detected', 'Lighting inconsistencies', 'High deepfake probability']
  },
  {
    id: 'RPT-2024-005',
    timestamp: '2024-06-21 13:18:55',
    mediaType: 'Audio',
    fileName: 'customer_call.mp3',
    threatLevel: 'none',
    confidence: 8,
    status: 'completed',
    isDeepfake: false,
    findings: ['Authentic voice patterns', 'No synthesis detected']
  },
  {
    id: 'RPT-2024-006',
    timestamp: '2024-06-21 12:45:22',
    mediaType: 'Video',
    fileName: 'ceo_statement.mp4',
    threatLevel: 'medium',
    confidence: 58,
    status: 'completed',
    isDeepfake: true,
    findings: ['Subtle facial artifacts', 'Moderate confidence']
  },
  {
    id: 'RPT-2024-007',
    timestamp: '2024-06-21 12:12:08',
    mediaType: 'Text',
    fileName: 'transaction_email.txt',
    threatLevel: 'low',
    confidence: 31,
    status: 'completed',
    isDeepfake: false,
    findings: ['Human-like composition', 'Low GPT probability']
  },
  {
    id: 'RPT-2024-008',
    timestamp: '2024-06-21 11:39:44',
    mediaType: 'Audio',
    fileName: 'fraud_alert_call.wav',
    threatLevel: 'high',
    confidence: 88,
    status: 'completed',
    isDeepfake: true,
    findings: ['Voice cloning detected', 'Synthetic speech patterns']
  },
  {
    id: 'RPT-2024-009',
    timestamp: '2024-06-21 11:05:17',
    mediaType: 'Video',
    fileName: 'investor_meeting.mp4',
    threatLevel: 'none',
    confidence: 5,
    status: 'completed',
    isDeepfake: false,
    findings: ['Authentic recording', 'No manipulation detected']
  },
  {
    id: 'RPT-2024-010',
    timestamp: '2024-06-21 10:28:55',
    mediaType: 'Text',
    fileName: 'support_ticket.txt',
    threatLevel: 'medium',
    confidence: 54,
    status: 'completed',
    isDeepfake: true,
    findings: ['AI-generated patterns', 'ChatGPT-like structure']
  }
]

export default function History() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterMediaType, setFilterMediaType] = useState('all')
  const [filterThreatLevel, setFilterThreatLevel] = useState('all')
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  // Filter data
  const filteredData = mockHistoryData.filter((item) => {
    const matchesSearch = item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesMediaType = filterMediaType === 'all' || item.mediaType.toLowerCase() === filterMediaType.toLowerCase()
    const matchesThreatLevel = filterThreatLevel === 'all' || item.threatLevel === filterThreatLevel
    return matchesSearch && matchesMediaType && matchesThreatLevel
  })

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  // Selection handlers
  const toggleRowSelection = (id: string) => {
    const newSelection = new Set(selectedRows)
    if (newSelection.has(id)) {
      newSelection.delete(id)
    } else {
      newSelection.add(id)
    }
    setSelectedRows(newSelection)
  }

  const toggleAllRows = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(paginatedData.map(item => item.id)))
    }
  }

  const getMediaIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'video': return FileVideo
      case 'audio': return FileAudio
      case 'text': return FileText
      default: return FileText
    }
  }

  return (
    <div className="flex h-screen bg-[#0A1628]">
      <Sidebar currentPath="/history" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav currentPath="/history" />
        <Header />

        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <Card className="bg-[#0F1E33] border-cyan-900/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center gap-2">
                      <HistoryIcon className="h-5 w-5 text-[#00D4FF]" />
                      Detection History
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {filteredData.length} total records
                    </CardDescription>
                  </div>
                  {selectedRows.size > 0 && (
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                        {selectedRows.size} selected
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export CSV
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Filters */}
                <div className="grid grid-cols-5 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label className="text-gray-300 text-xs">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search by file name or ID..."
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
                        <SelectItem value="none">Safe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300 text-xs">Per Page</Label>
                    <Select value={itemsPerPage.toString()} onValueChange={(v) => setItemsPerPage(Number(v))}>
                      <SelectTrigger className="bg-cyan-950/10 border-cyan-900/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Table */}
                <div className="border border-cyan-900/20 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-cyan-950/10 border-cyan-900/20 hover:bg-cyan-950/10">
                        <TableHead className="w-12">
                          <Checkbox
                            checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                            onCheckedChange={toggleAllRows}
                            className="border-cyan-500/30 data-[state=checked]:bg-[#00D4FF] data-[state=checked]:border-[#00D4FF]"
                          />
                        </TableHead>
                        <TableHead className="text-cyan-400">Timestamp</TableHead>
                        <TableHead className="text-cyan-400">Type</TableHead>
                        <TableHead className="text-cyan-400">File Name</TableHead>
                        <TableHead className="text-cyan-400">Threat</TableHead>
                        <TableHead className="text-cyan-400">Confidence</TableHead>
                        <TableHead className="text-cyan-400">Status</TableHead>
                        <TableHead className="text-cyan-400">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedData.map((item) => {
                        const MediaIcon = getMediaIcon(item.mediaType)
                        const isExpanded = expandedRow === item.id

                        return (
                          <>
                            <TableRow
                              key={item.id}
                              className={cn(
                                "border-cyan-900/20 hover:bg-cyan-950/5 cursor-pointer",
                                isExpanded && "bg-cyan-950/10"
                              )}
                              onClick={() => setExpandedRow(isExpanded ? null : item.id)}
                            >
                              <TableCell onClick={(e) => e.stopPropagation()}>
                                <Checkbox
                                  checked={selectedRows.has(item.id)}
                                  onCheckedChange={() => toggleRowSelection(item.id)}
                                  className="border-cyan-500/30 data-[state=checked]:bg-[#00D4FF] data-[state=checked]:border-[#00D4FF]"
                                />
                              </TableCell>
                              <TableCell className="text-gray-300 text-sm">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-3 w-3 text-gray-500" />
                                  {item.timestamp}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-xs flex items-center gap-1 w-fit">
                                  <MediaIcon className="h-3 w-3" />
                                  {item.mediaType}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-gray-300 text-sm font-medium max-w-xs truncate">
                                {item.fileName}
                              </TableCell>
                              <TableCell>
                                <ThreatBadge level={item.threatLevel} />
                              </TableCell>
                              <TableCell className="text-gray-300 text-sm">
                                <div className="flex items-center gap-2">
                                  <Progress value={item.confidence} className="h-1.5 w-16" />
                                  <span className={cn(
                                    "font-medium text-xs",
                                    item.confidence >= 70 ? "text-red-400" :
                                    item.confidence >= 40 ? "text-yellow-400" :
                                    "text-green-400"
                                  )}>
                                    {item.confidence}%
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                {item.isDeepfake ? (
                                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                                    DEEPFAKE
                                  </Badge>
                                ) : (
                                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                                    AUTHENTIC
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 px-2 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                                  >
                                    <Eye className="h-3 w-3 mr-1" />
                                    View
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 px-2 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                                  >
                                    <Download className="h-3 w-3" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>

                            {/* Expanded Detail Row */}
                            {isExpanded && (
                              <TableRow className="border-cyan-900/20 bg-cyan-950/10">
                                <TableCell colSpan={8}>
                                  <div className="p-4 space-y-4">
                                    <div className="grid grid-cols-2 gap-6">
                                      <div>
                                        <h4 className="text-sm font-medium text-cyan-400 mb-3">Analysis Details</h4>
                                        <div className="space-y-2 text-sm">
                                          <div className="flex justify-between">
                                            <span className="text-gray-400">Report ID:</span>
                                            <span className="text-white font-mono">{item.id}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-gray-400">Media Type:</span>
                                            <span className="text-white">{item.mediaType}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-gray-400">Threat Level:</span>
                                            <ThreatBadge level={item.threatLevel} />
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-gray-400">Confidence Score:</span>
                                            <span className="text-white font-medium">{item.confidence}%</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-gray-400">Detection Status:</span>
                                            {item.isDeepfake ? (
                                              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                                                DEEPFAKE DETECTED
                                              </Badge>
                                            ) : (
                                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                                                AUTHENTIC
                                              </Badge>
                                            )}
                                          </div>
                                        </div>
                                      </div>

                                      <div>
                                        <h4 className="text-sm font-medium text-cyan-400 mb-3">Technical Findings</h4>
                                        <ul className="space-y-2">
                                          {item.findings.map((finding, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                              <ChevronRight className="h-3 w-3 mt-0.5 text-cyan-400 flex-shrink-0" />
                                              {finding}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>

                                    <div className="flex gap-2 pt-4 border-t border-cyan-900/20">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                                      >
                                        <Download className="h-4 w-4 mr-2" />
                                        Export Full Report
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                                      >
                                        View Compliance Data
                                      </Button>
                                    </div>
                                  </div>
                                </TableCell>
                              </TableRow>
                            )}
                          </>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between pt-4">
                  <div className="text-sm text-gray-400">
                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} results
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(1)}
                      className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 disabled:opacity-50"
                    >
                      <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(p => p - 1)}
                      className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 disabled:opacity-50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let pageNum
                        if (totalPages <= 5) {
                          pageNum = i + 1
                        } else if (currentPage <= 3) {
                          pageNum = i + 1
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i
                        } else {
                          pageNum = currentPage - 2 + i
                        }

                        return (
                          <Button
                            key={pageNum}
                            size="sm"
                            variant="outline"
                            onClick={() => setCurrentPage(pageNum)}
                            className={cn(
                              "h-8 w-8 p-0 border-cyan-500/30",
                              currentPage === pageNum
                                ? "bg-[#00D4FF]/10 text-[#00D4FF] border-[#00D4FF]"
                                : "text-cyan-400 hover:bg-cyan-500/10"
                            )}
                          >
                            {pageNum}
                          </Button>
                        )
                      })}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(p => p + 1)}
                      className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 disabled:opacity-50"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(totalPages)}
                      className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 disabled:opacity-50"
                    >
                      <ChevronsRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Empty State */}
                {filteredData.length === 0 && (
                  <div className="text-center py-12">
                    <HistoryIcon className="h-16 w-16 mx-auto mb-4 text-cyan-400/20" />
                    <h3 className="text-lg font-medium text-gray-400 mb-2">No history records found</h3>
                    <p className="text-sm text-gray-500">
                      {searchQuery || filterMediaType !== 'all' || filterThreatLevel !== 'all'
                        ? 'Try adjusting your filters'
                        : 'Start analyzing media to build your detection history'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
