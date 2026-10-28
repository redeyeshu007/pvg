"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

interface BookingModalContextValue {
  readonly isOpen: boolean;
  readonly openBookingModal: () => void;
  readonly closeBookingModal: () => void;
}

const BookingModalContext = createContext<BookingModalContextValue | null>(null);

export function BookingModalProvider({ children }: { readonly children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openBookingModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeBookingModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      openBookingModal,
      closeBookingModal,
    }),
    [isOpen, openBookingModal, closeBookingModal]
  );

  return (
    <BookingModalContext.Provider value={value}>
      {children}
    </BookingModalContext.Provider>
  );
}

export function useBookingModal(): BookingModalContextValue {
  const context = useContext(BookingModalContext);
  if (!context) {
    throw new Error("useBookingModal must be used within a BookingModalProvider");
  }
  return context;
}
