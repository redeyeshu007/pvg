"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  User,
  Mail,
  Phone,
  BedDouble,
  Users,
  Minus,
  Plus,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { useBookingModal } from "@/context/BookingModalContext";
import { bookingEnquirySchema } from "@/lib/validation/booking";

interface FormState {
  fullName: string;
  email: string;
  contactNumber: string;
  numberOfRooms: number;
  totalGuests: number;
}

const INITIAL_FORM: FormState = {
  fullName: "",
  email: "",
  contactNumber: "",
  numberOfRooms: 1,
  totalGuests: 2,
};

export function BookingEnquiryModal() {
  const { isOpen, closeBookingModal } = useBookingModal();

  const [formData, setFormData] = useState<FormState>(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Focus trap & Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeBookingModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    // Lock scroll on background
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Auto-focus first input after animation
    const timer = setTimeout(() => {
      firstInputRef.current?.focus();
    }, 180);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      clearTimeout(timer);
    };
  }, [isOpen, closeBookingModal]);

  const handleChange = useCallback((field: keyof FormState, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-specific error as user types
    setFieldErrors((prev) => {
      if (prev[field]) {
        const next = { ...prev };
        delete next[field];
        return next;
      }
      return prev;
    });
    setGeneralError(null);
  }, []);

  const validateClientSide = (): boolean => {
    const result = bookingEnquirySchema.safeParse(formData);
    if (!result.success) {
      const errors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FormState;
        if (!errors[field]) {
          errors[field] = issue.message;
        }
      }
      setFieldErrors(errors);
      return false;
    }
    setFieldErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    setGeneralError(null);
    setSuccessMessage(null);

    // 1. Client-side validation check
    const isValid = validateClientSide();
    if (!isValid) return;

    setIsSubmitting(true);

    try {
      // 2. Resolve production API URL
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
      const endpoint = `${apiBase}/api/booking-enquiries`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        setSuccessMessage(
          "Your room enquiry has been submitted successfully. Our team will contact you after reviewing your request."
        );
        // Reset form ONLY on success
        setFormData(INITIAL_FORM);
        setFieldErrors({});
      } else if (response.status === 400 && data?.errors) {
        setFieldErrors(data.errors);
        setGeneralError("Please correct the highlighted fields and try again.");
      } else if (response.status === 429) {
        setGeneralError("Too many enquiries submitted. Please wait a few minutes before trying again.");
      } else {
        setGeneralError("We couldn't submit your enquiry right now. Please try again in a moment.");
      }
    } catch (err: unknown) {
      console.error("[Booking Form Error] Network failure submitting enquiry:", err);
      setGeneralError("We couldn't submit your enquiry right now. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;
    setSuccessMessage(null);
    setGeneralError(null);
    closeBookingModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
        >
          {/* Backdrop with luxury blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#0B1928]/75 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#C5A572]/40 overflow-hidden z-10 my-6"
          >
            {/* Header: Luxury Navy Gradient & Gold Badge */}
            <div className="relative bg-gradient-to-br from-[#0D1D2E] via-[#10263D] to-[#173B63] text-white px-6 sm:px-8 pt-7 pb-6 border-b border-[#C5A572]/30">
              {/* Subtle gold radial shimmer */}
              <div
                className="absolute top-0 right-0 w-64 h-32 pointer-events-none opacity-20"
                style={{
                  background:
                    "radial-gradient(circle at top right, #C5A572 0%, transparent 70%)",
                }}
              />

              <div className="relative flex items-start justify-between">
                <div className="pr-3">
                  {/* Eyebrow badge */}
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#C5A572]/15 border border-[#C5A572]/35 mb-2.5">
                    <Sparkles className="w-3 h-3 text-[#C5A572]" />
                    <span className="text-[10px] font-sans uppercase tracking-[0.22em] font-semibold text-[#C5A572]">
                      Pavan Vela Grand &bull; Dindigul
                    </span>
                  </div>

                  <h3
                    id="booking-modal-title"
                    className="text-2xl sm:text-[28px] font-serif font-semibold text-white tracking-tight leading-tight"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    Book a Room
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-300 font-sans mt-1.5 leading-relaxed">
                    Share your details to enquire about your stay at Pavan Vela Grand, Dindigul.
                  </p>
                </div>

                {/* Circular Close Button */}
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  aria-label="Close modal"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A572] shrink-0 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-7 bg-white">
              {/* Success Notification */}
              {successMessage ? (
                <div className="py-8 px-4 text-center">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4
                    className="text-xl sm:text-2xl font-serif font-semibold text-[#173B63] mb-2"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    Enquiry Received
                  </h4>
                  <p className="text-sm text-slate-600 font-sans leading-relaxed max-w-md mx-auto mb-6">
                    {successMessage}
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-8 py-3 bg-gradient-to-r from-[#C5A572] to-[#B69562] hover:opacity-95 text-[#10263D] font-sans text-xs uppercase tracking-[0.18em] font-bold rounded-lg transition-all shadow-md cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-4.5">
                  {/* General Error Banner */}
                  {generalError && (
                    <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2.5 text-xs sm:text-sm text-red-800 font-sans">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>{generalError}</span>
                    </div>
                  )}

                  {/* Field 1: Full Name */}
                  <div>
                    <label
                      htmlFor="booking-full-name"
                      className="block text-[11px] font-sans font-bold uppercase tracking-[0.14em] text-[#173B63] mb-1.5"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-[#C5A572] transition-colors">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        ref={firstInputRef}
                        id="booking-full-name"
                        type="text"
                        autoComplete="name"
                        required
                        disabled={isSubmitting}
                        value={formData.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                        placeholder="Enter your full name"
                        className={`w-full pl-10 pr-3.5 py-2.5 sm:py-3 bg-white border text-sm font-sans text-[#182230] rounded-lg shadow-2xs placeholder:text-slate-400 focus:outline-none transition-all ${
                          fieldErrors.fullName
                            ? "border-red-400 ring-1 ring-red-400 focus:border-red-400"
                            : "border-slate-200 hover:border-slate-300 focus:border-[#C5A572] focus:ring-2 focus:ring-[#C5A572]/20"
                        }`}
                      />
                    </div>
                    {fieldErrors.fullName && (
                      <p className="mt-1 text-xs text-red-600 font-sans">{fieldErrors.fullName}</p>
                    )}
                  </div>

                  {/* Field 2: Email Address */}
                  <div>
                    <label
                      htmlFor="booking-email"
                      className="block text-[11px] font-sans font-bold uppercase tracking-[0.14em] text-[#173B63] mb-1.5"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-[#C5A572] transition-colors">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        id="booking-email"
                        type="email"
                        autoComplete="email"
                        required
                        disabled={isSubmitting}
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="Enter your email address"
                        className={`w-full pl-10 pr-3.5 py-2.5 sm:py-3 bg-white border text-sm font-sans text-[#182230] rounded-lg shadow-2xs placeholder:text-slate-400 focus:outline-none transition-all ${
                          fieldErrors.email
                            ? "border-red-400 ring-1 ring-red-400 focus:border-red-400"
                            : "border-slate-200 hover:border-slate-300 focus:border-[#C5A572] focus:ring-2 focus:ring-[#C5A572]/20"
                        }`}
                      />
                    </div>
                    {fieldErrors.email && (
                      <p className="mt-1 text-xs text-red-600 font-sans">{fieldErrors.email}</p>
                    )}
                  </div>

                  {/* Field 3: Contact Number */}
                  <div>
                    <label
                      htmlFor="booking-contact-number"
                      className="block text-[11px] font-sans font-bold uppercase tracking-[0.14em] text-[#173B63] mb-1.5"
                    >
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-[#C5A572] transition-colors">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        id="booking-contact-number"
                        type="tel"
                        autoComplete="tel"
                        required
                        disabled={isSubmitting}
                        value={formData.contactNumber}
                        onChange={(e) => handleChange("contactNumber", e.target.value)}
                        placeholder="Enter your contact number"
                        className={`w-full pl-10 pr-3.5 py-2.5 sm:py-3 bg-white border text-sm font-sans text-[#182230] rounded-lg shadow-2xs placeholder:text-slate-400 focus:outline-none transition-all ${
                          fieldErrors.contactNumber
                            ? "border-red-400 ring-1 ring-red-400 focus:border-red-400"
                            : "border-slate-200 hover:border-slate-300 focus:border-[#C5A572] focus:ring-2 focus:ring-[#C5A572]/20"
                        }`}
                      />
                    </div>
                    {fieldErrors.contactNumber && (
                      <p className="mt-1 text-xs text-red-600 font-sans">
                        {fieldErrors.contactNumber}
                      </p>
                    )}
                  </div>

                  {/* Fields 4 & 5: Number of Rooms & Total Guests (Interactive Stepper Controls) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Field 4: Number of Rooms */}
                    <div>
                      <label
                        htmlFor="booking-rooms"
                        className="block text-[11px] font-sans font-bold uppercase tracking-[0.14em] text-[#173B63] mb-1.5"
                      >
                        <span className="flex items-center space-x-1.5">
                          <BedDouble className="w-3.5 h-3.5 text-[#C5A572]" />
                          <span>Number of Rooms</span>
                          <span className="text-red-500">*</span>
                        </span>
                      </label>
                      <div
                        className={`flex items-center bg-slate-50 border rounded-lg overflow-hidden transition-all ${
                          fieldErrors.numberOfRooms
                            ? "border-red-400 ring-1 ring-red-400"
                            : "border-slate-200 hover:border-slate-300 focus-within:border-[#C5A572] focus-within:ring-2 focus-within:ring-[#C5A572]/20"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            handleChange("numberOfRooms", Math.max(1, formData.numberOfRooms - 1))
                          }
                          disabled={formData.numberOfRooms <= 1 || isSubmitting}
                          className="w-10 h-10 sm:h-11 flex items-center justify-center text-slate-500 hover:text-[#173B63] hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                          aria-label="Decrease number of rooms"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <input
                          id="booking-rooms"
                          type="number"
                          min="1"
                          max="30"
                          required
                          disabled={isSubmitting}
                          value={formData.numberOfRooms}
                          onChange={(e) =>
                            handleChange(
                              "numberOfRooms",
                              Math.max(1, parseInt(e.target.value, 10) || 1)
                            )
                          }
                          className="w-full text-center font-sans font-semibold text-sm sm:text-base text-[#173B63] bg-transparent focus:outline-none py-2"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleChange("numberOfRooms", Math.min(30, formData.numberOfRooms + 1))
                          }
                          disabled={formData.numberOfRooms >= 30 || isSubmitting}
                          className="w-10 h-10 sm:h-11 flex items-center justify-center text-slate-500 hover:text-[#173B63] hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                          aria-label="Increase number of rooms"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {fieldErrors.numberOfRooms && (
                        <p className="mt-1 text-xs text-red-600 font-sans">
                          {fieldErrors.numberOfRooms}
                        </p>
                      )}
                    </div>

                    {/* Field 5: Total Number of Guests */}
                    <div>
                      <label
                        htmlFor="booking-guests"
                        className="block text-[11px] font-sans font-bold uppercase tracking-[0.14em] text-[#173B63] mb-1.5"
                      >
                        <span className="flex items-center space-x-1.5">
                          <Users className="w-3.5 h-3.5 text-[#C5A572]" />
                          <span>Total Guests</span>
                          <span className="text-red-500">*</span>
                        </span>
                      </label>
                      <div
                        className={`flex items-center bg-slate-50 border rounded-lg overflow-hidden transition-all ${
                          fieldErrors.totalGuests
                            ? "border-red-400 ring-1 ring-red-400"
                            : "border-slate-200 hover:border-slate-300 focus-within:border-[#C5A572] focus-within:ring-2 focus-within:ring-[#C5A572]/20"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            handleChange("totalGuests", Math.max(1, formData.totalGuests - 1))
                          }
                          disabled={formData.totalGuests <= 1 || isSubmitting}
                          className="w-10 h-10 sm:h-11 flex items-center justify-center text-slate-500 hover:text-[#173B63] hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                          aria-label="Decrease total guests"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <input
                          id="booking-guests"
                          type="number"
                          min="1"
                          max="100"
                          required
                          disabled={isSubmitting}
                          value={formData.totalGuests}
                          onChange={(e) =>
                            handleChange(
                              "totalGuests",
                              Math.max(1, parseInt(e.target.value, 10) || 1)
                            )
                          }
                          className="w-full text-center font-sans font-semibold text-sm sm:text-base text-[#173B63] bg-transparent focus:outline-none py-2"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleChange("totalGuests", Math.min(100, formData.totalGuests + 1))
                          }
                          disabled={formData.totalGuests >= 100 || isSubmitting}
                          className="w-10 h-10 sm:h-11 flex items-center justify-center text-slate-500 hover:text-[#173B63] hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                          aria-label="Increase total guests"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {fieldErrors.totalGuests && (
                        <p className="mt-1 text-xs text-red-600 font-sans">
                          {fieldErrors.totalGuests}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Submission Notice Box */}
                  <div className="bg-[#FAF7F2] border border-[#C5A572]/25 rounded-lg p-3 sm:p-3.5 flex items-start space-x-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#C5A572] mt-0.5 shrink-0" />
                    <p className="text-[11.5px] text-[#555555] font-sans leading-relaxed">
                      * This is an enquiry request. Our front desk team will contact you to confirm room availability and details.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1.5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full py-3.5 px-6 bg-gradient-to-r from-[#C5A572] via-[#D1B17D] to-[#C5A572] hover:from-[#B89662] hover:via-[#C5A572] hover:to-[#B89662] disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed text-[#10263D] font-sans text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] rounded-lg shadow-md hover:shadow-lg hover:shadow-[#C5A572]/20 active:scale-[0.99] transition-all duration-300 flex items-center justify-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C5A572] cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#10263D]" />
                          <span>Sending Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Enquiry</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
