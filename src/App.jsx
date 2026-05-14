import { useMemo, useState } from 'react';

export default function LoanUnderwritingConsole() {
  const loanProducts = [
    {
      loanType: 'LAP',
      entity: 'Individual',
      minAge: 25,
      maxAge: 70,
      minIncome: 40000,
      minCibil: 700,
      maxFoir: 0.55,
      maxLtv: 0.6,
      roiAnnual: 0.085,
    },
    {
      loanType: 'LAS',
      entity: 'Individual',
      minAge: 21,
      maxAge: 65,
      minIncome: 50000,
      minCibil: 720,
      maxFoir: 0.5,
      maxLtv: 0.5,
      roiAnnual: 0.11,
    },
    {
      loanType: 'Education Loan',
      entity: 'Individual',
      minAge: 18,
      maxAge: 35,
      minIncome: 20000,
      minCibil: 685,
      maxFoir: 0.45,
      maxLtv: 0.85,
      roiAnnual: 0.1,
    },
    {
      loanType: 'Vehicle Loan',
      entity: 'Individual',
      minAge: 18,
      maxAge: 65,
      minIncome: 15000,
      minCibil: 700,
      maxFoir: 0.5,
      maxLtv: 0.85,
      roiAnnual: 0.085,
    },
    {
      loanType: 'Home Loan',
      entity: 'Individual',
      minAge: 21,
      maxAge: 70,
      minIncome: 30000,
      minCibil: 700,
      maxFoir: 0.6,
      maxLtv: 0.8,
      roiAnnual: 0.085,
    },
    {
      loanType: 'Personal Loan',
      entity: 'Individual',
      minAge: 21,
      maxAge: 60,
      minIncome: 25000,
      minCibil: 750,
      maxFoir: 0.5,
      maxLtv: 0,
      roiAnnual: 0.14,
    },
    {
      loanType: 'Business Loan',
      entity: 'Non-Individual',
      minAge: 3,
      maxAge: 99,
      minIncome: 100000,
      minCibil: 720,
      maxFoir: 0.4,
      maxLtv: 0.5,
      roiAnnual: 0.16,
    },
    {
      loanType: 'Working Capital',
      entity: 'Non-Individual',
      minAge: 2,
      maxAge: 99,
      minIncome: 500000,
      minCibil: 700,
      maxFoir: 0.35,
      maxLtv: 0.4,
      roiAnnual: 0.12,
    },
    {
      loanType: 'LAP (Company)',
      entity: 'Non-Individual',
      minAge: 3,
      maxAge: 99,
      minIncome: 200000,
      minCibil: 700,
      maxFoir: 0.45,
      maxLtv: 0.55,
      roiAnnual: 0.1,
    },
    {
      loanType: 'LAS (Company)',
      entity: 'Non-Individual',
      minAge: 2,
      maxAge: 99,
      minIncome: 300000,
      minCibil: 720,
      maxFoir: 0.4,
      maxLtv: 0.45,
      roiAnnual: 0.11,
    },
  ];

  const [form, setForm] = useState({
    applicantName: 'Silas Minz',
    sex: 'Male',
    entityCategory: 'Individual',
    loanType: 'Home Loan',
    loanAmount: 1500000,
    tenureMonths: 240,
    age: 35,
    monthlyIncome: 80000,
    coApplicantIncome: 20000,
    cibilScore: 730,
    existingEmi: 5000,
    collateralValue: 2500000,
    propertyUsageType: 'Self Occupied',
    repaymentHistory: 'Clean',
    industryRisk: 'Low',
    negativeGeoCheck: 'No',
  });

  const selectedLoan = useMemo(() => {
    return loanProducts.find((item) => item.loanType === form.loanType);
  }, [form.loanType]);

  const monthlyRate = (selectedLoan?.roiAnnual || 0) / 12;

  const emi = useMemo(() => {
    if (!monthlyRate || !form.tenureMonths) return 0;

    return (
      (form.loanAmount * monthlyRate * Math.pow(1 + monthlyRate, form.tenureMonths)) /
      (Math.pow(1 + monthlyRate, form.tenureMonths) - 1)
    );
  }, [form.loanAmount, form.tenureMonths, monthlyRate]);

  const totalIncome = Number(form.monthlyIncome) + Number(form.coApplicantIncome);

  const foir = (Number(form.existingEmi) + emi) / totalIncome;

  const ltv =
    Number(form.collateralValue) > 0
      ? Number(form.loanAmount) / Number(form.collateralValue)
      : 0;

  const eligibility = {
    age:
      form.age >= selectedLoan.minAge &&
      form.age <= selectedLoan.maxAge,
    income: totalIncome >= selectedLoan.minIncome,
    cibil: form.cibilScore >= selectedLoan.minCibil,
    foir: foir <= selectedLoan.maxFoir,
    ltv: selectedLoan.maxLtv === 0 || ltv <= selectedLoan.maxLtv,
  };

  const finalDecision = Object.values(eligibility).every(Boolean)
    ? 'ELIGIBLE'
    : 'DECLINED / REFER';

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-[32px] p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-400/20 text-indigo-200 text-sm mb-5">
                AI Enabled Underwriting Platform
              </div>

              <h1 className="text-5xl font-black tracking-tight">
                NEXA CREDIT DECISION ENGINE
              </h1>

              <p className="mt-5 text-slate-300 text-lg max-w-3xl leading-relaxed">
                Enterprise-grade underwriting workflow with dynamic eligibility computation,
                automated policy matching, and real-time credit assessment.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 min-w-[320px]">
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-lg">
                <div className="text-slate-300 text-sm">Applications Today</div>
                <div className="text-3xl font-black mt-2">248</div>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-lg">
                <div className="text-slate-300 text-sm">Approval Rate</div>
                <div className="text-3xl font-black mt-2">82%</div>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-lg">
                <div className="text-slate-300 text-sm">Portfolio Risk</div>
                <div className="text-3xl font-black mt-2">Low</div>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-lg">
                <div className="text-slate-300 text-sm">Loan Product</div>
                <div className="text-xl font-bold mt-2">{form.loanType}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[28px] p-7 shadow-2xl">
            <div className="text-sm text-slate-300">Loan Amount</div>
            <div className="text-3xl font-black mt-2">
              ₹ {Number(form.loanAmount).toLocaleString()}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[28px] p-7 shadow-2xl">
            <div className="text-sm text-slate-300">Monthly EMI</div>
            <div className="text-3xl font-black mt-2">
              ₹ {emi.toFixed(0)}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[28px] p-7 shadow-2xl">
            <div className="text-sm text-slate-300">FOIR</div>
            <div className="text-3xl font-black mt-2">
              {(foir * 100).toFixed(1)}%
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[28px] p-7 shadow-2xl">
            <div className="text-sm text-slate-300">Final Decision</div>
            <div className="text-3xl font-black mt-2">
              {finalDecision}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <section className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-2xl p-8">
            <h2 className="text-3xl font-black mb-8 tracking-tight">
              Comprehensive Applicant Input Form
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-slate-300 mb-2">Applicant Name</label>
                <input
                  className="w-full bg-slate-900/40 border border-white/10 rounded-2xl p-4"
                  value={form.applicantName}
                  onChange={(e) => handleChange('applicantName', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Sex</label>
                <select
                  className="w-full bg-slate-900/40 border border-white/10 rounded-2xl p-4"
                  value={form.sex}
                  onChange={(e) => handleChange('sex', e.target.value)}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Entity Category</label>
                <select
                  className="w-full bg-slate-900/40 border border-white/10 rounded-2xl p-4"
                  value={form.entityCategory}
                  onChange={(e) => handleChange('entityCategory', e.target.value)}
                >
                  <option>Individual</option>
                  <option>Non-Individual</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Loan Product Selection</label>
                <select
                  className="w-full bg-slate-900/40 border border-white/10 rounded-2xl p-4"
                  value={form.loanType}
                  onChange={(e) => handleChange('loanType', e.target.value)}
                >
                  {loanProducts.map((loan) => (
                    <option key={loan.loanType} value={loan.loanType}>
                      {loan.loanType}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Loan Amount Required</label>
                <input
                  type="number"
                  className="w-full bg-slate-900/40 border border-white/10 rounded-2xl p-4"
                  value={form.loanAmount}
                  onChange={(e) => handleChange('loanAmount', Number(e.target.value))}
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Tenure Required (Months)</label>
                <input
                  type="number"
                  className="w-full bg-slate-900/40 border border-white/10 rounded-2xl p-4"
                  value={form.tenureMonths}
                  onChange={(e) => handleChange('tenureMonths', Number(e.target.value))}
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Age / Business Vintage (Yrs)</label>
                <input
                  type="number"
                  className="w-full bg-slate-900/40 border border-white/10 rounded-2xl p-4"
                  value={form.age}
                  onChange={(e) => handleChange('age', Number(e.target.value))}
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Monthly Income / Annual PAT</label>
                <input
                  type="number"
                  className="w-full bg-slate-900/40 border border-white/10 rounded-2xl p-4"
                  value={form.monthlyIncome}
                  onChange={(e) => handleChange('monthlyIncome', Number(e.target.value))}
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Co-Applicant Income</label>
                <input
                  type="number"
                  className="w-full bg-slate-900/40 border border-white/10 rounded-2xl p-4"
                  value={form.coApplicantIncome}
                  onChange={(e) => handleChange('coApplicantIncome', Number(e.target.value))}
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">CIBIL / CMR Score</label>
                <input
                  type="number"
                  className="w-full bg-slate-900/40 border border-white/10 rounded-2xl p-4"
                  value={form.cibilScore}
                  onChange={(e) => handleChange('cibilScore', Number(e.target.value))}
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Total Existing Monthly EMIs</label>
                <input
                  type="number"
                  className="w-full bg-slate-900/40 border border-white/10 rounded-2xl p-4"
                  value={form.existingEmi}
                  onChange={(e) => handleChange('existingEmi', Number(e.target.value))}
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Collateral Market Value</label>
                <input
                  type="number"
                  className="w-full bg-slate-900/40 border border-white/10 rounded-2xl p-4"
                  value={form.collateralValue}
                  onChange={(e) => handleChange('collateralValue', Number(e.target.value))}
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Property Usage Type</label>
                <select
                  className="w-full bg-slate-900/40 border border-white/10 rounded-2xl p-4"
                  value={form.propertyUsageType}
                  onChange={(e) => handleChange('propertyUsageType', e.target.value)}
                >
                  <option>Self Occupied</option>
                  <option>Rental</option>
                  <option>Commercial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Past Repayment History</label>
                <select
                  className="w-full bg-slate-900/40 border border-white/10 rounded-2xl p-4"
                  value={form.repaymentHistory}
                  onChange={(e) => handleChange('repaymentHistory', e.target.value)}
                >
                  <option>Clean</option>
                  <option>Delayed</option>
                  <option>Defaulted</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Industry Risk Category</label>
                <select
                  className="w-full bg-slate-900/40 border border-white/10 rounded-2xl p-4"
                  value={form.industryRisk}
                  onChange={(e) => handleChange('industryRisk', e.target.value)}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Negative Geo-Area Check</label>
                <select
                  className="w-full bg-slate-900/40 border border-white/10 rounded-2xl p-4"
                  value={form.negativeGeoCheck}
                  onChange={(e) => handleChange('negativeGeoCheck', e.target.value)}
                >
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>
            </div>
          </section>

          <section className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-2xl p-8">
            <h2 className="text-3xl font-black mb-8 tracking-tight">
              Eligibility Output
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between bg-slate-900/30 rounded-2xl p-4">
                <span>Interest Rate</span>
                <span>{(selectedLoan.roiAnnual * 100).toFixed(2)}%</span>
              </div>

              <div className="flex justify-between bg-slate-900/30 rounded-2xl p-4">
                <span>EMI</span>
                <span>₹ {emi.toFixed(2)}</span>
              </div>

              <div className="flex justify-between bg-slate-900/30 rounded-2xl p-4">
                <span>FOIR</span>
                <span>{(foir * 100).toFixed(2)}%</span>
              </div>

              <div className="flex justify-between bg-slate-900/30 rounded-2xl p-4">
                <span>LTV</span>
                <span>{(ltv * 100).toFixed(2)}%</span>
              </div>

              <div className="flex justify-between bg-indigo-600 rounded-2xl p-5 font-bold text-lg">
                <span>Final Status</span>
                <span>{finalDecision}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
