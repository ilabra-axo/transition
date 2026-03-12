import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis, BarChart, Bar, Cell, PieChart, Pie, RadarChart, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

const MonteCarloVisualization = () => {
  const [selectedView, setSelectedView] = useState('userGroups');
  const [selectedConfig, setSelectedConfig] = useState(0);
  
  // Sample results from Monte Carlo simulation
  // This would be the output from the FRED simulation
  const sampleResults = {
    // Top 5 configurations from simulation
    topConfigurations: [
      {
        id: 1,
        score: 0.87,
        parameters: {
          lightGuideThickness: 3.5,
          lightGuideIndex: 1.49,
          diffuserThickness: 0.6,
          diffuserScatter: 0.85,
          ledPower: 0.045,
          ledSize: 2.0,
          buttonIconSize: 5.0,
          buttonOpacity: 0.85
        },
        performance: {
          brightness: 0.82,
          uniformity: 0.76,
          contrast: 0.89,
          powerEfficiency: 0.75
        }
      },
      {
        id: 2,
        score: 0.83,
        parameters: {
          lightGuideThickness: 3.0,
          lightGuideIndex: 1.47,
          diffuserThickness: 0.4,
          diffuserScatter: 0.9,
          ledPower: 0.05,
          ledSize: 2.5,
          buttonIconSize: 4.0,
          buttonOpacity: 0.8
        },
        performance: {
          brightness: 0.85,
          uniformity: 0.72,
          contrast: 0.84,
          powerEfficiency: 0.7
        }
      },
      {
        id: 3,
        score: 0.79,
        parameters: {
          lightGuideThickness: 4.0,
          lightGuideIndex: 1.51,
          diffuserThickness: 0.8,
          diffuserScatter: 0.8,
          ledPower: 0.055,
          ledSize: 2.0,
          buttonIconSize: 5.0,
          buttonOpacity: 0.75
        },
        performance: {
          brightness: 0.87,
          uniformity: 0.68,
          contrast: 0.81,
          powerEfficiency: 0.65
        }
      },
      {
        id: 4,
        score: 0.76,
        parameters: {
          lightGuideThickness: 2.5,
          lightGuideIndex: 1.48,
          diffuserThickness: 0.6,
          diffuserScatter: 0.75,
          ledPower: 0.04,
          ledSize: 1.5,
          buttonIconSize: 6.0,
          buttonOpacity: 0.9
        },
        performance: {
          brightness: 0.78,
          uniformity: 0.7,
          contrast: 0.85,
          powerEfficiency: 0.8
        }
      },
      {
        id: 5,
        score: 0.73,
        parameters: {
          lightGuideThickness: 3.5,
          lightGuideIndex: 1.5,
          diffuserThickness: 0.4,
          diffuserScatter: 0.85,
          ledPower: 0.06,
          ledSize: 3.0,
          buttonIconSize: 4.0,
          buttonOpacity: 0.85
        },
        performance: {
          brightness: 0.9,
          uniformity: 0.65,
          contrast: 0.8,
          powerEfficiency: 0.6
        }
      }
    ],
    
    // User groups and their preferences
    userGroups: [
      {
        name: "Young Driver",
        count: 120,
        preferences: {
          brightness: { mean: 0.8, stddev: 0.15 },
          uniformity: { mean: 0.6, stddev: 0.2 },
          contrast: { mean: 0.9, stddev: 0.1 },
          powerEfficiency: { mean: 0.4, stddev: 0.2 }
        },
        scoreDistribution: [
          { score: "0.6-0.65", count: 2 },
          { score: "0.65-0.7", count: 8 },
          { score: "0.7-0.75", count: 15 },
          { score: "0.75-0.8", count: 24 },
          { score: "0.8-0.85", count: 35 },
          { score: "0.85-0.9", count: 28 },
          { score: "0.9-0.95", count: 8 }
        ]
      },
      {
        name: "Senior Driver",
        count: 80,
        preferences: {
          brightness: { mean: 0.7, stddev: 0.2 },
          uniformity: { mean: 0.85, stddev: 0.1 },
          contrast: { mean: 0.75, stddev: 0.15 },
          powerEfficiency: { mean: 0.5, stddev: 0.15 }
        },
        scoreDistribution: [
          { score: "0.6-0.65", count: 4 },
          { score: "0.65-0.7", count: 10 },
          { score: "0.7-0.75", count: 20 },
          { score: "0.75-0.8", count: 25 },
          { score: "0.8-0.85", count: 15 },
          { score: "0.85-0.9", count: 5 },
          { score: "0.9-0.95", count: 1 }
        ]
      },
      {
        name: "Professional Driver",
        count: 100,
        preferences: {
          brightness: { mean: 0.65, stddev: 0.15 },
          uniformity: { mean: 0.9, stddev: 0.05 },
          contrast: { mean: 0.8, stddev: 0.1 },
          powerEfficiency: { mean: 0.7, stddev: 0.15 }
        },
        scoreDistribution: [
          { score: "0.6-0.65", count: 3 },
          { score: "0.65-0.7", count: 7 },
          { score: "0.7-0.75", count: 18 },
          { score: "0.75-0.8", count: 32 },
          { score: "0.8-0.85", count: 25 },
          { score: "0.85-0.9", count: 12 },
          { score: "0.9-0.95", count: 3 }
        ]
      }
    ],
    
    // Parameter sensitivity analysis
    sensitivityAnalysis: [
      {
        parameter: "lightGuideThickness",
        baseValue: 3.5,
        variations: [
          { delta: -0.2, scoreChange: -0.05 },
          { delta: -0.1, scoreChange: -0.02 },
          { delta: 0.1, scoreChange: 0.01 },
          { delta: 0.2, scoreChange: -0.01 }
        ]
      },
      {
        parameter: "diffuserScatter",
        baseValue: 0.85,
        variations: [
          { delta: -0.2, scoreChange: -0.08 },
          { delta: -0.1, scoreChange: -0.03 },
          { delta: 0.1, scoreChange: -0.02 },
          { delta: 0.2, scoreChange: -0.07 }
        ]
      },
      {
        parameter: "ledPower",
        baseValue: 0.045,
        variations: [
          { delta: -0.2, scoreChange: -0.04 },
          { delta: -0.1, scoreChange: -0.01 },
          { delta: 0.1, scoreChange: 0.01 },
          { delta: 0.2, scoreChange: 0.02 }
        ]
      },
      {
        parameter: "buttonIconSize",
        baseValue: 5.0,
        variations: [
          { delta: -0.2, scoreChange: -0.03 },
          { delta: -0.1, scoreChange: -0.01 },
          { delta: 0.1, scoreChange: 0.01 },
          { delta: 0.2, scoreChange: 0.02 }
        ]
      }
    ],
    
    // Distribution of user preferences for optimal configuration
    optimalConfigDistribution: [
      { score: "0.6-0.65", count: 10 },
      { score: "0.65-0.7", count: 25 },
      { score: "0.7-0.75", count: 45 },
      { score: "0.75-0.8", count: 80 },
      { score: "0.8-0.85", count: 75 },
      { score: "0.85-0.9", count: 50 },
      { score: "0.9-0.95", count: 15 }
    ]
  };

  // Transform performance data for radar chart
  const getPerformanceData = (configIndex) => {
    const config = sampleResults.topConfigurations[configIndex];
    return [
      { subject: 'Brightness', A: config.performance.brightness, fullMark: 1 },
      { subject: 'Uniformity', A: config.performance.uniformity, fullMark: 1 },
      { subject: 'Contrast', A: config.performance.contrast, fullMark: 1 },
      { subject: 'Power Efficiency', A: config.performance.powerEfficiency, fullMark: 1 }
    ];
  };

  // Transform config comparison data
  const getConfigComparisonData = () => {
    return sampleResults.topConfigurations.map(config => ({
      name: `Config ${config.id}`,
      score: config.score,
      brightness: config.performance.brightness,
      uniformity: config.performance.uniformity,
      contrast: config.performance.contrast,
      powerEfficiency: config.performance.powerEfficiency
    }));
  };

  // Transform sensitivity data
  const getSensitivityData = () => {
    const result = [];
    sampleResults.sensitivityAnalysis.forEach(param => {
      param.variations.forEach(variation => {
        result.push({
          parameter: param.parameter,
          delta: `${variation.delta > 0 ? '+' : ''}${variation.delta * 100}%`,
          scoreChange: variation.scoreChange,
          absoluteChange: Math.abs(variation.scoreChange)
        });
      });
    });
    return result;
  };

  // Transform preferences data for each user group
  const getUserPreferencesData = () => {
    const result = [];
    const preferences = ['brightness', 'uniformity', 'contrast', 'powerEfficiency'];
    
    preferences.forEach(pref => {
      const item = { preference: pref };
      sampleResults.userGroups.forEach(group => {
        item[group.name] = group.preferences[pref].mean;
      });
      result.push(item);
    });
    return result;
  };

  // Group distribution data
  const getGroupDistributionData = () => {
    // Combine all score distributions into one dataset
    const combinedData = [];
    const scoreRanges = sampleResults.userGroups[0].scoreDistribution.map(d => d.score);
    
    scoreRanges.forEach((range, i) => {
      const item = { range };
      sampleResults.userGroups.forEach(group => {
        item[group.name] = group.scoreDistribution[i].count;
      });
      combinedData.push(item);
    });
    
    return combinedData;
  };

  const renderConfigDetails = () => {
    const config = sampleResults.topConfigurations[selectedConfig];
    
    return (
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-lg font-bold mb-4">Configuration #{config.id} Details</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Parameters</h4>
            <ul className="space-y-1 text-sm">
              <li>Light Guide Thickness: {config.parameters.lightGuideThickness.toFixed(2)} mm</li>
              <li>Light Guide Index: {config.parameters.lightGuideIndex.toFixed(2)}</li>
              <li>Diffuser Thickness: {config.parameters.diffuserThickness.toFixed(2)} mm</li>
              <li>Diffuser Scatter: {config.parameters.diffuserScatter.toFixed(2)}</li>
              <li>LED Power: {(config.parameters.ledPower * 1000).toFixed(1)} mW</li>
              <li>LED Size: {config.parameters.ledSize.toFixed(1)} mm</li>
              <li>Button Icon Size: {config.parameters.buttonIconSize.toFixed(1)} mm</li>
              <li>Button Opacity: {config.parameters.buttonOpacity.toFixed(2)}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Performance</h4>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={getPerformanceData(selectedConfig)}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis domain={[0, 1]} />
                  <Radar
                    name="Performance"
                    dataKey="A"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-center font-medium">
              Overall User Score: {config.score.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 bg-gray-100 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Monte Carlo Simulation Results</h2>
      
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setSelectedView('userGroups')}
          className={`px-3 py-1 rounded ${selectedView === 'userGroups' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          User Groups
        </button>
        <button
          onClick={() => setSelectedView('configurations')}
          className={`px-3 py-1 rounded ${selectedView === 'configurations' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Configurations
        </button>
        <button
          onClick={() => setSelectedView('sensitivity')}
          className={`px-3 py-1 rounded ${selectedView === 'sensitivity' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Sensitivity Analysis
        </button>
        <button
          onClick={() => setSelectedView('distribution')}
          className={`px-3 py-1 rounded ${selectedView === 'distribution' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Score Distribution
        </button>
      </div>
      
      {selectedView === 'userGroups' && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-4">User Group Preferences</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getUserPreferencesData()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="preference" />
                  <YAxis domain={[0, 1]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Young Driver" fill="#8884d8" />
                  <Bar dataKey="Senior Driver" fill="#82ca9d" />
                  <Bar dataKey="Professional Driver" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-4">User Group Distribution</h3>
            <div className="grid grid-cols-3 gap-4">
              {sampleResults.userGroups.map((group, i) => (
                <div key={i} className="border rounded p-2">
                  <div className="font-medium text-center mb-2">{group.name}</div>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: group.name, value: group.count },
                            { name: 'Others', value: 300 - group.count }
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={60}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          <Cell fill="#8884d8" />
                          <Cell fill="#e0e0e0" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-center text-sm">
                    {group.count} users
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {selectedView === 'configurations' && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-4">Configuration Comparison</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getConfigComparisonData()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 1]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="grid grid-cols-5 gap-2 mb-4">
            {sampleResults.topConfigurations.map((config, i) => (
              <button
                key={i}
                onClick={() => setSelectedConfig(i)}
                className={`p-2 text-center rounded ${selectedConfig === i ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Config #{config.id}
              </button>
            ))}
          </div>
          
          {renderConfigDetails()}
        </div>
      )}
      
      {selectedView === 'sensitivity' && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-4">Sensitivity Analysis</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={getSensitivityData()}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[-0.1, 0.1]} />
                <YAxis dataKey="parameter" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="scoreChange" fill={(data) => data.scoreChange >= 0 ? '#82ca9d' : '#ff7782'} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <h4 className="font-medium mb-2">Key Findings:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Diffuser scatter has the highest impact on user preference scores</li>
              <li>LED power can be increased for better scores with minimal efficiency loss</li>
              <li>Light guide thickness has optimal value around 3.5mm</li>
              <li>Button icon size changes have relatively minor impact</li>
            </ul>
          </div>
        </div>
      )}
      
      {selectedView === 'distribution' && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-4">Score Distribution by User Group</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={getGroupDistributionData()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Young Driver" stroke="#8884d8" />
                  <Line type="monotone" dataKey="Senior Driver" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="Professional Driver" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-4">Overall Score Distribution for Optimal Configuration</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sampleResults.optimalConfigDistribution}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="score" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center">
              <p className="font-medium">The optimal configuration satisfies 78% of users with a score above 0.75</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonteCarloVisualization;
