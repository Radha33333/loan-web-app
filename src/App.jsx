import { useMemo, useState } from 'react';

export default function LoanUnderwritingConsole() {
  const loanProducts = [
    {
      loanType: 'Home Loan',
      entity: 'Individual',
      minAge: 21,
      maxAge: 70,
      minIncome: 30000,
      minCibil: 720,
      maxFoir: 0.6,
      maxLtv: 0.8,
      roiAnnual: 0.0825,
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
      loanType: 'Vehicle Loan',
      entity: 'Individual',
      minAge: 18,
      maxAge: 65,
      minIncome: 15000,
      minCibil: 700,
      maxFoir: 0.5,
      maxLtv: 0.85,
      roiAnnual: 0.09,
    },
    {
      loanType: 'Education Loan',
      entity: 'Individual',
      minAge: 18,
      maxAge: 35,
      minIncome: 20000,
      minCibil: 680,
      maxFoir: 0.45,
      maxLtv: 0.9,
      roiAnnual: 0.105,
    },
    {
      loanType: 'Loan Against Property',
      entity: 'Individual',
      minAge: 25,
      maxAge: 70,
      minIncome: 40000,
      minCibil: 700,
      maxFoir: 0.55,
      maxLtv: 0.65,
      roiAnnual: 0.1,
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
      maxLtv: 0.45,
      roiAnnual: 0.125,
    },
    {
      loanType: 'Gold Loan',
      entity: 'Individual',
      minAge: 18,
      maxAge: 75,
      minIncome: 10000,
      minCibil: 650,
      maxFoir: 0.65,
      maxLtv: 0.75,
      roiAnnual: 0.115,
    },
    {
      loanType: 'Credit Card Loan',
      entity: 'Individual',
      minAge: 21,
      maxAge: 60,
      minIncome: 25000,
      minCibil: 760,
      maxFoir: 0.45,
      maxLtv: 0,
      roiAnnual: 0.18,
    },
    {
      loanType: 'Commercial Vehicle Loan',
      entity: 'Non-Individual',
      minAge: 21,
      maxAge: 65,
      minIncome: 80000,
      minCibil: 690,
      maxFoir: 0.5,
      maxLtv: 0.8,
      roiAnnual: 0.12,
    },
  ];

  const [form, setForm] = useState({
    applicantName: 'Silas Minz',
    gender: 'Male',
    loanType: 'Home Loan',
    age: 35,
    monthlyIncome: 80000,
    coApplicantIncome: 20000,
    cibilScore: 730,
    existingEmi: 5000,
    collateralValue: 2500000,
    loanAmount: 1500000,
    tenureMonths: 240,
    repaymentHistory: 'Clean',
    propertyType: 'Residential',
    industryRisk: 'Low Risk',
  });

  const selectedLoan = useMemo(() => {
    return loanProducts.find((item) => item.loanType === form.loanType);
  }, [form.loanType]);

  const monthlyRate = (selectedLoan?.roiAnnual || 0) / 12;

  const emi = useMemo(() => {
    if (!monthlyRate || !form.tenureMonths) return 0;

    return (
      (form.loanAmount *
        monthlyRate *
        Math.pow(1 + monthlyRate, form.tenureMonths)) /
      (Math.pow(1 + monthlyRate, form.tenureMonths) - 1)
    );
  }, [form.loanAmount, form.tenureMonths, monthlyRate]);

  const totalIncome =
    Number(form.monthlyIncome) + Number(form.coApplicantIncome);

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

    ltv: ltv <= selectedLoan.maxLtv || selectedLoan.maxLtv === 0,
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
    <div className="min-h-screen bg-slate-100 p-6 text-slate-900">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl">
          <h1 className="text-4xl font-black">
            ADVANCED LOAN UNDERWRITING SYSTEM
          </h1>
          <p className="mt-3 text-slate-300 text-lg">
            Dynamic Excel-style web application with real-time eligibility calculations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          <div className="bg-white rounded-3xl p-6 shadow-lg border">
            <div className="text-sm text-slate-500">Loan Amount</div>
            <div className="text-3xl font-black mt-2">
              ₹ {Number(form.loanAmount).toLocaleString()}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border">
            <div className="text-sm text-slate-500">EMI</div>
            <div className="text-3xl font-black mt-2">
              ₹ {emi.toFixed(0)}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border">
            <div className="text-sm text-slate-500">FOIR</div>
            <div className="text-3xl font-black mt-2">
              {(foir * 100).toFixed(1)}%
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border">
            <div className="text-sm text-slate-500">Final Decision</div>
            <div className="text-3xl font-black mt-2">
              {finalDecision}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <section className="bg-white rounded-3xl shadow-xl border p-6">
            <h2 className="text-2xl font-bold mb-6">Applicant Input Form</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium">Applicant Name</label>
                <input
                  className="w-full border rounded-xl p-3 mt-2"
                  value={form.applicantName}
                  onChange={(e) =>
                    handleChange('applicantName', e.target.value)
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium">Gender</label>
                <select
                  className="w-full border rounded-xl p-3 mt-2"
                  value={form.gender}
                  onChange={(e) => handleChange('gender', e.target.value)}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Loan Type</label>
                <select
                  className="w-full border rounded-xl p-3 mt-2"
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
                <label className="text-sm font-medium">Age</label>
                <input
                  type="number"
                  className="w-full border rounded-xl p-3 mt-2"
                  value={form.age}
                  onChange={(e) => handleChange('age', Number(e.target.value))}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Monthly Income</label>
                <input
                  type="number"
                  className="w-full border rounded-xl p-3 mt-2"
                  value={form.monthlyIncome}
                  onChange={(e) =>
                    handleChange('monthlyIncome', Number(e.target.value))
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium">Co-Applicant Income</label>
                <input
                  type="number"
                  className="w-full border rounded-xl p-3 mt-2"
                  value={form.coApplicantIncome}
                  onChange={(e) =>
                    handleChange('coApplicantIncome', Number(e.target.value))
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium">CIBIL Score</label>
                <input
                  type="number"
                  className="w-full border rounded-xl p-3 mt-2"
                  value={form.cibilScore}
                  onChange={(e) =>
                    handleChange('cibilScore', Number(e.target.value))
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium">Existing EMI</label>
                <input
                  type="number"
                  className="w-full border rounded-xl p-3 mt-2"
                  value={form.existingEmi}
                  onChange={(e) =>
                    handleChange('existingEmi', Number(e.target.value))
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium">Collateral Value</label>
                <input
                  type="number"
                  className="w-full border rounded-xl p-3 mt-2"
                  value={form.collateralValue}
                  onChange={(e) =>
                    handleChange('collateralValue', Number(e.target.value))
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium">Loan Amount</label>
                <input
                  type="number"
                  className="w-full border rounded-xl p-3 mt-2"
                  value={form.loanAmount}
                  onChange={(e) =>
                    handleChange('loanAmount', Number(e.target.value))
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium">Tenure (Months)</label>
                <input
                  type="number"
                  className="w-full border rounded-xl p-3 mt-2"
                  value={form.tenureMonths}
                  onChange={(e) =>
                    handleChange('tenureMonths', Number(e.target.value))
                  }
                />
              </div>
            </div>
          </section>

          <section className="bg-white rounded-3xl shadow-xl border p-6">
            <h2 className="text-2xl font-bold mb-6">Eligibility Output</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <tbody>
                  <tr>
                    <td className="border p-3 font-semibold">Selected Loan</td>
                    <td className="border p-3">{form.loanType}</td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-semibold">Interest Rate</td>
                    <td className="border p-3">
                      {(selectedLoan.roiAnnual * 100).toFixed(2)}%
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-semibold">EMI</td>
                    <td className="border p-3">₹ {emi.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-semibold">FOIR</td>
                    <td className="border p-3">
                      {(foir * 100).toFixed(2)}%
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-semibold">LTV</td>
                    <td className="border p-3">
                      {(ltv * 100).toFixed(2)}%
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-semibold">Final Status</td>
                    <td className="border p-3 font-bold">
                      {finalDecision}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Eligibility Matrix</h3>

              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="border p-3 text-left">Parameter</th>
                    <th className="border p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-3">Age Eligibility</td>
                    <td className="border p-3">
                      {eligibility.age ? 'PASS' : 'FAIL'}
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-3">Income Eligibility</td>
                    <td className="border p-3">
                      {eligibility.income ? 'PASS' : 'FAIL'}
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-3">CIBIL Eligibility</td>
                    <td className="border p-3">
                      {eligibility.cibil ? 'PASS' : 'FAIL'}
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-3">FOIR Eligibility</td>
                    <td className="border p-3">
                      {eligibility.foir ? 'PASS' : 'FAIL'}
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-3">LTV Eligibility</td>
                    <td className="border p-3">
                      {eligibility.ltv ? 'PASS' : 'FAIL'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <section className="bg-white rounded-3xl shadow-xl border p-6">
          <h2 className="text-2xl font-bold mb-6">Complete Loan Product Master</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border p-3 text-left">Loan Type</th>
                  <th className="border p-3 text-left">Entity</th>
                  <th className="border p-3 text-left">Min Age</th>
                  <th className="border p-3 text-left">Max Age</th>
                  <th className="border p-3 text-left">Min Income</th>
                  <th className="border p-3 text-left">Min CIBIL</th>
                  <th className="border p-3 text-left">Max FOIR</th>
                  <th className="border p-3 text-left">Max LTV</th>
                  <th className="border p-3 text-left">ROI</th>
                </tr>
              </thead>
              <tbody>
                {loanProducts.map((loan, index) => (
                  <tr key={index}>
                    <td className="border p-3">{loan.loanType}</td>
                    <td className="border p-3">{loan.entity}</td>
                    <td className="border p-3">{loan.minAge}</td>
                    <td className="border p-3">{loan.maxAge}</td>
                    <td className="border p-3">
                      ₹ {loan.minIncome.toLocaleString()}
                    </td>
                    <td className="border p-3">{loan.minCibil}</td>
                    <td className="border p-3">
                      {(loan.maxFoir * 100).toFixed(0)}%
                    </td>
                    <td className="border p-3">
                      {(loan.maxLtv * 100).toFixed(0)}%
                    </td>
                    <td className="border p-3">
                      {(loan.roiAnnual * 100).toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}


