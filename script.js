const STORAGE_KEY = "kif-dashboard-data";
const LANG_KEY = "kif-dashboard-lang";

let dashboardData;

const state = {
  selectedYear: 2026,
  selectedQuarter: "Q1",
  language: localStorage.getItem(LANG_KEY) || "ar",
  charts: {}
};

const translations = {
  ar: {
    unavailable: "\u063a\u064a\u0631 \u0645\u062a\u0648\u0641\u0631 \u062d\u0627\u0644\u064a\u064b\u0627",
    available: "\u0645\u062a\u0648\u0641\u0631",
    heroNote: "\u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062a \u0627\u0644\u0623\u0633\u0627\u0633\u064a\u0629",
    drawerTitle: "\u0627\u062e\u062a\u0631 \u0627\u0644\u0633\u0646\u0629 \u0648\u0627\u0644\u0631\u0628\u0639",
    drawerDesc: "\u0627\u0644\u0623\u0631\u0628\u0627\u0639 \u063a\u064a\u0631 \u0627\u0644\u0645\u062a\u0627\u062d\u0629 \u0633\u062a\u0638\u0647\u0631 \u0628\u062d\u0627\u0644\u0629 \u063a\u064a\u0631 \u0645\u062a\u0648\u0641\u0631 \u062d\u0627\u0644\u064a\u064b\u0627.",
    year: "\u0627\u0644\u0633\u0646\u0629",
    apply: "\u062a\u0637\u0628\u064a\u0642 \u0627\u0644\u062a\u0639\u062f\u064a\u0644",
    editPeriod: "\u062a\u0639\u062f\u064a\u0644 \u0627\u0644\u0641\u062a\u0631\u0629",
    browseIndicators: "\u062a\u0635\u0641\u062d \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062a",
    selectedPeriod: "\u0627\u0644\u0641\u062a\u0631\u0629 \u0627\u0644\u0645\u062e\u062a\u0627\u0631\u0629",
    currentPeriod: "\u0627\u0644\u0641\u062a\u0631\u0629 \u0627\u0644\u062d\u0627\u0644\u064a\u0629",
    extreme: "\u062e\u0637 \u0627\u0644\u0641\u0642\u0631 \u0627\u0644\u0645\u062f\u0642\u0639",
    absolute: "\u062e\u0637 \u0627\u0644\u0641\u0642\u0631 \u0627\u0644\u0645\u0637\u0644\u0642",
    international: "\u062e\u0637 \u0627\u0644\u0641\u0642\u0631 \u0627\u0644\u062f\u0648\u0644\u064a",
    familyStable: "\u062f\u062e\u0644 \u0645\u0633\u062a\u0642\u0631 \u0646\u0633\u0628\u064a\u064b\u0627",
    absolutePoverty: "\u0641\u0642\u0631 \u0645\u0637\u0644\u0642",
    extremePoverty: "\u0641\u0642\u0631 \u0645\u062f\u0642\u0639",
    previousQuarter: "\u0639\u0646 \u0627\u0644\u0631\u0628\u0639 \u0627\u0644\u0633\u0627\u0628\u0642",
    noDataSummary: "\u0647\u0630\u0647 \u0627\u0644\u0641\u062a\u0631\u0629 \u063a\u064a\u0631 \u0645\u062a\u0648\u0641\u0631\u0629 \u062d\u0627\u0644\u064a\u064b\u0627. \u0633\u064a\u062a\u0645 \u0625\u062f\u062e\u0627\u0644 \u0628\u064a\u0627\u0646\u0627\u062a\u0647\u0627 \u0644\u0627\u062d\u0642\u064b\u0627 \u0645\u0646 \u0644\u0648\u062d\u0629 \u0627\u0644\u0623\u062f\u0645\u0646.",
    noDataCard: "\u0644\u0627 \u062a\u0648\u062c\u062f \u0628\u064a\u0627\u0646\u0627\u062a \u0631\u0642\u0645\u064a\u0629 \u0644\u0647\u0630\u0647 \u0627\u0644\u0641\u062a\u0631\u0629 \u0628\u0639\u062f.",
    calculatorNoData: "\u064a\u062c\u0628 \u0627\u062e\u062a\u064a\u0627\u0631 \u0641\u062a\u0631\u0629 \u0645\u062a\u0648\u0641\u0631\u0629 \u0642\u0628\u0644 \u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u062d\u0627\u0633\u0628\u0629.",
    calculatorSummaryStable: "\u062f\u062e\u0644 \u0627\u0644\u0623\u0633\u0631\u0629 \u0623\u0639\u0644\u0649 \u0645\u0646 \u062e\u0637 \u0627\u0644\u0641\u0642\u0631 \u0627\u0644\u0645\u0637\u0644\u0642 \u0644\u0644\u0641\u062a\u0631\u0629 \u0627\u0644\u062d\u0627\u0644\u064a\u0629.",
    calculatorSummaryAbsolute: "\u062f\u062e\u0644 \u0627\u0644\u0623\u0633\u0631\u0629 \u0623\u0642\u0644 \u0645\u0646 \u062e\u0637 \u0627\u0644\u0641\u0642\u0631 \u0627\u0644\u0645\u0637\u0644\u0642 \u0644\u0643\u0646\u0647 \u0623\u0639\u0644\u0649 \u0645\u0646 \u0627\u0644\u062e\u0637 \u0627\u0644\u0645\u062f\u0642\u0639.",
    calculatorSummaryExtreme: "\u062f\u062e\u0644 \u0627\u0644\u0623\u0633\u0631\u0629 \u0623\u0642\u0644 \u0645\u0646 \u062e\u0637 \u0627\u0644\u0641\u0642\u0631 \u0627\u0644\u0645\u062f\u0642\u0639.",
    cityTripoli: "\u0637\u0631\u0627\u0628\u0644\u0633",
    cityBenghazi: "\u0628\u0646\u063a\u0627\u0632\u064a",
    citySabha: "\u0633\u0628\u0647\u0627",
    chartExtreme: "\u062e\u0637 \u0627\u0644\u0641\u0642\u0631 \u0627\u0644\u0645\u062f\u0642\u0639",
    chartAbsolute: "\u062e\u0637 \u0627\u0644\u0641\u0642\u0631 \u0627\u0644\u0645\u0637\u0644\u0642",
    chartFamily: "\u0639\u0627\u0626\u0644\u0629 \u0645\u0646 5 \u0623\u0641\u0631\u0627\u062f",
    chartMeb: "\u0627\u0644\u0645\u062f\u0642\u0639 (MEB)",
    chartMebPlus: "\u0627\u0644\u0645\u0637\u0644\u0642 (MEB+)",
    chartIntl: "\u0627\u0644\u062f\u0648\u0644\u064a (8$)"
  },
  en: {
    unavailable: "Currently unavailable",
    available: "Available",
    heroNote: "Core Indicators",
    drawerTitle: "Choose year and quarter",
    drawerDesc: "Unavailable quarters will be marked as currently unavailable.",
    year: "Year",
    apply: "Apply",
    editPeriod: "Edit period",
    browseIndicators: "Browse indicators",
    selectedPeriod: "Selected period",
    currentPeriod: "Current period",
    extreme: "Extreme poverty line",
    absolute: "Absolute poverty line",
    international: "International poverty line",
    familyStable: "Relatively stable income",
    absolutePoverty: "Absolute poverty",
    extremePoverty: "Extreme poverty",
    previousQuarter: "vs previous quarter",
    noDataSummary: "This period is currently unavailable. Its data can be added later from the admin dashboard.",
    noDataCard: "No numeric data is available for this period yet.",
    calculatorNoData: "Please select an available period before using the calculator.",
    calculatorSummaryStable: "Household income is above the absolute poverty line for the current period.",
    calculatorSummaryAbsolute: "Household income is below the absolute poverty line but above the extreme line.",
    calculatorSummaryExtreme: "Household income is below the extreme poverty line.",
    cityTripoli: "Tripoli",
    cityBenghazi: "Benghazi",
    citySabha: "Sabha",
    chartExtreme: "Extreme poverty line",
    chartAbsolute: "Absolute poverty line",
    chartFamily: "Family of 5",
    chartMeb: "Extreme (MEB)",
    chartMebPlus: "Absolute (MEB+)",
    chartIntl: "International (8$)"
  }
};

