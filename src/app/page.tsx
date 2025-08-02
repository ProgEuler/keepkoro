import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckSquare, FileText, Zap } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100 font-mono">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Simple Notes</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            A clean, minimal note-taking app designed for developers and thinkers. Organize your tasks and ideas with
            the simplicity of a terminal interface.
          </p>
          <Link href="/notes">
            <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 text-lg">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="bg-gray-100 rounded-lg p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckSquare className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-lg font-semibold">Task Management</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Organize your work and life tasks with simple checkboxes and clean lists.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="bg-gray-100 rounded-lg p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FileText className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-lg font-semibold">Notes & Ideas</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Capture thoughts and ideas alongside your tasks in a unified interface.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="bg-gray-100 rounded-lg p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-lg font-semibold">Developer Friendly</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Built with a terminal-inspired design that feels familiar to developers.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <Card className="mb-16">
          <CardHeader className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Clean & Minimal Interface</h2>
            <p className="text-gray-600">Everything you need, nothing you don't.</p>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-gray-600 mb-4">Howdy Nicolas.</div>
              <div className="text-gray-600 mb-6">You have 13 ongoing tasks</div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Work</h3>
                      <div className="flex bg-gray-100 rounded-md p-1">
                        <Badge variant="secondary" className="bg-white shadow-sm">
                          tasks
                        </Badge>
                        <span className="px-2 py-1 text-xs text-gray-600">notes</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 border border-gray-300 rounded-sm"></div>
                        <span>Address comments in figma</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 border border-gray-300 rounded-sm"></div>
                        <span>Finish reflections and peer-reviews...</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Life</h3>
                      <div className="flex bg-gray-100 rounded-md p-1">
                        <Badge variant="secondary" className="bg-white shadow-sm">
                          tasks
                        </Badge>
                        <span className="px-2 py-1 text-xs text-gray-600">notes</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 border border-gray-300 rounded-sm"></div>
                        <span>Reply to Charles email</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 border border-gray-300 rounded-sm"></div>
                        <span>Solar panel appt (06.17 - 9am)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to get organized?</h2>
          <p className="text-gray-600 mb-6">Start managing your tasks and notes today.</p>
          <Link href="/notes">
            <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3">
              Launch Notes App
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>&copy; 2024 Simple Notes. Built with Next.js and Tailwind CSS.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
