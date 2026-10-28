/**
 * Pavan Vela Grand — Booking Enquiry System Verification Suite
 *
 * Runs end-to-end unit, schema, and API route checks.
 */

import { z } from "zod";
import assert from "node:assert/strict";

console.log("===============================================================");
console.log("  Pavan Vela Grand — Booking Enquiry System Test Suite");
console.log("===============================================================\n");

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    Error: ${err.message}`);
  }
}

async function asyncTest(name, fn) {
  totalTests++;
  try {
    await fn();
    console.log(`  ✓ ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    Error: ${err.message}`);
  }
}

// ---------------------------------------------------------------------------
// 1. Zod Schema Validation Tests
// ---------------------------------------------------------------------------
console.log("1. Testing Validation Schema (bookingEnquirySchema)...");

const PHONE_PATTERN = /^(\+?[0-9]{1,4}[\s-]?)?(\(?[0-9]{2,5}\)?[\s-]?)?[0-9]{3,4}[\s-]?[0-9]{3,5}$/;

const bookingEnquirySchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Full Name must be at least 2 characters")
      .max(100, "Full Name must not exceed 100 characters")
      .regex(
        /^[a-zA-Z\s.'\-]+$/,
        "Full Name may only contain letters, spaces, hyphens, periods, or apostrophes"
      ),
    email: z
      .string()
      .trim()
      .email("Please enter a valid email address")
      .max(120, "Email address must not exceed 120 characters"),
    contactNumber: z
      .string()
      .trim()
      .min(7, "Contact Number must be at least 7 digits")
      .max(25, "Contact Number is too long")
      .refine(
        (val) => {
          const digitsOnly = val.replace(/\D/g, "");
          return digitsOnly.length >= 7 && digitsOnly.length <= 15 && PHONE_PATTERN.test(val);
        },
        {
          message: "Please enter a valid phone number (Indian mobile or international format with 7–15 digits)",
        }
      ),
    numberOfRooms: z.coerce
      .number()
      .int("Number of Rooms must be a whole number")
      .min(1, "Number of Rooms must be at least 1")
      .max(30, "Number of Rooms cannot exceed 30"),
    totalGuests: z.coerce
      .number()
      .int("Total Number of Guests must be a whole number")
      .min(1, "Total Number of Guests must be at least 1")
      .max(100, "Total Number of Guests cannot exceed 100"),
  })
  .strict();

test("Valid 5-field enquiry passes validation", () => {
  const validData = {
    fullName: "Ramanathan Subramanian",
    email: "ramanathan.sub@example.com",
    contactNumber: "+91 98401 23456",
    numberOfRooms: 2,
    totalGuests: 4,
  };
  const res = bookingEnquirySchema.safeParse(validData);
  assert.equal(res.success, true);
  assert.equal(res.data.fullName, "Ramanathan Subramanian");
  assert.equal(res.data.numberOfRooms, 2);
});

test("Accepts valid international phone number format", () => {
  const validInternational = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    contactNumber: "+1 (555) 234-5678",
    numberOfRooms: 1,
    totalGuests: 2,
  };
  const res = bookingEnquirySchema.safeParse(validInternational);
  assert.equal(res.success, true);
});

test("Rejects empty full name", () => {
  const res = bookingEnquirySchema.safeParse({
    fullName: "  ",
    email: "test@example.com",
    contactNumber: "9840123456",
    numberOfRooms: 1,
    totalGuests: 2,
  });
  assert.equal(res.success, false);
});

test("Rejects invalid email address", () => {
  const res = bookingEnquirySchema.safeParse({
    fullName: "Test Guest",
    email: "invalid-email-address",
    contactNumber: "9840123456",
    numberOfRooms: 1,
    totalGuests: 2,
  });
  assert.equal(res.success, false);
});

test("Rejects invalid phone number (too short or alpha characters)", () => {
  const res = bookingEnquirySchema.safeParse({
    fullName: "Test Guest",
    email: "test@example.com",
    contactNumber: "123",
    numberOfRooms: 1,
    totalGuests: 2,
  });
  assert.equal(res.success, false);
});

test("Rejects zero or negative room count", () => {
  const res = bookingEnquirySchema.safeParse({
    fullName: "Test Guest",
    email: "test@example.com",
    contactNumber: "9840123456",
    numberOfRooms: 0,
    totalGuests: 2,
  });
  assert.equal(res.success, false);
});

test("Rejects zero or negative guest count", () => {
  const res = bookingEnquirySchema.safeParse({
    fullName: "Test Guest",
    email: "test@example.com",
    contactNumber: "9840123456",
    numberOfRooms: 1,
    totalGuests: -2,
  });
  assert.equal(res.success, false);
});

test("STRICT ENFORCEMENT: Rejects unexpected fields (checkInDate, roomType, price, etc.)", () => {
  const maliciousPayload = {
    fullName: "Test Guest",
    email: "test@example.com",
    contactNumber: "9840123456",
    numberOfRooms: 1,
    totalGuests: 2,
    checkInDate: "2026-12-01",
    roomType: "Executive Suite",
    price: 3500,
  };
  const res = bookingEnquirySchema.safeParse(maliciousPayload);
  assert.equal(res.success, false);
  const issues = res.error.issues;
  assert.ok(issues.some((i) => i.code === "unrecognized_keys"));
});

// ---------------------------------------------------------------------------
// 2. HTML Escaping and Email Template Safety
// ---------------------------------------------------------------------------
console.log("\n2. Testing HTML Escaping & Email Template Safety...");

function escapeHtml(str) {
  const value = String(str);
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

test("Escapes dangerous XSS payload in names or input", () => {
  const dangerousName = '<script>alert("hacked")</script>';
  const escaped = escapeHtml(dangerousName);
  assert.equal(escaped, "&lt;script&gt;alert(&quot;hacked&quot;)&lt;/script&gt;");
  assert.ok(!escaped.includes("<script>"));
});

// ---------------------------------------------------------------------------
// 3. Live Local API Endpoint Tests
// ---------------------------------------------------------------------------
console.log("\n3. Testing Local API Endpoints (http://localhost:3000)...");

const BASE_URL = "http://localhost:3000";

await asyncTest("GET /api/health returns 200 and status ok", async () => {
  const res = await fetch(`${BASE_URL}/api/health`);
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.status, "ok");
  assert.equal(data.service, "pvg-hotel-api");
  assert.ok("smtpReady" in data);
});

await asyncTest("OPTIONS /api/booking-enquiries responds with CORS headers", async () => {
  const res = await fetch(`${BASE_URL}/api/booking-enquiries`, {
    method: "OPTIONS",
    headers: {
      Origin: "https://pavanvelagrand.com",
    },
  });
  assert.equal(res.status, 204);
  assert.ok(res.headers.get("access-control-allow-origin"));
});

await asyncTest("POST /api/booking-enquiries rejects empty body with 400", async () => {
  const res = await fetch(`${BASE_URL}/api/booking-enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  assert.equal(res.status, 400);
  const data = await res.json();
  assert.equal(data.success, false);
  assert.ok(data.errors);
});

