"""Generate C360 Experiment 05 LWC DTO inventory Excel."""

import csv
import tempfile
import zipfile
from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill
from openpyxl.utils import get_column_letter

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "c360LwcDtoInventoryEx05.xlsx"
OUTPUT_CSV = ROOT / "c360LwcDtoInventoryEx05.csv"

# OneDrive/SharePoint can inject [trash]/*.dat and customXml/* into .xlsx files,
# which causes Excel Online/desktop to hang on "Processing". Strip on write.
JUNK_PREFIXES = ("[trash]/", "customXml/")
JUNK_EXACT = {"docProps/custom.xml"}

HEADERS = [
    "DTO Object",
    "Field Name",
    "Type",
    "Requirement",
    "Page",
    "Component",
    "Section Title",
    "Data Source",
]

# UI panel / module headings (match LWC h2 and @api title defaults).
PORTFOLIO_SUMMARY_SECTION = {
    "totalAccounts": "Total accounts",
    "compositeHealthIndex": "Composite health index",
    "healthIndexDelta": "Composite health index",
    "signalsToAction": "Signals to action",
    "signalsChurnCount": "Signals to action",
    "signalsCrossSellCount": "Signals to action",
    "atRiskAccounts": "At-risk accounts",
    "revenueAtRisk": "Revenue at risk",
    "revenueAtRiskDelta": "Revenue at risk",
}

CROSS_SELL_SUMMARY_NET_BENEFIT = {
    "netBenefit",
    "grossUplift",
    "inScopeTransactions",
    "inScopeVolume",
    "declineCodeList",
    "cost",
    "tokenisationImpact",
}

CROSS_SELL_SUMMARY_ENV_DECLINES = {
    "merchantApprovalRate",
    "peerApprovalRate",
    "merchantVsPeer",
}

CROSS_SELL_SUMMARY_DECLINE_KPIS = {
    "valueOfDeclines",
    "countDeclines",
    "recoverableSplitMerchant",
    "recoverableSplitPeer",
}

ACCOUNT_DETAIL_CHURN_METRICS = {
    "churnScore",
    "churnScorePct",
    "txnTrend1m",
    "txnTrend3m",
    "txnTrend6m",
}

ACCOUNT_HIGHLIGHT_FIELDS = {
    "accountId",
    "merchantCount",
    "market",
}


def infer_section_title(dto: str, field: str, page: str, component: str) -> str:
    """Map a DTO field to the on-screen section heading where it is shown."""
    if dto == "PortfolioSummary" and field in PORTFOLIO_SUMMARY_SECTION:
        return PORTFOLIO_SUMMARY_SECTION[field]

    if dto == "CrossSellSummary":
        if field in CROSS_SELL_SUMMARY_NET_BENEFIT:
            return "Net benefit to merchant"
        if field in CROSS_SELL_SUMMARY_ENV_DECLINES:
            return "Account environment declines"
        if field in CROSS_SELL_SUMMARY_DECLINE_KPIS:
            return "Count & value of declines"

    if dto == "DeclineCode":
        return "Count & value of declines"

    if dto in ("CrossSellDetail",) and field == "schemeInterchangeBenefit":
        return "Net benefit to merchant"

    if dto == "CrossSellDetail" and field == "peerSegmentId":
        return "Account environment declines"

    if dto == "CrossSellDetail" and field == "likelihoodToAcquire":
        return "Net benefit to merchant"

    if dto == "AccountDetail" and field in ACCOUNT_DETAIL_CHURN_METRICS:
        return "Churn score & transaction trends"

    if dto == "AccountDetail" and field in ACCOUNT_HIGHLIGHT_FIELDS:
        return "Account highlight"

    if dto == "AccountDetail" and field == "crossSell":
        return "Revenue Boost cross-sell deep-dive"

    if dto == "AccountDetail" and field in (
        "positiveDrivers",
        "negativeDrivers",
        "driverDrilldown",
        "mids",
    ):
        return "Account-level drivers"

    if dto == "DriverRow":
        return "Account-level drivers"

    if dto == "DrilldownRow":
        return "Mid-level drivers"

    if dto == "MidRow":
        return "Account-level drivers"

    if dto in ("BASE_PRICE_PER_TXN",) or (
        dto == "CrossSellDetail" and field == "declineCodes"
    ):
        if dto == "BASE_PRICE_PER_TXN":
            return "Revenue Boost assumptions (sliders)"
        return "Count & value of declines"

    if dto == "DECLINE_CHART_COLORS":
        return "Count & value of declines"

    dto_defaults = {
        "UserContext": "Global header & sidebar",
        "PortfolioScope": "Enterprise Account Hub",
        "DataProvenance": "My accounts",
        "MOCK_ACCOUNT_IDS": "Navigation (account links)",
        "MaterialChangeBanner": "Material changes banner",
        "KPI_TILES": "KPI strip",
        "KpiTile": "KPI strip",
        "NEEDS_ACTION_ITEMS": "Needs action today",
        "NeedsActionItem": "Needs action today",
        "PORTFOLIO_HEALTH": "Portfolio health",
        "PortfolioHealth": "Portfolio health",
        "PipelineBar": "Portfolio health — cross-sell pipeline",
        "SIGNALS": "My signals",
        "Signal": "My signals",
        "ACCOUNTS": "My accounts",
        "Account": "My accounts",
        "ALERTS": "Active alerts",
        "Alert": "Active alerts",
        "ALERT_STATUS_OPTIONS": "Active alerts — status filters",
        "ALERT_INTEL": "Cross-selling intelligence",
        "CrossSellIntelligencePanel": "Cross-selling intelligence",
        "CrossSellIntelRow": "Cross-selling intelligence",
        "ALERT_DETAIL_BY_ID": "Alert detail",
        "AlertDetail": "Alert detail — header",
        "Driver": "Top drivers",
        "AlertCrossSellIntel": "Cross-sell intelligence",
        "AlertOutcome": "Record outcome",
        "CROSS_SELL_ROWS": "Open cross-sell opportunities",
        "CrossSellOpportunity": "Open cross-sell opportunities",
        "CHURN_ROWS": "Accounts by churn risk",
        "ChurnRiskRow": "Accounts by churn risk",
        "AccountSpotlight": "Account highlight",
        "AccountDetailInput": "Account 360",
        "ACCOUNT_DETAIL": "Account 360",
        "AccountDetail": "Account 360",
        "CrossSellDetail": "Revenue Boost cross-sell deep-dive",
        "CrossSellSummary": "Net benefit to merchant",
        "DashboardState": "App shell & navigation",
    }

    if dto == "AlertDetail" and field == "trajectory":
        return "6-month score trajectory"
    if dto == "AlertDetail" and field == "drivers":
        return "Top drivers"
    if dto in ("AlertDetail",) and field in ("score", "arr", "merchantCount", "account", "accountId", "id"):
        return "Alert detail — header"

    if dto in dto_defaults:
        return dto_defaults[dto]

    component_defaults = {
        "c360DashboardEx05": "Enterprise Account Hub",
        "c360MaterialBannerEx05": "Material changes banner",
        "c360KpiStripEx05": "KPI strip",
        "c360KpiTileEx05": "KPI strip",
        "c360NeedsActionEx05": "Needs action today",
        "c360PortfolioHealthEx05": "Portfolio health",
        "c360MySignalsEx05": "My signals",
        "c360SignalListEx05": "My signals",
        "c360AccountsTableEx05": "My accounts",
        "c360AlertCentreEx05": "Alert Centre",
        "c360AlertDetailEx05": "Alert detail",
        "c360ChurnTableEx05": "Accounts by churn risk",
        "c360CrossSellTableEx05": "Open cross-sell opportunities",
        "c360AccountEx05": "Account highlight",
        "c360AccountDetailEx05": "Account 360",
        "c360PathwaysTableEx05": "In-progress pathways",
        "c360ExportModalEx05": "Export modal",
    }
    if component in component_defaults:
        return component_defaults[component]

    if "Deprecated" in page or "removed" in page.lower():
        return "Deprecated UI"
    return page


