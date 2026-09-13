"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";

export function ProfitView() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Top status tag */}
      <div className="page-head-row flex items-center justify-between flex-wrap gap-3">
        <span className="status-badge closed">August 2026 · Month in Progress</span>
        <select className="filter-select">
          <option>This Month (August 2026)</option>
          <option>Last Month (July 2026)</option>
          <option>Last 3 Months</option>
        </select>
      </div>

      {/* Top Financial Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="card stat-card">
          <div className="stat-label">Monthly Revenue</div>
          <div className="stat-value">₦6,240,000</div>
          <div className="stat-caption">532 units sold across 4 branches</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">Cost of Goods Sold (COGS)</div>
          <div className="stat-value">₦4,280,000</div>
          <div className="stat-caption">Based on purchase price</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">Gross Profit</div>
          <div className="stat-value text-[var(--green)]">₦1,960,000</div>
          <div className="stat-caption">Average Margin: 31.4%</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">{t("estimatedProfit")}</div>
          <div className="stat-value text-[var(--green)]">₦1,284,600</div>
          <div className="stat-caption">After expenses & loss deductions</div>
        </div>
      </div>

      {/* Revenue vs Gross Profit Chart */}
      <div className="card panel">
        <div className="panel-head">
          <h2>Revenue vs. Gross Profit</h2>
          <div className="pill">Last 6 months</div>
        </div>
        <svg className="trend-svg" viewBox="0 0 560 120" preserveAspectRatio="none">
          <line x1="0" y1="30" x2="560" y2="30" stroke="#DED4B9" strokeWidth="1" />
          <line x1="0" y1="60" x2="560" y2="60" stroke="#DED4B9" strokeWidth="1" />
          <line x1="0" y1="90" x2="560" y2="90" stroke="#DED4B9" strokeWidth="1" />
          {/* Revenue Line (Dark Indigo) */}
          <polyline
            points="10,60 100,55 190,48 280,42 370,35 460,28 550,18"
            fill="none"
            stroke="#161F38"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Gross Profit Line (Ochre) */}
          <polyline
            points="10,92 100,88 190,84 280,80 370,74 460,68 550,58"
            fill="none"
            stroke="#C08A1E"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="550" cy="18" r="4" fill="#161F38" />
          <circle cx="550" cy="58" r="4" fill="#C08A1E" />
        </svg>
        <div className="trend-labels">
          <span>MAR</span>
          <span>APR</span>
          <span>MAY</span>
          <span>JUN</span>
          <span>JUL</span>
          <span>AUG</span>
        </div>
        <div className="flex gap-4 mt-3">
          <div className="flex items-center gap-1.5 text-xs text-[var(--ink-soft)]">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--indigo-900)] inline-block" />
            Revenue
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[var(--ink-soft)]">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--ochre)] inline-block" />
            Gross Profit
          </div>
        </div>
      </div>

      {/* Product Profitability Matrix */}
      <div className="card overflow-x-auto">
        <div className="panel-head px-5 pt-5 pb-0">
          <h2 className="text-base font-semibold">Product Profitability Breakdown — August 2026</h2>
        </div>
        <table className="profit-table mt-3">
          <thead>
            <tr>
              <th>Product</th>
              <th>Units Sold</th>
              <th>Revenue</th>
              <th>COGS</th>
              <th>Gross Profit</th>
              <th>Margin</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold">Rice — 25kg Bag</td>
              <td>84</td>
              <td>₦3,528,000</td>
              <td>₦2,436,000</td>
              <td className="text-[var(--green)]">₦1,092,000</td>
              <td><span className="margin-tag good">31%</span></td>
            </tr>
            <tr>
              <td className="font-semibold">Bottled Water — Carton</td>
              <td>210</td>
              <td>₦483,000</td>
              <td>₦378,000</td>
              <td className="text-[var(--green)]">₦105,000</td>
              <td><span className="margin-tag ok">22%</span></td>
            </tr>
            <tr>
              <td className="font-semibold">Vegetable Oil — 1L</td>
              <td>96</td>
              <td>₦254,400</td>
              <td>₦211,200</td>
              <td className="text-[var(--green)]">₦43,200</td>
              <td><span className="margin-tag low">17%</span></td>
            </tr>
            <tr>
              <td className="font-semibold">Granulated Sugar — 1kg</td>
              <td>178</td>
              <td>₦258,100</td>
              <td>₦174,220</td>
              <td className="text-[var(--green)]">₦83,880</td>
              <td><span className="margin-tag good">32%</span></td>
            </tr>
            <tr>
              <td className="font-semibold">Spaghetti — 500g</td>
              <td>145</td>
              <td>₦123,250</td>
              <td>₦101,500</td>
              <td className="text-[var(--green)]">₦21,750</td>
              <td><span className="margin-tag low">18%</span></td>
            </tr>
            <tr>
              <td className="font-semibold">Detergent Powder — 1kg</td>
              <td>62</td>
              <td>₦117,800</td>
              <td>₦86,800</td>
              <td className="text-[var(--green)]">₦31,000</td>
              <td><span className="margin-tag ok">26%</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Profit Insight */}
      <div className="card panel">
        <div className="insight-box">
          <div className="k">Profit Insight</div>
          <p>
            Vegetable Oil and Spaghetti carry the lowest margins in your top 6 products by volume.
            Rice remains your strongest earner both in total gross profit contribution and volume turnover.
          </p>
          <div className="action">→ Review pricing on Vegetable Oil and Spaghetti</div>
        </div>
      </div>
    </div>
  );
}