const elements = {
  yearSelect: document.getElementById("yearSelect"),
  periodForm: document.getElementById("periodForm"),
  drawer: document.getElementById("periodDrawer"),
  drawerBackdrop: document.getElementById("drawerBackdrop"),
  openDrawerButton: document.getElementById("openDrawerButton"),
  openDrawerButtonSecondary: document.getElementById("openDrawerButtonSecondary"),
  closeDrawerButton: document.getElementById("closeDrawerButton"),
  quarterGrid: document.getElementById("quarterGrid"),
  familyForm: document.getElementById("familyForm"),
  familyMembersInput: document.getElementById("familyMembersInput"),
  familyIncomeInput: document.getElementById("familyIncomeInput"),
  familyFxInput: document.getElementById("familyFxInput"),
  historyTableBody: document.getElementById("historyTableBody"),
  regionsGrid: document.getElementById("regionsGrid"),
  familyStatusPill: document.getElementById("familyStatusPill"),
  langButtons: document.querySelectorAll("[data-lang]"),
  brandLogo: document.getElementById("brandLogo"),
  currentPeriodPill: document.getElementById("currentPeriodPill"),
  periodHeading: document.getElementById("periodHeading"),
  currentPeriodLabel: document.getElementById("currentPeriodLabel")
};

function t(key) {
  return translations[state.language][key] || key;
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function looksCorrupted(value) {
  return typeof value === "string" && /[ÙØ]|[\uFFFD]|[?]{3,}/.test(value);
}

function repairWithFallback(savedValue, fallbackValue) {
  if (Array.isArray(fallbackValue)) {
    if (!Array.isArray(savedValue)) {
      return deepClone(fallbackValue);
    }

    return fallbackValue.map((fallbackItem, index) =>
      repairWithFallback(savedValue[index], fallbackItem)
    );
  }

  if (fallbackValue && typeof fallbackValue === "object") {
    const sourceObject = savedValue && typeof savedValue === "object" ? savedValue : {};
    const result = {};

    Object.keys(fallbackValue).forEach((key) => {
      result[key] = repairWithFallback(sourceObject[key], fallbackValue[key]);
    });

    return result;
  }

  if (looksCorrupted(savedValue)) {
    return fallbackValue;
  }

  return savedValue ?? fallbackValue;
}

function normalizeData(rawData) {
  const fallback = window.DASHBOARD_DATA ? deepClone(window.DASHBOARD_DATA) : null;

  if (!fallback) {
    return rawData;
  }

  const data = rawData ? deepClone(rawData) : {};
  const merged = {
    ...fallback,
    ...data,
    periods: {}
  };

  Object.keys(fallback.periods).forEach((key) => {
    merged.periods[key] = repairWithFallback(data.periods?.[key], fallback.periods[key]);
  });

  merged.historicalMeasures = Array.isArray(data.historicalMeasures) && data.historicalMeasures.length
    ? repairWithFallback(data.historicalMeasures, fallback.historicalMeasures)
    : fallback.historicalMeasures;

  merged.marketTrend = repairWithFallback(data.marketTrend, fallback.marketTrend);

  return merged;
}

async function loadDashboardData() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    try {
      return normalizeData(JSON.parse(savedData));
    } catch (error) {
      console.warn("Failed to parse saved data, falling back to defaults.", error);
    }
  }

  try {
    const response = await fetch("./dashboard-data.json", { cache: "no-store" });
    return normalizeData(await response.json());
  } catch (error) {
    return normalizeData(window.DASHBOARD_DATA);
  }
}

