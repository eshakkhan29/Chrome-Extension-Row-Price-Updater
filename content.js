(function () {
  // print hide style
  const style = document.createElement("style");
  style.innerHTML = `
    @media print {
      .__edit_price_btn {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(style);

  const parseMoney = (str) => {
    if (!str) return 0;
    const n = String(str).replace(/[,৳\s]/g, "");
    return parseFloat(n) || 0;
  };

  const formatMoney = (n) => `৳${Number(n).toString()}`;

  const recalcGrandTotal = () => {
    let grand = 0;
    document.querySelectorAll(".single_total").forEach((cell) => {
      grand +=
        parseFloat(String(cell.textContent).replace(/[^\d.-]/g, "")) || 0;
    });
    const totalPriceCell = document.querySelector(".total_price");
    if (totalPriceCell) totalPriceCell.textContent = grand;
  };

  document.querySelectorAll("table tbody tr").forEach((row) => {
    const priceStrong = row.querySelector(".price strong");
    const qtyStrong = row.querySelector(".unit_name strong");
    const totalCell = row.querySelector(".single_total");
    if (!priceStrong || !qtyStrong || !totalCell) return;

    // ✅ Instead of button, click directly on price
    priceStrong.style.cursor = "pointer";
    priceStrong.title = "Click to edit price";

    priceStrong.addEventListener("click", () => {
      const current = priceStrong.textContent.trim();
      const input = prompt("নতুন দাম লিখুন (৳ সহ বা ছাড়া):", current);
      if (input == null) return;

      const newUnitPrice = parseMoney(input);
      if (!(newUnitPrice >= 0)) return;

      priceStrong.textContent = formatMoney(newUnitPrice);
      const qty = parseMoney(qtyStrong.textContent);
      const newRowTotal = +(newUnitPrice * qty).toFixed(2);
      totalCell.textContent = Number.isInteger(newRowTotal)
        ? newRowTotal
        : newRowTotal;
      recalcGrandTotal();
    });
  });
})();
