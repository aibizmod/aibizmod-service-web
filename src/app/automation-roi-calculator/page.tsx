'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Calculator, Clock, Users, PoundSterling, TrendingUp } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StickyFooterLayout from '@/components/layout/StickyFooterLayout';
import AnimatedSection from '@/components/common/AnimatedSection';
import SectionHeading from '@/components/common/SectionHeading';
import ShaderBackground from '@/components/ui/shader-background';

export default function AutomationRoiCalculatorPage() {
  const [employees, setEmployees] = useState(10);
  const [hoursPerWeek, setHoursPerWeek] = useState(5);
  const [hourlyRate, setHourlyRate] = useState(35);
  const [automationFactor, setAutomationFactor] = useState(70);

  const weeksPerYear = 48;
  const totalHoursPerYear = employees * hoursPerWeek * weeksPerYear;
  const automatableHours = totalHoursPerYear * (automationFactor / 100);
  const costBefore = totalHoursPerYear * hourlyRate;
  const costAfter = (totalHoursPerYear - automatableHours) * hourlyRate;
  const annualSavings = costBefore - costAfter;
  const hoursSavedPerEmployeePerYear = (hoursPerWeek * weeksPerYear) * (automationFactor / 100);

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(n);

  return (
    <>
      <Navbar />
      <StickyFooterLayout footer={<Footer />}>
        <main className="bg-white text-ink">
          <section className="relative isolate overflow-hidden px-6 pb-20 pt-32 md:pb-28 md:pt-36">
            <ShaderBackground className="absolute inset-0 z-0 h-full w-full opacity-80" />
            <div className="pointer-events-none absolute left-1/2 top-24 z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl" aria-hidden="true" />
            <div className="relative z-10 mx-auto max-w-4xl">
              <nav className="mb-8 inline-flex flex-wrap items-center gap-1.5 rounded-full border border-cyan-100 bg-white/55 px-4 py-2 text-[13px] text-slate-500 shadow-[0_12px_35px_rgba(59,130,246,0.10)] backdrop-blur-md" aria-label="Breadcrumb">
                <Link href="/" className="transition-colors hover:text-[#0F172A]">Home</Link>
                <ChevronRight size={13} className="shrink-0 text-cyan-300" aria-hidden="true" />
                <span className="font-medium text-[#0F172A]" aria-current="page">Automation ROI Calculator</span>
              </nav>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-100 bg-cyan-50 text-cyan-700">
                  <Calculator size={18} />
                </div>
                <span className="text-sm font-medium text-cyan-700">Free Tool</span>
              </div>

              <h1 className="font-display font-thin text-[#0F172A] text-balance" style={{ fontSize: 'clamp(32px, 4.5vw, 48px)', lineHeight: 1.08 }}>
                Automation ROI Calculator
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-500 max-w-3xl">
                Estimate how much your business could save by automating repetitive manual tasks. Adjust the inputs to match your team size, hourly cost, and the percentage of work that can be automated.
              </p>
            </div>
          </section>

          {/* Calculator */}
          <section className="px-6 py-16 bg-[#F8FEFF] border-y border-cyan-100">
            <div className="max-w-5xl mx-auto grid gap-12 lg:grid-cols-2">
              {/* Inputs */}
              <AnimatedSection direction="left">
                <SectionHeading eyebrow="Your inputs" heading="Adjust to Your Team" />
                <div className="mt-8 space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                      <Users size={16} className="text-cyan-600" />
                      Employees doing manual work
                    </label>
                    <input type="range" min="1" max="200" value={employees} onChange={(e) => setEmployees(Number(e.target.value))} className="w-full accent-cyan-600" />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                      <span>1</span>
                      <span className="font-semibold text-cyan-700">{employees}</span>
                      <span>200</span>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                      <Clock size={16} className="text-cyan-600" />
                      Hours per week spent on manual tasks (per person)
                    </label>
                    <input type="range" min="1" max="40" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(Number(e.target.value))} className="w-full accent-cyan-600" />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                      <span>1</span>
                      <span className="font-semibold text-cyan-700">{hoursPerWeek}h</span>
                      <span>40</span>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                      <PoundSterling size={16} className="text-cyan-600" />
                      Average fully loaded hourly cost (per employee)
                    </label>
                    <input type="range" min="15" max="150" value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))} className="w-full accent-cyan-600" />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                      <span>£15</span>
                      <span className="font-semibold text-cyan-700">£{hourlyRate}</span>
                      <span>£150</span>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                      <TrendingUp size={16} className="text-cyan-600" />
                      Percentage of manual work that can be automated
                    </label>
                    <input type="range" min="10" max="95" value={automationFactor} onChange={(e) => setAutomationFactor(Number(e.target.value))} className="w-full accent-cyan-600" />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                      <span>10%</span>
                      <span className="font-semibold text-cyan-700">{automationFactor}%</span>
                      <span>95%</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Results */}
              <AnimatedSection direction="right" delay={0.1}>
                <div className="rounded-[28px] border border-cyan-100 bg-white/70 p-8 shadow-[0_18px_55px_rgba(59,130,246,0.10)] backdrop-blur-md lg:sticky lg:top-24">
                  <SectionHeading eyebrow="Estimated result" heading="Your Annual Savings" />
                  <p className="mt-6 text-5xl font-display font-bold text-cyan-700">
                    {formatCurrency(annualSavings)}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    per year based on {employees} employees
                  </p>

                  <div className="mt-8 space-y-4 border-t border-cyan-100 pt-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Total manual hours per year</span>
                      <span className="font-semibold text-slate-700">{totalHoursPerYear.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Automatable hours per year</span>
                      <span className="font-semibold text-cyan-700">{automatableHours.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Hours saved per employee per year</span>
                      <span className="font-semibold text-slate-700">{Math.round(hoursSavedPerEmployeePerYear)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Cost before automation</span>
                      <span className="font-semibold text-slate-700">{formatCurrency(costBefore)}</span>
                    </div>
                    <div className="flex justify-between text-sm border-t border-cyan-100 pt-3">
                      <span className="text-slate-500">Cost after automation</span>
                      <span className="font-semibold text-slate-700">{formatCurrency(costAfter)}</span>
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl bg-cyan-50 border border-cyan-200 p-4">
                    <p className="text-xs text-slate-500 leading-relaxed">
                      <strong className="text-cyan-700">Methodology:</strong> Calculation uses a standard 48-week working year. The automation percentage reflects the estimated proportion of manual task time that can be eliminated through automation — not all manual work can be fully automated. Actual results depend on workflow complexity, integration requirements, and implementation approach.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* Methodology */}
          <section className="px-6 py-16 bg-white">
            <div className="max-w-3xl mx-auto">
              <AnimatedSection>
                <SectionHeading eyebrow="How it works" heading="Calculation Methodology" centered />
              </AnimatedSection>

              <div className="mt-10 space-y-6 text-slate-600 leading-relaxed text-sm">
                <p>
                  This calculator estimates the potential cost savings from automating repetitive manual tasks in your business. It uses four inputs: the number of employees performing manual work, the hours they spend each week on automatable tasks, their fully loaded hourly cost (salary + benefits + overhead), and the percentage of that work that automation can realistically replace.
                </p>
                <p>
                  The formula is straightforward: total annual manual hours = employees × hours per week × 48 weeks. Automatable hours = total hours × automation percentage. Cost savings = automatable hours × hourly rate.
                </p>
                <p>
                  The 70% default for automation potential is a conservative estimate based on aibizmod&apos;s experience implementing business process automation for UK-based service businesses. Your actual results will vary depending on the complexity of your workflows, the quality of your existing data, and whether your tools have accessible APIs.
                </p>
                <p>
                  For a more detailed assessment including implementation costs, timeline, and specific workflow recommendations, <Link href="/contact" className="text-cyan-700 font-medium hover:text-cyan-800 transition-colors">contact our team</Link>.
                </p>
              </div>

              <AnimatedSection delay={0.08} className="mt-10">
                <SectionHeading eyebrow="Related" heading="Automation Resources" centered />
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Link href="/services/ai-automation" className="rounded-full border border-cyan-100 bg-white px-4 py-2 text-sm font-medium text-cyan-700 hover:bg-cyan-50 transition-colors">
                    AI Automation Services
                  </Link>
                  <Link href="/services/ai-automation/process-automation" className="rounded-full border border-cyan-100 bg-white px-4 py-2 text-sm font-medium text-cyan-700 hover:bg-cyan-50 transition-colors">
                    Process Automation
                  </Link>
                  <Link href="/comparisons/automation-platform-vs-custom-workflow" className="rounded-full border border-cyan-100 bg-white px-4 py-2 text-sm font-medium text-cyan-700 hover:bg-cyan-50 transition-colors">
                    Automation Platform vs Custom Workflow
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* Schema */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Automation ROI Calculator',
              description: 'Estimate cost savings from automating repetitive manual tasks in your business.',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              author: { '@type': 'Organization', name: 'aibizmod', url: 'https://aibizmod.com' },
            })
          }} />
        </main>
      </StickyFooterLayout>
    </>
  );
}
