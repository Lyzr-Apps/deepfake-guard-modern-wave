import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Shield, Settings as SettingsIcon, Activity, Save, Key,
  Home as HomeIcon, FileSearch, Bell, Lock, Users, Sliders
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Sidebar navigation component
function Sidebar({ currentPath }: { currentPath: string }) {
  const navigate = useNavigate()

  const navItems = [
    { path: '/', label: 'Detection Dashboard', icon: HomeIcon },
    { path: '/compliance', label: 'Compliance Center', icon: FileSearch },
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

// Header component
function Header() {
  return (
    <div className="h-16 bg-[#0A1628] border-b border-cyan-900/20 flex items-center justify-between px-6">
      <div>
        <h2 className="text-lg font-semibold text-white">Settings</h2>
        <p className="text-xs text-gray-400">Configure detection parameters and system preferences</p>
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

export default function Settings() {
  const [voiceSensitivity, setVoiceSensitivity] = useState([75])
  const [videoSensitivity, setVideoSensitivity] = useState([80])
  const [textSensitivity, setTextSensitivity] = useState([70])
  const [autoEscalationLevel, setAutoEscalationLevel] = useState([85])

  const [emailNotifications, setEmailNotifications] = useState(true)
  const [highThreatAlerts, setHighThreatAlerts] = useState(true)
  const [weeklyReports, setWeeklyReports] = useState(false)
  const [escalationNotify, setEscalationNotify] = useState(true)

  const [mfaEndpoint, setMfaEndpoint] = useState('https://mfa.example.com/verify')
  const [siemWebhook, setSiemWebhook] = useState('https://siem.example.com/webhook')
  const [apiKey, setApiKey] = useState('sk_live_••••••••••••••••')

  const getSensitivityLabel = (value: number) => {
    if (value < 33) return 'Low'
    if (value < 66) return 'Medium'
    return 'High'
  }

  return (
    <div className="flex h-screen bg-[#0A1628]">
      <Sidebar currentPath="/settings" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <Tabs defaultValue="thresholds" className="space-y-6">
              <TabsList className="bg-cyan-950/20 border border-cyan-900/20">
                <TabsTrigger value="thresholds" className="data-[state=active]:bg-[#00D4FF]/10 data-[state=active]:text-[#00D4FF]">
                  <Sliders className="h-4 w-4 mr-2" />
                  Detection Thresholds
                </TabsTrigger>
                <TabsTrigger value="integrations" className="data-[state=active]:bg-[#00D4FF]/10 data-[state=active]:text-[#00D4FF]">
                  <Lock className="h-4 w-4 mr-2" />
                  Integrations
                </TabsTrigger>
                <TabsTrigger value="alerts" className="data-[state=active]:bg-[#00D4FF]/10 data-[state=active]:text-[#00D4FF]">
                  <Bell className="h-4 w-4 mr-2" />
                  Alert Preferences
                </TabsTrigger>
                <TabsTrigger value="users" className="data-[state=active]:bg-[#00D4FF]/10 data-[state=active]:text-[#00D4FF]">
                  <Users className="h-4 w-4 mr-2" />
                  User Management
                </TabsTrigger>
              </TabsList>

              {/* Detection Thresholds Tab */}
              <TabsContent value="thresholds" className="space-y-6">
                <Card className="bg-[#0F1E33] border-cyan-900/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Sliders className="h-5 w-5 text-[#00D4FF]" />
                      Detection Sensitivity Levels
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Configure detection thresholds for each media type
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Voice Sensitivity */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-gray-300">Voice Analysis Sensitivity</Label>
                        <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                          {getSensitivityLabel(voiceSensitivity[0])} ({voiceSensitivity[0]}%)
                        </Badge>
                      </div>
                      <Slider
                        value={voiceSensitivity}
                        onValueChange={setVoiceSensitivity}
                        max={100}
                        step={1}
                        className="[&_[role=slider]]:bg-[#00D4FF] [&_[role=slider]]:border-[#00D4FF]"
                      />
                      <p className="text-xs text-gray-500">
                        Higher sensitivity increases detection accuracy but may produce more false positives
                      </p>
                    </div>

                    <Separator className="bg-cyan-900/20" />

                    {/* Video Sensitivity */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-gray-300">Video Analysis Sensitivity</Label>
                        <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                          {getSensitivityLabel(videoSensitivity[0])} ({videoSensitivity[0]}%)
                        </Badge>
                      </div>
                      <Slider
                        value={videoSensitivity}
                        onValueChange={setVideoSensitivity}
                        max={100}
                        step={1}
                        className="[&_[role=slider]]:bg-[#00D4FF] [&_[role=slider]]:border-[#00D4FF]"
                      />
                      <p className="text-xs text-gray-500">
                        Detects facial artifacts, temporal anomalies, and GAN-generated signatures
                      </p>
                    </div>

                    <Separator className="bg-cyan-900/20" />

                    {/* Text Sensitivity */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-gray-300">Text Analysis Sensitivity</Label>
                        <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                          {getSensitivityLabel(textSensitivity[0])} ({textSensitivity[0]}%)
                        </Badge>
                      </div>
                      <Slider
                        value={textSensitivity}
                        onValueChange={setTextSensitivity}
                        max={100}
                        step={1}
                        className="[&_[role=slider]]:bg-[#00D4FF] [&_[role=slider]]:border-[#00D4FF]"
                      />
                      <p className="text-xs text-gray-500">
                        Identifies AI-generated text patterns and social engineering attempts
                      </p>
                    </div>

                    <Separator className="bg-cyan-900/20" />

                    {/* Auto-Escalation Trigger */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-gray-300">Auto-Escalation Trigger Level</Label>
                        <Badge variant="outline" className="border-red-500/30 text-red-400">
                          {autoEscalationLevel[0]}% confidence
                        </Badge>
                      </div>
                      <Slider
                        value={autoEscalationLevel}
                        onValueChange={setAutoEscalationLevel}
                        max={100}
                        step={1}
                        className="[&_[role=slider]]:bg-red-500 [&_[role=slider]]:border-red-500"
                      />
                      <p className="text-xs text-gray-500">
                        Automatically escalate detections above this confidence threshold
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <Button className="bg-[#00D4FF] hover:bg-[#00D4FF]/90 text-[#0A1628] font-semibold">
                        <Save className="h-4 w-4 mr-2" />
                        Save Thresholds
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Integrations Tab */}
              <TabsContent value="integrations" className="space-y-6">
                <Card className="bg-[#0F1E33] border-cyan-900/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Lock className="h-5 w-5 text-[#00D4FF]" />
                      Integration Configuration
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Configure external system integrations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* MFA Gateway */}
                    <div className="space-y-2">
                      <Label className="text-gray-300">MFA Gateway Endpoint</Label>
                      <Input
                        value={mfaEndpoint}
                        onChange={(e) => setMfaEndpoint(e.target.value)}
                        className="bg-cyan-950/10 border-cyan-900/30 text-white"
                      />
                      <p className="text-xs text-gray-500">
                        Multi-factor authentication verification endpoint for escalated threats
                      </p>
                    </div>

                    <Separator className="bg-cyan-900/20" />

                    {/* SIEM Webhook */}
                    <div className="space-y-2">
                      <Label className="text-gray-300">SIEM Webhook URL</Label>
                      <Input
                        value={siemWebhook}
                        onChange={(e) => setSiemWebhook(e.target.value)}
                        className="bg-cyan-950/10 border-cyan-900/30 text-white"
                      />
                      <p className="text-xs text-gray-500">
                        Security Information and Event Management system integration
                      </p>
                    </div>

                    <Separator className="bg-cyan-900/20" />

                    {/* API Key Management */}
                    <div className="space-y-2">
                      <Label className="text-gray-300">API Key</Label>
                      <div className="flex gap-2">
                        <Input
                          value={apiKey}
                          readOnly
                          type="password"
                          className="bg-cyan-950/10 border-cyan-900/30 text-white"
                        />
                        <Button
                          variant="outline"
                          className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                        >
                          <Key className="h-4 w-4 mr-2" />
                          Regenerate
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">
                        API key for programmatic access to DeepShield detection services
                      </p>
                    </div>

                    <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
                      <p className="text-sm text-yellow-400">
                        <span className="font-semibold">Security Notice:</span> All integration endpoints should use HTTPS and implement proper authentication mechanisms.
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <Button className="bg-[#00D4FF] hover:bg-[#00D4FF]/90 text-[#0A1628] font-semibold">
                        <Save className="h-4 w-4 mr-2" />
                        Save Integration Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Alert Preferences Tab */}
              <TabsContent value="alerts" className="space-y-6">
                <Card className="bg-[#0F1E33] border-cyan-900/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Bell className="h-5 w-5 text-[#00D4FF]" />
                      Alert and Notification Settings
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Configure how and when you receive alerts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Email Notifications */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-gray-300">Email Notifications</Label>
                        <p className="text-xs text-gray-500">Receive detection alerts via email</p>
                      </div>
                      <Switch
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                        className="data-[state=checked]:bg-[#00D4FF]"
                      />
                    </div>

                    <Separator className="bg-cyan-900/20" />

                    {/* High Threat Alerts */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-gray-300">Immediate High Threat Alerts</Label>
                        <p className="text-xs text-gray-500">Instant notification for high-confidence deepfakes</p>
                      </div>
                      <Switch
                        checked={highThreatAlerts}
                        onCheckedChange={setHighThreatAlerts}
                        className="data-[state=checked]:bg-[#00D4FF]"
                      />
                    </div>

                    <Separator className="bg-cyan-900/20" />

                    {/* Weekly Reports */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-gray-300">Weekly Summary Reports</Label>
                        <p className="text-xs text-gray-500">Receive weekly analytics and detection summaries</p>
                      </div>
                      <Switch
                        checked={weeklyReports}
                        onCheckedChange={setWeeklyReports}
                        className="data-[state=checked]:bg-[#00D4FF]"
                      />
                    </div>

                    <Separator className="bg-cyan-900/20" />

                    {/* Escalation Notifications */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-gray-300">Escalation Notifications</Label>
                        <p className="text-xs text-gray-500">Notify when threats are escalated to review teams</p>
                      </div>
                      <Switch
                        checked={escalationNotify}
                        onCheckedChange={setEscalationNotify}
                        className="data-[state=checked]:bg-[#00D4FF]"
                      />
                    </div>

                    <Separator className="bg-cyan-900/20" />

                    {/* Escalation Routing Rules */}
                    <div className="space-y-3">
                      <Label className="text-gray-300">Escalation Routing</Label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-cyan-950/10 border border-cyan-900/20 rounded-lg">
                          <div>
                            <p className="text-sm text-white">High Threat Video</p>
                            <p className="text-xs text-gray-500">Route to: fraud@bank.com</p>
                          </div>
                          <Badge variant="outline" className="border-red-500/30 text-red-400">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-cyan-950/10 border border-cyan-900/20 rounded-lg">
                          <div>
                            <p className="text-sm text-white">High Threat Audio</p>
                            <p className="text-xs text-gray-500">Route to: security@bank.com</p>
                          </div>
                          <Badge variant="outline" className="border-red-500/30 text-red-400">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-cyan-950/10 border border-cyan-900/20 rounded-lg">
                          <div>
                            <p className="text-sm text-white">Medium Threat (All)</p>
                            <p className="text-xs text-gray-500">Route to: compliance@bank.com</p>
                          </div>
                          <Badge variant="outline" className="border-yellow-500/30 text-yellow-400">Active</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button className="bg-[#00D4FF] hover:bg-[#00D4FF]/90 text-[#0A1628] font-semibold">
                        <Save className="h-4 w-4 mr-2" />
                        Save Alert Preferences
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* User Management Tab */}
              <TabsContent value="users" className="space-y-6">
                <Card className="bg-[#0F1E33] border-cyan-900/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Users className="h-5 w-5 text-[#00D4FF]" />
                      User Access Management
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage user roles and permissions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* User List */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-cyan-950/10 border border-cyan-900/20 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                            <span className="text-cyan-400 font-medium">AD</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">Admin User</p>
                            <p className="text-xs text-gray-500">admin@bank.com</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                          Administrator
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-cyan-950/10 border border-cyan-900/20 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                            <span className="text-cyan-400 font-medium">SA</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">Security Analyst</p>
                            <p className="text-xs text-gray-500">security@bank.com</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-green-500/30 text-green-400">
                          Analyst
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-cyan-950/10 border border-cyan-900/20 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                            <span className="text-cyan-400 font-medium">CO</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">Compliance Officer</p>
                            <p className="text-xs text-gray-500">compliance@bank.com</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-yellow-500/30 text-yellow-400">
                          Viewer
                        </Badge>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Add New User
                    </Button>

                    <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
                      <h5 className="text-sm font-medium text-cyan-400 mb-2">Role Permissions</h5>
                      <div className="space-y-1 text-xs text-gray-400">
                        <p><span className="text-cyan-400">Administrator:</span> Full system access and configuration</p>
                        <p><span className="text-green-400">Analyst:</span> Detection analysis and report generation</p>
                        <p><span className="text-yellow-400">Viewer:</span> Read-only access to logs and reports</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
