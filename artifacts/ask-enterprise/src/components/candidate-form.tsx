import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useCreateCandidate } from "@workspace/api-client-react";

// Using the exact enums specified in the prompt/API
const GenderEnum = z.enum(["Male", "Female", "Other", "Prefer not to say"]);

// Form schema with separate DOB fields as requested
const candidateFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  gender: GenderEnum,
  dobMonth: z.string().min(1, "Month is required"),
  dobDay: z.string().min(1, "Day is required"),
  dobYear: z.string().min(1, "Year is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  courseOfStudy: z.string().min(1, "Course of study is required"),
  percentageScored: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .min(0, "Cannot be less than 0")
    .max(100, "Cannot exceed 100"),
  nameOfCollege: z.string().min(1, "Name of college is required"),
  hasBacklog: z.enum(["Yes", "No"], { required_error: "Please indicate backlog status" }),
});

type CandidateFormValues = z.infer<typeof candidateFormSchema>;

const MONTHS = [
  "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"
];

// Generate valid days and years
const DAYS = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, "0"));
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 60 }, (_, i) => (currentYear - 16 - i).toString());

export function CandidateForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutateAsync: createCandidate, isPending, error } = useCreateCandidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<CandidateFormValues>({
    resolver: zodResolver(candidateFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      courseOfStudy: "",
      percentageScored: undefined,
      nameOfCollege: "",
    },
  });

  const onSubmit = async (data: CandidateFormValues) => {
    try {
      // Transform date parts into YYYY-MM-DD
      const dateOfBirth = `${data.dobYear}-${data.dobMonth}-${data.dobDay}`;
      
      // Transform Yes/No to boolean
      const hasBacklog = data.hasBacklog === "Yes";

      await createCandidate({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          dateOfBirth,
          email: data.email,
          phoneNumber: data.phoneNumber,
          courseOfStudy: data.courseOfStudy,
          percentageScored: data.percentageScored,
          nameOfCollege: data.nameOfCollege,
          hasBacklog,
        }
      });

      setIsSuccess(true);
      reset();
      
      // Scroll to top to see success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl bg-white border border-input text-foreground transition-all duration-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-primary/50 shadow-sm";
  const labelClasses = "block text-sm font-semibold text-foreground mb-2";
  const errorClasses = "text-sm text-destructive mt-1.5 flex items-center gap-1.5 font-medium";

  return (
    <div className="w-full max-w-3xl mx-auto relative">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-3xl p-10 text-center shadow-2xl border border-green-100"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">Application Submitted</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Thank you for providing your details. Our hiring team will review your application and get back to you shortly.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl transition-colors"
            >
              Submit Another Application
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100"
          >
            <div className="mb-10 text-center md:text-left border-b border-gray-100 pb-8">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900">
                ASK Enterprise: Data Sheet of Candidates
              </h2>
              <p className="text-muted-foreground mt-2">
                Please fill in the required information correctly to process your application.
              </p>
            </div>

            {error && (
              <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-xl flex items-start gap-3 text-destructive">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Submission Error</h4>
                  <p className="text-sm mt-1 text-destructive/90">
                    {error.message || "An unexpected error occurred. Please try again."}
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
              {/* Name Section */}
              <div>
                <label className={labelClasses}>First Name <span className="text-destructive">*</span></label>
                <input type="text" {...register("firstName")} className={inputClasses} placeholder="John" />
                {errors.firstName && <p className={errorClasses}>{errors.firstName.message}</p>}
              </div>

              <div>
                <label className={labelClasses}>Last Name <span className="text-destructive">*</span></label>
                <input type="text" {...register("lastName")} className={inputClasses} placeholder="Doe" />
                {errors.lastName && <p className={errorClasses}>{errors.lastName.message}</p>}
              </div>

              {/* Gender Radio */}
              <div className="md:col-span-2">
                <label className={labelClasses}>Gender <span className="text-destructive">*</span></label>
                <div className="flex flex-wrap gap-4 mt-3">
                  {["Male", "Female", "Other", "Prefer not to say"].map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5">
                        <input
                          type="radio"
                          value={option}
                          {...register("gender")}
                          className="peer sr-only"
                        />
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-primary transition-colors group-hover:border-primary/50"></div>
                        <div className="absolute w-2.5 h-2.5 rounded-full bg-primary scale-0 peer-checked:scale-100 transition-transform duration-200"></div>
                      </div>
                      <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">{option}</span>
                    </label>
                  ))}
                </div>
                {errors.gender && <p className={errorClasses}>{errors.gender.message}</p>}
              </div>

              {/* Date of Birth */}
              <div className="md:col-span-2">
                <label className={labelClasses}>Date of Birth <span className="text-destructive">*</span></label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <select {...register("dobMonth")} className={`${inputClasses} appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1.2em_1.2em] pr-10`}>
                      <option value="">Month</option>
                      {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <select {...register("dobDay")} className={`${inputClasses} appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1.2em_1.2em] pr-10`}>
                      <option value="">Day</option>
                      {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <select {...register("dobYear")} className={`${inputClasses} appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1.2em_1.2em] pr-10`}>
                      <option value="">Year</option>
                      {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
                {(errors.dobMonth || errors.dobDay || errors.dobYear) && (
                  <p className={errorClasses}>Please select a complete Date of Birth</p>
                )}
              </div>

              {/* Contact Info */}
              <div>
                <label className={labelClasses}>Email address <span className="text-destructive">*</span></label>
                <input type="email" {...register("email")} className={inputClasses} placeholder="john@example.com" />
                {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
              </div>

              <div>
                <label className={labelClasses}>Phone Number <span className="text-destructive">*</span></label>
                <input type="tel" {...register("phoneNumber")} className={inputClasses} placeholder="+1 (555) 000-0000" />
                {errors.phoneNumber && <p className={errorClasses}>{errors.phoneNumber.message}</p>}
              </div>

              {/* Education Info */}
              <div>
                <label className={labelClasses}>Course of Study <span className="text-destructive">*</span></label>
                <input type="text" {...register("courseOfStudy")} className={inputClasses} placeholder="B.S. Computer Science" />
                {errors.courseOfStudy && <p className={errorClasses}>{errors.courseOfStudy.message}</p>}
              </div>

              <div>
                <label className={labelClasses}>Percentage Scored <span className="text-destructive">*</span></label>
                <div className="relative">
                  <input type="number" step="0.01" {...register("percentageScored")} className={`${inputClasses} pr-10`} placeholder="85.5" />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">%</div>
                </div>
                {errors.percentageScored && <p className={errorClasses}>{errors.percentageScored.message}</p>}
              </div>

              <div className="md:col-span-2">
                <label className={labelClasses}>Name of College <span className="text-destructive">*</span></label>
                <input type="text" {...register("nameOfCollege")} className={inputClasses} placeholder="University of Technology" />
                {errors.nameOfCollege && <p className={errorClasses}>{errors.nameOfCollege.message}</p>}
              </div>

              {/* Backlog Radio */}
              <div className="md:col-span-2">
                <label className={labelClasses}>Backlog <span className="text-destructive">*</span></label>
                <p className="text-sm text-gray-500 mb-3">Do you have any current academic backlogs?</p>
                <div className="flex gap-6">
                  {["Yes", "No"].map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5">
                        <input
                          type="radio"
                          value={option}
                          {...register("hasBacklog")}
                          className="peer sr-only"
                        />
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-primary transition-colors group-hover:border-primary/50"></div>
                        <div className="absolute w-2.5 h-2.5 rounded-full bg-primary scale-0 peer-checked:scale-100 transition-transform duration-200"></div>
                      </div>
                      <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">{option}</span>
                    </label>
                  ))}
                </div>
                {errors.hasBacklog && <p className={errorClasses}>{errors.hasBacklog.message}</p>}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100">
              <button
                type="submit"
                disabled={isPending}
                className="w-full md:w-auto md:px-12 py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200 ease-out flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
