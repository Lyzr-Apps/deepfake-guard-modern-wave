import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { callAIAgent } from '@/utils/aiAgent'
import type { NormalizedAgentResponse } from '@/utils/aiAgent'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Upload, Shield, AlertTriangle, CheckCircle, XCircle,
  FileVideo, FileAudio, FileText, Loader2, Download,
  Settings as SettingsIcon, BarChart3, Activity, Clock,
  Home as HomeIcon, FileSearch, ChevronRight, Layout,
  History as HistoryIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Agent IDs from orchestrator
const DETECTION_COORDINATOR_ID = "6985825ac613a65b3c419393"

// TypeScript interfaces from test responses
interface SubAgentResult {
  analyzed: boolean
  is_deepfake: boolean
  confidence_score: number
  threat_level: string
  key_findings?: string[]
  findings?: Array<{
    category: string
    severity: string
    description: string
    timestamp_range?: string
    frame_range?: string
    text_excerpt?: string
  }>
}

interface ComplianceReport {
  report_id: string
  analysis_timestamp: string
  regulatory_flags: string[]
  audit_trail: string
  evidence_summary: string
}

interface EscalationActions {
  requires_escalation: boolean
  escalation_level: string
  recommended_actions: string[]
  notification_required: boolean
}

interface DetectionResult {
  overall_threat_level: string
  unified_confidence_score: number
  is_deepfake_detected: boolean
  media_types_analyzed: string[]
  sub_agent_results: {
    voice_analysis?: SubAgentResult
    video_analysis?: SubAgentResult
    text_analysis?: SubAgentResult
  }
  compliance_report: ComplianceReport
  escalation_actions: EscalationActions
  recommendations: string[]
}

interface AnalysisRecord {
  id: string
  timestamp: string
  mediaType: string
  threatLevel: string
  isDeepfake: boolean
  confidence: number
}

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
        <h2 className="text-lg font-semibold text-white">Deepfake Detection Dashboard</h2>
        <p className="text-xs text-gray-400">Real-time threat analysis for BFSI operations</p>
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
    high: { color: 'text-red-400 border-red-500/20 bg-red-500/10', label: 'HIGH THREAT' },
    medium: { color: 'text-yellow-400 border-yellow-500/20 bg-yellow-500/10', label: 'MEDIUM RISK' },
    low: { color: 'text-green-400 border-green-500/20 bg-green-500/10', label: 'LOW RISK' },
    none: { color: 'text-gray-400 border-gray-500/20 bg-gray-500/10', label: 'NO THREAT' }
  }

  const config = configs[level as keyof typeof configs] || configs.none

  return (
    <Badge variant="outline" className={config.color}>
      {config.label}
    </Badge>
  )
}

