import React, { useState } from 'react';
import { BarChart3Icon, AlertTriangleIcon, CheckCircleIcon, InfoIcon } from 'lucide-react';
import { BarChart } from './BarChart';
import { Tooltip } from './Tooltip';
export function AnalysisDashboard() {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const analysisData = [{
    metric: 'Overall WCAG Score',
    value: '87%',
    status: 'good',
    color: 'text-green-600 dark:text-green-400'
  }, {
    metric: 'Contrast Ratio Issues',
    value: '3',
    status: 'warning',
    color: 'text-yellow-600 dark:text-yellow-400'
  }, {
    metric: 'CVD-Friendly Elements',
    value: '92%',
    status: 'good',
    color: 'text-green-600 dark:text-green-400'
  }, {
    metric: 'Critical Issues',
    value: '1',
    status: 'error',
    color: 'text-red-600 dark:text-red-400'
  }];
  const chartData = [{
    label: 'Level A',
    value: 95,
    color: '#10B981'
  }, {
    label: 'Level AA',
    value: 78,
    color: '#F59E0B'
  }, {
    label: 'Level AAA',
    value: 45,
    color: '#EF4444'
  }];
  const contrastIssues = [{
    element: 'Primary Button Text',
    current: '3.2:1',
    required: '4.5:1',
    severity: 'High',
    suggestion: 'Use darker text or lighter background',
    impact: 'Users with low vision may struggle to read button text'
  }, {
    element: 'Secondary Navigation',
    current: '4.1:1',
    required: '4.5:1',
    severity: 'Medium',
    suggestion: 'Increase text darkness by 10%',
    impact: 'Navigation may be difficult to read in bright environments'
  }, {
    element: 'Footer Links',
    current: '3.8:1',
    required: '4.5:1',
    severity: 'Medium',
    suggestion: 'Use higher contrast color for links',
    impact: 'Footer links may not be easily distinguishable'
  }];
  const handleRowFocus = (index: number) => {
    setSelectedRow(index);
  };
  const handleRowBlur = () => {
    setSelectedRow(null);
  };
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedRow(selectedRow === index ? null : index);
    }
  };
  return <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover-lift transition-all duration-300 shadow-lg hover:shadow-xl" aria-labelledby="analysis-heading">
      <div className="flex items-center space-x-2 mb-6">
        <BarChart3Icon className="h-6 w-6 text-purple-600" aria-hidden="true" />
        <h2 id="analysis-heading" className="text-xl font-semibold text-gray-900 dark:text-white">
          Accessibility Analysis
        </h2>
      </div>
      {/* Metrics Overview */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {analysisData.map((item, index) => <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover-lift transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-600" style={{
        animationDelay: `${index * 0.1}s`
      }}>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {item.metric}
              </p>
              <Tooltip content={`${item.metric} details`}>
                <div className="flex items-center space-x-1">
                  {item.status === 'good' && <CheckCircleIcon className="h-4 w-4 text-green-500 animate-pulse" />}
                  {item.status === 'warning' && <AlertTriangleIcon className="h-4 w-4 text-yellow-500 animate-pulse" />}
                  {item.status === 'error' && <AlertTriangleIcon className="h-4 w-4 text-red-500 animate-pulse" />}
                  <InfoIcon className="h-3 w-3 text-gray-400 cursor-help" />
                </div>
              </Tooltip>
            </div>
            <p className={`text-2xl font-bold mt-1 ${item.color} transition-all duration-300`}>
              {item.value}
            </p>
          </div>)}
      </div>
      {/* WCAG Compliance Chart */}
      <div className="mb-6">
        <BarChart data={chartData} title="WCAG 2.1 Compliance Levels" />
      </div>
      {/* WCAG Compliance Summary */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
          WCAG 2.1 Compliance Summary
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded hover-lift transition-all duration-300 hover:bg-green-100 dark:hover:bg-green-900/30">
            <span className="text-green-800 dark:text-green-200 font-medium">
              Level A
            </span>
            <span className="text-green-600 dark:text-green-400">
              ✓ Compliant
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded hover-lift transition-all duration-300 hover:bg-yellow-100 dark:hover:bg-yellow-900/30">
            <span className="text-yellow-800 dark:text-yellow-200 font-medium">
              Level AA
            </span>
            <span className="text-yellow-600 dark:text-yellow-400">
              ⚠ 3 Issues
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded hover-lift transition-all duration-300 hover:bg-red-100 dark:hover:bg-red-900/30">
            <span className="text-red-800 dark:text-red-200 font-medium">
              Level AAA
            </span>
            <span className="text-red-600 dark:text-red-400">
              ✗ Not Compliant
            </span>
          </div>
        </div>
      </div>
      {/* Contrast Issues Table */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
          Contrast Ratio Issues
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" role="table" aria-label="Contrast ratio issues">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-600">
                <th className="text-left py-2 px-3 font-medium text-gray-900 dark:text-white">
                  Element
                </th>
                <th className="text-left py-2 px-3 font-medium text-gray-900 dark:text-white">
                  Current
                </th>
                <th className="text-left py-2 px-3 font-medium text-gray-900 dark:text-white">
                  Required
                </th>
                <th className="text-left py-2 px-3 font-medium text-gray-900 dark:text-white">
                  Severity
                </th>
              </tr>
            </thead>
            <tbody>
              {contrastIssues.map((issue, index) => <tr key={index} className={`border-b border-gray-100 dark:border-gray-700 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-purple-50 dark:focus:bg-purple-900/20 ${selectedRow === index ? 'bg-purple-50 dark:bg-purple-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`} style={{
              animationDelay: `${index * 0.1}s`
            }} tabIndex={0} role="row" aria-expanded={selectedRow === index} aria-describedby={selectedRow === index ? `issue-details-${index}` : undefined} onFocus={() => handleRowFocus(index)} onBlur={handleRowBlur} onKeyDown={e => handleKeyDown(e, index)} onClick={() => setSelectedRow(selectedRow === index ? null : index)}>
                  <td className="py-2 px-3 text-gray-900 dark:text-white" role="cell">
                    {issue.element}
                  </td>
                  <td className="py-2 px-3 text-red-600 dark:text-red-400 font-medium" role="cell">
                    {issue.current}
                  </td>
                  <td className="py-2 px-3 text-gray-600 dark:text-gray-300" role="cell">
                    {issue.required}
                  </td>
                  <td className="py-2 px-3" role="cell">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 ${issue.severity === 'High' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-900/50' : issue.severity === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 hover:bg-yellow-200 dark:hover:bg-yellow-900/50' : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-900/50'}`}>
                      {issue.severity}
                    </span>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
        {/* Issue Details */}
        {selectedRow !== null && <div id={`issue-details-${selectedRow}`} className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg animate-fade-in" role="region" aria-label="Issue details">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              Issue Details: {contrastIssues[selectedRow].element}
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-blue-800 dark:text-blue-200">
                <strong>Suggestion:</strong>{' '}
                {contrastIssues[selectedRow].suggestion}
              </p>
              <p className="text-blue-800 dark:text-blue-200">
                <strong>Impact:</strong> {contrastIssues[selectedRow].impact}
              </p>
            </div>
          </div>}
      </div>
    </section>;
}