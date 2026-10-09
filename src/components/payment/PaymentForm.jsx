import React, { useState } from 'react';
import Button from '../common/Button';
import { CreditCard, Landmark, Lock, AlertCircle, CheckCircle2, ChevronRight, Building2, QrCode } from 'lucide-react';

const POPULAR_BANKS = [
  { id: 'SBI', name: 'State Bank of India', short: 'SBI' },
  { id: 'HDFC', name: 'HDFC Bank', short: 'HDFC' },
  { id: 'ICICI', name: 'ICICI Bank', short: 'ICICI' },
  { id: 'AXIS', name: 'Axis Bank', short: 'AXIS' },
  { id: 'KOTAK', name: 'Kotak Mahindra', short: 'KOTAK' },
  { id: 'PNB', name: 'Punjab National Bank', short: 'PNB' }
];

const ALL_BANKS = [
  'State Bank of India (SBI)',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'Punjab National Bank (PNB)',
  'Bank of Baroda',
  'Canara Bank',
  'Union Bank of India',
  'Indian Overseas Bank',
  'IndusInd Bank',
  'Yes Bank',
  'Federal Bank',
  'IDFC FIRST Bank',
  'Central Bank of India',
  'Bank of India'
];

const PaymentForm = ({ amount, onSubmit, loading }) => {
  const [method, setMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: ''
  });
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [upiId, setUpiId] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState('');
  const [errors, setErrors] = useState({});

  // Cardholder Name: Allow ONLY letters and spaces (no numbers)
  const handleCardHolderChange = (e) => {
    const lettersOnly = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setCardDetails(prev => ({ ...prev, cardHolder: lettersOnly }));
    if (errors.cardHolder) {
      setErrors(prev => ({ ...prev, cardHolder: '' }));
    }
  };

  // Card Number: Allow ONLY digits, exactly 16 digits, formatted in 4 blocks of 4
  const handleCardNumberChange = (e) => {
    const rawDigits = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = rawDigits.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardDetails(prev => ({ ...prev, cardNumber: formatted }));
    if (errors.cardNumber) {
      setErrors(prev => ({ ...prev, cardNumber: '' }));
    }
  };

  // Expiry: MM/YY auto-format
  const handleExpiryChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    let formatted = raw;
    if (raw.length >= 3) {
      formatted = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    setCardDetails(prev => ({ ...prev, expiry: formatted }));
    if (errors.expiry) {
      setErrors(prev => ({ ...prev, expiry: '' }));
    }
  };

  // CVV: 3-4 digits only
  const handleCvvChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCardDetails(prev => ({ ...prev, cvv: raw }));
    if (errors.cvv) {
      setErrors(prev => ({ ...prev, cvv: '' }));
    }
  };

  // Account Number for Net Banking: Digits only, 9 to 18 digits
  const handleAccountNumberChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 18);
    setAccountNumber(digitsOnly);
    if (errors.accountNumber) {
      setErrors(prev => ({ ...prev, accountNumber: '' }));
    }
  };

  const handleUpiChange = (e) => {
    setUpiId(e.target.value);
    if (errors.upiId) {
      setErrors(prev => ({ ...prev, upiId: '' }));
    }
  };

  const handleBankSelect = (bankName) => {
    setSelectedBank(bankName);
    if (errors.bank) {
      setErrors(prev => ({ ...prev, bank: '' }));
    }
  };

  const handleUpiAppSelect = (appName) => {
    setSelectedUpiApp(appName);
    // Optional: Auto-fill typical suffix or just clear error
    if (errors.upiApp) {
      setErrors(prev => ({ ...prev, upiApp: '' }));
    }
  };

  const rawDigitsCount = cardDetails.cardNumber.replace(/\s/g, '').length;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (method === 'card') {
      const trimmedHolder = cardDetails.cardHolder.trim();
      if (!trimmedHolder) {
        newErrors.cardHolder = 'Cardholder name is required.';
      } else if (!/^[a-zA-Z\s]+$/.test(trimmedHolder)) {
        newErrors.cardHolder = 'Cardholder name can only contain letters (no numbers).';
      }

      const rawCard = cardDetails.cardNumber.replace(/\s/g, '');
      if (!rawCard) {
        newErrors.cardNumber = 'Card number is required.';
      } else if (rawCard.length !== 16) {
        newErrors.cardNumber = `Card number must be exactly 16 digits (currently ${rawCard.length} digits entered).`;
      }

      if (!cardDetails.expiry || cardDetails.expiry.length < 5) {
        newErrors.expiry = 'Enter a valid expiry date (MM/YY).';
      }

      if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
        newErrors.cvv = 'Enter a valid 3 or 4-digit CVV.';
      }
    } else if (method === 'netbanking') {
      if (!selectedBank) {
        newErrors.bank = 'Please select your bank to proceed with Net Banking.';
      }
      if (!accountNumber.trim()) {
        newErrors.accountNumber = 'Account number is required.';
      } else if (accountNumber.length < 9) {
        newErrors.accountNumber = `Account number must be between 9 and 18 digits (currently ${accountNumber.length} digits).`;
      }
    } else if (method === 'upi') {
      if (!selectedUpiApp) {
        newErrors.upiApp = 'Please select a UPI app (e.g., Google Pay, PhonePe, Paytm).';
      }
      if (!upiId.trim()) {
        newErrors.upiId = 'UPI ID is required.';
      } else if (!/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/.test(upiId.trim())) {
        newErrors.upiId = 'Please enter a valid UPI ID (e.g., yourname@bank).';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      paymentMethod: method === 'card' ? 'Credit Card' : method === 'netbanking' ? `Net Banking (${selectedBank})` : `UPI (${selectedUpiApp})`,
      amount,
      ...cardDetails,
      bankName: selectedBank,
      accountNumber,
      upiId
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-peach-200 shadow-xl space-y-6">
      <div>
        <h3 className="text-xl font-extrabold text-purple-950">Secure Payment Checkout</h3>
        <p className="text-xs text-slate-500">Select your preferred payment method for Elite Hall reservation</p>
      </div>

      {/* Payment Method Selector Tabs: Credit Card | Net Banking | UPI */}
      <div className="grid grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => { setMethod('card'); setErrors({}); }}
          className={`p-3.5 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
            method === 'card'
              ? 'bg-purple-900 text-white border-purple-900 shadow-md'
              : 'bg-peach-50/70 text-purple-950 border-peach-200 hover:bg-peach-100'
          }`}
        >
          <CreditCard className="w-5 h-5 text-peach-400" />
          <span>Credit Card</span>
        </button>

        <button
          type="button"
          onClick={() => { setMethod('netbanking'); setErrors({}); }}
          className={`p-3.5 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
            method === 'netbanking'
              ? 'bg-purple-900 text-white border-purple-900 shadow-md'
              : 'bg-peach-50/70 text-purple-950 border-peach-200 hover:bg-peach-100'
          }`}
        >
          <Landmark className="w-5 h-5 text-peach-400" />
          <span>Net Banking</span>
        </button>

        <button
          type="button"
          onClick={() => { setMethod('upi'); setErrors({}); }}
          className={`p-3.5 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
            method === 'upi'
              ? 'bg-purple-900 text-white border-purple-900 shadow-md'
              : 'bg-peach-50/70 text-purple-950 border-peach-200 hover:bg-peach-100'
          }`}
        >
          <QrCode className="w-5 h-5 text-peach-400" />
          <span>UPI</span>
        </button>
      </div>

      {/* Credit Card Form Fields */}
      {method === 'card' && (
        <div className="space-y-4 pt-2">
          {/* Cardholder Name: Letters only */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-bold text-slate-700">Cardholder Name</label>
              <span className="text-[10px] text-purple-700 font-semibold">Letters only (no numbers)</span>
            </div>
            <input
              type="text"
              name="cardholder_name"
              autoComplete="cc-name"
              placeholder="Name on card (e.g. John Doe)"
              value={cardDetails.cardHolder}
              onChange={handleCardHolderChange}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm text-purple-950 focus:outline-none focus:ring-2 ${
                errors.cardHolder
                  ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30'
                  : 'border-peach-300 focus:ring-purple-600'
              }`}
            />
            {errors.cardHolder && (
              <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-semibold">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.cardHolder}</span>
              </p>
            )}
          </div>

          {/* Card Number: Exactly 16 digits */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-bold text-slate-700">Card Number</label>
              <span className={`text-[10px] font-bold ${rawDigitsCount === 16 ? 'text-emerald-600' : 'text-slate-500'}`}>
                {rawDigitsCount === 16 ? '✓ 16/16 digits' : `${rawDigitsCount}/16 digits`}
              </span>
            </div>
            <input
              type="text"
              name="card_number"
              autoComplete="cc-number"
              maxLength={19}
              placeholder="4532 1234 5678 8892"
              value={cardDetails.cardNumber}
              onChange={handleCardNumberChange}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm text-purple-950 focus:outline-none focus:ring-2 font-mono tracking-wider ${
                errors.cardNumber
                  ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30'
                  : 'border-peach-300 focus:ring-purple-600'
              }`}
            />
            {errors.cardNumber ? (
              <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-semibold">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.cardNumber}</span>
              </p>
            ) : (
              <p className="text-[11px] text-slate-500 mt-1">Must be exactly 16 digits.</p>
            )}
          </div>

          {/* Expiry Date & CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Expiry Date</label>
              <input
                type="text"
                name="cc_expiry"
                autoComplete="cc-exp"
                maxLength={5}
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={handleExpiryChange}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm text-purple-950 focus:outline-none focus:ring-2 font-mono ${
                  errors.expiry
                    ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30'
                    : 'border-peach-300 focus:ring-purple-600'
                }`}
              />
              {errors.expiry && (
                <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-semibold">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.expiry}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">CVV Security Code</label>
              <input
                type="password"
                name="cc_cvv"
                autoComplete="cc-csc"
                maxLength={4}
                placeholder="•••"
                value={cardDetails.cvv}
                onChange={handleCvvChange}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm text-purple-950 focus:outline-none focus:ring-2 font-mono ${
                  errors.cvv
                    ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30'
                    : 'border-peach-300 focus:ring-purple-600'
                }`}
              />
              {errors.cvv && (
                <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-semibold">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.cvv}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Net Banking Form Fields */}
      {method === 'netbanking' && (
        <div className="space-y-5 pt-2">
          {/* Bank Selection Section */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Select Your Bank
            </label>

            {/* Popular Banks Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
              {POPULAR_BANKS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => handleBankSelect(b.name)}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-left flex items-center justify-between transition-all ${
                    selectedBank === b.name
                      ? 'bg-purple-100/90 text-purple-950 border-purple-600 ring-2 ring-purple-600/30'
                      : 'bg-peach-50/50 text-slate-700 border-peach-200 hover:bg-peach-100 hover:text-purple-950'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Building2 className={`w-3.5 h-3.5 ${selectedBank === b.name ? 'text-purple-700' : 'text-slate-400'}`} />
                    <span className="truncate">{b.short}</span>
                  </div>
                  {selectedBank === b.name && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                  )}
                </button>
              ))}
            </div>

            {/* All Banks Dropdown */}
            <div className="relative">
              <select
                value={selectedBank}
                onChange={(e) => handleBankSelect(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm text-purple-950 bg-white focus:outline-none focus:ring-2 ${
                  errors.bank
                    ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30'
                    : 'border-peach-300 focus:ring-purple-600'
                }`}
              >
                <option value="">-- Or choose from all banks --</option>
                {ALL_BANKS.map((bankName) => (
                  <option key={bankName} value={bankName}>
                    {bankName}
                  </option>
                ))}
              </select>
            </div>

            {errors.bank && (
              <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-semibold">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.bank}</span>
              </p>
            )}
          </div>

          {/* Account Number Field (Displayed after choosing a bank or when bank is active) */}
          {selectedBank && (
            <div className="p-4 bg-purple-50/70 rounded-2xl border border-purple-200 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-purple-950">
                  <Landmark className="w-4 h-4 text-purple-700" />
                  <span className="text-xs font-black">Connected Bank:</span>
                  <span className="text-xs font-bold text-purple-700 bg-white px-2 py-0.5 rounded-lg border border-purple-200">
                    {selectedBank}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-slate-800">Bank Account Number</label>
                  <span className={`text-[10px] font-bold ${accountNumber.length >= 9 ? 'text-emerald-600' : 'text-slate-500'}`}>
                    {accountNumber.length > 0 ? `${accountNumber.length}/18 digits` : '9 - 18 digits'}
                  </span>
                </div>
                <input
                  type="text"
                  name="bank_account_number"
                  autoComplete="off"
                  maxLength={18}
                  placeholder="Enter 9 to 18-digit account number"
                  value={accountNumber}
                  onChange={handleAccountNumberChange}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm text-purple-950 bg-white focus:outline-none focus:ring-2 font-mono tracking-wider ${
                    errors.accountNumber
                      ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30'
                      : 'border-purple-300 focus:ring-purple-600'
                  }`}
                />
                {errors.accountNumber ? (
                  <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.accountNumber}</span>
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-500 mt-1">
                    Enter your {selectedBank} account number to authorize payment.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* UPI Form Fields */}
      {method === 'upi' && (
        <div className="space-y-5 pt-2">
          {/* UPI App Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Select UPI App
            </label>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-1">
              {[
                { id: 'gpay', name: 'Google Pay' },
                { id: 'phonepe', name: 'PhonePe' },
                { id: 'paytm', name: 'Paytm' }
              ].map((app) => (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => handleUpiAppSelect(app.name)}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                    selectedUpiApp === app.name
                      ? 'bg-purple-100/90 text-purple-950 border-purple-600 ring-2 ring-purple-600/30'
                      : 'bg-peach-50/50 text-slate-700 border-peach-200 hover:bg-peach-100 hover:text-purple-950'
                  }`}
                >
                  {app.name}
                </button>
              ))}
            </div>
            {errors.upiApp && (
              <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-semibold">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.upiApp}</span>
              </p>
            )}
          </div>

          {/* UPI ID Input (Shown when an app is selected or always shown) */}
          <div className="animate-in fade-in duration-200">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-bold text-slate-700">Enter UPI ID</label>
            </div>
            <div className="relative">
              <input
                type="text"
                name="upi_id"
                autoComplete="off"
                placeholder="e.g. yourname@bank"
                value={upiId}
                onChange={handleUpiChange}
                className={`w-full px-4 py-2.5 pl-10 rounded-xl border text-sm text-purple-950 bg-white focus:outline-none focus:ring-2 ${
                  errors.upiId
                    ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30'
                    : 'border-peach-300 focus:ring-purple-600'
                }`}
              />
              <QrCode className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            </div>
            {errors.upiId ? (
              <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-semibold">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.upiId}</span>
              </p>
            ) : (
              <p className="text-[11px] text-slate-500 mt-1">A payment request will be sent to this UPI ID.</p>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center space-x-2 text-xs text-slate-500 justify-center">
        <Lock className="w-4 h-4 text-emerald-600" />
        <span>256-bit Bank Grade SSL Encryption</span>
      </div>

      <Button type="submit" variant="primary" fullWidth size="lg" loading={loading}>
        {method === 'netbanking' && selectedBank ? `Pay with ${selectedBank}` : method === 'upi' && selectedUpiApp ? `Pay with ${selectedUpiApp}` : 'Pay Now'}
      </Button>
    </form>
  );
};

export default PaymentForm;
