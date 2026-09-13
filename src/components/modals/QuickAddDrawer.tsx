"use client";

import React, { useState } from "react";
import { useAppState } from "../../context/AppStateContext";
import { useLanguage } from "../../context/LanguageContext";
import { X, Camera } from "lucide-react";

export function QuickAddDrawer() {
  const {
    isDrawerOpen,
    closeDrawer,
    drawerTab,
    setDrawerTab,
    businessMode,
    branches,
    addProduct,
    recordSale,
    addReceipt,
    addAuditLog,
    openOcrModal,
    showToast,
  } = useAppState();

  const { t } = useLanguage();
  const isStore = businessMode === "store";

  // Stock Form state
  const [supplier, setSupplier] = useState("");
  const [stockAmount, setStockAmount] = useState("");
  const [stockBranch, setStockBranch] = useState("Yaba Main");

  // Daily Cash state
  const [dailyCashAmount, setDailyCashAmount] = useState("");
  const [dailyCashBranch, setDailyCashBranch] = useState("Yaba Main");

  // Record Sale state
  const [saleProduct, setSaleProduct] = useState("Rice — 25kg Bag");
  const [saleQty, setSaleQty] = useState(1);
  const [salePrice, setSalePrice] = useState(42000);
  const [salePayment, setSalePayment] = useState<"Cash" | "Credit">("Cash");
  const [saleCustomer, setSaleCustomer] = useState("");
  const [saleBranch, setSaleBranch] = useState("Yaba Main");

  // Stock In state
  const [stockInProduct, setStockInProduct] = useState("Rice — 25kg Bag");
  const [stockInQty, setStockInQty] = useState(10);
  const [stockInCost, setStockInCost] = useState(29000);
  const [stockInSupplier, setStockInSupplier] = useState("Delta Foods Ltd.");
  const [stockInBranch, setStockInBranch] = useState("Yaba Main");

  // Add Product state
  const [newProdName, setNewProdName] = useState("");
  const [newProdCategory, setNewProdCategory] = useState("Staples");
  const [newProdSku, setNewProdSku] = useState("");
  const [newProdCost, setNewProdCost] = useState("");
  const [newProdSelling, setNewProdSelling] = useState("");
  const [newProdQty, setNewProdQty] = useState(0);
  const [newProdMin, setNewProdMin] = useState(20);
  const [newProdBranch, setNewProdBranch] = useState("Yaba Main");

  // Expense state
  const [expenseCategory, setExpenseCategory] = useState("Transport");
  const [expenseDesc, setExpenseDesc] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseBranch, setExpenseBranch] = useState("Yaba Main");

  if (!isDrawerOpen) return null;

  const handleSave = () => {
    if (drawerTab === "stock") {
      const amt = parseFloat(stockAmount.replace(/[^0-9.]/g, "")) || 184000;
      addReceipt({
        type: "Purchase",
        supplier: supplier || "Delta Foods Ltd.",
        branch: stockBranch,
        date: "11 Aug 2026",
        amount: amt,
      });
      showToast(`Stock purchase from ${supplier || "Delta Foods"} saved.`);
    } else if (drawerTab === "cash") {
      const amt = parseFloat(dailyCashAmount.replace(/[^0-9.]/g, "")) || 150000;
      addAuditLog(`Daily cash recorded: ₦${amt.toLocaleString()} at ${dailyCashBranch}`);
      showToast(`Daily cash ₦${amt.toLocaleString()} recorded.`);
    } else if (drawerTab === "sale") {
      recordSale({
        productName: saleProduct,
        quantity: Number(saleQty) || 1,
        branch: saleBranch,
        amount: (Number(saleQty) || 1) * (Number(salePrice) || 42000),
        paymentType: salePayment,
        customerName: saleCustomer || undefined,
      });
    } else if (drawerTab === "stockin") {
      addAuditLog(`Received ${stockInQty} units of ${stockInProduct} at ${stockInBranch}`);
      showToast(`Stock-in: ${stockInQty} units of ${stockInProduct} received.`);
    } else if (drawerTab === "product") {
      if (!newProdName) {
        showToast("Please enter product name.", "warning");
        return;
      }
      addProduct({
        name: newProdName,
        sku: newProdSku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
        category: newProdCategory,
        branch: newProdBranch,
        purchasePrice: parseFloat(newProdCost) || 1000,
        sellingPrice: parseFloat(newProdSelling) || 1500,
        quantity: Number(newProdQty) || 0,
        minLevel: Number(newProdMin) || 10,
        status: (Number(newProdQty) || 0) === 0 ? "outstock" : (Number(newProdQty) || 0) <= (Number(newProdMin) || 10) ? "lowstock" : "instock",
      });
    } else if (drawerTab === "expense") {
      const amt = parseFloat(expenseAmount.replace(/[^0-9.]/g, "")) || 15000;
      addReceipt({
        type: "Expense",
        supplier: `${expenseCategory} — ${expenseDesc || "General"}`,
        branch: expenseBranch,
        date: "11 Aug 2026",
        amount: amt,
      });
      showToast(`Expense of ₦${amt.toLocaleString()} recorded.`);
    } else {
      showToast(t("toastEntrySaved"));
    }

    closeDrawer();
  };

  return (
    <>
      <div className="overlay" onClick={closeDrawer} />
      <div className="drawer">
        <div className="drawer-head">
          <h2>{t("newEntry")}</h2>
          <button className="drawer-close" onClick={closeDrawer}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Buttons Strip */}
        <div className="drawer-tabs">
          <button
            className={`drawer-tab ${drawerTab === "stock" ? "active" : ""}`}
            onClick={() => setDrawerTab("stock")}
          >
            {t("stockPurchase")}
          </button>
          <button
            className={`drawer-tab ${drawerTab === "cash" ? "active" : ""}`}
            onClick={() => setDrawerTab("cash")}
          >
            {t("dailyCash")}
          </button>
          {isStore && (
            <>
              <button
                className={`drawer-tab ${drawerTab === "sale" ? "active" : ""}`}
                onClick={() => setDrawerTab("sale")}
              >
                {t("recordSale")}
              </button>
              <button
                className={`drawer-tab ${drawerTab === "stockin" ? "active" : ""}`}
                onClick={() => setDrawerTab("stockin")}
              >
                {t("stockIn")}
              </button>
              <button
                className={`drawer-tab ${drawerTab === "product" ? "active" : ""}`}
                onClick={() => setDrawerTab("product")}
              >
                Add Product
              </button>
            </>
          )}
          <button
            className={`drawer-tab ${drawerTab === "ccredit" ? "active" : ""}`}
            onClick={() => setDrawerTab("ccredit")}
          >
            {t("customerCredit")}
          </button>
          <button
            className={`drawer-tab ${drawerTab === "cpay" ? "active" : ""}`}
            onClick={() => setDrawerTab("cpay")}
          >
            {t("customerPayment")}
          </button>
          <button
            className={`drawer-tab ${drawerTab === "scredit" ? "active" : ""}`}
            onClick={() => setDrawerTab("scredit")}
          >
            {t("supplierCredit")}
          </button>
          <button
            className={`drawer-tab ${drawerTab === "expense" ? "active" : ""}`}
            onClick={() => setDrawerTab("expense")}
          >
            {t("expenses")}
          </button>
          <button
            className={`drawer-tab ${drawerTab === "loss" ? "active" : ""}`}
            onClick={() => setDrawerTab("loss")}
          >
            {t("lossAndDamageAction")}
          </button>
          <button
            className={`drawer-tab ${drawerTab === "deposit" ? "active" : ""}`}
            onClick={() => setDrawerTab("deposit")}
          >
            {t("bankDeposit")}
          </button>
        </div>

        {/* Drawer Body Forms */}
        <div className="drawer-body">
          {/* Stock Purchase Form */}
          {drawerTab === "stock" && (
            <div className="space-y-4">
              <div className="form-group">
                <label>Supplier / Vendor</label>
                <input
                  type="text"
                  placeholder="e.g. Delta Foods Ltd."
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Purchase Amount (₦)</label>
                  <input
                    type="text"
                    placeholder="₦184,000"
                    value={stockAmount}
                    onChange={(e) => setStockAmount(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" defaultValue="2026-08-11" />
                </div>
              </div>
              <div className="form-group">
                <label>Branch Location</label>
                <select
                  value={stockBranch}
                  onChange={(e) => setStockBranch(e.target.value)}
                >
                  {branches.map((b) => (
                    <option key={b.id} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Receipt Attachment</label>
                <div
                  className="dropzone flex flex-col items-center justify-center p-5 cursor-pointer hover:border-[var(--ochre)]"
                  onClick={openOcrModal}
                >
                  <Camera className="w-6 h-6 text-[var(--ochre)] mb-2" />
                  <div className="font-semibold text-xs text-[var(--indigo-900)]">
                    Scan Receipt with AI OCR
                  </div>
                  <div className="text-[10px] text-[var(--ink-soft)] mt-0.5">
                    Or drop photo / PDF receipt here
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Daily Cash Form */}
          {drawerTab === "cash" && (
            <div className="space-y-4">
              <div className="form-group">
                <label>Total Cash Counted in Drawer (₦)</label>
                <input
                  type="text"
                  placeholder="₦148,000"
                  value={dailyCashAmount}
                  onChange={(e) => setDailyCashAmount(e.target.value)}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Branch</label>
                  <select
                    value={dailyCashBranch}
                    onChange={(e) => setDailyCashBranch(e.target.value)}
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" defaultValue="2026-08-11" />
                </div>
              </div>
            </div>
          )}

          {/* Record Sale Form */}
          {drawerTab === "sale" && (
            <div className="space-y-4">
              <div className="form-group">
                <label>Product</label>
                <input
                  type="text"
                  placeholder="Search product name or SKU"
                  value={saleProduct}
                  onChange={(e) => setSaleProduct(e.target.value)}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="number"
                    value={saleQty}
                    onChange={(e) => setSaleQty(Number(e.target.value))}
                  />
                </div>
                <div className="form-group">
                  <label>Selling Price (₦ / unit)</label>
                  <input
                    type="number"
                    value={salePrice}
                    onChange={(e) => setSalePrice(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Payment Method</label>
                <select
                  value={salePayment}
                  onChange={(e) => setSalePayment(e.target.value as "Cash" | "Credit")}
                >
                  <option value="Cash">Cash (Immediate Payment)</option>
                  <option value="Credit">Credit (Customer Will Pay Later)</option>
                </select>
              </div>
              {salePayment === "Credit" && (
                <div className="form-group">
                  <label>Customer Name / Account</label>
                  <input
                    type="text"
                    placeholder="Enter customer name"
                    value={saleCustomer}
                    onChange={(e) => setSaleCustomer(e.target.value)}
                  />
                </div>
              )}
              <div className="form-row">
                <div className="form-group">
                  <label>Branch</label>
                  <select
                    value={saleBranch}
                    onChange={(e) => setSaleBranch(e.target.value)}
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" defaultValue="2026-08-11" />
                </div>
              </div>
            </div>
          )}

          {/* Stock In Form */}
          {drawerTab === "stockin" && (
            <div className="space-y-4">
              <div className="form-group">
                <label>Product</label>
                <input
                  type="text"
                  placeholder="Product name"
                  value={stockInProduct}
                  onChange={(e) => setStockInProduct(e.target.value)}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Quantity Received</label>
                  <input
                    type="number"
                    value={stockInQty}
                    onChange={(e) => setStockInQty(Number(e.target.value))}
                  />
                </div>
                <div className="form-group">
                  <label>Purchase Cost per Unit (₦)</label>
                  <input
                    type="number"
                    value={stockInCost}
                    onChange={(e) => setStockInCost(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Supplier</label>
                  <input
                    type="text"
                    value={stockInSupplier}
                    onChange={(e) => setStockInSupplier(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Branch</label>
                  <select
                    value={stockInBranch}
                    onChange={(e) => setStockInBranch(e.target.value)}
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Add Product Form */}
          {drawerTab === "product" && (
            <div className="space-y-4">
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  placeholder="e.g. Flour — 50kg Bag"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                  >
                    <option value="Staples">Staples</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Household">Household</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>SKU / Barcode</label>
                  <input
                    type="text"
                    placeholder="e.g. STP-1099"
                    value={newProdSku}
                    onChange={(e) => setNewProdSku(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Purchase Cost (₦)</label>
                  <input
                    type="number"
                    placeholder="₦0.00"
                    value={newProdCost}
                    onChange={(e) => setNewProdCost(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Selling Price (₦)</label>
                  <input
                    type="number"
                    placeholder="₦0.00"
                    value={newProdSelling}
                    onChange={(e) => setNewProdSelling(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Opening Quantity</label>
                  <input
                    type="number"
                    value={newProdQty}
                    onChange={(e) => setNewProdQty(Number(e.target.value))}
                  />
                </div>
                <div className="form-group">
                  <label>Minimum Reorder Point</label>
                  <input
                    type="number"
                    value={newProdMin}
                    onChange={(e) => setNewProdMin(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Initial Branch Location</label>
                <select
                  value={newProdBranch}
                  onChange={(e) => setNewProdBranch(e.target.value)}
                >
                  {branches.map((b) => (
                    <option key={b.id} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Expense Form */}
          {drawerTab === "expense" && (
            <div className="space-y-4">
              <div className="form-group">
                <label>Expense Category</label>
                <select
                  value={expenseCategory}
                  onChange={(e) => setExpenseCategory(e.target.value)}
                >
                  <option value="Transport">Transport & Logistics</option>
                  <option value="Fuel">Fuel & Generator</option>
                  <option value="Repairs">Repairs & Maintenance</option>
                  <option value="Utilities">Utilities & Electricity</option>
                  <option value="Security">Security & Levies</option>
                  <option value="Other">Other Operating Expense</option>
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="e.g. Generator diesel 30 litres"
                  value={expenseDesc}
                  onChange={(e) => setExpenseDesc(e.target.value)}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Amount (₦)</label>
                  <input
                    type="text"
                    placeholder="₦15,000"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Branch</label>
                  <select
                    value={expenseBranch}
                    onChange={(e) => setExpenseBranch(e.target.value)}
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Customer Credit Form */}
          {drawerTab === "ccredit" && (
            <div className="space-y-4">
              <div className="form-group">
                <label>Customer Name</label>
                <input type="text" placeholder="e.g. Alhaji Mustapha" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Amount Owed (₦)</label>
                  <input type="text" placeholder="₦45,000" />
                </div>
                <div className="form-group">
                  <label>Agreed Due Date</label>
                  <input type="date" />
                </div>
              </div>
            </div>
          )}

          {/* Customer Payment Form */}
          {drawerTab === "cpay" && (
            <div className="space-y-4">
              <div className="form-group">
                <label>Select Customer Account</label>
                <input type="text" placeholder="Customer name" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Amount Paid Back (₦)</label>
                  <input type="text" placeholder="₦20,000" />
                </div>
                <div className="form-group">
                  <label>Date Received</label>
                  <input type="date" defaultValue="2026-08-11" />
                </div>
              </div>
            </div>
          )}

          {/* Supplier Credit Form */}
          {drawerTab === "scredit" && (
            <div className="space-y-4">
              <div className="form-group">
                <label>Supplier Name</label>
                <input type="text" placeholder="e.g. Coastal Distributors" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Amount Owed to Supplier (₦)</label>
                  <input type="text" placeholder="₦312,000" />
                </div>
                <div className="form-group">
                  <label>Payment Due Date</label>
                  <input type="date" />
                </div>
              </div>
            </div>
          )}

          {/* Loss & Damage Form */}
          {drawerTab === "loss" && (
            <div className="space-y-4">
              <div className="form-group">
                <label>Loss Incident Type</label>
                <select>
                  <option>Damaged in transit / handling</option>
                  <option>Expired product</option>
                  <option>Spoiled / bad batch</option>
                  <option>Theft / missing from shelf</option>
                  <option>Other shrinkage</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Estimated Loss Value (₦)</label>
                  <input type="text" placeholder="₦9,200" />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" defaultValue="2026-08-11" />
                </div>
              </div>
            </div>
          )}

          {/* Bank Deposit Form */}
          {drawerTab === "deposit" && (
            <div className="space-y-4">
              <div className="form-row">
                <div className="form-group">
                  <label>Amount Deposited (₦)</label>
                  <input type="text" placeholder="₦300,000" />
                </div>
                <div className="form-group">
                  <label>Destination Bank</label>
                  <input type="text" placeholder="e.g. GTBank / Zenith" />
                </div>
              </div>
              <div className="form-group">
                <label>Teller / Reference Slip Number</label>
                <input type="text" placeholder="e.g. REF-9832104" />
              </div>
            </div>
          )}
        </div>

        {/* Drawer Foot Buttons */}
        <div className="drawer-foot">
          <button className="btn-secondary" onClick={closeDrawer}>
            {t("cancel")}
          </button>
          <button className="btn-primary flex-1 justify-center" onClick={handleSave}>
            {t("saveEntry")}
          </button>
        </div>
      </div>
    </>
  );
}
