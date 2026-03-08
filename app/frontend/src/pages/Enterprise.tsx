import { Link } from 'react-router-dom';
import { ArrowRight, Building, Lock, Server } from 'lucide-react';

export default function Enterprise() {
  return (
    <main className="flex flex-col items-center w-full min-h-screen bg-bg-900 pb-24">

      {/* ─── HEADER ─── */}
      <section className="w-full pt-32 pb-16 px-4 ns-container flex flex-col items-start text-left border-b border-white/5">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">Enterprise.</h1>
        <p className="text-xl text-muted max-w-2xl">
          Deploy Standor securely across your entire organization. Single Sign-On, custom VPCs, and dedicated account management.
        </p>
      </section>

      <section className="ns-container w-full grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16 px-4">
        {/* Left Column - Benefits */}
        <div className="flex flex-col gap-12">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-lg border border-border bg-surface flex items-center justify-center shrink-0">
              <Lock className="text-white" size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">SOC2 Type II & GDPR</h3>
              <p className="text-muted leading-relaxed">Security is our foundation. We undergo annual audits and penetration testing to ensure your interview data is strongly encrypted at rest and in transit.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-lg border border-border bg-surface flex items-center justify-center shrink-0">
              <Server className="text-accent" size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Dedicated Infrastructure</h3>
              <p className="text-muted leading-relaxed">Run code execution sandboxes in your own AWS/GCP VPC. Keep proprietary code entirely isolated from the public cloud.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-lg border border-border bg-surface flex items-center justify-center shrink-0">
              <Building className="text-white" size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Workspace & SSO</h3>
              <p className="text-muted leading-relaxed">SAML/SSO integration (Okta, Azure AD, Google Workspace). Automated provisioning and de-provisioning of interviewer seats.</p>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="bg-surface border border-border rounded-2xl p-8 shadow-2xl relative overflow-hidden h-fit">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[60px] pointer-events-none" />
          <h2 className="text-2xl font-bold mb-6">Contact our sales team</h2>
          <form className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text-secondary w-full">First name
                  <input type="text" className="w-full mt-1 px-4 py-2.5 bg-bg-900 border border-border rounded-lg focus:outline-none focus:border-accent text-white transition-colors" placeholder="Jane" />
                </label>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text-secondary w-full">Last name
                  <input type="text" className="w-full mt-1 px-4 py-2.5 bg-bg-900 border border-border rounded-lg focus:outline-none focus:border-accent text-white transition-colors" placeholder="Doe" />
                </label>
              </div>
            </div>

            <label className="text-sm font-medium text-text-secondary w-full">Work email
              <input type="email" className="w-full mt-1 px-4 py-2.5 bg-bg-900 border border-border rounded-lg focus:outline-none focus:border-accent text-white transition-colors" placeholder="jane@company.com" />
            </label>

            <label className="text-sm font-medium text-text-secondary w-full">Company size
              <select className="w-full mt-1 px-4 py-2.5 bg-bg-900 border border-border rounded-lg focus:outline-none focus:border-accent text-white transition-colors appearance-none">
                <option>1-50 employees</option>
                <option>51-200 employees</option>
                <option>201-1000 employees</option>
                <option>1000+ employees</option>
              </select>
            </label>

            <label className="text-sm font-medium text-text-secondary w-full">How can we help?
              <textarea rows={4} className="w-full mt-1 px-4 py-2.5 bg-bg-900 border border-border rounded-lg focus:outline-none focus:border-accent text-white transition-colors resize-none" placeholder="Tell us about your hiring volume and current tech stack..." />
            </label>

            <button type="button" className="w-full mt-4 py-3 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2">
              Submit Request <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