// Confidence gauge component
function ConfidenceGauge({ score }: { score: number }) {
  const getColor = (score: number) => {
    if (score >= 80) return 'text-red-400'
    if (score >= 50) return 'text-yellow-400'
    return 'text-green-400'
  }

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-700"
          />
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 56}`}
            strokeDashoffset={`${2 * Math.PI * 56 * (1 - score / 100)}`}
            className={getColor(score)}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={cn("text-3xl font-bold", getColor(score))}>{score}%</div>
            <div className="text-xs text-gray-400">Confidence</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'audio' | 'video' | 'text'>('video')
  const [sensitivity, setSensitivity] = useState([50])
  const [textInput, setTextInput] = useState('')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<DetectionResult | null>(null)
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisRecord[]>([])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
    }
  }

  const handleAnalyze = async () => {
    setLoading(true)
    setResponse(null)

    try {
      let message = ''

      if (activeTab === 'text' && textInput) {
        message = `Analyze this text for AI-generation patterns and deepfake indicators: "${textInput}"`
      } else if (uploadedFile) {
        message = `Analyze this ${activeTab} file for deepfake indicators. Filename: ${uploadedFile.name}. Sensitivity level: ${sensitivity[0] < 33 ? 'Low' : sensitivity[0] < 66 ? 'Medium' : 'High'}.`
      } else {
        message = `Perform a ${activeTab} deepfake analysis with ${sensitivity[0] < 33 ? 'low' : sensitivity[0] < 66 ? 'medium' : 'high'} sensitivity.`
      }

      const result = await callAIAgent(message, DETECTION_COORDINATOR_ID)

      if (result.success && result.response.status === 'success') {
        const detectionData = result.response.result as DetectionResult
        setResponse(detectionData)

        // Add to history
        const newRecord: AnalysisRecord = {
          id: detectionData.compliance_report.report_id,
          timestamp: new Date().toISOString(),
          mediaType: activeTab,
          threatLevel: detectionData.overall_threat_level,
          isDeepfake: detectionData.is_deepfake_detected,
          confidence: detectionData.unified_confidence_score
        }
        setAnalysisHistory(prev => [newRecord, ...prev].slice(0, 10))
      }
    } catch (error) {
      console.error('Analysis failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const getSensitivityLabel = (value: number) => {
    if (value < 33) return 'Low'
    if (value < 66) return 'Medium'
    return 'High'
  }

  const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="flex h-screen bg-[#0A1628]">
      <Sidebar currentPath="/" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav currentPath="/" />
        <Header />

        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              {/* LEFT COLUMN - Input */}
              <div className="space-y-6">
                {/* Media Upload Zone */}
                <Card className="bg-[#0F1E33] border-cyan-900/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Upload className="h-5 w-5 text-[#00D4FF]" />
                      Media Upload
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Upload audio, video, or text for deepfake analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Media Type Tabs */}
                    <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
                      <TabsList className="grid w-full grid-cols-3 bg-cyan-950/20">
                        <TabsTrigger value="audio" className="data-[state=active]:bg-[#00D4FF]/10 data-[state=active]:text-[#00D4FF]">
                          <FileAudio className="h-4 w-4 mr-2" />
                          Audio
                        </TabsTrigger>
                        <TabsTrigger value="video" className="data-[state=active]:bg-[#00D4FF]/10 data-[state=active]:text-[#00D4FF]">
                          <FileVideo className="h-4 w-4 mr-2" />
                          Video
                        </TabsTrigger>
                        <TabsTrigger value="text" className="data-[state=active]:bg-[#00D4FF]/10 data-[state=active]:text-[#00D4FF]">
                          <FileText className="h-4 w-4 mr-2" />
                          Text
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="audio" className="mt-4">
                        <div
                          onDragEnter={handleDrag}
                          onDragLeave={handleDrag}
                          onDragOver={handleDrag}
                          onDrop={handleDrop}
                          className={cn(
                            "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                            dragActive
                              ? "border-[#00D4FF] bg-cyan-500/5"
                              : "border-cyan-900/30 hover:border-cyan-500/50"
                          )}
                        >
                          <FileAudio className="h-12 w-12 mx-auto mb-3 text-cyan-400" />
                          <p className="text-sm text-gray-300 mb-2">Drag & drop audio file or</p>
                          <input
                            type="file"
                            id="audio-upload"
                            accept=".wav,.mp3"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById('audio-upload')?.click()}
                            className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                          >
                            Browse Files
                          </Button>
                          <p className="text-xs text-gray-500 mt-2">Supported: WAV, MP3</p>
                        </div>
                      </TabsContent>

                      <TabsContent value="video" className="mt-4">
                        <div
                          onDragEnter={handleDrag}
                          onDragLeave={handleDrag}
                          onDragOver={handleDrag}
                          onDrop={handleDrop}
                          className={cn(
                            "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                            dragActive
                              ? "border-[#00D4FF] bg-cyan-500/5"
                              : "border-cyan-900/30 hover:border-cyan-500/50"
                          )}
                        >
                          <FileVideo className="h-12 w-12 mx-auto mb-3 text-cyan-400" />
                          <p className="text-sm text-gray-300 mb-2">Drag & drop video file or</p>
                          <input
                            type="file"
                            id="video-upload"
                            accept=".mp4,.webm"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById('video-upload')?.click()}
                            className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                          >
                            Browse Files
                          </Button>
                          <p className="text-xs text-gray-500 mt-2">Supported: MP4, WebM</p>
                        </div>
                      </TabsContent>

                      <TabsContent value="text" className="mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="text-input" className="text-gray-300">Enter text to analyze</Label>
                          <Textarea
                            id="text-input"
                            placeholder="Paste email, message, or text content here..."
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                            className="min-h-[120px] bg-cyan-950/10 border-cyan-900/30 text-white placeholder:text-gray-500"
                          />
                        </div>
                      </TabsContent>
                    </Tabs>

                    {uploadedFile && (
                      <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">{uploadedFile.name}</span>
                        </div>
                        <button
                          onClick={() => setUploadedFile(null)}
                          className="text-gray-400 hover:text-red-400"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Detection Parameters */}
                <Card className="bg-[#0F1E33] border-cyan-900/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <SettingsIcon className="h-5 w-5 text-[#00D4FF]" />
                      Detection Parameters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-gray-300">Sensitivity Level</Label>
                        <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                          {getSensitivityLabel(sensitivity[0])}
                        </Badge>
                      </div>
                      <Slider
                        value={sensitivity}
                        onValueChange={setSensitivity}
                        max={100}
                        step={1}
                        className="[&_[role=slider]]:bg-[#00D4FF] [&_[role=slider]]:border-[#00D4FF]"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Low</span>
                        <span>Medium</span>
                        <span>High</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleAnalyze}
                      disabled={loading || (activeTab === 'text' && !textInput)}
                      className="w-full bg-[#00D4FF] hover:bg-[#00D4FF]/90 text-[#0A1628] font-semibold"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Shield className="h-4 w-4 mr-2" />
                          Analyze for Deepfake
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Analyses */}
                <Card className="bg-[#0F1E33] border-cyan-900/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Clock className="h-5 w-5 text-[#00D4FF]" />
                      Recent Analyses
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Last 10 detection runs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {analysisHistory.length > 0 ? (
                      <ScrollArea className="h-[300px]">
                        <div className="space-y-2">
                          {analysisHistory.map((record) => (
                            <div
                              key={record.id}
                              className="bg-cyan-950/10 border border-cyan-900/20 rounded-lg p-3 hover:bg-cyan-950/20 transition-colors"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {record.mediaType.toUpperCase()}
                                </Badge>
                                <ThreatBadge level={record.threatLevel} />
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-400">{formatTimestamp(record.timestamp)}</span>
                                <span className={cn(
                                  "font-medium",
                                  record.isDeepfake ? "text-red-400" : "text-green-400"
                                )}>
                                  {record.confidence}% confidence
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <BarChart3 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No analyses yet</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* RIGHT COLUMN - Results */}
              <div className="space-y-6">
                {response ? (
                  <>
                    {/* Alert Banner */}
                    {response.is_deepfake_detected && (
                      <Alert className="border-red-500/30 bg-red-500/10">
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                        <AlertTitle className="text-red-400 font-semibold">Deepfake Detected!</AlertTitle>
                        <AlertDescription className="text-red-300">
                          {response.escalation_actions.requires_escalation && (
                            <div className="mt-2">
                              <p className="font-medium">Escalation: {response.escalation_actions.escalation_level.toUpperCase()}</p>
                              <ul className="mt-1 space-y-1">
                                {response.escalation_actions.recommended_actions.map((action, i) => (
                                  <li key={i} className="text-sm flex items-start gap-2">
                                    <ChevronRight className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                    {action}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Detection Results Card */}
                    <Card className="bg-[#0F1E33] border-cyan-900/20">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-white flex items-center gap-2">
                            <Shield className="h-5 w-5 text-[#00D4FF]" />
                            Detection Results
                          </CardTitle>
                          <ThreatBadge level={response.overall_threat_level} />
                        </div>
                        <CardDescription className="text-gray-400">
                          Analysis ID: {response.compliance_report.report_id}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <ConfidenceGauge score={response.unified_confidence_score} />

                        <div className="space-y-3">
                          <div className="bg-cyan-950/10 border border-cyan-900/20 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-400">Detection Status</span>
                              {response.is_deepfake_detected ? (
                                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                                  DEEPFAKE DETECTED
                                </Badge>
                              ) : (
                                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                  AUTHENTIC
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-gray-500">
                              {response.media_types_analyzed.join(', ').toUpperCase()} analyzed
                            </p>
                          </div>

                          {/* Regulatory Flags */}
                          {response.compliance_report.regulatory_flags.length > 0 && (
                            <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
                              <h4 className="text-sm font-medium text-yellow-400 mb-2">Regulatory Flags</h4>
                              <div className="flex flex-wrap gap-2">
                                {response.compliance_report.regulatory_flags.map((flag, i) => (
                                  <Badge key={i} variant="outline" className="border-yellow-500/30 text-yellow-400 text-xs">
                                    {flag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Technical Findings Accordion */}
                        <Accordion type="single" collapsible className="space-y-2">
                          {response.sub_agent_results.video_analysis?.analyzed && (
                            <AccordionItem value="video" className="border-cyan-900/20 bg-cyan-950/10 rounded-lg px-4">
                              <AccordionTrigger className="text-white hover:text-cyan-400">
                                <div className="flex items-center gap-2">
                                  <FileVideo className="h-4 w-4" />
                                  Video Analysis
                                  <Badge variant="outline" className="ml-2 text-xs">
                                    {response.sub_agent_results.video_analysis.confidence_score}%
                                  </Badge>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="text-gray-400">
                                <div className="space-y-2 pt-2">
                                  {response.sub_agent_results.video_analysis.key_findings?.map((finding, i) => (
                                    <div key={i} className="flex items-start gap-2 text-sm">
                                      <ChevronRight className="h-3 w-3 mt-0.5 text-cyan-400 flex-shrink-0" />
                                      <span>{finding}</span>
                                    </div>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          )}

                          {response.sub_agent_results.voice_analysis?.analyzed && (
                            <AccordionItem value="voice" className="border-cyan-900/20 bg-cyan-950/10 rounded-lg px-4">
                              <AccordionTrigger className="text-white hover:text-cyan-400">
                                <div className="flex items-center gap-2">
                                  <FileAudio className="h-4 w-4" />
                                  Voice Analysis
                                  <Badge variant="outline" className="ml-2 text-xs">
                                    {response.sub_agent_results.voice_analysis.confidence_score}%
                                  </Badge>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="text-gray-400">
                                <div className="space-y-2 pt-2">
                                  {response.sub_agent_results.voice_analysis.key_findings?.map((finding, i) => (
                                    <div key={i} className="flex items-start gap-2 text-sm">
                                      <ChevronRight className="h-3 w-3 mt-0.5 text-cyan-400 flex-shrink-0" />
                                      <span>{finding}</span>
                                    </div>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          )}

                          {response.sub_agent_results.text_analysis?.analyzed && (
                            <AccordionItem value="text" className="border-cyan-900/20 bg-cyan-950/10 rounded-lg px-4">
                              <AccordionTrigger className="text-white hover:text-cyan-400">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4" />
                                  Text Analysis
                                  <Badge variant="outline" className="ml-2 text-xs">
                                    {response.sub_agent_results.text_analysis.confidence_score}%
                                  </Badge>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="text-gray-400">
                                <div className="space-y-2 pt-2">
                                  {response.sub_agent_results.text_analysis.findings?.map((finding, i) => (
                                    <div key={i} className="bg-cyan-950/20 rounded p-2">
                                      <div className="flex items-center gap-2 mb-1">
                                        <Badge variant="outline" className="text-xs">
                                          {finding.category}
                                        </Badge>
                                        <Badge variant="outline" className={cn(
                                          "text-xs",
                                          finding.severity === 'high' ? "border-red-500/30 text-red-400" :
                                          finding.severity === 'medium' ? "border-yellow-500/30 text-yellow-400" :
                                          "border-green-500/30 text-green-400"
                                        )}>
                                          {finding.severity}
                                        </Badge>
                                      </div>
                                      <p className="text-sm">{finding.description}</p>
                                      {finding.text_excerpt && (
                                        <p className="text-xs text-gray-500 mt-1 italic">&quot;{finding.text_excerpt}&quot;</p>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          )}
                        </Accordion>

                        {/* Recommendations */}
                        {response.recommendations.length > 0 && (
                          <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-cyan-400 mb-3 flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Recommendations
                            </h4>
                            <ul className="space-y-2">
                              {response.recommendations.map((rec, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                  <ChevronRight className="h-3 w-3 mt-0.5 text-cyan-400 flex-shrink-0" />
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <Button
                          variant="outline"
                          className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Export Detection Report
                        </Button>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <Card className="bg-[#0F1E33] border-cyan-900/20">
                    <CardContent className="flex flex-col items-center justify-center py-16">
                      <Shield className="h-16 w-16 text-cyan-400/20 mb-4" />
                      <h3 className="text-lg font-medium text-gray-400 mb-2">No Analysis Results Yet</h3>
                      <p className="text-sm text-gray-500 text-center max-w-md">
                        Upload media or enter text, configure detection parameters, and click &quot;Analyze for Deepfake&quot; to begin.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
