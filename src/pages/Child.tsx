"use client";
import React from "react";
import { ShieldCheck } from "lucide-react";

export default function ChildSafetyPolicy() {
  return (
    <div className="bg-[#0a0e1a] text-white min-h-screen pt-28 px-6">
      <section className="max-w-4xl mx-auto">

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 font-semibold text-sm">
              Safety Policy
            </span>
          </div>

          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
            Child Safety & CSAE Policy
          </h1>
        </div>

        <div className="space-y-8 text-gray-300 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              Zero Tolerance Policy
            </h2>
            <p>
              NearWe has a zero-tolerance policy toward child sexual abuse and
              exploitation (CSAE). Any content involving minors in a sexual
              context is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              Prohibited Content
            </h2>
            <p>
              This includes child sexual abuse material (CSAM), grooming,
              exploitation, trafficking, or any behavior that harms minors.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              In-App Reporting
            </h2>
            <p>
              Users can report suspicious or inappropriate behavior directly
              within the app. Reports are reviewed promptly by our moderation
              team.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              Moderation & Enforcement
            </h2>
            <p>
              We use a combination of automated tools and manual review. Accounts
              violating child safety rules are permanently banned.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              Legal Compliance
            </h2>
            <p>
              NearWe complies with all applicable child protection laws and
              cooperates fully with regional and national authorities when
              required.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              Reporting to Authorities
            </h2>
            <p>
              Confirmed CSAM cases are reported to appropriate law enforcement
              agencies and child protection organizations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              Contact for Child Safety
            </h2>
            <p>
              If you have child safety concerns, contact us at:
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
