import { Shield, Lock, Eye, Database, Globe, ArrowRight } from 'lucide-react';

export default function Privacy() {
  const sections = [
    { id: 'data-collection', title: '1. Interview Data Collection' },
    { id: 'encryption', title: '2. Encryption & Security' },
    { id: 'retention', title: '3. Data Retention Policies' },
    { id: 'third-party', title: '4. Third-Party Subprocessors' },
    { id: 'rights', title: '5. Your Privacy Rights' },
  ];

  return (
    <div className="pt-16 md:pt-24 lg:pt-32 pb-16 md:pb-24 px-4 sm:px-6 bg-[#050505] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[250px_1fr] gap-10 lg:gap-16">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block sticky top-28 h-fit">
            <h5 className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest mb-8">On this page</h5>
            <ul className="space-y-4">
              {sections.map(s => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-sm text-neutral-500 hover:text-white transition-colors">{s.title}</a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Content */}
          <article className="max-w-3xl">
            <div className="mb-14 sm:mb-20">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tighter">Privacy & Data Sovereignty</h1>
              <p className="text-base sm:text-lg md:text-xl text-neutral-400 leading-relaxed font-medium">
                Last Updated: March 8, 2026. <br />
                Standor is designed for engineering teams who demand complete control over their hiring data. Our privacy model is built on transparency and least privilege.
              </p>
            </div>

            <div className="space-y-14 sm:space-y-20 md:space-y-24">
              <section id="data-collection">
                <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">{sections[0].title}</h2>
                <div className="prose prose-invert max-w-none text-neutral-500 space-y-6">
                  <p>
                    When you conduct a technical interview on Standor, we process code execution streams, editor keystrokes (CRDT ops), and chat logs. This data is stored in our secure environment for the duration of the interview and subsequent evaluation phase.
                  </p>
                  <ul className="space-y-3 list-disc pl-5">
                    <li>We do not share your candidate data or code with third parties.</li>
                    <li>We do not use interview evaluations or proprietary code snippets for model training.</li>
                    <li>Interview logs and playback timelines are accessible only to internal team members.</li>
                  </ul>
                </div>
              </section>

              <section id="encryption">
                <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">{sections[1].title}</h2>
                <div className="bg-[#0A0A0A] rounded-3xl border border-white/5 p-6 sm:p-8 md:p-10 mb-8 flex items-center gap-4 sm:gap-8">
                  <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center text-white shrink-0">
                    <Lock size={24} />
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed font-medium">
                    All interview data at rest is encrypted via AES-256-GCM. In transit, we enforce TLS 1.3 with HSTS and perfect forward secrecy during active websocket connections.
                  </p>
                </div>
                <p className="text-neutral-500 leading-relaxed">
                  For enterprise organizations, Standor offers isolated VPC deployments and Bring Your Own Key (BYOK) configurations to ensure ultimate data sovereignty.
                </p>
              </section>

              <section id="retention">
                <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">{sections[2].title}</h2>
                <p className="text-neutral-500 leading-relaxed mb-6">
                  By default, session data and playback logs are retained until deleted by a workspace administrator. You can configure automated retention policies (e.g., 30, 90, 365 days) corresponding to your hiring cycles.
                </p>

              </section>

              <section id="third-party">
                <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">{sections[3].title}</h2>
                <p className="text-neutral-500 leading-relaxed">
                  We use a minimal set of subprocessors to provide our service (e.g., AWS for infrastructure, Postgres for state). We maintain DPA (Data Processing Agreements) with all vendors to ensure they meet SOC2 compliance standards.
                </p>
              </section>

              <section id="rights">
                <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">{sections[4].title}</h2>
                <p className="text-neutral-500 leading-relaxed">
                  Regardless of your location, we provide GDPR-level data rights to all users globally. Candidates and organizations have the right to access, export, and permanently delete interview logs and profiles at any time.
                </p>
              </section>
            </div>

            {/* Support CTA */}
            <div className="mt-20 md:mt-32 pt-10 md:pt-16 border-t border-white/[0.05] text-center md:text-left">
              <h4 className="text-white font-bold mb-4">Questions about our privacy infrastructure?</h4>
              <button className="flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-widest group">
                Contact our Data Officer
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
