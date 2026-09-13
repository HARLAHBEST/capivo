"use client";

import React, { useState } from "react";
import { useAppState } from "../../context/AppStateContext";
import { useLanguage } from "../../context/LanguageContext";
import { Plus, Search, Filter, Package } from "lucide-react";

export function InventoryView() {
  const { products, openDrawer, branches } = useAppState();
  const { t } = useLanguage();

  const [selectedFilter, setSelectedFilter] = useState<"all" | "instock" | "lowstock" | "outstock">("all");
  const [selectedBranch, setSelectedBranch] = useState("All Branches");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((prod) => {
    if (selectedFilter !== "all" && prod.status !== selectedFilter) return false;
    if (selectedBranch !== "All Branches" && prod.branch !== selectedBranch) return false;
    if (selectedCategory !== "All Categories" && prod.category !== selectedCategory) return false;
    if (
      searchQuery &&
      !prod.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !prod.sku.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const lowStockCount = products.filter((p) => p.status === "lowstock").length;
  const outStockCount = products.filter((p) => p.status === "outstock").length;
  const totalStockValue = products.reduce((acc, p) => acc + p.purchasePrice * p.quantity, 0);

  return (
    <div className="space-y-6">
      {/* Inventory Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="card stat-card">
          <div className="stat-label">Total SKUs</div>
          <div className="stat-value">{products.length}</div>
          <div className="stat-caption">Across all 4 branches</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">Stock Valuation</div>
          <div className="stat-value">₦{totalStockValue.toLocaleString()}</div>
          <div className="stat-caption">Purchase-price basis</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">{t("lowStock")}</div>
          <div className="stat-value text-[var(--ochre)]">{lowStockCount}</div>
          <div className="stat-caption">Below reorder point</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">{t("outOfStock")}</div>
          <div className="stat-value text-[var(--terracotta)]">{outStockCount}</div>
          <div className="stat-caption">Unavailable for sale</div>
        </div>
      </div>

      {/* Filter and Action Bar */}
      <div className="page-head-row flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex gap-1 bg-white border border-[var(--line)] rounded-full p-1 shadow-xs">
            <button
              className={`px-3 py-1 text-xs rounded-full font-medium transition ${
                selectedFilter === "all"
                  ? "bg-[var(--indigo-900)] text-white"
                  : "text-[var(--ink-soft)] hover:bg-[var(--paper-deep)]"
              }`}
              onClick={() => setSelectedFilter("all")}
            >
              All ({products.length})
            </button>
            <button
              className={`px-3 py-1 text-xs rounded-full font-medium transition ${
                selectedFilter === "instock"
                  ? "bg-[var(--indigo-900)] text-white"
                  : "text-[var(--ink-soft)] hover:bg-[var(--paper-deep)]"
              }`}
              onClick={() => setSelectedFilter("instock")}
            >
              In Stock
            </button>
            <button
              className={`px-3 py-1 text-xs rounded-full font-medium transition ${
                selectedFilter === "lowstock"
                  ? "bg-[var(--indigo-900)] text-white"
                  : "text-[var(--ink-soft)] hover:bg-[var(--paper-deep)]"
              }`}
              onClick={() => setSelectedFilter("lowstock")}
            >
              Low Stock ({lowStockCount})
            </button>
            <button
              className={`px-3 py-1 text-xs rounded-full font-medium transition ${
                selectedFilter === "outstock"
                  ? "bg-[var(--indigo-900)] text-white"
                  : "text-[var(--ink-soft)] hover:bg-[var(--paper-deep)]"
              }`}
              onClick={() => setSelectedFilter("outstock")}
            >
              Out of Stock ({outStockCount})
            </button>
          </div>

          <select
            className="filter-select"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            <option value="All Branches">All Branches</option>
            {branches.map((b) => (
              <option key={b.id} value={b.name}>
                {b.name}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All Categories">All Categories</option>
            <option value="Staples">Staples</option>
            <option value="Beverages">Beverages</option>
            <option value="Household">Household</option>
          </select>
        </div>

        <button className="btn-secondary" onClick={() => openDrawer("product")}>
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Products Grid */}
      <div className="product-grid">
        {filteredProducts.map((prod) => {
          const fillPercent =
            prod.minLevel > 0
              ? Math.min(100, Math.round((prod.quantity / (prod.minLevel * 2)) * 100))
              : 100;

          return (
            <div key={prod.id} className="card product-card flex flex-col justify-between">
              <div>
                <div className="product-thumb">
                  <Package className="w-6 h-6 text-[var(--indigo-800)]" />
                </div>
                <div className="product-name">{prod.name}</div>
                <div className="product-meta">
                  SKU: {prod.sku} · {prod.branch}
                </div>

                <div className="mb-2">
                  {prod.status === "instock" && (
                    <span className="status-tag instock">In Stock</span>
                  )}
                  {prod.status === "lowstock" && (
                    <span className="status-tag lowstock">Low Stock</span>
                  )}
                  {prod.status === "outstock" && (
                    <span className="status-tag outstock">Out of Stock</span>
                  )}
                </div>

                <div className="stock-bar-track">
                  <div
                    className={`stock-bar-fill ${
                      prod.status === "instock"
                        ? "bg-[var(--green)]"
                        : prod.status === "lowstock"
                        ? "bg-[var(--ochre)]"
                        : "bg-[var(--terracotta)]"
                    }`}
                    style={{ width: `${prod.quantity === 0 ? 0 : fillPercent}%` }}
                  />
                </div>
              </div>

              <div className="product-row-bottom pt-2">
                <div className="product-price">₦{prod.sellingPrice.toLocaleString()}</div>
                <div className="text-[11px] text-[var(--ink-soft)] font-mono">
                  {prod.quantity} of {prod.minLevel} min
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
