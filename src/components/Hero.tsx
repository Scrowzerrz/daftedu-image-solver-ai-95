
import { Button } from "./ui/button";
import { FileImage, Calculator, BookOpen, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Hero() {
  const navigate = useNavigate();
  
  return (
    <div className="relative overflow-hidden py-24 md:py-32 lg:py-40">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-slate-950">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] dark:bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)]"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-5">
            <FileImage className="h-10 w-10 text-daft-600" />
            <span className="font-bold text-3xl ml-2 text-gradient">daftedu</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-gradient">Solve Any Math Problem</span> With AI
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-3xl mx-auto">
            Snap a photo of any math or engineering problem and get instant solutions with detailed explanations powered by advanced AI. Perfect for equations, circuits, geometry, and more.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Button size="lg" className="gradient-bg text-lg px-8 h-14" onClick={() => navigate('/signup')}>
              Get Started — It's Free
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 h-14" onClick={() => navigate('/pricing')}>
              View Pricing
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-daft-100 dark:bg-daft-900 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-daft-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">Instant Solutions</h3>
              <p className="text-slate-500 dark:text-slate-400">Upload an image and get detailed explanations in seconds</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-daft-100 dark:bg-daft-900 rounded-lg flex items-center justify-center mb-4">
                <Calculator className="h-6 w-6 text-daft-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">Step-by-Step Workings</h3>
              <p className="text-slate-500 dark:text-slate-400">Understand the solution process with clear step-by-step explanations</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-daft-100 dark:bg-daft-900 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-daft-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">Wide Knowledge</h3>
              <p className="text-slate-500 dark:text-slate-400">From basic algebra to advanced engineering concepts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
