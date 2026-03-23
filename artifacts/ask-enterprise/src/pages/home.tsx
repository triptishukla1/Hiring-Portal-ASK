import { CandidateForm } from "@/components/candidate-form";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20 selection:text-primary">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent -z-10" />
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[500px] rounded-full bg-primary/5 blur-3xl -z-10" />
      <div className="absolute top-[20%] -right-[10%] w-[40%] h-[600px] rounded-full bg-blue-300/5 blur-3xl -z-10" />

      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={`${import.meta.env.BASE_URL}images/ask-logo.png`} 
              alt="ASK Enterprise Logo" 
              className="h-10 w-auto object-contain"
            />
            <div className="h-6 w-px bg-gray-200 mx-2 hidden sm:block"></div>
            <span className="font-display font-semibold text-gray-600 hidden sm:block tracking-wide">
              Hiring & Selection
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-gray-500 hidden md:block">
              Need help? <a href="#" className="text-primary hover:underline">Contact Support</a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_2.5fr] gap-12 items-start">
          
          {/* Context Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden xl:block sticky top-32 space-y-8"
          >
            <div>
              <h1 className="text-4xl font-display font-bold text-gray-900 leading-tight">
                Join our <span className="text-primary">innovative</span> team.
              </h1>
              <p className="mt-4 text-gray-600 leading-relaxed text-lg">
                We're looking for passionate individuals ready to make an impact. Complete your data sheet to start the process.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Submit Details</h3>
                  <p className="text-sm text-gray-500 mt-1">Fill out the data sheet accurately.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 opacity-50">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <span className="text-gray-500 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Initial Review</h3>
                  <p className="text-sm text-gray-500 mt-1">Our team evaluates your profile.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 opacity-50">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <span className="text-gray-500 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Interview</h3>
                  <p className="text-sm text-gray-500 mt-1">We schedule a conversation.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Area */}
          <div className="w-full">
            <CandidateForm />
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} ASK Enterprise. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