def with_section_title(row: tuple) -> tuple:
    dto, field, typ, requirement, page, component, data_source = row
    section = infer_section_title(dto, field, page, component)
    return (dto, field, typ, requirement, page, component, section, data_source)


def expand_rows(rows: list[tuple]) -> list[tuple]:
    return [with_section_title(row) for row in rows]

ROWS = [
    # Shared session context
    ("UserContext", "userId", "Id (string)", "Required", "Hub - Shared", "c360DashboardEx05", ""),
    ("UserContext", "userName", "string", "Required", "Hub - Shared", "c360DashboardEx05", ""),
    ("UserContext", "userInitials", "string", "Optional", "Hub - Shared", "c360DashboardEx05", ""),
    ("UserContext", "role", "string", "Required", "Hub - Shared", "c360DashboardEx05", ""),
    ("UserContext", "segment", "string", "Optional", "Hub - Shared", "c360DashboardEx05", ""),
    ("UserContext", "pilotGroupId", "string", "Optional", "Hub - Alert Centre", "c360AlertCentreEx05", ""),
    ("UserContext", "isPilotRm", "boolean", "Required", "Hub - Alert Centre", "c360AlertCentreEx05", ""),
    ("UserContext", "managerVisibility", "boolean", "Optional", "Hub - Alert Detail", "c360AlertDetailEx05", ""),
    ("PortfolioScope", "accountCount", "integer", "Required", "Hub - Overview", "c360DashboardEx05", ""),
    ("PortfolioScope", "asOfDate", "date", "Required", "Hub - Overview", "c360DashboardEx05", ""),
    ("PortfolioScope", "currency", "string", "Optional", "Hub - Overview", "c360DashboardEx05", ""),
    ("DataProvenance", "sourceChain", "string", "Required", "Hub - Overview", "c360AccountsTableEx05", ""),
    ("DataProvenance", "refreshIntervalMinutes", "integer", "Required", "Hub - Overview", "c360AccountsTableEx05", ""),
    ("DataProvenance", "lastRefreshedAt", "datetime", "Optional", "Hub - Overview", "c360AccountsTableEx05", ""),
    ("MOCK_ACCOUNT_IDS", "(collection)", "object map", "Required", "Hub - Shared", "c360DashboardEx05", ""),
    ("MOCK_ACCOUNT_IDS", "accountName → salesforceId", "Id", "Required", "Hub - Shared", "c360DashboardEx05", ""),
    # Material banner
    ("MaterialChangeBanner", "message", "string", "Required", "Hub - Overview", "c360MaterialBannerEx05", ""),
    ("MaterialChangeBanner", "accountsMovedToAtRisk", "integer", "Optional", "Hub - Overview", "c360MaterialBannerEx05", ""),
    ("MaterialChangeBanner", "newChurnSignals", "integer", "Optional", "Hub - Overview", "c360MaterialBannerEx05", ""),
    ("MaterialChangeBanner", "crossSellPipelineDelta", "Money", "Optional", "Hub - Overview", "c360MaterialBannerEx05", ""),
    # KPI tiles
    ("KPI_TILES", "(collection)", "KpiTile[]", "Required", "Hub - Overview", "c360KpiStripEx05", ""),
    ("KpiTile", "label", "string", "Required", "Hub - Overview", "c360KpiTileEx05", ""),
    ("KpiTile", "value", "string", "Required", "Hub - Overview", "c360KpiTileEx05", ""),
    ("KpiTile", "detail", "string", "Optional", "Hub - Overview", "c360KpiTileEx05", ""),
    ("KpiTile", "attention", "boolean", "Optional", "Hub - Overview", "c360KpiTileEx05", ""),
    ("KpiTile", "variant", "enum (default|attention)", "Optional", "Hub - Overview", "c360KpiTileEx05", ""),
    ("PortfolioSummary", "totalAccounts", "integer", "Required", "Hub - Overview", "c360KpiStripEx05", ""),
    ("PortfolioSummary", "compositeHealthIndex", "decimal", "Required", "Hub - Overview", "c360KpiStripEx05", ""),
    ("PortfolioSummary", "healthIndexDelta", "decimal", "Optional", "Hub - Overview", "c360KpiStripEx05", ""),
    ("PortfolioSummary", "signalsToAction", "integer", "Required", "Hub - Overview", "c360KpiStripEx05", ""),
    ("PortfolioSummary", "signalsChurnCount", "integer", "Optional", "Hub - Overview", "c360KpiStripEx05", ""),
    ("PortfolioSummary", "signalsCrossSellCount", "integer", "Optional", "Hub - Overview", "c360KpiStripEx05", ""),
    ("PortfolioSummary", "atRiskAccounts", "integer", "Required", "Hub - Overview", "c360KpiStripEx05", ""),
    ("PortfolioSummary", "revenueAtRisk", "Money|string", "Required", "Hub - Overview", "c360KpiStripEx05", ""),
    ("PortfolioSummary", "revenueAtRiskDelta", "decimal", "Optional", "Hub - Overview", "c360KpiStripEx05", ""),
    # Needs action
    ("NEEDS_ACTION_ITEMS", "(collection)", "NeedsActionItem[]", "Required", "Hub - Overview", "c360NeedsActionEx05", ""),
    ("NeedsActionItem", "id", "string", "Required", "Hub - Overview", "c360NeedsActionEx05", ""),
    ("NeedsActionItem", "severity", "enum (now|day|month)", "Required", "Hub - Overview", "c360NeedsActionEx05", ""),
    ("NeedsActionItem", "severityLabel", "string", "Required", "Hub - Overview", "c360NeedsActionEx05", ""),
    ("NeedsActionItem", "heading", "string", "Required", "Hub - Overview", "c360NeedsActionEx05", ""),
    ("NeedsActionItem", "body", "string", "Required", "Hub - Overview", "c360NeedsActionEx05", ""),
    ("NeedsActionItem", "meta", "string", "Optional", "Hub - Overview", "c360NeedsActionEx05", ""),
    ("NeedsActionItem", "accountId", "Id", "Required (prod)", "Hub - Overview", "c360NeedsActionEx05", ""),
    ("NeedsActionItem", "accountName", "string", "Required", "Hub - Overview", "c360NeedsActionEx05", ""),
    ("NeedsActionItem", "buttonLabel", "string", "Optional", "Hub - Overview", "c360NeedsActionEx05", ""),
    ("NeedsActionItem", "primary", "boolean", "Optional", "Hub - Overview", "c360NeedsActionEx05", ""),
    ("NeedsActionItem", "sourceView", "enum (accounts|churn|crosssell)", "Optional", "Hub - Overview", "c360NeedsActionEx05", ""),
    # Portfolio health
    ("PORTFOLIO_HEALTH", "(collection)", "PortfolioHealth", "Required", "Hub - Overview", "c360PortfolioHealthEx05", ""),
    ("PortfolioHealth", "healthy", "integer", "Required", "Hub - Overview", "c360PortfolioHealthEx05", ""),
    ("PortfolioHealth", "watch", "integer", "Required", "Hub - Overview", "c360PortfolioHealthEx05", ""),
    ("PortfolioHealth", "atRisk", "integer", "Required", "Hub - Overview", "c360PortfolioHealthEx05", ""),
    ("PortfolioHealth", "pipeline", "PipelineBar[]", "Required", "Hub - Overview", "c360PortfolioHealthEx05", ""),
    ("PipelineBar", "name", "string", "Required", "Hub - Overview", "c360PortfolioHealthEx05", ""),
    ("PipelineBar", "detail", "string", "Optional", "Hub - Overview", "c360PortfolioHealthEx05", ""),
    ("PipelineBar", "value", "Money|string", "Required", "Hub - Overview", "c360PortfolioHealthEx05", ""),
    ("PipelineBar", "width", "string", "Optional", "Hub - Overview", "c360PortfolioHealthEx05", ""),
    ("PipelineBar", "productCode", "string", "Optional", "Hub - Overview", "c360PortfolioHealthEx05", ""),
    ("PipelineBar", "opportunityCount", "integer", "Optional", "Hub - Overview", "c360PortfolioHealthEx05", ""),
    # Signals
    ("SIGNALS", "(collection)", "Signal[]", "Required", "Hub - Overview", "c360MySignalsEx05", ""),
    ("Signal", "id", "string", "Required", "Hub - Overview", "c360SignalListEx05", ""),
    ("Signal", "category", "enum (Cross-sell|Churn|FX)", "Required", "Hub - Overview", "c360SignalListEx05", ""),
    ("Signal", "badgeClass", "string", "Optional", "Hub - Overview", "c360SignalListEx05", ""),
    ("Signal", "title", "string", "Required", "Hub - Overview", "c360SignalListEx05", ""),
    ("Signal", "description", "string", "Required", "Hub - Overview", "c360SignalListEx05", ""),
    ("Signal", "signalStatus", "enum (open|actioned|dismissed)", "Required", "Hub - Overview", "c360SignalListEx05", ""),
    ("Signal", "accountId", "Id", "Optional", "Hub - Overview", "c360SignalListEx05", ""),
    ("Signal", "accountName", "string", "Optional", "Hub - Overview", "c360SignalListEx05", ""),
    ("Signal", "severity", "enum", "Optional", "Hub - Overview", "c360SignalListEx05", ""),
    ("Signal", "impactRevenue", "Money", "Optional", "Hub - Overview", "c360SignalListEx05", ""),
    ("Signal", "triggeredAt", "datetime", "Optional", "Hub - Overview", "c360SignalListEx05", ""),
    # Accounts table
    ("ACCOUNTS", "(collection)", "Account[]", "Required", "Hub - Overview", "c360AccountsTableEx05", ""),
    ("Account", "id", "string", "Required", "Hub - Overview", "c360AccountsTableEx05", ""),
    ("Account", "salesforceId", "Id", "Required (prod)", "Hub - Overview", "c360AccountsTableEx05", ""),
    ("Account", "name", "string", "Required", "Hub - Overview", "c360AccountsTableEx05", ""),
    ("Account", "industry", "string", "Required", "Hub - Overview", "c360AccountsTableEx05", ""),
    ("Account", "volume", "string", "Required", "Hub - Overview", "c360AccountsTableEx05", ""),
    ("Account", "healthIndex", "decimal", "Required", "Hub - Overview", "c360AccountsTableEx05", ""),
    ("Account", "healthDelta", "string", "Required", "Hub - Overview", "c360AccountsTableEx05", ""),
    ("Account", "health", "enum (Healthy|Watch|At risk)", "Required", "Hub - Overview", "c360AccountsTableEx05", ""),
    ("Account", "healthClass", "string", "Optional", "Hub - Overview", "c360AccountsTableEx05", ""),
    ("Account", "risk", "enum (Low|Medium|High)", "Required", "Hub - Overview", "c360AccountsTableEx05", ""),
    ("Account", "riskClass", "string", "Optional", "Hub - Overview", "c360AccountsTableEx05", ""),
    ("Account", "crossSell", "string", "Optional", "Hub - Overview", "c360AccountsTableEx05", ""),
    ("Account", "lastActivityAt", "datetime", "Optional", "Hub - Overview", "c360AccountsTableEx05", ""),
    # Alert centre
    ("ALERTS", "(collection)", "Alert[]", "Required", "Hub - Alert Centre", "c360AlertCentreEx05", ""),
    ("Alert", "id", "string", "Required", "Hub - Alert Centre", "c360AlertCentreEx05", ""),
    ("Alert", "accountId", "Id", "Required (prod)", "Hub - Alert Centre", "c360AlertCentreEx05", ""),
    ("Alert", "account", "string", "Required", "Hub - Alert Centre", "c360AlertCentreEx05", ""),
    ("Alert", "score", "decimal", "Required", "Hub - Alert Centre", "c360AlertCentreEx05", ""),
    ("Alert", "alertDate", "date|string", "Required", "Hub - Alert Centre", "c360AlertCentreEx05", ""),
    ("Alert", "suppression", "string", "Required", "Hub - Alert Centre", "c360AlertCentreEx05", ""),
    ("Alert", "rmNotification", "string", "Required", "Hub - Alert Centre", "c360AlertCentreEx05", ""),
    ("Alert", "email", "string", "Optional", "Hub - Alert Centre", "c360AlertCentreEx05", ""),
    ("Alert", "status", "enum", "Required", "Hub - Alert Centre", "c360AlertCentreEx05", ""),
    ("Alert", "severity", "enum", "Optional", "Hub - Alert Centre", "c360AlertCentreEx05", ""),
    ("Alert", "revenueAtRisk", "Money|string", "Optional", "Hub - Alert Centre", "c360AlertCentreEx05", ""),
    ("ALERT_STATUS_OPTIONS", "(collection)", "string[]", "Optional", "Hub - Alert Centre", "c360AlertCentreEx05", ""),
    ("ALERT_INTEL", "(collection)", "object map", "Required", "Hub - Alert Centre", "c360AlertCentreEx05", ""),
    ("CrossSellIntelligencePanel", "pipelineValue", "Money", "Required", "Hub - Alert Centre", "c360AlertCentreEx05", ""),
    ("CrossSellIntelligencePanel", "averageConfidence", "decimal", "Required", "Hub - Alert Centre", "c360AlertCentreEx05", ""),
    ("CrossSellIntelligencePanel", "opportunities", "CrossSellIntelRow[]", "Required", "Hub - Alert Centre", "c360AlertCentreEx05", ""),
    ("CrossSellIntelRow", "accountName", "string", "Required", "Hub - Alert Centre", "c360AlertCentreEx05", ""),
    ("CrossSellIntelRow", "suggestedProduct", "string", "Required", "Hub - Alert Centre", "c360AlertCentreEx05", ""),
    ("CrossSellIntelRow", "confidencePercent", "decimal", "Required", "Hub - Alert Centre", "c360AlertCentreEx05", ""),
    # Alert detail
    ("ALERT_DETAIL_BY_ID", "(collection)", "object map", "Required", "Hub - Alert Detail", "c360AlertDetailEx05", ""),
    ("AlertDetail", "id", "string", "Required", "Hub - Alert Detail", "c360AlertDetailEx05", ""),
    ("AlertDetail", "accountId", "Id", "Required (prod)", "Hub - Alert Detail", "c360AlertDetailEx05", ""),
    ("AlertDetail", "account", "string", "Required", "Hub - Alert Detail", "c360AlertDetailEx05", ""),
    ("AlertDetail", "score", "decimal", "Required", "Hub - Alert Detail", "c360AlertDetailEx05", ""),
    ("AlertDetail", "arr", "Money|string", "Required", "Hub - Alert Detail", "c360AlertDetailEx05", ""),
    ("AlertDetail", "merchantCount", "integer", "Required", "Hub - Alert Detail", "c360AlertDetailEx05", ""),
    ("AlertDetail", "trajectory", "decimal[]", "Required", "Hub - Alert Detail", "c360AlertDetailEx05", ""),
    ("AlertDetail", "drivers", "Driver[]", "Required", "Hub - Alert Detail", "c360AlertDetailEx05", ""),
    ("Driver", "label", "string", "Required", "Hub - Alert Detail", "c360AlertDetailEx05", ""),
    ("Driver", "impact", "string", "Required", "Hub - Alert Detail", "c360AlertDetailEx05", ""),
    ("Driver", "width", "string", "Optional", "Hub - Alert Detail", "c360AlertDetailEx05", ""),
    ("AlertCrossSellIntel", "pipeline", "Money|string", "Required", "Hub - Alert Detail", "c360AlertDetailEx05", ""),
    ("AlertCrossSellIntel", "confidence", "decimal", "Required", "Hub - Alert Detail", "c360AlertDetailEx05", ""),
    ("AlertCrossSellIntel", "products", "string[]", "Required", "Hub - Alert Detail", "c360AlertDetailEx05", ""),
    ("AlertOutcome", "interactionDate", "date", "Required (write)", "Hub - Alert Detail", "c360AlertDetailEx05", ""),
    ("AlertOutcome", "interactionType", "enum", "Required (write)", "Hub - Alert Detail", "c360AlertDetailEx05", ""),
    ("AlertOutcome", "outcome", "enum", "Required (write)", "Hub - Alert Detail", "c360AlertDetailEx05", ""),
    ("AlertOutcome", "followUpActions", "string", "Optional (write)", "Hub - Alert Detail", "c360AlertDetailEx05", ""),
    # Cross-sell table
    ("CROSS_SELL_ROWS", "(collection)", "CrossSellOpportunity[]", "Required", "Hub - Cross-Sell", "c360CrossSellTableEx05", ""),
    ("CrossSellOpportunity", "accountId", "Id", "Required (prod)", "Hub - Cross-Sell", "c360CrossSellTableEx05", ""),
    ("CrossSellOpportunity", "account", "string", "Required", "Hub - Cross-Sell", "c360CrossSellTableEx05", ""),
    ("CrossSellOpportunity", "product", "string", "Required", "Hub - Cross-Sell", "c360CrossSellTableEx05", ""),
    ("CrossSellOpportunity", "propensity", "enum (High|Medium|Low)", "Required", "Hub - Cross-Sell", "c360CrossSellTableEx05", ""),
    ("CrossSellOpportunity", "propensityClass", "string", "Optional", "Hub - Cross-Sell", "c360CrossSellTableEx05", ""),
    ("CrossSellOpportunity", "uplift", "Money|string", "Required", "Hub - Cross-Sell", "c360CrossSellTableEx05", ""),
    ("CrossSellOpportunity", "driver", "string", "Required", "Hub - Cross-Sell", "c360CrossSellTableEx05", ""),
    # Churn table
    ("CHURN_ROWS", "(collection)", "ChurnRiskRow[]", "Required", "Hub - Churn", "c360ChurnTableEx05", ""),
    ("ChurnRiskRow", "accountId", "Id", "Required (prod)", "Hub - Churn", "c360ChurnTableEx05", ""),
    ("ChurnRiskRow", "account", "string", "Required", "Hub - Churn", "c360ChurnTableEx05", ""),
    ("ChurnRiskRow", "risk", "enum (High|Medium|Low)", "Required", "Hub - Churn", "c360ChurnTableEx05", ""),
    ("ChurnRiskRow", "riskClass", "string", "Optional", "Hub - Churn", "c360ChurnTableEx05", ""),
    ("ChurnRiskRow", "txnChange", "string", "Required", "Hub - Churn", "c360ChurnTableEx05", ""),
    ("ChurnRiskRow", "driver", "string", "Required", "Hub - Churn", "c360ChurnTableEx05", ""),
    ("ChurnRiskRow", "churnScore", "decimal", "Optional", "Hub - Churn", "c360ChurnTableEx05", ""),
    # Account record page wrapper
    ("AccountSpotlight", "recordId", "Id", "Required", "Account Record Page", "c360AccountEx05", ""),
    ("AccountSpotlight", "prefetchedData", "object", "Optional", "Account Record Page", "c360AccountEx05", ""),
    ("AccountSpotlight", "sourceView", "enum (accounts|churn|crosssell)", "Optional", "Account Record Page", "c360AccountEx05", ""),
    ("AccountDetailInput", "account", "Account", "Required", "Account Record Page", "c360AccountDetailEx05", ""),
    ("AccountDetailInput", "sourceView", "enum (accounts|churn|crosssell)", "Optional", "Account Record Page", "c360AccountDetailEx05", ""),
    # Account detail root
    ("ACCOUNT_DETAIL", "(collection)", "object map", "Required", "Account Record Page", "c360AccountDetailEx05", ""),
    ("AccountDetail", "accountId", "string", "Required", "Account Record Page", "c360AccountDetailEx05", ""),
    ("AccountDetail", "merchantCount", "integer", "Required", "Account Record Page", "c360AccountDetailEx05", ""),
    ("AccountDetail", "market", "string", "Required", "Account Record Page", "c360AccountDetailEx05", ""),
    ("AccountDetail", "churnScore", "number", "Required", "Account Record Page - Churn tab", "c360AccountDetailEx05", ""),
    ("AccountDetail", "churnScorePct", "string", "Required", "Account Record Page - Churn tab", "c360AccountDetailEx05", ""),
    ("AccountDetail", "txnTrend1m", "string", "Optional (not rendered)", "Account Record Page - Churn tab", "c360AccountDetailEx05", ""),
    ("AccountDetail", "txnTrend3m", "string", "Required", "Account Record Page - Churn tab", "c360AccountDetailEx05", ""),
    ("AccountDetail", "txnTrend6m", "string", "Required", "Account Record Page - Churn tab", "c360AccountDetailEx05", ""),
    ("AccountDetail", "positiveDrivers", "DriverRow[]", "Required", "Account Record Page - Churn tab", "c360AccountDetailEx05", ""),
    ("AccountDetail", "negativeDrivers", "DriverRow[]", "Required", "Account Record Page - Churn tab", "c360AccountDetailEx05", ""),
    ("AccountDetail", "driverDrilldown", "object map", "Required", "Account Record Page - Churn tab", "c360AccountDetailEx05", ""),
    ("AccountDetail", "mids", "MidRow[]", "Required", "Account Record Page - Churn tab", "c360AccountDetailEx05", ""),
    ("AccountDetail", "crossSell", "CrossSellDetail", "Required", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("DriverRow", "name", "string", "Required", "Account Record Page - Churn tab", "c360AccountDetailEx05", ""),
    ("DriverRow", "value", "string", "Required", "Account Record Page - Churn tab", "c360AccountDetailEx05", ""),
    # normalizeDriverDrilldown() reshapes the seed rows into {id, value} before render
    ("DrilldownRow", "id", "string (seed: humanCustomerId)", "Required", "Account Record Page - Churn tab", "c360AccountDetailEx05", ""),
    ("DrilldownRow", "value", "string (seed: driver metric)", "Required", "Account Record Page - Churn tab", "c360AccountDetailEx05", ""),
    ("MidRow", "id", "string", "Required", "Account Record Page - Churn tab", "c360AccountDetailEx05", ""),
    ("MidRow", "name", "string", "Required", "Account Record Page - Churn tab", "c360AccountDetailEx05", ""),
    ("MidRow", "negName", "string", "Required", "Account Record Page - Churn tab", "c360AccountDetailEx05", ""),
    ("MidRow", "negValue", "string", "Required", "Account Record Page - Churn tab", "c360AccountDetailEx05", ""),
    ("MidRow", "posName", "string", "Required", "Account Record Page - Churn tab", "c360AccountDetailEx05", ""),
    ("MidRow", "posValue", "string", "Required", "Account Record Page - Churn tab", "c360AccountDetailEx05", ""),
    ("CrossSellDetail", "likelihoodToAcquire", "enum", "Required", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("CrossSellDetail", "peerSegmentId", "string", "Required", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("CrossSellDetail", "summary", "CrossSellSummary", "Required", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("CrossSellDetail", "schemeInterchangeBenefit", "number", "Required", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("CrossSellDetail", "declineCodes", "DeclineCode[]", "Required", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("CrossSellSummary", "netBenefit", "number", "Required", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("CrossSellSummary", "grossUplift", "number", "Required", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("CrossSellSummary", "inScopeTransactions", "integer", "Required", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("CrossSellSummary", "declineCodeList", "string", "Required", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("CrossSellSummary", "merchantApprovalRate", "string", "Required", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("CrossSellSummary", "peerApprovalRate", "string", "Required", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("CrossSellSummary", "merchantVsPeer", "string", "Required", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("CrossSellSummary", "recoverableSplitMerchant", "string", "Required", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("CrossSellSummary", "recoverableSplitPeer", "string", "Required", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("CrossSellSummary", "valueOfDeclines", "string", "Required", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("CrossSellSummary", "countDeclines", "string", "Required", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("CrossSellSummary", "cost", "number", "Optional", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("CrossSellSummary", "tokenisationImpact", "number", "Optional", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("CrossSellSummary", "inScopeVolume", "number", "Optional", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("DeclineCode", "code", "string", "Required", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("DeclineCode", "name", "string", "Required", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("DeclineCode", "volume", "string", "Required", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("DeclineCode", "count", "string", "Required", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("DeclineCode", "countNum", "integer", "Required", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("DeclineCode", "color", "string", "Required", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("DeclineCode", "shareMerchant", "string", "Required", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("DeclineCode", "sharePeer", "string", "Optional", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("DeclineCode", "curable", "enum (Y|N)", "Required", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("DeclineCode", "curePct", "string", "Required", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("DeclineCode", "eligible", "string", "Required", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("DeclineCode", "recoveredRevenue", "string", "Required", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("BASE_PRICE_PER_TXN", "(constant)", "number", "Required", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    ("DECLINE_CHART_COLORS", "(constant)", "string[]", "Optional", "Account Record Page - Cross-sell tab", "c360AccountDetailEx05", ""),
    # Dashboard orchestrator state
    ("DashboardState", "activeView", "enum", "Required", "Hub - Shared", "c360DashboardEx05", ""),
    ("DashboardState", "selectedAlertId", "string", "Required", "Hub - Alert Detail", "c360DashboardEx05", ""),
    ("DashboardState", "selectedAccount", "Account", "Required", "Hub - Account inline", "c360DashboardEx05", ""),
    ("DashboardState", "accountSourceView", "enum (accounts|churn|crosssell)", "Required", "Hub - Account inline", "c360DashboardEx05", ""),
    ("DashboardState", "accountSubTab", "enum (ch|cx)", "Required", "Hub - Account inline", "c360DashboardEx05", ""),
    ("DashboardState", "signals", "Signal[]", "Required", "Hub - Overview", "c360DashboardEx05", ""),
    ("DashboardState", "alertStatusFilter", "string", "Required", "Hub - Alert Centre", "c360DashboardEx05", ""),
]

DEPRECATED_ROWS = [
    ("Signal", "pathway", "string", "Deprecated", "Hub - Overview (v5 removed)", "c360SignalListEx05", ""),
    ("Signal", "isOpen", "boolean", "Deprecated", "Hub - Overview (v5 removed)", "c360SignalListEx05", ""),
    ("Alert", "threshold", "decimal", "Deprecated", "Hub - Alert Centre (v5 removed)", "c360AlertCentreEx05", ""),
    ("Alert", "rmTask", "string", "Deprecated", "Hub - Alert Centre (v5 removed)", "c360AlertCentreEx05", ""),
    ("ChurnRiskRow", "pathway", "string", "Deprecated", "Hub - Churn (v5 removed)", "c360ChurnTableEx05", ""),
    ("AccountDetail", "authRate", "string", "Deprecated", "Account Record Page - Overview tab (v5 removed)", "c360AccountDetailEx05", ""),
    ("CrossSellDetail", "slices", "SliceRow[]", "Deprecated", "Account Record Page - Cross-sell tab (v5 removed)", "c360AccountDetailEx05", ""),
    ("CrossSellDetail", "productDrivers", "ProductDriver[]", "Deprecated", "Account Record Page - Cross-sell tab (v5 removed)", "c360AccountDetailEx05", ""),
    ("PipelineBar", "name", "FraudSight", "Deprecated", "Hub - Overview (v5 removed)", "c360PortfolioHealthEx05", ""),
    ("PATHWAYS", "(collection)", "Pathway[]", "Deprecated", "Hub - Pathways (removed)", "c360PathwaysTableEx05", ""),
    ("Pathway", "id", "string", "Deprecated", "Hub - Pathways (removed)", "c360PathwaysTableEx05", ""),
    ("Pathway", "account", "string", "Deprecated", "Hub - Pathways (removed)", "c360PathwaysTableEx05", ""),
    ("Pathway", "name", "string", "Deprecated", "Hub - Pathways (removed)", "c360PathwaysTableEx05", ""),
    ("Pathway", "stage", "string", "Deprecated", "Hub - Pathways (removed)", "c360PathwaysTableEx05", ""),
    ("Pathway", "owner", "string", "Deprecated", "Hub - Pathways (removed)", "c360PathwaysTableEx05", ""),
    ("Pathway", "date", "date|string", "Deprecated", "Hub - Pathways (removed)", "c360PathwaysTableEx05", ""),
    ("Pathway", "status", "enum", "Deprecated", "Hub - Pathways (removed)", "c360PathwaysTableEx05", ""),
    ("Pathway", "scope", "enum (me|team)", "Deprecated", "Hub - Pathways (removed)", "c360PathwaysTableEx05", ""),
    ("ExportRequest", "accountId", "Id", "Deprecated", "Hub (removed)", "c360ExportModalEx05", ""),
    ("ExportRequest", "artefacts", "string[]", "Deprecated", "Hub (removed)", "c360ExportModalEx05", ""),
    ("ExportModal", "accountName", "string", "Deprecated", "Hub (removed)", "c360ExportModalEx05", ""),
    # SliceRow orphaned with its parent CrossSellDetail.slices - no getter consumes it
    ("SliceRow", "credential", "string", "Deprecated", "Account Record Page - Cross-sell tab (v5 removed)", "c360AccountDetailEx05", ""),
    ("SliceRow", "channel", "string", "Deprecated", "Account Record Page - Cross-sell tab (v5 removed)", "c360AccountDetailEx05", ""),
    ("SliceRow", "scheme", "string", "Deprecated", "Account Record Page - Cross-sell tab (v5 removed)", "c360AccountDetailEx05", ""),
    ("SliceRow", "market", "string", "Deprecated", "Account Record Page - Cross-sell tab (v5 removed)", "c360AccountDetailEx05", ""),
    ("SliceRow", "volume", "string", "Deprecated", "Account Record Page - Cross-sell tab (v5 removed)", "c360AccountDetailEx05", ""),
    ("SliceRow", "transactions", "string", "Deprecated", "Account Record Page - Cross-sell tab (v5 removed)", "c360AccountDetailEx05", ""),
    ("SliceRow", "approval", "string", "Deprecated", "Account Record Page - Cross-sell tab (v5 removed)", "c360AccountDetailEx05", ""),
    ("SliceRow", "recMerchant", "string", "Deprecated", "Account Record Page - Cross-sell tab (v5 removed)", "c360AccountDetailEx05", ""),
    ("SliceRow", "peerApproval", "string", "Deprecated", "Account Record Page - Cross-sell tab (v5 removed)", "c360AccountDetailEx05", ""),
    ("SliceRow", "recPeer", "string", "Deprecated", "Account Record Page - Cross-sell tab (v5 removed)", "c360AccountDetailEx05", ""),
    # Pre-normalisation seed shape - superseded by DrilldownRow.id / .value
    ("DrilldownRow", "humanCustomerId", "string", "Deprecated", "Account Record Page - Churn tab (pre-normalisation)", "c360AccountDetailEx05", ""),
    ("DrilldownRow", "authRateAvg6m", "string", "Deprecated", "Account Record Page - Churn tab (pre-normalisation)", "c360AccountDetailEx05", ""),
    # Present in c360AccountDetailDataEx05.js but no getter consumes them
    ("AccountDetail", "chargebacks", "string", "Deprecated", "Account Record Page - Overview tab (v5 removed)", "c360AccountDetailEx05", ""),
    ("AccountDetail", "servicing", "string", "Deprecated", "Account Record Page - Overview tab (v5 removed)", "c360AccountDetailEx05", ""),
    ("AccountDetail", "volumeTrend", "string", "Deprecated", "Account Record Page - Overview tab (v5 removed)", "c360AccountDetailEx05", ""),
    ("AccountDetail", "volumeTrendNote", "string", "Deprecated", "Account Record Page - Overview tab (v5 removed)", "c360AccountDetailEx05", ""),
    ("AccountDetail", "authTrend", "string", "Deprecated", "Account Record Page - Overview tab (v5 removed)", "c360AccountDetailEx05", ""),
    ("AccountDetail", "cbTrend", "string", "Deprecated", "Account Record Page - Overview tab (v5 removed)", "c360AccountDetailEx05", ""),
    ("AccountDetail", "servicingNote", "string", "Deprecated", "Account Record Page - Overview tab (v5 removed)", "c360AccountDetailEx05", ""),
    ("Account", "pathways", "integer", "Deprecated", "Hub - Overview (v5 removed)", "c360AccountsTableEx05", ""),
    ("Pathway", "statusClass", "string", "Deprecated", "Hub - Pathways (removed)", "c360PathwaysTableEx05", ""),
]


def write_sheet(ws, rows, title_note=None):
    header_fill = PatternFill("solid", fgColor="1B5297")
    header_font = Font(color="FFFFFF", bold=True)
    for col, header in enumerate(HEADERS, 1):
        cell = ws.cell(row=1, column=col, value=header)
        cell.fill = header_fill
        cell.font = header_font
        cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
    for row_idx, row in enumerate(rows, 2):
        for col_idx, value in enumerate(row, 1):
            ws.cell(row=row_idx, column=col_idx, value=value)
    ws.freeze_panes = "A2"
    ws.auto_filter.ref = f"A1:{get_column_letter(len(HEADERS))}{len(rows) + 1}"
    widths = [22, 28, 24, 16, 28, 34, 32, 36]
    for i, width in enumerate(widths, 1):
        ws.column_dimensions[get_column_letter(i)].width = width
    if title_note:
        ws.cell(row=1, column=len(HEADERS) + 1, value=title_note)


def _is_junk_zip_entry(name: str) -> bool:
    if name in JUNK_EXACT:
        return True
    return any(name.startswith(prefix) for prefix in JUNK_PREFIXES)


def sanitize_xlsx(src: Path, dest: Path) -> int:
    """Rewrite xlsx zip without SharePoint/OneDrive junk entries."""
    removed = 0
    with zipfile.ZipFile(src, "r") as zin, zipfile.ZipFile(dest, "w", zipfile.ZIP_DEFLATED) as zout:
        for info in zin.infolist():
            if _is_junk_zip_entry(info.filename):
                removed += 1
                continue
            zout.writestr(info, zin.read(info.filename))
    return removed


def write_csv(path: Path) -> None:
    active = expand_rows(ROWS)
    deprecated = expand_rows(DEPRECATED_ROWS)
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.writer(handle)
        writer.writerow(HEADERS)
        writer.writerows(active)
        writer.writerow([])
        writer.writerow(["--- Deprecated ---"] + [""] * (len(HEADERS) - 1))
        writer.writerows(deprecated)


def main():
    wb = Workbook()
    active = wb.active
    active.title = "DTO Inventory"
    write_sheet(active, expand_rows(ROWS))

    deprecated = wb.create_sheet("Deprecated")
    write_sheet(deprecated, expand_rows(DEPRECATED_ROWS))

    readme = wb.create_sheet("README")
    readme["A1"] = "C360 Experiment 05 - LWC DTO Inventory"
    readme["A3"] = "Generated from c360MockDataEx05.js, c360AccountDetailDataEx05.js, moduleSpec.md, and data-schema.md"
    readme["A5"] = (
        "Section Title matches on-screen panel headings (h2 / module titles). "
        "Fill Data Source with upstream system/table/API (e.g. Snowflake, Data 360, Salesforce Account, Apex method)."
    )
    readme["A7"] = "Active hub pages: Overview, Alert Centre, Alert Detail, Churn, Cross-Sell."
    readme["A8"] = "Account deep-dives: Account Record Page only (c360AccountEx05 → c360AccountDetailEx05)."
    readme["A10"] = f"Active DTO rows: {len(ROWS)} | Deprecated rows: {len(DEPRECATED_ROWS)}"

    with tempfile.NamedTemporaryFile(suffix=".xlsx", delete=False) as tmp:
        tmp_path = Path(tmp.name)
    try:
        wb.save(tmp_path)
        stripped = sanitize_xlsx(tmp_path, OUTPUT)
        write_csv(OUTPUT_CSV)
    finally:
        tmp_path.unlink(missing_ok=True)

    print(f"Wrote {len(ROWS)} active + {len(DEPRECATED_ROWS)} deprecated rows to {OUTPUT}")
    print(f"Wrote CSV fallback to {OUTPUT_CSV}")
    if stripped:
        print(f"Stripped {stripped} SharePoint/OneDrive junk entries from xlsx")


if __name__ == "__main__":
    main()
