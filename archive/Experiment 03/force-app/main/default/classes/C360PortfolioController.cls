/**
 * Mock Apex controller for C360 portfolio and alert data.
 * Returns pre-aggregated DTOs shaped for future Data 360 / Snowflake wiring.
 * Experiment 03 — full greenfield deploy (not org-overlay merge).
 */
public with sharing class C360PortfolioController {

    @AuraEnabled(cacheable=true)
    public static String getPortfolioSummary() {
        Map<String, Object> summary = new Map<String, Object>{
            'accountCount' => 42,
            'healthIndex' => 72.4,
            'signalCount' => 5,
            'pathwayCount' => 7,
            'atRiskCount' => 3,
            'revenueAtRisk' => 'GBP 2.8m',
            'portfolioVolumeLtm' => 'GBP 1.24bn'
        };
        return JSON.serialize(summary);
    }

    @AuraEnabled(cacheable=true)
    public static String getAccounts(Integer pageSize) {
        Integer limitSize = pageSize != null && pageSize > 0 && pageSize <= 50 ? pageSize : 50;
        List<Map<String, Object>> accounts = new List<Map<String, Object>>{
            new Map<String, Object>{ 'id' => 'pets', 'name' => 'Pets at Home', 'industry' => 'Retail', 'volume' => 'GBP 312m', 'health' => 'Watch', 'healthIndex' => 68.2, 'healthDelta' => '-2.1', 'risk' => 'Medium', 'pathways' => 2 },
            new Map<String, Object>{ 'id' => 'willow', 'name' => 'Willow Travel', 'industry' => 'Travel', 'volume' => 'GBP 188m', 'health' => 'At risk', 'healthIndex' => 54.1, 'healthDelta' => '-5.8', 'risk' => 'High', 'pathways' => 1 },
            new Map<String, Object>{ 'id' => 'deep-blue', 'name' => 'Deep Blue Retail', 'industry' => 'Retail', 'volume' => 'GBP 256m', 'health' => 'Watch', 'healthIndex' => 61.7, 'healthDelta' => '-1.4', 'risk' => 'Medium', 'pathways' => 1 },
            new Map<String, Object>{ 'id' => 'northwind', 'name' => 'Northwind Foods', 'industry' => 'Grocery', 'volume' => 'GBP 141m', 'health' => 'Healthy', 'healthIndex' => 82.4, 'healthDelta' => '+1.2', 'risk' => 'Low', 'pathways' => 1 },
            new Map<String, Object>{ 'id' => 'aurora', 'name' => 'Aurora Gaming', 'industry' => 'Gaming', 'volume' => 'GBP 204m', 'health' => 'Healthy', 'healthIndex' => 79.8, 'healthDelta' => '+0.6', 'risk' => 'Low', 'pathways' => 2 },
            new Map<String, Object>{ 'id' => 'acme', 'name' => 'Acme Corporation', 'industry' => 'Enterprise', 'volume' => 'GBP 420m', 'health' => 'Watch', 'healthIndex' => 58.3, 'healthDelta' => '-4.2', 'risk' => 'High', 'pathways' => 3 },
            new Map<String, Object>{ 'id' => 'intech', 'name' => 'InTech Solutions', 'industry' => 'Technology', 'volume' => 'USD 290m', 'health' => 'Healthy', 'healthIndex' => 76.1, 'healthDelta' => '-0.8', 'risk' => 'Low', 'pathways' => 1 }
        };
        while (accounts.size() > limitSize) {
            accounts.remove(accounts.size() - 1);
        }
        return JSON.serialize(accounts);
    }

    @AuraEnabled(cacheable=true)
    public static String getSignals() {
        List<Map<String, Object>> signals = new List<Map<String, Object>>{
            new Map<String, Object>{ 'id' => 'pets-boost', 'category' => 'Cross-sell', 'title' => 'Pets at Home - Revenue Boost', 'isOpen' => true },
            new Map<String, Object>{ 'id' => 'willow-risk', 'category' => 'Churn', 'title' => 'Willow Travel - Volume compression', 'isOpen' => true }
        };
        return JSON.serialize(signals);
    }

    @AuraEnabled(cacheable=true)
    public static String getPathways(String scope) {
        List<Map<String, Object>> pathways = new List<Map<String, Object>>{
            new Map<String, Object>{ 'account' => 'Pets at Home', 'name' => 'Revenue Boost pitch', 'scope' => 'me', 'status' => 'On track' },
            new Map<String, Object>{ 'account' => 'Meridian Retail', 'name' => 'Revenue Boost pitch', 'scope' => 'team', 'status' => 'On track' }
        };
        List<Map<String, Object>> filtered = new List<Map<String, Object>>();
        String filterScope = String.isBlank(scope) ? 'me' : scope;
        for (Map<String, Object> pw : pathways) {
            if (String.valueOf(pw.get('scope')) == filterScope) {
                filtered.add(pw);
            }
        }
        return JSON.serialize(filtered);
    }

    @AuraEnabled(cacheable=true)
    public static String getAlerts(String statusFilter) {
        List<Map<String, Object>> alerts = new List<Map<String, Object>>{
            new Map<String, Object>{ 'id' => 'alert-acme', 'account' => 'Acme Corporation', 'score' => -32, 'threshold' => -25, 'alertDate' => '26 Aug 2026', 'status' => 'New', 'severity' => 'CRITICAL', 'revenueAtRisk' => 'GBP 1.2m' },
            new Map<String, Object>{ 'id' => 'alert-intech', 'account' => 'InTech Solutions', 'score' => -28, 'threshold' => -25, 'alertDate' => '25 Aug 2026', 'status' => 'In Review', 'severity' => 'HIGH', 'revenueAtRisk' => 'USD 890k' },
            new Map<String, Object>{ 'id' => 'alert-willow', 'account' => 'Willow Travel', 'score' => -22, 'threshold' => -25, 'alertDate' => '24 Aug 2026', 'status' => 'Suppressed', 'severity' => 'MEDIUM', 'revenueAtRisk' => 'GBP 640k' },
            new Map<String, Object>{ 'id' => 'alert-pets', 'account' => 'Pets at Home', 'score' => -19, 'threshold' => -25, 'alertDate' => '23 Aug 2026', 'status' => 'Action Scheduled', 'severity' => 'LOW', 'revenueAtRisk' => 'GBP 410k' }
        };
        if (String.isBlank(statusFilter) || statusFilter == 'All') {
            return JSON.serialize(alerts);
        }
        List<Map<String, Object>> filtered = new List<Map<String, Object>>();
        for (Map<String, Object> alert : alerts) {
            if (String.valueOf(alert.get('status')) == statusFilter) {
                filtered.add(alert);
            }
        }
        return JSON.serialize(filtered);
    }

    @AuraEnabled(cacheable=true)
    public static String getAlertDetail(String alertId) {
        Map<String, Object> detail = new Map<String, Object>{
            'id' => 'alert-acme',
            'account' => 'Acme Corporation',
            'score' => -32,
            'arr' => 'GBP 14.2m',
            'merchantCount' => 42
        };
        if (alertId == 'alert-intech') {
            detail = new Map<String, Object>{
                'id' => 'alert-intech',
                'account' => 'InTech Solutions',
                'score' => -28,
                'arr' => 'USD 9.8m',
                'merchantCount' => 28
            };
        }
        return JSON.serialize(detail);
    }

    @AuraEnabled(cacheable=true)
    public static String getAccountSpotlight(Id accountId) {
        Map<String, Object> spotlight = new Map<String, Object>{
            'recordId' => accountId,
            'name' => 'Pets at Home',
            'industry' => 'Retail',
            'volume' => 'GBP 312m',
            'health' => 'Watch',
            'risk' => 'Medium',
            'healthIndex' => 68.2
        };
        return JSON.serialize(spotlight);
    }
}