await asyncTest("POST /api/booking-enquiries rejects unexpected extra fields with 400", async () => {
  const res = await fetch(`${BASE_URL}/api/booking-enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: "Test Guest",
      email: "test@example.com",
      contactNumber: "9840123456",
      numberOfRooms: 1,
      totalGuests: 2,
      checkInDate: "2026-11-15",
    }),
  });
  assert.equal(res.status, 400);
  const data = await res.json();
  assert.equal(data.success, false);
});

await asyncTest("POST /api/booking-enquiries rejects invalid numbers (e.g. 0 rooms) with 400", async () => {
  const res = await fetch(`${BASE_URL}/api/booking-enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: "Test Guest",
      email: "test@example.com",
      contactNumber: "9840123456",
      numberOfRooms: 0,
      totalGuests: 2,
    }),
  });
  assert.equal(res.status, 400);
  const data = await res.json();
  assert.equal(data.success, false);
  assert.ok(data.errors?.numberOfRooms);
});

console.log("\n===============================================================");
console.log(`  Tests Passed: ${passedTests} / ${totalTests}`);
if (passedTests === totalTests) {
  console.log("  Status: ALL TESTS PASSED SUCCESSFULLY! ✓");
} else {
  console.log("  Status: SOME TESTS FAILED! ✗");
  process.exit(1);
}
console.log("===============================================================\n");
