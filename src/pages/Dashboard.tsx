
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileImage, Upload, Loader2, Clock, Send, History, Settings, LogOut, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// This is a placeholder that would be replaced with actual Supabase storage and API calls
interface AnalysisResult {
  id: string;
  imageUrl: string;
  description: string;
  solution: string;
  createdAt: Date;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<"upload" | "history" | "settings">("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [question, setQuestion] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();
  
  // This would be replaced with actual history from Supabase
  const mockHistory: AnalysisResult[] = [
    {
      id: "result_1",
      imageUrl: "https://via.placeholder.com/300x200?text=Math+Problem",
      description: "Quadratic equation problem",
      solution: "Step 1: Identify the coefficients...",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: "result_2",
      imageUrl: "https://via.placeholder.com/300x200?text=Circuit+Diagram",
      description: "DC circuit with resistors and capacitors",
      solution: "Step 1: Calculate the equivalent resistance...",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      toast({
        title: "File selected",
        description: `${e.target.files[0].name} ready for upload`,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select an image file to analyze",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsAnalyzing(true);
      
      // Mock AI analysis (this would be replaced with actual Supabase and Gemini API calls)
      setTimeout(() => {
        // This is where we would actually use Gemini 2.5 Pro, hidden from the user interface
        setResult({
          id: "result_" + Math.random().toString(36).substring(2, 15),
          imageUrl: URL.createObjectURL(selectedFile),
          description: "Analysis of the uploaded image shows a mathematical problem involving...",
          solution: question ? 
            `Based on your question: "${question}"\n\nStep 1: I'll analyze the problem...\n\nStep 2: Using the quadratic formula...\n\nSolution: x = -b ± √(b² - 4ac) / 2a` : 
            "Step 1: I'll analyze the problem...\n\nStep 2: Using the quadratic formula...\n\nSolution: x = -b ± √(b² - 4ac) / 2a",
          createdAt: new Date()
        });
        setIsAnalyzing(false);
        
        toast({
          title: "Analysis complete",
          description: "Your image has been successfully analyzed",
        });
      }, 2000);
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your image",
        variant: "destructive"
      });
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 flex-col bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700">
          <div className="h-16 flex items-center px-4 border-b border-slate-200 dark:border-slate-700">
            <FileImage className="h-6 w-6 text-daft-600" />
            <span className="font-bold text-xl ml-2 text-gradient">daftedu</span>
          </div>
          <div className="flex-1 overflow-y-auto py-2 px-2">
            <Button 
              variant={activeTab === "upload" ? "default" : "ghost"} 
              className="w-full justify-start mb-1" 
              onClick={() => setActiveTab("upload")}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> New Analysis
            </Button>
            <Button 
              variant={activeTab === "history" ? "default" : "ghost"} 
              className="w-full justify-start mb-1" 
              onClick={() => setActiveTab("history")}
            >
              <History className="mr-2 h-4 w-4" /> History
            </Button>
            <Button 
              variant={activeTab === "settings" ? "default" : "ghost"} 
              className="w-full justify-start mb-1" 
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="mr-2 h-4 w-4" /> Settings
            </Button>
          </div>
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-daft-500 flex items-center justify-center text-white font-medium">
                {user?.name?.charAt(0) || user?.email?.charAt(0)}
              </div>
              <div className="ml-2">
                <p className="font-medium text-sm">{user?.name || user?.email}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {user?.subscription === "free" ? "Free Plan" : 
                   user?.subscription === "pro" ? "Pro Plan" : "Premium Plan"}
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={signOut}
            >
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile header */}
          <div className="md:hidden h-16 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4">
            <div className="flex items-center">
              <FileImage className="h-6 w-6 text-daft-600" />
              <span className="font-bold text-xl ml-2 text-gradient">daftedu</span>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setActiveTab("upload")}
                className={activeTab === "upload" ? "bg-slate-100 dark:bg-slate-700" : ""}
              >
                <PlusCircle className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setActiveTab("history")}
                className={activeTab === "history" ? "bg-slate-100 dark:bg-slate-700" : ""}
              >
                <History className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setActiveTab("settings")}
                className={activeTab === "settings" ? "bg-slate-100 dark:bg-slate-700" : ""}
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Content area */}
          <div className="flex-1 overflow-auto p-4 md:p-6">
            {activeTab === "upload" && (
              <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">New Analysis</h1>
                <Card>
                  <CardHeader>
                    <CardTitle>Upload an Image</CardTitle>
                    <CardDescription>
                      Upload an image of a math problem, circuit diagram, or any STEM-related question
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <label htmlFor="image" className="text-sm font-medium">
                          Problem Image
                        </label>
                        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-md">
                          {selectedFile ? (
                            <div className="w-full text-center">
                              <img 
                                src={URL.createObjectURL(selectedFile)} 
                                alt="Selected" 
                                className="max-h-64 max-w-full mx-auto mb-4 rounded-md"
                              />
                              <p className="text-sm text-slate-500 dark:text-slate-400 break-all">
                                {selectedFile.name}
                              </p>
                              <Button 
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={() => setSelectedFile(null)}
                              >
                                Change Image
                              </Button>
                            </div>
                          ) : (
                            <>
                              <Upload className="h-10 w-10 text-slate-400 mb-2" />
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                Drop your image here or click to browse
                              </p>
                              <label 
                                htmlFor="file-upload" 
                                className="mt-2 inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-daft-600 bg-daft-50 hover:bg-daft-100 dark:bg-slate-800 dark:text-daft-400 dark:hover:bg-slate-700 cursor-pointer"
                              >
                                Select File
                              </label>
                            </>
                          )}
                          <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="sr-only"
                          />
                        </div>
                      </div>
                      <div className="grid w-full gap-1.5">
                        <label htmlFor="question" className="text-sm font-medium">
                          Question (Optional)
                        </label>
                        <Textarea
                          id="question"
                          placeholder="Add any specific questions about the problem..."
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                          className="resize-none"
                          rows={4}
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button type="button" variant="outline" onClick={() => {
                        setSelectedFile(null);
                        setQuestion("");
                      }}>
                        Clear
                      </Button>
                      <Button type="submit" className="gradient-bg" disabled={!selectedFile || isAnalyzing}>
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Analyze Image
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
                
                {result && (
                  <Card className="mt-8">
                    <CardHeader>
                      <CardTitle>Analysis Result</CardTitle>
                      <CardDescription>
                        Our AI has analyzed your image and provided the following solution
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Problem Description</h3>
                        <p className="text-slate-700 dark:text-slate-300">{result.description}</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Solution</h3>
                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-md whitespace-pre-line text-slate-700 dark:text-slate-300">
                          {result.solution}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {new Date().toLocaleTimeString()}
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline">Download</Button>
                        <Button>Ask Follow-up</Button>
                      </div>
                    </CardFooter>
                  </Card>
                )}
              </div>
            )}

            {activeTab === "history" && (
              <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">History</h1>
                {mockHistory.length === 0 ? (
                  <Card>
                    <CardContent className="py-10 text-center">
                      <History className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-500 dark:text-slate-400">
                        No history yet. Start by analyzing an image!
                      </p>
                      <Button 
                        className="mt-4 gradient-bg" 
                        onClick={() => setActiveTab("upload")}
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Analysis
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {mockHistory.map((item) => (
                      <Card key={item.id}>
                        <div className="md:flex p-4 md:p-6">
                          <div className="md:w-1/3 md:pr-6 mb-4 md:mb-0">
                            <img 
                              src={item.imageUrl} 
                              alt="Problem" 
                              className="w-full rounded-md"
                            />
                          </div>
                          <div className="md:w-2/3">
                            <h3 className="font-medium text-lg mb-2">{item.description}</h3>
                            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-md mb-4 max-h-28 overflow-hidden text-ellipsis text-slate-700 dark:text-slate-300 text-sm">
                              {item.solution}
                            </div>
                            <div className="flex justify-between items-center">
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {item.createdAt.toLocaleDateString()} at {item.createdAt.toLocaleTimeString()}
                              </p>
                              <Button size="sm">View Details</Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Settings</h1>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>
                      Manage your account settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <Input defaultValue={user?.name} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input defaultValue={user?.email} readOnly />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Password</label>
                      <Button variant="outline">Change Password</Button>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Subscription</CardTitle>
                    <CardDescription>
                      Manage your subscription plan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-md mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Current Plan</h3>
                        <span className="bg-daft-100 text-daft-700 text-xs font-medium py-1 px-2 rounded dark:bg-daft-900 dark:text-daft-300">
                          {user?.subscription === "free" ? "Free" : 
                           user?.subscription === "pro" ? "Pro" : "Premium"}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {user?.subscription === "free" 
                          ? "5 image uploads per day, basic solutions" 
                          : user?.subscription === "pro"
                          ? "50 image uploads per day, full solutions" 
                          : "Unlimited uploads, enhanced solutions"}
                      </p>
                    </div>
                    {user?.subscription === "free" && (
                      <div className="space-y-4">
                        <p className="text-sm">Upgrade your plan to get more features:</p>
                        <div className="flex gap-4">
                          <Button className="gradient-bg flex-1">
                            Upgrade to Pro
                          </Button>
                          <Button variant="outline" className="flex-1">
                            View Plans
                          </Button>
                        </div>
                      </div>
                    )}
                    {user?.subscription !== "free" && (
                      <div className="space-y-2">
                        <p className="text-sm">Manage your current subscription:</p>
                        <div className="flex gap-4">
                          <Button className="flex-1">
                            Manage Subscription
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Danger Zone</CardTitle>
                    <CardDescription>
                      Critical account actions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="destructive">Delete Account</Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
