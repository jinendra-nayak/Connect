import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy">
      <p>This policy explains how ConnectCom handles information you share through this website.</p>
      <h2>Information we collect</h2>
      <p>When you submit the consultation form we collect the details you enter: your name, phone number, optional email address, the product you are interested in and any message you write. If you contact us on WhatsApp, WhatsApp&apos;s own privacy terms also apply.</p>
      <h2>How we use it</h2>
      <p>We use this information only to respond to your enquiry and to discuss ConnectCom products and services with you.</p>
      <h2>Sharing</h2>
      <p>We do not sell your personal information. Enquiries may be processed by the service providers we use to receive and manage them.</p>
      <h2>Your choices</h2>
      <p>You may ask us to access, correct or delete the information you have sent us by contacting us through the details on this website.</p>
    </LegalPage>
  );
}