function getPeriodKey(year, quarter) {
  return `${year}-${quarter}`;
}

function getSortedPeriodEntries() {
  return Object.entries(dashboardData.periods)
    .map(([key, value]) => ({ key, ...value }))
    .sort((left, right) => {
      if (left.year !== right.year) {
        return left.year - right.year;
      }
      return left.quarter.localeCompare(right.quarter);
    });
}

function getCurrentPeriod() {
  return dashboardData.periods[getPeriodKey(state.selectedYear, state.selectedQuarter)];
}

function getAvailableEntries() {
  return getSortedPeriodEntries().filter((entry) => entry.available);
}

function getPreviousAvailablePeriod() {
  const availableEntries = getAvailableEntries();
  const currentKey = getPeriodKey(state.selectedYear, state.selectedQuarter);
  const currentIndex = availableEntries.findIndex((entry) => entry.key === currentKey);
  return currentIndex > 0 ? availableEntries[currentIndex - 1] : null;
}

function formatNumber(value) {
  return new Intl.NumberFormat(state.language === "ar" ? "ar-LY" : "en-US").format(value);
}

function formatCurrency(value) {
  if (value === null || value === undefined) {
    return t("unavailable");
  }

  return state.language === "ar"
    ? `${formatNumber(Math.round(value))} د.ل`
    : `LYD ${formatNumber(Math.round(value))}`;
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function applyStaticTranslations() {
  document.documentElement.lang = state.language;
  document.documentElement.dir = state.language === "ar" ? "rtl" : "ltr";

  elements.langButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === state.language);
  });

  if (elements.brandLogo) {
    elements.brandLogo.src = state.language === "ar" ? "./assets/logo-ar.png" : "./assets/logo-en.png";
  }

  document.querySelectorAll("[data-copy]").forEach((node) => {
    const key = state.language === "ar" ? "copyAr" : "copyEn";
    if (node.dataset[key]) {
      node.textContent = node.dataset[key];
    }
  });
}

