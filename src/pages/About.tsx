
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileImage } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <div className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-gradient">daftedu</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Using AI to make learning math and engineering simpler for everyone
            </p>
          </div>
        </div>
        
        <div className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  At daftedu, we're on a mission to democratize access to high-quality math and engineering education using the latest in AI technology. We believe that learning complex subjects should be intuitive and accessible to everyone, regardless of their background or resources.
                </p>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  Our platform is designed to provide step-by-step solutions to a wide range of problems, from basic algebra to advanced engineering concepts, helping students understand not just the answer but the process of solving problems.
                </p>
                <div className="flex items-center mb-6">
                  <FileImage className="h-7 w-7 text-daft-600 mr-2" />
                  <span className="font-bold text-xl text-gradient">daftedu</span>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="text-xl font-bold mb-4">Our Values</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-daft-100 dark:bg-daft-900 flex items-center justify-center text-daft-600 dark:text-daft-400 mr-3 flex-shrink-0 mt-0.5">1</div>
                      <div>
                        <h4 className="font-medium">Accessibility</h4>
                        <p className="text-slate-600 dark:text-slate-400">Making advanced educational tools available to all students, regardless of their economic status</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-daft-100 dark:bg-daft-900 flex items-center justify-center text-daft-600 dark:text-daft-400 mr-3 flex-shrink-0 mt-0.5">2</div>
                      <div>
                        <h4 className="font-medium">Educational Excellence</h4>
                        <p className="text-slate-600 dark:text-slate-400">Providing accurate, detailed solutions that teach concepts, not just answers</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-daft-100 dark:bg-daft-900 flex items-center justify-center text-daft-600 dark:text-daft-400 mr-3 flex-shrink-0 mt-0.5">3</div>
                      <div>
                        <h4 className="font-medium">Innovation</h4>
                        <p className="text-slate-600 dark:text-slate-400">Leveraging cutting-edge AI to create intuitive learning experiences</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-daft-100 dark:bg-daft-900 flex items-center justify-center text-daft-600 dark:text-daft-400 mr-3 flex-shrink-0 mt-0.5">4</div>
                      <div>
                        <h4 className="font-medium">Community</h4>
                        <p className="text-slate-600 dark:text-slate-400">Building a supportive environment for learners to grow and succeed together</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="py-20 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                How daftedu evolved from an idea to a platform that helps thousands of students
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-daft-600 to-daft-400"></div>
                
                {/* Timeline items */}
                <div className="space-y-24">
                  <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-7 h-7 rounded-full bg-daft-500"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="md:text-right md:pr-12">
                        <h3 className="text-xl font-bold mb-2">2023</h3>
                        <h4 className="font-medium text-daft-600 mb-4">The Beginning</h4>
                        <p className="text-slate-600 dark:text-slate-400">
                          Founded by a group of engineers and educators who saw the potential of AI in transforming education. The initial concept aimed to help students understand complex math problems.
                        </p>
                      </div>
                      <div className="md:pl-12">
                        {/* Intentionally empty for layout purposes */}
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-7 h-7 rounded-full bg-daft-500"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="md:text-right md:pr-12 md:order-1 order-2">
                        {/* Intentionally empty for layout purposes */}
                      </div>
                      <div className="md:pl-12 md:order-2 order-1">
                        <h3 className="text-xl font-bold mb-2">2024</h3>
                        <h4 className="font-medium text-daft-600 mb-4">Launch & Growth</h4>
                        <p className="text-slate-600 dark:text-slate-400">
                          After months of development, daftedu launched its beta platform. The response exceeded expectations, with thousands of students signing up in the first month alone.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-7 h-7 rounded-full bg-daft-500"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="md:text-right md:pr-12">
                        <h3 className="text-xl font-bold mb-2">2025</h3>
                        <h4 className="font-medium text-daft-600 mb-4">The Future</h4>
                        <p className="text-slate-600 dark:text-slate-400">
                          Looking ahead, we're expanding our subject coverage, enhancing our AI capabilities, and partnering with educational institutions globally to bring daftedu to more learners.
                        </p>
                      </div>
                      <div className="md:pl-12">
                        {/* Intentionally empty for layout purposes */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
              Whether you're a student looking to improve your understanding of math and engineering or an educator seeking to enhance your teaching tools, daftedu is here to support your journey.
            </p>
            <Button className="gradient-bg" size="lg">
              Get Started Now
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
