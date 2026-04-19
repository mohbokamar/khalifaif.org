import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const rootDir = process.cwd();
const jsonPath = path.join(rootDir, "dashboard-data.json");
const outputPath = path.join(rootDir, "dashboard-data.xlsx");

const raw = await fs.readFile(jsonPath, "utf8");
const data = JSON.parse(raw);

const workbook = Workbook.create();

function addSheet(name, rows) {
  const sheet = workbook.worksheets.add(name);
  const endCol = String.fromCharCode(64 + rows[0].length);
  const range = sheet.getRange(`A1:${endCol}${rows.length}`);
  range.values = rows;
  sheet.getRange(`A1:${endCol}1`).format = {
    fill: "#162D5A",
    font: { bold: true, color: "#FFFFFF" }
  };
  range.format.wrapText = true;
  range.format.autofitColumns();
  sheet.freezePanes.freezeRows(1);
  return sheet;
}

const periodRows = [
  [
    "period_key",
    "visible",
    "year",
    "quarter",
    "label_ar",
    "label_en",
    "extreme",
    "absolute",
    "international",
    "fx",
    "basket_cost",
    "family_income"
  ]
];

Object.entries(data.periods).forEach(([key, period]) => {
  periodRows.push([
    key,
    period.available ? 1 : 0,
    period.year,
    period.quarter,
    period.labelAr,
    period.labelEn,
    period.extreme,
    period.absolute,
    period.international,
    period.fx,
    period.basketCost,
    period.familyIncome
  ]);
});

const regionRows = [[
  "period_key",
  "city_ar",
  "city_en",
  "basket",
  "extreme",
  "absolute"
]];

Object.entries(data.periods).forEach(([key, period]) => {
  (period.regions || []).forEach((region) => {
    regionRows.push([
      key,
      region.nameAr,
      region.nameEn,
      region.basket,
      region.extreme,
      region.absolute
    ]);
  });
});

const historyRows = [[
  "year",
  "institution_ar",
  "institution_en",
  "rate",
  "family_ar",
  "family_en",
  "single_ar",
  "single_en",
  "survey_ar",
  "survey_en"
]];

data.historicalMeasures.forEach((row) => {
  historyRows.push([
    row.year,
    row.institution?.ar ?? "",
    row.institution?.en ?? "",
    row.rate ?? "",
    row.family?.ar ?? "",
    row.family?.en ?? "",
    row.single?.ar ?? "",
    row.single?.en ?? "",
    row.survey?.ar ?? "",
    row.survey?.en ?? ""
  ]);
});

const marketRows = [["period_ar", "period_en", "bfx", "meb"]];
(data.marketTrend || []).forEach((row) => {
  marketRows.push([row.periodAr, row.periodEn, row.bfx, row.meb]);
});

const readmeRows = [
  ["Dashboard Excel Template"],
  ["Edit numeric values in Periods and Regions sheets only."],
  ["visible: 1 means show on website, 0 means hide from website."],
  ["Arabic and English labels are kept for compatibility."],
  ["After editing, import this workbook from admin.html."]
];

addSheet("Readme", readmeRows);
addSheet("Periods", periodRows);
addSheet("Regions", regionRows);
addSheet("History", historyRows);
addSheet("MarketTrend", marketRows);

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);

console.log(outputPath);