function populateYearSelect() {
  elements.yearSelect.innerHTML = dashboardData.years
    .map((year) => `<option value="${year}">${year}</option>`)
    .join("");

  elements.yearSelect.value = String(state.selectedYear);
}

function renderQuarterGrid() {
  const year = Number(elements.yearSelect.value);

  elements.quarterGrid.innerHTML = ["Q1", "Q2", "Q3", "Q4"]
    .map((quarter) => {
      const key = getPeriodKey(year, quarter);
      const period = dashboardData.periods[key];
      const available = Boolean(period && period.available);
      const active = state.selectedYear === year && state.selectedQuarter === quarter;
      const label = state.language === "ar"
        ? period?.quarterLabelAr || quarter
        : period?.quarterLabelEn || quarter;

      return `
        <button
          class="quarter-card ${active ? "is-active" : ""} ${available ? "" : "is-unavailable"}"
          type="button"
          data-quarter="${quarter}"
          aria-pressed="${active ? "true" : "false"}"
        >
          <span class="quarter-card__label">${label}</span>
          <span class="quarter-card__status">${available ? t("available") : t("unavailable")}</span>
        </button>
      `;
    })
    .join("");
}

function renderRegions() {
  const period = getCurrentPeriod();

  if (!period.available || !period.regions.length) {
    elements.regionsGrid.innerHTML = `<article class="info-card"><p>${t("noDataCard")}</p></article>`;
    return;
  }

  elements.regionsGrid.innerHTML = period.regions
    .map((region) => {
      const name = state.language === "ar" ? region.nameAr : region.nameEn;
      return `
        <article class="region-card">
          <h3>${name}</h3>
          <strong class="region-card__value">${formatCurrency(region.basket)}</strong>
          <div class="region-card__meta">
            <span>${t("extreme")}: ${formatCurrency(region.extreme)}</span>
            <span>${t("absolute")}: ${formatCurrency(region.absolute)}</span>
          </div>
        </article>
      `;
    })
    .join("");
}

function buildHistoryTable() {
  elements.historyTableBody.innerHTML = dashboardData.historicalMeasures
    .map((row) => `
      <tr>
        <td>${row.year}</td>
        <td>${state.language === "ar" ? row.institutionAr : row.institutionEn}</td>
        <td>${row.percent}</td>
        <td>${state.language === "ar" ? row.familyAr : row.familyEn}</td>
        <td>${state.language === "ar" ? row.individualAr : row.individualEn}</td>
      </tr>
    `)
    .join("");
}

function destroyChart(name) {
  if (state.charts[name]) {
    state.charts[name].destroy();
  }
}

function chartOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            family: "Almarai",
            size: 12,
            weight: "700"
          }
        }
      }
    }
  };
}

function renderMainLinesChart() {
  destroyChart("linesChart");

  const entries = getAvailableEntries();
  state.charts.linesChart = new Chart(document.getElementById("linesChart"), {
    type: "line",
    data: {
      labels: entries.map((entry) => state.language === "ar" ? entry.labelAr : entry.labelEn),
      datasets: [
        {
          label: t("chartExtreme"),
          data: entries.map((entry) => entry.extreme),
          borderColor: "#ceac7e",
          borderWidth: 4,
          tension: 0.25
        },
        {
          label: t("chartAbsolute"),
          data: entries.map((entry) => entry.absolute),
          borderColor: "#162d5a",
          borderWidth: 4,
          tension: 0.25
        }
      ]
    },
    options: chartOptions()
  });
}

