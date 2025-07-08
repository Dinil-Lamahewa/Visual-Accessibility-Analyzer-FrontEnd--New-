import React from 'react';
import { PaletteIcon } from 'lucide-react';
export function ColorRecommendations() {
  const colorSchemes = [{
    name: 'High Contrast Purple',
    description: 'WCAG AAA compliant, CVD-friendly',
    colors: [{
      hex: '#4C1D95',
      name: 'Primary',
      contrast: '12.6:1'
    }, {
      hex: '#7C3AED',
      name: 'Secondary',
      contrast: '7.2:1'
    }, {
      hex: '#F3E8FF',
      name: 'Background',
      contrast: '1.2:1'
    }, {
      hex: '#FFFFFF',
      name: 'Surface',
      contrast: '21:1'
    }]
  }, {
    name: 'Professional Gray',
    description: 'Neutral, accessible color palette',
    colors: [{
      hex: '#1F2937',
      name: 'Primary',
      contrast: '15.3:1'
    }, {
      hex: '#4B5563',
      name: 'Secondary',
      contrast: '8.9:1'
    }, {
      hex: '#F9FAFB',
      name: 'Background',
      contrast: '1.1:1'
    }, {
      hex: '#FFFFFF',
      name: 'Surface',
      contrast: '21:1'
    }]
  }];
  return <section className="bg-white border border-gray-200 rounded-lg p-6 hover-lift transition-all duration-300" aria-labelledby="colors-heading">
      <div className="flex items-center space-x-2 mb-6">
        <PaletteIcon className="h-6 w-6 text-purple-600" aria-hidden="true" />
        <h2 id="colors-heading" className="text-xl font-semibold text-gray-900">
          Color Recommendations
        </h2>
      </div>
      <div className="space-y-6">
        {colorSchemes.map((scheme, index) => <div key={index} className="border border-gray-200 rounded-lg p-4 hover-lift transition-all duration-300 hover:border-purple-300" style={{
        animationDelay: `${index * 0.2}s`
      }}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-medium text-gray-900">{scheme.name}</h3>
                <p className="text-sm text-gray-600">{scheme.description}</p>
              </div>
              <button type="button" className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105" aria-label={`Apply ${scheme.name} color scheme`}>
                Apply
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {scheme.colors.map((color, colorIndex) => <div key={colorIndex} className="text-center hover-lift transition-all duration-300" style={{
            animationDelay: `${colorIndex * 0.1}s`
          }}>
                  <div className="w-full h-16 rounded-lg border border-gray-200 mb-2 transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{
              backgroundColor: color.hex
            }} role="img" aria-label={`Color swatch for ${color.name}`}></div>
                  <p className="text-xs font-medium text-gray-900">
                    {color.name}
                  </p>
                  <p className="text-xs text-gray-600">{color.hex}</p>
                  <p className="text-xs text-green-600 font-medium">
                    {color.contrast}
                  </p>
                </div>)}
            </div>
          </div>)}
      </div>
      <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg transition-all duration-300 hover:bg-purple-100">
        <h4 className="font-medium text-purple-900 mb-2">
          CVD-Friendly Design Tips
        </h4>
        <ul className="text-sm text-purple-800 space-y-1">
          <li>• Use high contrast ratios (minimum 4.5:1 for normal text)</li>
          <li>• Avoid red-green color combinations</li>
          <li>• Use patterns, textures, or shapes in addition to color</li>
          <li>• Test with color vision simulators</li>
        </ul>
      </div>
    </section>;
}