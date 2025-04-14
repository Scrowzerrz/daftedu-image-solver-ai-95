
import { cn } from "@/lib/utils";

interface Testimonial {
  content: string;
  author: string;
  role: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      content: "daftedu has completely changed how I study for my electrical engineering classes. Just upload a circuit diagram and it explains everything!",
      author: "Alex Chen",
      role: "Electrical Engineering Student",
      size: "lg"
    },
    {
      content: "As a math teacher, I recommend daftedu to all my students who need extra help. The step-by-step explanations are incredibly detailed.",
      author: "Sarah Johnson",
      role: "High School Math Teacher",
      size: "sm"
    },
    {
      content: "I was struggling with calculus until I found daftedu. Now I can understand the solutions and learn from them.",
      author: "Michael Rodriguez",
      role: "College Freshman",
      size: "md"
    },
    {
      content: "The accuracy of the solutions is impressive. It's like having a personal tutor available 24/7.",
      author: "Emma Williams",
      role: "Physics Graduate Student",
      size: "sm"
    },
    {
      content: "As a working professional going back to school, daftedu has been a lifesaver for refreshing my math skills.",
      author: "David Thompson",
      role: "Part-time Engineering Student",
      size: "md"
    }
  ];

  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Trusted by Students</span> and Professionals
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            See what our users are saying about their experience with daftedu
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={cn(
                "bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 transition-all hover:shadow-md",
                testimonial.size === "sm" ? "md:col-span-4" : 
                testimonial.size === "md" ? "md:col-span-5" : 
                "md:col-span-8"
              )}
            >
              <p className="text-slate-600 dark:text-slate-300 mb-4">"{testimonial.content}"</p>
              <div>
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