function renderPovertyLevelsChart() {
  destroyChart("povertyLevelsChart");

  const period = getCurrentPeriod();
  const values = period.available
    ? [period.extreme, period.absolute, period.international]
    : [0, 0, 0];

  state.charts.povertyLevelsChart = new Chart(document.getElementById("povertyLevelsChart"), {
    type: "bar",
    data: {
      labels: [t("chartMeb"), t("chartMebPlus"), t("chartIntl")],
      datasets: [
        {
          data: values,
          backgroundColor: ["#ceac7e", "#1f467f", "#203a69"],
          borderRadius: 14
        }
      ]
    },
    options: {
      ...chartOptions(),
      plugins: { ...chartOptions().plugins, legend: { display: false } }
    }
  });
}

function renderMarketChangeChart() {
  destroyChart("marketChangeChart");

  state.charts.marketChangeChart = new Chart(document.getElementById("marketChangeChart"), {
    type: "line",
    data: {
      labels: dashboardData.marketTrend.labels,
      datasets: [
        {
          label: "% BFX",
          data: dashboardData.marketTrend.bfx,
          borderColor: "#4d89df",
          borderWidth: 2,
          tension: 0.28,
          pointRadius: 0
        },
        {
          label: "% MEB",
          data: dashboardData.marketTrend.meb,
          borderColor: "#f09a49",
          borderWidth: 2,
          tension: 0.28,
          pointRadius: 0
        }
      ]
    },
    options: chartOptions()
  });
}

function renderHistoricalMeasuresChart() {
  destroyChart("historicalMeasuresChart");

  state.charts.historicalMeasuresChart = new Chart(document.getElementById("historicalMeasuresChart"), {
    type: "bar",
    data: {
      labels: dashboardData.historicalMeasures.map((row) => row.year),
      datasets: [
        {
          label: t("chartFamily"),
          data: dashboardData.historicalMeasures.map((row) => row.familyValue),
          backgroundColor: "#20416f",
          borderRadius: 12
        }
      ]
    },
    options: {
      ...chartOptions(),
      plugins: { ...chartOptions().plugins, legend: { display: false } }
    }
  });
}

function updateCalculatorResult() {
  const period = getCurrentPeriod();

  if (!period.available) {
    elements.familyStatusPill.textContent = t("unavailable");
    setText("calcExtremeThreshold", t("unavailable"));
    setText("calcAbsoluteThreshold", t("unavailable"));
    setText("calcUsdValue", t("unavailable"));
    setText("calcSummary", t("calculatorNoData"));
    return;
  }

  const members = Number(elements.familyMembersInput.value || 5);
  const income = Number(elements.familyIncomeInput.value || 0);
  const fx = Number(elements.familyFxInput.value || 0);
  const scale = members / 5;
  const extremeThreshold = period.extreme * scale;
  const absoluteThreshold = period.absolute * scale;
  const usdValue = fx > 0 ? income / fx : 0;

  let statusText = t("familyStable");
  let summaryText = t("calculatorSummaryStable");

  if (income < extremeThreshold) {
    statusText = t("extremePoverty");
    summaryText = t("calculatorSummaryExtreme");
  } else if (income < absoluteThreshold) {
    statusText = t("absolutePoverty");
    summaryText = t("calculatorSummaryAbsolute");
  }

  elements.familyStatusPill.textContent = statusText;
  setText("calcExtremeThreshold", formatCurrency(extremeThreshold));
  setText("calcAbsoluteThreshold", formatCurrency(absoluteThreshold));
  setText("calcUsdValue", usdValue ? `$${usdValue.toFixed(0)}` : t("unavailable"));
  setText("calcSummary", summaryText);
}

