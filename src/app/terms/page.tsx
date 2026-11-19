import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";

export const metadata: Metadata = { title: "Terms and Conditions" };

export default function Terms() {
  return (
    <LegalPage title="Terms and Conditions">
      <p>By using this website you agree to these terms.</p>
      <h2>Information on this site</h2>
      <p>Content on this website is provided for general information about ConnectCom and its products. Product availability, features and compatibility are confirmed during consultation and may change without notice.</p>
      <h2>Enquiries</h2>
      <p>Submitting an enquiry does not create a purchase agreement. Quotations and installation terms are agreed separately.</p>
      <h2>Intellectual property</h2>
      <p>The ConnectCom name, logo and site content belong to ConnectCom and may not be reused without permission.</p>
      <h2>Liability</h2>
      <p>We take care to keep this site accurate but do not guarantee it is free of errors or interruptions.</p>
    </LegalPage>
  );
}
