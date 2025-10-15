import Hero from '@/components/Hero'
import Section from '@/components/Section'
import Gallery from '@/components/Gallery'
import Link from 'next/link'

export default function CostPage() {
  return (
    <>
      <Hero
        title="Cost — Dataset Risk & Cost Modeling"
        subtitle="We triangulate cost exposure using (1) an industry leak/lawsuit database, (2) Monte Carlo simulation over realistic ranges, and (3) statistical tests to validate drivers."
      />

      {/* Executive summary bullets */}
      <Section title="What we’re showing today (TL;DR)">
        <ul className="list-disc ml-6 text-white/85 space-y-2">
          <li>
            <b>Lawsuit/Leak Database:</b> curated cases from automotive & adjacent industries with amounts,
            type, and context to benchmark downside risk.
          </li>
          <li>
            <b>Monte Carlo Simulation:</b> converts single inputs to <i>ranges</i> (min/likely/max) and
            runs thousands of draws to produce P50/P90 monthly cost.
          </li>
          <li>
            <b>Statistical Tests:</b> regression and significance checks on candidate cost/risk drivers.
          </li>
        </ul>
      </Section>

      {/* 1) Lawsuit/Leak DB */}
      <Section title="1) Lawsuit / Leak Database (Automotive & Adjacent)">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-white/80">
              We compiled public cases (auto OEMs, suppliers, industrial peers) including alleged damages or
              settlements, and coded each for relevance (manufacturing IP vs. customer data, scope, and industry proximity).
              This produces a <b>benchmark distribution</b> we can use to calibrate expected loss and tails.
            </p>
            <div className="mt-4 flex items-center gap-4">
              <Link href="/uploads/lawsuit_data_leakages_scored.csv" className="text-brand underline">
                Download cases CSV
              </Link>
              <span className="text-white/50 text-sm">v1 — will expand as we add cases</span>
            </div>
            <ul className="list-disc ml-6 text-white/75 mt-4 space-y-1">
              <li>Fields: company, year, type, description, amount, relevance score</li>
              <li>Use: set priors for <i>L_breach</i> and stress scenarios</li>
            </ul>
          </div>
          <div>
            <Gallery
              images={[
                { src: '/uploads/leak_hist.png', caption: 'Leak / lawsuit amounts (illustrative bins)' },
                { src: '/uploads/leak_box.png', caption: 'Box/whisker by industry proximity' }
              ]}
            />
          </div>
        </div>
      </Section>

      {/* 2) Monte Carlo */}
      <Section title="2) Monte Carlo — Monthly Cost Distribution">
        <p className="text-white/80 mb-4">
          Inputs (storage, labeling, ops, security effectiveness) are modeled as triangular ranges. We run
          5,000+ simulations to estimate the distribution of monthly cost exposure and report P50/P90.
          The tornado chart ranks which inputs move the outcome most.
        </p>
        <Gallery
          images={[
            { src: '/uploads/mc_histogram.png', caption: 'Monte Carlo: Total Monthly Cost (P50 / P90 marked)' },
            { src: '/uploads/tornado.png', caption: 'Tornado: driver sensitivity (min→max around likely)' }
          ]}
        />
        <div className="mt-4 flex items-center gap-4">
          <Link href="/uploads/assumption_ranges.csv" className="text-brand underline">Assumption ranges CSV</Link>
          <Link href="/uploads/mc_draws.csv" className="text-brand underline">Simulation draws CSV</Link>
        </div>
      </Section>

      {/* 3) Statistical tests */}
      <Section title="3) Statistical Tests — Significance of Drivers">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-white/80">
              We run OLS on simulated (and later observed) outcomes to test which coefficients materially
              impact cost exposure (e.g., storage rate, annotation time, security half-life). We report
              coefficients, standard errors, and p-values to separate signal from noise.
            </p>
            <ul className="list-disc ml-6 text-white/75 mt-3 space-y-1">
              <li>Spec: cost ~ cTB + alpha + beta_ops + eta + L_breach (+ interactions)</li>
              <li>Outputs: β̂, SE(β̂), t-stats, p-values, adj. R²</li>
              <li>Use: focus data collection/negotiation on high-significance levers</li>
            </ul>
          </div>
          <div>
            <Gallery
              images={[
                { src: '/uploads/coef_plot.png', caption: 'Coefficient plot with 95% CIs' },
                { src: '/uploads/residuals.png', caption: 'Residual diagnostics (normality/heteroskedasticity checks)' }
              ]}
            />
          </div>
        </div>
      </Section>

      {/* Methodology details */}
      <Section title="Scraping & Curation Method (Summary)">
        <ol className="list-decimal ml-6 text-white/80 space-y-2">
          <li><b>Sources:</b> public filings, reputable news, legal databases; recorded date, party, sector, and amount.</li>
          <li><b>Cleaning:</b> normalized currencies to USD, adjusted for year, removed duplicates, and flagged ranges/estimates.</li>
          <li><b>Coding:</b> tagged each case for relevance to manufacturing IP vs. PII; assigned a 1–5 proximity score to auto OEMs.</li>
          <li><b>Validation:</b> double-checked outliers, kept notes/links per row; ambiguous values marked and excluded from means.</li>
          <li><b>Use in model:</b> informs <i>L_breach</i> priors and tail tests (P95/P99 scenarios) for the risk term.</li>
        </ol>
        <p className="text-white/60 mt-3 text-sm">
          Full methodology and source list available upon request.
        </p>
      </Section>

      {/* Next steps */}
      <Section title="Next Steps (Cost Track)">
        <ul className="list-disc ml-6 text-white/85 space-y-1">
          <li>Tighten ranges with vendor & infra quotes (storage tiers, ETL, MLOps)</li>
          <li>Add case updates to the leak DB; refresh priors quarterly</li>
          <li>Run sensitivity with alternative risk half-life assumptions</li>
          <li>Pair with Benefit team for net value bands (P50/P90)</li>
        </ul>
      </Section>
    </>
  )
}