function renderDashboard() {
  applyStaticTranslations();

  const current = getCurrentPeriod();
  const previous = getPreviousAvailablePeriod();
  const currentLabel = state.language === "ar" ? current.labelAr : current.labelEn;
  const quarterLabel = state.language === "ar" ? current.quarterLabelAr : current.quarterLabelEn;

  setText("currentPeriodPill", currentLabel);
  setText("currentPeriodLabel", currentLabel);
  setText("periodHeading", `${current.year} - ${quarterLabel}`);

  if (!current.available) {
    setText("extremeValue", t("unavailable"));
    setText("absoluteValue", t("unavailable"));
    setText("kpiExtreme", t("unavailable"));
    setText("kpiAbsolute", t("unavailable"));
    setText("kpiInternational", t("unavailable"));
    setText("kpiExtremeChange", t("noDataSummary"));
    setText("kpiAbsoluteChange", t("noDataSummary"));
    setText("fxValue", t("unavailable"));
    setText("basketCostValue", t("unavailable"));
    setText("familyIncomeValue", t("unavailable"));
  } else {
    const extremeChange = previous ? ((current.extreme - previous.extreme) / previous.extreme) * 100 : 0;
    const absoluteChange = previous ? ((current.absolute - previous.absolute) / previous.absolute) * 100 : 0;

    setText("extremeValue", formatNumber(current.extreme));
    setText("absoluteValue", formatNumber(current.absolute));
    setText("kpiExtreme", formatCurrency(current.extreme));
    setText("kpiAbsolute", formatCurrency(current.absolute));
    setText("kpiInternational", formatCurrency(current.international));
    setText("kpiExtremeChange", previous ? `${formatNumber(extremeChange.toFixed(1))}% ${t("previousQuarter")}` : t("noDataSummary"));
    setText("kpiAbsoluteChange", previous ? `${formatNumber(absoluteChange.toFixed(1))}% ${t("previousQuarter")}` : t("noDataSummary"));
    setText("fxValue", formatCurrency(current.fx));
    setText("basketCostValue", formatCurrency(current.basketCost));
    setText("familyIncomeValue", formatCurrency(current.familyIncome));
    elements.familyIncomeInput.value = current.familyIncome;
    elements.familyFxInput.value = current.fx;
  }

  renderRegions();
  buildHistoryTable();
  renderMainLinesChart();
  renderPovertyLevelsChart();
  renderMarketChangeChart();
  renderHistoricalMeasuresChart();
  updateCalculatorResult();
}

function openDrawer() {
  elements.drawer.classList.add("is-open");
}

function closeDrawer() {
  elements.drawer.classList.remove("is-open");
}

function setupReveals() {
  const items = document.querySelectorAll(".fade-up");

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((item) => observer.observe(item));
}

function setupEvents() {
  elements.openDrawerButton.addEventListener("click", openDrawer);
  elements.openDrawerButtonSecondary.addEventListener("click", openDrawer);
  elements.closeDrawerButton.addEventListener("click", closeDrawer);
  elements.drawerBackdrop.addEventListener("click", closeDrawer);

  elements.yearSelect.addEventListener("change", renderQuarterGrid);

  elements.quarterGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-quarter]");

    if (!button) {
      return;
    }

    state.selectedYear = Number(elements.yearSelect.value);
    state.selectedQuarter = button.dataset.quarter;
    renderQuarterGrid();
  });

  elements.periodForm.addEventListener("submit", (event) => {
    event.preventDefault();
    renderQuarterGrid();
    renderDashboard();
    closeDrawer();
  });

  elements.familyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    updateCalculatorResult();
  });

  elements.langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.language = button.dataset.lang;
      localStorage.setItem(LANG_KEY, state.language);
      renderQuarterGrid();
      renderDashboard();
    });
  });
}

function ensureValidInitialPeriod() {
  if (dashboardData.periods[getPeriodKey(state.selectedYear, state.selectedQuarter)]) {
    return;
  }

  state.selectedYear = 2026;
  state.selectedQuarter = "Q1";
}

async function init() {
  dashboardData = await loadDashboardData();
  ensureValidInitialPeriod();
  populateYearSelect();
  renderQuarterGrid();
  renderDashboard();
  setupReveals();
  setupEvents();
}

init().catch((error) => {
  console.error(error);
  document.body.innerHTML = `
    <main style="padding:32px;font-family:Almarai,sans-serif">
      <div style="max-width:720px;margin:auto;background:#fff;border-radius:24px;padding:24px;box-shadow:0 18px 50px rgba(0,35,102,.08)">
        <h1 style="margin-top:0;color:#162d5a">حدث خطأ أثناء تحميل الصفحة</h1>
        <p style="line-height:1.9;color:#5d7092">
          حاول حذف البيانات المحلية القديمة من لوحة الأدمن أو أعد فتح النسخة المحدثة من الملفات.
        </p>
      </div>
    </main>
  `;
});
