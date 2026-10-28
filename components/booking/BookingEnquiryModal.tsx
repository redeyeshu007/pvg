"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
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
    }, 150);

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
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-white rounded-sm shadow-2xl border border-[#C5A572]/30 overflow-hidden z-10 my-8"
          >
            {/* Header: Royal Navy & Gold Accent Line */}
            <div className="bg-[#10263D] text-white px-6 sm:px-8 pt-7 pb-6 relative border-b-2 border-[#C5A572]">
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center space-x-2 mb-2">
                    <span className="w-6 h-[1.5px] bg-[#C5A572]" />
                    <span className="text-[11px] font-sans uppercase tracking-[0.24em] font-semibold text-[#C5A572]">
                      Pavan Vela Grand &bull; Dindigul
                    </span>
                  </div>
                  <h3
                    id="booking-modal-title"
                    className="text-2xl sm:text-3xl font-serif font-semibold text-white tracking-tight"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    Book a Room
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-sans mt-1.5 leading-relaxed">
                    Share your details to enquire about your stay at Pavan Vela Grand, Dindigul.
                  </p>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  aria-label="Close modal"
                  className="p-1.5 rounded-sm text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A572]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 bg-[#F7F9FC]">
              {/* Success Notification */}
              {successMessage ? (
                <div className="py-6 px-4 text-center">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-serif font-semibold text-[#173B63] mb-2">
                    Enquiry Received
                  </h4>
                  <p className="text-sm text-slate-600 font-sans leading-relaxed max-w-md mx-auto mb-6">
                    {successMessage}
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-8 py-3 bg-[#C5A572] hover:bg-[#B69562] text-[#10263D] font-sans text-xs uppercase tracking-[0.18em] font-bold rounded-sm transition-colors shadow-sm"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
                  {/* General Error Banner */}
                  {generalError && (
                    <div className="p-3.5 bg-red-50 border-l-4 border-red-500 rounded-xs flex items-start space-x-2.5 text-xs sm:text-sm text-red-800 font-sans">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>{generalError}</span>
                    </div>
                  )}

                  {/* Field 1: Full Name */}
                  <div>
                    <label
                      htmlFor="booking-full-name"
                      className="block text-xs font-sans font-bold uppercase tracking-[0.14em] text-[#173B63] mb-1.5"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
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
                      className={`w-full px-3.5 py-2.5 bg-white border text-sm font-sans text-[#182230] rounded-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                        fieldErrors.fullName
                          ? "border-red-400 focus:ring-red-400"
                          : "border-slate-300 focus:border-[#C5A572] focus:ring-[#C5A572]/20"
                      }`}
                    />
                    {fieldErrors.fullName && (
                      <p className="mt-1 text-xs text-red-600 font-sans">{fieldErrors.fullName}</p>
                    )}
                  </div>

                  {/* Field 2: Email Address */}
                  <div>
                    <label
                      htmlFor="booking-email"
                      className="block text-xs font-sans font-bold uppercase tracking-[0.14em] text-[#173B63] mb-1.5"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      autoComplete="email"
                      required
                      disabled={isSubmitting}
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="Enter your email address"
                      className={`w-full px-3.5 py-2.5 bg-white border text-sm font-sans text-[#182230] rounded-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                        fieldErrors.email
                          ? "border-red-400 focus:ring-red-400"
                          : "border-slate-300 focus:border-[#C5A572] focus:ring-[#C5A572]/20"
                      }`}
                    />
                    {fieldErrors.email && (
                      <p className="mt-1 text-xs text-red-600 font-sans">{fieldErrors.email}</p>
                    )}
                  </div>

                  {/* Field 3: Contact Number */}
                  <div>
                    <label
                      htmlFor="booking-contact-number"
                      className="block text-xs font-sans font-bold uppercase tracking-[0.14em] text-[#173B63] mb-1.5"
                    >
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="booking-contact-number"
                      type="tel"
                      autoComplete="tel"
                      required
                      disabled={isSubmitting}
                      value={formData.contactNumber}
                      onChange={(e) => handleChange("contactNumber", e.target.value)}
                      placeholder="Enter your contact number"
                      className={`w-full px-3.5 py-2.5 bg-white border text-sm font-sans text-[#182230] rounded-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                        fieldErrors.contactNumber
                          ? "border-red-400 focus:ring-red-400"
                          : "border-slate-300 focus:border-[#C5A572] focus:ring-[#C5A572]/20"
                      }`}
                    />
                    {fieldErrors.contactNumber && (
                      <p className="mt-1 text-xs text-red-600 font-sans">
                        {fieldErrors.contactNumber}
                      </p>
                    )}
                  </div>

                  {/* Fields 4 & 5: Number of Rooms & Total Guests (2-Column Grid) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Field 4: Number of Rooms */}
                    <div>
                      <label
                        htmlFor="booking-rooms"
                        className="block text-xs font-sans font-bold uppercase tracking-[0.14em] text-[#173B63] mb-1.5"
                      >
                        Number of Rooms <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="booking-rooms"
                        type="number"
                        min="1"
                        max="30"
                        required
                        disabled={isSubmitting}
                        value={formData.numberOfRooms}
                        onChange={(e) =>
                          handleChange("numberOfRooms", Math.max(1, parseInt(e.target.value, 10) || 1))
                        }
                        className={`w-full px-3.5 py-2.5 bg-white border text-sm font-sans text-[#182230] rounded-xs focus:outline-none focus:ring-2 transition-all ${
                          fieldErrors.numberOfRooms
                            ? "border-red-400 focus:ring-red-400"
                            : "border-slate-300 focus:border-[#C5A572] focus:ring-[#C5A572]/20"
                        }`}
                      />
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
                        className="block text-xs font-sans font-bold uppercase tracking-[0.14em] text-[#173B63] mb-1.5"
                      >
                        Total Number of Guests <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="booking-guests"
                        type="number"
                        min="1"
                        max="100"
                        required
                        disabled={isSubmitting}
                        value={formData.totalGuests}
                        onChange={(e) =>
                          handleChange("totalGuests", Math.max(1, parseInt(e.target.value, 10) || 1))
                        }
                        className={`w-full px-3.5 py-2.5 bg-white border text-sm font-sans text-[#182230] rounded-xs focus:outline-none focus:ring-2 transition-all ${
                          fieldErrors.totalGuests
                            ? "border-red-400 focus:ring-red-400"
                            : "border-slate-300 focus:border-[#C5A572] focus:ring-[#C5A572]/20"
                        }`}
                      />
                      {fieldErrors.totalGuests && (
                        <p className="mt-1 text-xs text-red-600 font-sans">
                          {fieldErrors.totalGuests}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Submission Notice */}
                  <p className="text-[11px] text-slate-500 font-sans leading-relaxed pt-1">
                    * This is an enquiry request. Our front desk team will contact you to confirm room availability and details.
                  </p>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 bg-[#C5A572] hover:bg-[#B69562] disabled:bg-slate-300 disabled:cursor-not-allowed text-[#10263D] font-sans text-xs sm:text-[13px] font-bold uppercase tracking-[0.18em] rounded-xs shadow-sm transition-all flex items-center justify-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C5A572]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending Enquiry...</span>
                        </>
                      ) : (
                        <span>Submit Enquiry</span>
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
