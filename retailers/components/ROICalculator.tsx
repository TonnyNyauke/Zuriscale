'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Calculator, TrendingUp, ArrowDown, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

// Define types
interface CalculatorState {
  monthlyCustomers: number;
  averageOrderValue: number;
  returningCustomers: number;
}

interface PlanDetails {
  name: string;
  monthlyPrice: number;
  messagesIncluded: number;
  additionalMessageCost: number;
  color: string;
  bgColor: string;
  borderColor: string;
}

interface CalculatorResults {
  currentRevenue: number;
  lostRevenue: number;
  potentialRevenue: number;
  yearlyIncrease: number;
  daysToBreakEven: number;
  competitorAdvantage: number;
  recommendedPlan: string;
  planCost: number;
  messagesNeeded: number;
  totalMonthlyCost: number;
  roi: number;
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params: Record<string, unknown>) => void;
  }
}

const plans: Record<string, PlanDetails> = {
  basic: {
    name: 'Basic',
    monthlyPrice: 13,
    messagesIncluded: 1000,
    additionalMessageCost: 0.01,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  standard: {
    name: 'Standard',
    monthlyPrice: 49,
    messagesIncluded: 5000,
    additionalMessageCost: 0.008,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200'
  },
  pro: {
    name: 'Pro',
    monthlyPrice: 149,
    messagesIncluded: 15000,
    additionalMessageCost: 0.006,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  }
};

export default function ROICalculator() {
  const [values, setValues] = useState<CalculatorState>({
    monthlyCustomers: 100,
    averageOrderValue: 2500,
    returningCustomers: 20
  });

  const [selectedPlan, setSelectedPlan] = useState<string>('basic');
  const [results, setResults] = useState<CalculatorResults>({
    currentRevenue: 0,
    lostRevenue: 0,
    potentialRevenue: 0,
    yearlyIncrease: 0,
    daysToBreakEven: 0,
    competitorAdvantage: 0,
    recommendedPlan: 'basic',
    planCost: 0,
    messagesNeeded: 0,
    totalMonthlyCost: 0,
    roi: 0
  });

  // Determine recommended plan based on business size
  const getRecommendedPlan = useCallback((monthlyCustomers: number): string => {
    if (monthlyCustomers <= 75) return 'basic';
    if (monthlyCustomers <= 300) return 'standard';
    return 'pro';
  }, []);

  // Calculate messages needed
  const calculateMessagesNeeded = useCallback((monthlyCustomers: number): number => {
    return monthlyCustomers * 4;
  }, []);

  // Calculate total monthly cost
  const calculateTotalMonthlyCost = useCallback((
    messagesNeeded: number, 
    plan: PlanDetails
  ): number => {
    const planCostUSD = plan.monthlyPrice;
    if (messagesNeeded <= plan.messagesIncluded) {
      return planCostUSD * 130;
    }
    const overageMessages = messagesNeeded - plan.messagesIncluded;
    const overageCost = overageMessages * plan.additionalMessageCost;
    return (planCostUSD + overageCost) * 130;
  }, []);

  // Calculate results
  const calculateResults = useCallback(() => {
    const currentRevenue = values.monthlyCustomers * values.averageOrderValue;
    
    const currentRetentionRate = values.monthlyCustomers > 0 ? 
      (values.returningCustomers / values.monthlyCustomers) * 100 : 0;
    const currentRetentionRevenue = currentRevenue * (currentRetentionRate / 100);
    
    const currentRateDecimal = currentRetentionRate / 100;
    const targetImprovement = Math.min(0.65, currentRateDecimal + 0.35);
    const improvementPotential = targetImprovement - currentRateDecimal;
    
    // S-curve parameters
    const L = improvementPotential;
    const k = 0.8;
    const x0 = 3;
    
    // Calculate retention improvement over time
    const getRetentionAtMonth = (month: number) => {
      const sCurveProgress = L / (1 + Math.exp(-k * (month - x0)));
      return currentRateDecimal + sCurveProgress;
    };
    
    // Monthly retention rates
    const month1Retention = getRetentionAtMonth(1) * 100;
    const month2Retention = getRetentionAtMonth(2) * 100;
    const month3Retention = getRetentionAtMonth(3) * 100;
    const month6Retention = getRetentionAtMonth(6) * 100;
    
    // Revenue calculations
    const month1Revenue = currentRevenue * (month1Retention / 100);
    const month2Revenue = currentRevenue * (month2Retention / 100);
    const month3Revenue = currentRevenue * (month3Retention / 100);
    const month6Revenue = currentRevenue * (month6Retention / 100);
    
    const month1Increase = month1Revenue - currentRetentionRevenue;
    const month2Increase = month2Revenue - currentRetentionRevenue;
    const month3Increase = month3Revenue - currentRetentionRevenue;
    const month6Increase = month6Revenue - currentRetentionRevenue;
    
    const monthlyIncrease = month6Increase;
    const yearlyIncrease = month1Increase + month2Increase + month3Increase + (month6Increase * 9);

    // Lost revenue calculation
    const maxPossibleRetention = currentRevenue * 0.70;
    const lostRevenue = maxPossibleRetention - currentRetentionRevenue;

    // Recommend plan
    const recommendedPlan = getRecommendedPlan(values.monthlyCustomers);
    
    // Calculate costs
    const messagesNeeded = calculateMessagesNeeded(values.monthlyCustomers);
    const currentPlan = plans[selectedPlan];
    const totalMonthlyCost = calculateTotalMonthlyCost(messagesNeeded, currentPlan);

    // Break-even analysis
    const implementationFriction = 0.6;
    const effectiveMonth1Increase = month1Increase * implementationFriction;
    const effectiveMonth2Increase = month2Increase * 0.8;
    const effectiveMonth3Increase = month3Increase * 0.9;
    
    const weightedAverageIncrease = (effectiveMonth1Increase * 0.5) + 
                                   (effectiveMonth2Increase * 0.3) + 
                                   (effectiveMonth3Increase * 0.2);
    
    const dailyCashFlowImprovement = weightedAverageIncrease / 30;
    const implementationDays = 14;
    
    let daysToBreakEven = 0;
    if (dailyCashFlowImprovement > 0) {
      daysToBreakEven = Math.ceil((totalMonthlyCost / dailyCashFlowImprovement) + implementationDays);
      
      // Apply business constraints
      if (values.monthlyCustomers < 50) {
        daysToBreakEven = Math.max(45, daysToBreakEven);
      } else if (values.monthlyCustomers < 150) {
        daysToBreakEven = Math.max(30, daysToBreakEven);
      } else {
        daysToBreakEven = Math.max(21, daysToBreakEven);
      }
      
      daysToBreakEven = Math.min(90, daysToBreakEven);
    }

    // ROI calculation
    const roi = totalMonthlyCost > 0 ? 
      ((monthlyIncrease - totalMonthlyCost) / totalMonthlyCost) * 100 : 0;

    // Competitor advantage
    const competitorAdvantage = lostRevenue * 0.6;

    return {
      currentRevenue,
      lostRevenue,
      potentialRevenue: monthlyIncrease,
      yearlyIncrease,
      daysToBreakEven,
      competitorAdvantage,
      recommendedPlan,
      planCost: currentPlan.monthlyPrice * 130,
      messagesNeeded,
      totalMonthlyCost,
      roi
    };
  }, [
    values, 
    selectedPlan, 
    getRecommendedPlan, 
    calculateMessagesNeeded, 
    calculateTotalMonthlyCost
  ]);

  useEffect(() => {
    const newResults = calculateResults();
    setResults(newResults);
  }, [values, selectedPlan, calculateResults]);

  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }, []);

  const handleInputChange = (field: keyof CalculatorState, value: string) => {
    const numValue = parseInt(value) || 0;
    setValues(prev => ({ ...prev, [field]: numValue }));
  };

  const handlePlanChange = (planKey: string) => {
    setSelectedPlan(planKey);
  };

  const handleCalculatorCTA = (type: 'primary' | 'secondary') => {
    // Enhanced tracking with type safety
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_cta_click', {
        cta_type: type,
        selected_plan: selectedPlan,
        recommended_plan: results.recommendedPlan,
        monthly_customers: values.monthlyCustomers,
        avg_order_value: values.averageOrderValue,
        returning_customers: values.returningCustomers,
        current_retention: values.monthlyCustomers > 0 ? 
          (values.returningCustomers / values.monthlyCustomers) * 100 : 0,
        calculated_loss: results.lostRevenue,
        potential_increase: results.potentialRevenue,
        yearly_impact: results.yearlyIncrease,
        plan_cost: results.totalMonthlyCost,
        roi_percentage: results.roi,
        break_even_days: results.daysToBreakEven,
        user_segment: values.monthlyCustomers < 75 ? 'small' : 
          values.monthlyCustomers < 300 ? 'medium' : 'large'
      });
    }

    if (type === 'primary') {
      window.location.href = `/signup?plan=${selectedPlan}`;
    } else {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentPlan = plans[selectedPlan];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="border-l-4 border-red-500 pl-4 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
            <Calculator className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              Your Boutique&apos;s ROI Calculator
            </h3>
            <p className="text-sm text-gray-600">
              See your return on investment with different Zuriscale plans
            </p>
          </div>
        </div>
      </div>

      {/* Input Fields */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Customers
            <span className="text-xs text-gray-500 block">Who buy from your boutique</span>
          </label>
          <input
            type="number"
            value={values.monthlyCustomers}
            onChange={(e) => handleInputChange('monthlyCustomers', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
            placeholder="e.g. 100"
            min="1"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Average Order (KES)
            <span className="text-xs text-gray-500 block">Per customer purchase</span>
          </label>
          <input
            type="number"
            value={values.averageOrderValue}
            onChange={(e) => handleInputChange('averageOrderValue', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
            placeholder="e.g. 2500"
            min="100"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Returning Customers
            <span className="text-xs text-gray-500 block">How many come back to buy again</span>
          </label>
          <input
            type="number"
            value={values.returningCustomers}
            onChange={(e) => handleInputChange('returningCustomers', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
            placeholder="e.g. 20"
            min="0"
            max={values.monthlyCustomers}
          />
          <p className="text-xs text-gray-500 mt-1">
            Out of {values.monthlyCustomers} customers ({values.monthlyCustomers > 0 ? Math.round((values.returningCustomers / values.monthlyCustomers) * 100) : 0}%)
          </p>
        </div>
      </div>

      {/* Plan Selection */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">Choose Your Plan</h4>
        <div className="grid md:grid-cols-3 gap-3">
          {Object.entries(plans).map(([key, plan]) => {
            const isSelected = selectedPlan === key;
            const isRecommendedPlan = key === results.recommendedPlan;
            
            return (
              <button
                key={key}
                onClick={() => handlePlanChange(key)}
                className={`p-3 rounded-lg border-2 transition-all text-left relative ${
                  isSelected 
                    ? `${plan.borderColor} ${plan.bgColor}` 
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
              >
                {isRecommendedPlan && (
                  <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                    Recommended
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-semibold ${isSelected ? plan.color : 'text-gray-700'}`}>
                      {plan.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      ${plan.monthlyPrice}/month
                    </p>
                    <p className="text-xs text-gray-500">
                      {plan.messagesIncluded.toLocaleString()} messages
                    </p>
                  </div>
                  {isSelected && (
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Plan-Specific Cost Analysis */}
      <div className={`mb-6 p-4 rounded-lg ${currentPlan.bgColor} ${currentPlan.borderColor} border`}>
        <h4 className={`font-semibold ${currentPlan.color} mb-2`}>
          {currentPlan.name} Plan Analysis for Your Boutique
        </h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Messages needed monthly: <strong>{results.messagesNeeded}</strong></p>
            <p className="text-gray-600">Base plan cost: <strong>{formatCurrency(results.planCost)}</strong></p>
          </div>
          <div>
            <p className="text-gray-600">Total monthly cost: <strong>{formatCurrency(results.totalMonthlyCost)}</strong></p>
            {results.messagesNeeded > currentPlan.messagesIncluded && (
              <p className="text-orange-600 text-xs">
                ⚠️ Includes overage: {results.messagesNeeded - currentPlan.messagesIncluded} extra messages
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {/* Current Loss */}
        <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium flex items-center gap-1">
                <ArrowDown className="h-4 w-4" />
                Your Boutique is Missing Out On
              </p>
              <p className="text-2xl font-bold text-red-700">
                {formatCurrency(results.lostRevenue)}<span className="text-sm font-normal">/month</span>
              </p>
            </div>
            <div className="text-red-500">
              <TrendingUp className="h-8 w-8 transform rotate-180" />
            </div>
          </div>
        </div>

        {/* ROI Analysis */}
        <div className={`${currentPlan.bgColor} ${currentPlan.borderColor} border rounded-lg p-4`}>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className={`text-sm ${currentPlan.color} font-medium`}>Monthly Investment</p>
              <p className={`text-xl font-bold ${currentPlan.color}`}>
                {formatCurrency(results.totalMonthlyCost)}
              </p>
            </div>
            <div>
              <p className="text-sm text-emerald-600 font-medium">Monthly Return</p>
              <p className="text-xl font-bold text-emerald-700">
                +{formatCurrency(results.potentialRevenue)}
              </p>
            </div>
            <div>
              <p className="text-sm text-teal-600 font-medium">ROI</p>
              <p className="text-xl font-bold text-teal-700">
                {results.roi.toFixed(0)}%
              </p>
            </div>
          </div>
        </div>

        {/* Break-Even Time */}
        {results.daysToBreakEven > 0 && results.daysToBreakEven <= 90 && (
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-teal-600" />
              <div>
                <p className="text-sm text-teal-600 font-medium">Time to Break Even</p>
                <p className="text-lg font-bold text-teal-700">
                  {results.daysToBreakEven} days
                </p>
                <p className="text-xs text-teal-600">
                  As your retention improves gradually with the {currentPlan.name} plan
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Yearly Impact */}
        <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg p-4 text-center">
          <p className="text-sm opacity-90 mb-1">Net Yearly Profit Increase</p>
          <p className="text-3xl font-bold">
            {formatCurrency(results.yearlyIncrease - (results.totalMonthlyCost * 12))}
          </p>
          <p className="text-xs opacity-75 mt-2">
            After paying for {currentPlan.name} plan for 12 months
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-4 font-medium">
          Ready to earn {formatCurrency(results.potentialRevenue - results.totalMonthlyCost)} extra monthly profit?
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <button 
            className={`bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg flex items-center gap-2`}
            onClick={() => handleCalculatorCTA('primary')}
          >
            Start {currentPlan.name} Plan - {results.roi > 0 ? `${results.roi.toFixed(0)}% ROI` : 'High ROI'}
            <ArrowDown className="h-4 w-4 transform rotate-[-45deg]" />
          </button>
          
          <button 
            className="text-red-600 hover:text-red-700 underline text-sm font-medium"
            onClick={() => handleCalculatorCTA('secondary')}
          >
            Compare all plans ↓
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
          <span>✓ 90-day guarantee</span>
          <span>✓ No setup fees</span>
          <span>✓ M-Pesa accepted</span>
        </div>
      </div>

      {/* Warning for High-Cost Scenarios */}
      {results.roi < 100 && results.daysToBreakEven > 30 && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
            <div className="text-xs text-amber-700">
              <strong>Consider the {results.recommendedPlan === 'basic' ? 'Basic' : 'Standard'} plan</strong> for better ROI at your current business size, 
              or increase your customer base to maximize value from the {currentPlan.name} plan.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}