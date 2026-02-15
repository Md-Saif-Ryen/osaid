"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiUser,
  FiMessageSquare,
  FiSend,
  FiCheckCircle,
  FiPhone,
  FiLinkedin,
  FiGithub,
  FiCalendar,
  FiClock,
  FiBriefcase,
  FiDownload,
  FiExternalLink,
  FiX,
} from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";
import RadialHomeMenu from "@/components/FloatingHomeMenu";

import { ScrollTrigger } from "gsap/ScrollTrigger";
export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const callRequestFormRef = useRef<HTMLFormElement>(null);

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCallRequestModal, setShowCallRequestModal] = useState(false);
  const [callRequestLoading, setCallRequestLoading] = useState(false);
  const [callRequestSuccess, setCallRequestSuccess] = useState(false);

  useEffect(() => {
  window.scrollTo(0, 0);
  ScrollTrigger.refresh(true);
}, []);


  /* ---------------- PREVENT BODY SCROLL WHEN MODAL IS OPEN ---------------- */
  useEffect(() => {
    if (showCallRequestModal) {
      // Save current scroll position
      const scrollY = window.scrollY;

      // Prevent body scroll
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        // Restore body scroll
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";

        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [showCallRequestModal]);

  /* ---------------- GSAP INTRO ---------------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal", {
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.2,
      });

      // Floating animations
      gsap.to(".float-element-1", {
        y: 20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".float-element-2", {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  /* ---------------- MAIN FORM SUBMIT ---------------- */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const formData = new FormData(formRef.current!);
      const data = Object.fromEntries(formData);

      // Add newsletter subscription value
      const formDataWithNewsletter = {
        ...data,
        subscribe: formData.has("newsletter") ? "true" : "false",
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithNewsletter),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setSuccess(true);
        formRef.current?.reset();

        // Reset success after 5 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      } else {
        // Show error message from backend
        alert(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  /* ---------------- CALL REQUEST SUBMIT ---------------- */
  async function handleCallRequestSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCallRequestLoading(true);
    setCallRequestSuccess(false);

    try {
      const formData = new FormData(callRequestFormRef.current!);
      const data = Object.fromEntries(formData);

      // Send call request to API
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: `📞 Call Request\n\nName: ${data.name}\nPhone: ${data.phone}\nPreferred Time: ${data.preferredTime || "Any time"}\nPurpose: ${data.purpose || "General discussion"}\n\nPlease call me back at your convenience.`,
          callRequest: "true",
          company: data.company || "",
        }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setCallRequestSuccess(true);
        callRequestFormRef.current?.reset();

        // Close modal after 3 seconds
        setTimeout(() => {
          setShowCallRequestModal(false);
          setCallRequestSuccess(false);
        }, 3000);
      } else {
        alert(result.message || "Failed to submit call request");
      }
    } catch (error) {
      console.error("Error submitting call request:", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setCallRequestLoading(false);
    }
  }

  /* ---------------- DOWNLOAD RESUME ---------------- */
  const downloadResume = () => {
    // Assuming resume.pdf is in the public folder
    const resumeUrl = "/document/resume.pdf";

    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "resume.pdf"; // This sets the filename for download
    link.target = "_blank";

    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Optional: Track download
    console.log("Resume download initiated");
  };

  /* ---------------- OPEN CALL REQUEST MODAL ---------------- */
  const openCallRequestModal = () => {
    setShowCallRequestModal(true);
    setCallRequestSuccess(false);
  };

  /* ---------------- CLOSE CALL REQUEST MODAL ---------------- */
  const closeCallRequestModal = () => {
    setShowCallRequestModal(false);
    setCallRequestSuccess(false);
  };

  /* ---------------- HANDLE ESC KEY TO CLOSE MODAL ---------------- */
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showCallRequestModal) {
        closeCallRequestModal();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [showCallRequestModal]);

  return (
    <>
      <RadialHomeMenu />
      <section
        ref={heroRef}
        className="relative min-h-screen bg-gradient-to-b from-[#FBF3EA] via-white to-[#E8F4F1] text-black overflow-hidden"
      >
        {/* ANIMATED BACKGROUND ELEMENTS */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#BFE6DF] opacity-40 blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#FBF1A9] opacity-50 blur-[140px]" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-red-100/30 to-blue-100/30 rounded-full blur-3xl" />

        {/* FLOATING SHAPES */}
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-red-400/20 rounded-full float-element-1" />
        <div className="absolute bottom-1/3 right-1/3 w-8 h-8 bg-blue-400/20 rounded-lg float-element-2" />
        <div className="absolute top-2/3 left-1/3 w-10 h-10 bg-yellow-400/20 rounded-full float-element-1" />

        {/* HERO SECTION */}
        <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-24">
          <header className="relative z-10 mx-auto text-center mb-12 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm"
            >
              <FiBriefcase className="text-red-600" />
              <span className="text-sm font-medium text-gray-700">
                Available for Opportunities
              </span>
            </motion.div>

            <h1 className="reveal text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Let's Build{" "}
              </span>
              <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-700 bg-clip-text text-transparent">
                Something Amazing
              </span>
            </h1>

            <p className="reveal mt-6 text-lg sm:text-xl text-gray-600 mx-auto leading-relaxed">
              I transform ideas into exceptional digital experiences. Let's
              discuss how we can create something remarkable together.
            </p>

            {/* ACTION BUTTONS */}
            <div className="reveal flex flex-wrap gap-4 py-10 justify-center mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadResume}
                className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-lg"
              >
                <FiDownload />
                Download Resume
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openCallRequestModal}
                className="px-6 py-3 bg-[#980000] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-red-700 transition-colors shadow-lg"
              >
                <FiPhone />
                Request a Call
              </motion.button>
            </div>
          </header>

          {/* MAIN CONTENT GRID */}
          <div className="relative z-10 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* CONTACT INFORMATION SIDEBAR */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-xl p-6 md:p-8 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Get In Touch
                </h2>

                <div className="space-y-5">
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <FiMail className="text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">
                        syedrizvi2510@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FiPhone className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">
                        +91 95708 77425
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <MdLocationOn className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium text-gray-900">
                        New Delhi, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FiClock className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Response Time</p>
                      <p className="font-medium text-gray-900">
                        Within 24 hours
                      </p>
                    </div>
                  </div>
                </div>

                {/* SOCIAL LINKS */}
                <div className="mt-8 py-6 border-t border-gray-200">
                  <h3 className="font-medium text-gray-700 mb-4">
                    Connect With Me
                  </h3>
                  <div className="flex gap-3 py-1">
                    <motion.a
                      whileHover={{ y: -3 }}
                      href="https://www.linkedin.com/in/s-m-osaid-rizvi?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-900 text-white rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                    >
                      <FiLinkedin />
                    </motion.a>
                    <motion.a
                      whileHover={{ y: -3 }}
                      href="https://github.com/yourusername"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-900 text-white rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                    >
                      <FiGithub />
                    </motion.a>
                    <motion.a
                      whileHover={{ y: -3 }}
                      href="mailto:syedrizvi2510@gmail.com"
                      className="w-10 h-10 bg-red-600 text-white rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors"
                    >
                      <FiMail />
                    </motion.a>
                  </div>
                </div>

                {/* AVAILABILITY BADGE */}
                <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-green-700">
                      Currently Available for Projects
                    </span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">
                    Open to freelance opportunities and collaborations
                  </p>
                </div>
              </div>
            </motion.div>

            {/* FORM SECTION */}
            <div className="lg:col-span-2 gap-10">
              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-xl overflow-hidden"
                  >
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                          <FiSend className="text-white text-xl" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">
                            Send a Message
                          </h2>
                          <p className="text-gray-600">
                            Fill out the form below and I'll get back to you
                            soon
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-black">
                        <InputField
                          name="name"
                          icon={<FiUser />}
                          placeholder="Your Full Name"
                          required
                        />
                        <InputField
                          name="email"
                          icon={<FiMail />}
                          placeholder="Your Email Address"
                          type="email"
                          required
                        />
                        <InputField
                          name="company"
                          icon={<FiBriefcase />}
                          placeholder="Company (Optional)"
                          className="md:col-span-2"
                        />
                      </div>

                      <div className="mt-5">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Project Details
                        </label>
                        <TextareaField
                          name="message"
                          icon={<FiMessageSquare />}
                          placeholder="Tell me about your project, timeline, budget, and any specific requirements..."
                          rows={5}
                          required
                        />
                      </div>

                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 py-3 gap-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="newsletter"
                            name="newsletter"
                            value="true"
                            className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
                          />
                          <label
                            htmlFor="newsletter"
                            className="ml-2 text-sm text-gray-600"
                          >
                            Subscribe to occasional updates
                          </label>
                        </div>
                        <div className="text-sm text-gray-500 text-right">
                          <FiClock className="inline mr-1" />
                          Response time: 24-48 hours
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                        type="submit"
                        className="mt-8 w-full py-4 bg-gradient-to-r from-gray-900 to-black text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                      >
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <FiSend />
                            Send Message
                            <FiExternalLink className="ml-1" />
                          </>
                        )}
                      </motion.button>
                    </div>

                    {/* FORM FOOTER */}
                    <div className="px-6 md:px-8 py-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-xs text-gray-500 text-center">
                        Your information is secure and will never be shared with
                        third parties
                      </p>
                    </div>
                  </motion.form>
                ) : (
                  <SuccessAnimation />
                )}
              </AnimatePresence>

              {/* QUICK RESPONSE CARD */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 10 }}
                transition={{ delay: 0.5 }}
                className="mt-6 p-5 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiClock className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Quick Response Guaranteed
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      I typically respond within a few hours. For urgent
                      inquiries, please mention "URGENT" in your message.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* PORTFOLIO LINK */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 20 }}
                transition={{ delay: 0.7 }}
                className="mt-6 p-5 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Want to see my work?
                    </h3>
                    <p className="text-sm text-gray-600">
                      Check out my portfolio for recent projects
                    </p>
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/project"
                    className="px-4 py-2 bg-[#980000] text-white rounded-lg font-medium inline-flex items-center gap-2 hover:bg-gray-800 transition-colors"
                  >
                    View Portfolio
                    <FiExternalLink />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL REQUEST MODAL */}
      <AnimatePresence>
        {showCallRequestModal && (
          <>
            {/* Backdrop - FIXED POSITION */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={closeCallRequestModal}
            />

            {/* Modal - FIXED POSITION WITH OVERFLOW */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md my-8 max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <FiPhone className="text-red-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Request a Call Back
                      </h2>
                      <p className="text-sm text-gray-600">
                        Fill in your details and I'll call you back
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeCallRequestModal}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Close modal"
                  >
                    <FiX className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Modal Body with proper scrolling */}
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {!callRequestSuccess ? (
                      <motion.form
                        key="form"
                        ref={callRequestFormRef}
                        onSubmit={handleCallRequestSubmit}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                      >
                        <InputField
                          name="name"
                          icon={<FiUser />}
                          placeholder="Your Full Name"
                          required
                        />
                        <InputField
                          name="email"
                          icon={<FiMail />}
                          placeholder="Your Email Address"
                          type="email"
                          required
                        />
                        <InputField
                          name="phone"
                          icon={<FiPhone />}
                          placeholder="Your Phone Number"
                          type="tel"
                          required
                        />
                        <InputField
                          name="company"
                          icon={<FiBriefcase />}
                          placeholder="Company (Optional)"
                        />
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-black">
                            Preferred Time for Call
                          </label>
                          <select
                            name="preferredTime"
                            className="w-full bg-white text-black border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          >
                            <option value="">Any time</option>
                            <option value="morning">
                              Morning (9 AM - 12 PM)
                            </option>
                            <option value="afternoon">
                              Afternoon (12 PM - 4 PM)
                            </option>
                            <option value="evening">
                              Evening (4 PM - 7 PM)
                            </option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-black">
                            Purpose of Call
                          </label>
                          <textarea
                            name="purpose"
                            rows={3}
                            placeholder="Briefly describe what you'd like to discuss..."
                            className="w-full bg-white text-black border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                          />
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={callRequestLoading}
                          type="submit"
                          className="w-full py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2 sticky bottom-0"
                        >
                          {callRequestLoading ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <FiPhone />
                              Request Call Back
                            </>
                          )}
                        </motion.button>
                      </motion.form>
                    ) : (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-8"
                      >
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FiCheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          Call Request Submitted!
                        </h3>
                        <p className="text-gray-600">
                          I'll call you back soon. You can also reach me
                          directly at the number provided.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------------- INPUT COMPONENTS ---------------- */

function InputField({
  icon,
  placeholder,
  name,
  type = "text",
  required = false,
  className = "",
}: {
  icon: React.ReactNode;
  placeholder: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative ${className} py-2`}>
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 py-10">
        {icon}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        aria-label={placeholder}
        placeholder={placeholder}
        className="w-full bg-white text-black border border-gray-300 rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
      />
    </div>
  );
}

function TextareaField({
  icon,
  placeholder,
  name,
  rows = 4,
  required = false,
}: {
  icon: React.ReactNode;
  placeholder: string;
  name: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-5 text-gray-500">{icon}</span>
      <textarea
        name={name}
        rows={rows}
        required={required}
        aria-label={placeholder}
        placeholder={placeholder}
        className="w-full bg-white border border-gray-300 rounded-xl pl-11 pr-4 py-4 resize-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
      />
    </div>
  );
}

function SuccessAnimation() {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-xl p-8 md:p-12 text-center"
    >
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-green-50 rounded-full mb-6">
        <FiCheckCircle className="text-green-600 text-3xl" />
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-3">
        Message Sent Successfully!
      </h2>

      <p className="text-gray-600 mb-6 mx-auto">
        Thank you for reaching out. I've received your message and will get back
        to you within 24 hours. Looking forward to connecting with you!
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          Send Another Message
        </motion.button>

        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/"
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Back to Home
        </motion.a>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          In the meantime, feel free to explore my{" "}
          <a
            href="/portfolio"
            className="text-red-600 hover:text-red-700 font-medium"
          >
            portfolio
          </a>{" "}
          or connect with me on{" "}
          <a
            href="https://www.linkedin.com/in/s-m-osaid-rizvi?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            className="text-red-600 hover:text-red-700 font-medium"
          >
            LinkedIn
          </a>
        </p>
      </div>
    </motion.div>
  );
}
