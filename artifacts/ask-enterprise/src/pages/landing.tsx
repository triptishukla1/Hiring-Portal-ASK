import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-primary/5 to-transparent -z-10" />
      <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[500px] rounded-full bg-primary/5 blur-3xl -z-10" />
      <div className="absolute top-[30%] -right-[10%] w-[40%] h-[600px] rounded-full bg-blue-300/5 blur-3xl -z-10" />

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
          <nav className="flex items-center gap-6">
            <a href="#about" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors hidden md:block">About</a>
            <a href="#services" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors hidden md:block">Services</a>
            <a href="#why-us" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors hidden md:block">Why Us</a>
            <Link href="/apply">
              <button className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-colors shadow-sm">
                Apply Now
              </button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              India's Trusted IT Talent Partner
            </span>
            <h1 className="text-5xl sm:text-6xl font-display font-bold text-gray-900 leading-tight">
              Building India's <span className="text-primary">IT Workforce</span>, One Hire at a Time
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              ASK Enterprise is a premier talent acquisition and staffing firm headquartered in India, specialising in sourcing, screening, and placing top-tier candidates across leading IT companies nationwide.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/apply">
                <button className="bg-primary text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-primary/90 transition-colors shadow-md text-base">
                  Submit Your Application
                </button>
              </Link>
              <a href="#about">
                <button className="border border-gray-300 text-gray-700 font-semibold px-8 py-3.5 rounded-lg hover:bg-gray-50 transition-colors text-base">
                  Learn More
                </button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {[
              { value: "500+", label: "IT Clients Served" },
              { value: "12,000+", label: "Placements Made" },
              { value: "15+", label: "Years in Business" },
              { value: "98%", label: "Client Satisfaction" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl border border-border shadow-sm p-6 flex flex-col items-start gap-1"
              >
                <span className="text-4xl font-display font-bold text-primary">{stat.value}</span>
                <span className="text-sm text-gray-500 font-medium">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-white border-y border-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-4 tracking-wide uppercase">
                About Us
              </span>
              <h2 className="text-4xl font-display font-bold text-gray-900 leading-tight">
                Connecting Talent with Opportunity Across India
              </h2>
              <p className="mt-5 text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. ASK Enterprise was founded with a singular vision — to bridge the gap between exceptional IT talent and the organisations that need them most. Over the past 15 years, we have grown into one of India's most trusted hiring and staffing consultancies.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Our team of experienced recruiters understands the nuances of the Indian IT landscape, from Bengaluru's startup ecosystem to the enterprise corridors of Hyderabad, Pune, and Delhi NCR.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Pan-India recruitment across all major IT hubs",
                  "Dedicated vertical teams for each technology domain",
                  "End-to-end hiring support from screening to onboarding",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-gray-700">
                    <span className="mt-1 w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 12 12">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-primary/5 to-blue-50 rounded-3xl p-10 border border-primary/10"
            >
              <h3 className="text-xl font-display font-bold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. We are committed to empowering India's IT sector by delivering high-quality talent swiftly, ethically, and at scale.
              </p>
              <div className="mt-8 border-t border-primary/10 pt-8">
                <h3 className="text-xl font-display font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. To be the #1 IT staffing partner for every growth-stage and enterprise company in India.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              What We Do
            </span>
            <h2 className="text-4xl font-display font-bold text-gray-900">Our Core Services</h2>
            <p className="mt-4 text-gray-600">
              Excepteur sint occaecat cupidatat non proident. We offer a full suite of talent solutions tailored specifically for the Indian IT industry.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🎯",
                title: "Permanent Staffing",
                desc: "End-to-end recruitment for full-time IT roles — from fresher drives to senior leadership hiring across all technology stacks.",
              },
              {
                icon: "🔄",
                title: "Contract Staffing",
                desc: "Flexible short-term and long-term contract placements to help IT companies scale rapidly without long-term commitments.",
              },
              {
                icon: "🎓",
                title: "Campus Recruitment",
                desc: "Partnering with top engineering colleges across India to identify and onboard the best fresh talent for entry-level IT roles.",
              },
              {
                icon: "🔍",
                title: "Executive Search",
                desc: "Discreet, targeted search for CXO, VP, and Director-level technology leaders who can drive your business forward.",
              },
              {
                icon: "📋",
                title: "RPO Solutions",
                desc: "Recruitment Process Outsourcing — we embed our team within yours to manage high-volume hiring with speed and precision.",
              },
              {
                icon: "🛠️",
                title: "Skill Assessment",
                desc: "Technical screening, aptitude testing, and structured interviews to ensure only pre-validated candidates reach your desk.",
              },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-border p-7 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="font-display font-bold text-gray-900 text-lg">{service.title}</h3>
                <p className="mt-2 text-gray-500 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section id="why-us" className="bg-white border-y border-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              Why ASK Enterprise
            </span>
            <h2 className="text-4xl font-display font-bold text-gray-900">The ASK Advantage</h2>
            <p className="mt-4 text-gray-600">
              Sunt in culpa qui officia deserunt mollit anim id est laborum. Here's what sets us apart from every other hiring firm.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Deep IT Domain Expertise",
                desc: "Our recruiters are technology specialists, not generalists. They understand the difference between a Java developer and a full-stack architect, and hire accordingly.",
              },
              {
                title: "Pan-India Talent Network",
                desc: "With active candidate databases spanning Bengaluru, Hyderabad, Pune, Chennai, Delhi NCR, and beyond, we reach talent others can't.",
              },
              {
                title: "Fast Turnaround",
                desc: "Lorem ipsum dolor sit amet. We pride ourselves on closing critical positions within 72 hours of mandate, minimising disruption to your business.",
              },
              {
                title: "Compliance & Ethics First",
                desc: "Every placement follows Indian labour law and IT sector norms. We maintain full transparency with both clients and candidates throughout the process.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-primary font-bold text-lg">{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-gray-900 text-lg">{item.title}</h3>
                  <p className="mt-1.5 text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary rounded-3xl px-10 py-16 text-center text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.1),_transparent_60%)] pointer-events-none" />
            <h2 className="text-4xl font-display font-bold mb-4 relative z-10">
              Ready to Begin Your IT Career Journey?
            </h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-8 relative z-10">
              Fill out our candidate data sheet and our team will reach out within 48 hours to discuss your profile.
            </p>
            <Link href="/apply">
              <button className="bg-white text-primary font-bold px-10 py-4 rounded-xl hover:bg-white/90 transition-colors shadow-lg text-base relative z-10">
                Apply Now →
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src={`${import.meta.env.BASE_URL}images/ask-logo.png`}
              alt="ASK Enterprise Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="text-sm text-gray-500 font-medium">ASK Enterprise — IT Hiring & Staffing</span>
          </div>
          <p className="text-sm text-gray-400">
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
