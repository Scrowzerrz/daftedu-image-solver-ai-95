
import { CalendarClock, Camera, CheckCircle2, FileText, LayoutGrid, MessageCircle } from "lucide-react";

export function Features() {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Powerful Features</span> for Students and Professionals
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            daftedu combines advanced AI with a user-friendly interface to help you solve any math or engineering problem
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-slate-200 dark:border-slate-700">
            <Camera className="h-10 w-10 text-daft-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Image Recognition</h3>
            <p className="text-slate-600 dark:text-slate-400">Upload a photo of any math problem, circuit diagram, or geometry question and get instant analysis.</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-slate-200 dark:border-slate-700">
            <FileText className="h-10 w-10 text-daft-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Detailed Solutions</h3>
            <p className="text-slate-600 dark:text-slate-400">Receive complete step-by-step solutions with explanations to help you understand the concepts.</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-slate-200 dark:border-slate-700">
            <LayoutGrid className="h-10 w-10 text-daft-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Multiple Subjects</h3>
            <p className="text-slate-600 dark:text-slate-400">Support for algebra, calculus, physics, electrical engineering, geometry, and much more.</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-slate-200 dark:border-slate-700">
            <MessageCircle className="h-10 w-10 text-daft-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Follow-up Questions</h3>
            <p className="text-slate-600 dark:text-slate-400">Ask additional questions about the solution to deepen your understanding of the problem.</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-slate-200 dark:border-slate-700">
            <CalendarClock className="h-10 w-10 text-daft-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">History & Saves</h3>
            <p className="text-slate-600 dark:text-slate-400">Access all your previous problems and solutions in your personal dashboard.</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-slate-200 dark:border-slate-700">
            <CheckCircle2 className="h-10 w-10 text-daft-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Accuracy Guarantee</h3>
            <p className="text-slate-600 dark:text-slate-400">Our advanced AI ensures accurate solutions and clear explanations every time.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
