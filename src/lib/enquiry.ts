import { interests } from "@/data/content";

export type EnquiryInput = {
  name: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
  /** honeypot: real users never fill this */
  website?: string;
};
export type EnquiryErrors = Partial<Record<"name" | "phone" | "email" | "interest" | "message", string>>;

/** Shared by the browser form and the API route so rules never drift apart. */
export function validateEnquiry(v: EnquiryInput): EnquiryErrors {
  const e: EnquiryErrors = {};
  const phoneDigits = v.phone.replace(/\D/g, "");
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (v.name.length > 100) e.name = "Name is too long.";
  if (!/^\+?[\d\s\-()]+$/.test(v.phone.trim()) || phoneDigits.length < 7 || phoneDigits.length > 15)
    e.phone = "Enter a valid phone number (7–15 digits).";
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Enter a valid email address.";
  if (!(interests as readonly string[]).includes(v.interest)) e.interest = "Please choose what you are interested in.";
  if (v.message.length > 1500) e.message = "Message is too long (max 1500 characters).";
  return e;
}
