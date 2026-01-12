"use client";
import React from "react";
import { FileText } from "lucide-react";

export default function TermsAndConditions() {
  return (
    <div className="bg-[#0a0e1a] text-white min-h-screen pt-28 px-6">
      <section className="max-w-4xl mx-auto">

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
            <FileText className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 font-semibold text-sm">
              Legal
            </span>
          </div>

          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
            Terms & Conditions
          </h1>

          <p className="text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8 text-gray-300 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By using NearWe, you agree to comply with these Terms & Conditions.
              If you do not agree, please do not use the app.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              2. Use of the App
            </h2>
            <p>
              NearWe allows users to discover local events, connect with people,
              and interact with community content. You agree not to misuse the
              platform or violate any laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              3. User Accounts
            </h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account. Any activity performed using your account is your
              responsibility.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              4. Prohibited Content
            </h2>
            <p>
              Users must not post illegal, harmful, abusive, or sexually explicit
              content. Content involving minors is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              5. Termination
            </h2>
            <p>
              NearWe reserves the right to suspend or terminate accounts that
              violate these terms or applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              6. Limitation of Liability
            </h2>
            <p>
              NearWe is not responsible for user-generated content or interactions
              between users.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              7. Contact
            </h2>
            <p>
              For questions regarding these Terms, contact us at:
              <br />
              <span className="text-cyan-400 font-medium">
                support@nearwe.in
              </span>
            </p>
          </section>

        </div>
      </section>
    </div>
  );
}
