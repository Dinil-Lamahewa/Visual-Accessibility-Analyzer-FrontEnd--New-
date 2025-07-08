import React, { useState } from 'react';
import { EyeIcon, ZoomInIcon, ZoomOutIcon, ToggleLeftIcon, ToggleRightIcon } from 'lucide-react';
import { Tooltip } from './Tooltip';
export function PreviewPanel() {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedComparison, setSelectedComparison] = useState<string>('protanopia');
  const visionTypes = [{
    id: 'original',
    label: 'Original',
    description: 'Normal color vision - how content appears to users without color vision deficiency',
    prevalence: 'Standard'
  }, {
    id: 'protanopia',
    label: 'Protanopia',
    description: 'Red-blind - difficulty distinguishing red from green colors',
    prevalence: '1% of males'
  }, {
    id: 'deuteranopia',
    label: 'Deuteranopia',
    description: 'Green-blind - most common form of color blindness',
    prevalence: '1% of males'
  }, {
    id: 'tritanopia',
    label: 'Tritanopia',
    description: 'Blue-blind - rare form affecting blue-yellow perception',
    prevalence: '0.003% of population'
  }];
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 25, 50));
  const toggleCompareMode = () => setCompareMode(!compareMode);
  return <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover-lift transition-all duration-300 shadow-lg hover:shadow-xl" aria-labelledby="preview-heading">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <EyeIcon className="h-6 w-6 text-purple-600 animate-floating" aria-hidden="true" />
          <h2 id="preview-heading" className="text-xl font-semibold text-gray-900 dark:text-white">
            Color Vision Simulation
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <Tooltip content="Zoom out">
            <button onClick={handleZoomOut} disabled={zoomLevel <= 50} className="p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500 rounded" aria-label="Zoom out">
              <ZoomOutIcon className="h-4 w-4" />
            </button>
          </Tooltip>
          <span className="text-sm text-gray-600 dark:text-gray-300 min-w-[3rem] text-center">
            {zoomLevel}%
          </span>
          <Tooltip content="Zoom in">
            <button onClick={handleZoomIn} disabled={zoomLevel >= 200} className="p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500 rounded" aria-label="Zoom in">
              <ZoomInIcon className="h-4 w-4" />
            </button>
          </Tooltip>
          <Tooltip content={compareMode ? 'Exit comparison mode' : 'Compare side by side'}>
            <button onClick={toggleCompareMode} className="p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded" aria-label={compareMode ? 'Exit comparison mode' : 'Enter comparison mode'}>
              {compareMode ? <ToggleRightIcon className="h-4 w-4" /> : <ToggleLeftIcon className="h-4 w-4" />}
            </button>
          </Tooltip>
        </div>
      </div>
      {compareMode ? <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label htmlFor="comparison-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Compare with:
            </label>
            <select id="comparison-select" value={selectedComparison} onChange={e => setSelectedComparison(e.target.value)} className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
              {visionTypes.filter(v => v.id !== 'original').map(vision => <option key={vision.id} value={vision.id}>
                    {vision.label}
                  </option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900 dark:text-white">
                Original
              </h3>
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden" style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'center'
          }}>
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-500 rounded-lg mx-auto mb-2"></div>
                  <p className="text-sm">Original preview</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900 dark:text-white">
                {visionTypes.find(v => v.id === selectedComparison)?.label}
              </h3>
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden" style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'center'
          }}>
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-500 rounded-lg mx-auto mb-2"></div>
                  <p className="text-sm">CVD simulation</p>
                </div>
              </div>
            </div>
          </div>
        </div> : <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visionTypes.map((vision, index) => <div key={vision.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 focus-within:ring-2 focus-within:ring-purple-500 hover-lift transition-all duration-500 hover:border-purple-300 hover:shadow-md" style={{
        animation: `scroll-fade-up 0.8s ease-out forwards`,
        animationDelay: `${index * 0.15}s`,
        opacity: 0
      }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {vision.label}
                </h3>
                <Tooltip content={vision.description}>
                  <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full transition-all duration-300 hover:bg-purple-200 dark:hover:bg-purple-800 hover:scale-105 cursor-help" tabIndex={0} role="button" aria-label={`${vision.label} information`}>
                    {vision.prevalence}
                  </span>
                </Tooltip>
              </div>
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center transition-all duration-500 hover:border-purple-300 hover:from-purple-50 hover:to-purple-100 dark:hover:from-purple-900/20 dark:hover:to-purple-800/20 overflow-hidden" style={{
          transform: `scale(${zoomLevel / 100})`,
          transformOrigin: 'center'
        }} role="img" aria-label={`${vision.label} simulation preview`}>
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-500 rounded-lg mx-auto mb-2 animate-pulse hover:from-purple-200 hover:to-purple-300 dark:hover:from-purple-700 dark:hover:to-purple-600 transition-all duration-300"></div>
                  <p className="text-sm">Preview will appear here</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2" id={`${vision.id}-description`}>
                {vision.description}
              </p>
            </div>)}
        </div>}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800 rounded-lg transition-all duration-500 hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-900/30 dark:hover:to-purple-800/30 hover:shadow-md">
        <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
          Understanding Color Vision Deficiency
        </h4>
        <p className="text-sm text-purple-800 dark:text-purple-200">
          Approximately 8% of men and 0.5% of women have some form of color
          vision deficiency. This simulation helps you understand how your
          content appears to users with different types of CVD.
        </p>
      </div>
    </section>;
}