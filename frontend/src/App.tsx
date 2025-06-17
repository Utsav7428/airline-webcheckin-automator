import React, { useState } from 'react';
import { Plane, Download, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

interface FormData {
  pnr: string;
  lastName: string;
  airline: string;
}

interface ResultState {
  success: boolean;
  message: string;
}

interface Airline {
  value: string;
  label: string;
  color: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    pnr: '',
    lastName: '',
    airline: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultState | null>(null);

  const airlines: Airline[] = [
    { value: 'indigo', label: 'IndiGo', color: 'from-indigo-500 to-blue-600' },
    { value: 'airindia', label: 'Air India', color: 'from-red-500 to-orange-600' },
    { value: 'spicejet', label: 'SpiceJet', color: 'from-red-600 to-yellow-500' },
    { value: 'akasa', label: 'Akasa Air', color: 'from-purple-500 to-pink-600' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: name === 'airline' ? value : value.toUpperCase()
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.pnr || !formData.lastName || !formData.airline) {
      setResult({
        success: false,
        message: 'Please fill in all required fields'
      });
      return;
    }

    if (formData.pnr.length !== 6) {
      setResult({
        success: false,
        message: 'PNR must be exactly 6 characters'
      });
      return;
    }

    setLoading(true);
    setResult(null);

    // Simulate API call
    setTimeout(() => {
      setResult({
        success: true,
        message: 'Boarding pass generated successfully!'
      });
      setLoading(false);
    }, 2000);
  };

  const selectedAirline = airlines.find(a => a.value === formData.airline);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Boarding Pass Generator</h1>
              <p className="text-sm text-gray-600">Skip the queues, get your boarding pass instantly</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Form Header */}
          <div className={`p-6 bg-gradient-to-r ${selectedAirline?.color || 'from-blue-500 to-indigo-600'} transition-all duration-500`}>
            <h2 className="text-2xl font-bold text-white mb-2">Generate Your Boarding Pass</h2>
            <p className="text-blue-100">
              {selectedAirline ? `${selectedAirline.label} - ` : ''}Enter your booking details to get started
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Airline Selection */}
            <div>
              <label htmlFor="airline" className="block text-sm font-semibold text-gray-700 mb-2">
                Select Airline *
              </label>
              <select
                id="airline"
                name="airline"
                value={formData.airline}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg bg-white"
                required
              >
                <option value="">Choose your airline</option>
                {airlines.map(airline => (
                  <option key={airline.value} value={airline.value}>
                    {airline.label}
                  </option>
                ))}
              </select>
            </div>

            {/* PNR Input */}
            <div>
              <label htmlFor="pnr" className="block text-sm font-semibold text-gray-700 mb-2">
                PNR Number *
              </label>
              <input
                type="text"
                id="pnr"
                name="pnr"
                value={formData.pnr}
                onChange={handleInputChange}
                placeholder="Enter your 6-character PNR"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg font-mono tracking-wider uppercase"
                maxLength={6}
                pattern="[A-Z0-9]{6}"
                required
              />
            </div>

            {/* Last Name Input */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter passenger's last name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg uppercase"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !formData.pnr || !formData.lastName || !formData.airline}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all transform hover:scale-[1.02] focus:scale-[1.02] disabled:scale-100 disabled:opacity-50 disabled:cursor-not-allowed ${
                selectedAirline 
                  ? `bg-gradient-to-r ${selectedAirline.color} hover:shadow-lg`
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Generating Boarding Pass...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Download className="h-5 w-5" />
                  <span>Generate Boarding Pass</span>
                </div>
              )}
            </button>
          </form>

          {/* Result Display */}
          {result && (
            <div className="mx-6 mb-6">
              {result.success ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-800">Success!</span>
                  </div>
                  <p className="text-green-700 mt-1">{result.message}</p>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <span className="font-semibold text-red-800">Error</span>
                  </div>
                  <p className="text-red-700 mt-1">{result.message}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Supported Airlines Info */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">✈️ Supported Airlines</h3>
          <div className="grid grid-cols-2 gap-4">
            {airlines.map(airline => (
              <div key={airline.value} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${airline.color}`}></div>
                <span className="text-sm text-gray-700">{airline.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;