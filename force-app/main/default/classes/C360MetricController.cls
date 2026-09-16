/**
 * Metric tile values for configurable / user KPI tiles (@wire getMetricTile).
 * Phase 1: reads pilot values from C360_Metric_Definition__mdt.
 */
public with sharing class C360MetricController {
    public static final String DEFAULT_METRIC_KEY = 'total_accounts';

    public class MetricTileDto {
        @AuraEnabled public String label;
        @AuraEnabled public String value;
        @AuraEnabled public String detail;
        @AuraEnabled public String variant;
    }

    public class MetricOptionDto {
        @AuraEnabled public String value;
        @AuraEnabled public String label;
    }

    @AuraEnabled(cacheable=true)
    public static MetricTileDto getMetricTile(String metricKey) {
        MetricTileDto dto = new MetricTileDto();
        String resolvedKey = resolveMetricKey(metricKey);
        if (resolvedKey == null) {
            return notConfigured(dto);
        }

        List<C360_Metric_Definition__mdt> rows = [
            SELECT Label__c, Value__c, Detail__c, Attention__c
            FROM C360_Metric_Definition__mdt
            WHERE Metric_Key__c = :resolvedKey
            WITH USER_MODE
            LIMIT 1
        ];

        if (rows.isEmpty()) {
            return notConfigured(dto);
        }

        C360_Metric_Definition__mdt row = rows[0];
        dto.label = row.Label__c;
        dto.value = row.Value__c;
        dto.detail = row.Detail__c;
        dto.variant = row.Attention__c == true ? 'attention' : 'default';
        return dto;
    }

    @AuraEnabled(cacheable=true)
    public static List<MetricOptionDto> getMetricOptions() {
        List<MetricOptionDto> options = new List<MetricOptionDto>();
        for (C360_Metric_Definition__mdt row : queryMetricDefinitions()) {
            MetricOptionDto opt = new MetricOptionDto();
            opt.value = row.Metric_Key__c;
            opt.label = String.isNotBlank(row.Label__c) ? row.Label__c : row.Metric_Key__c;
            options.add(opt);
        }
        return options;
    }

    @AuraEnabled(cacheable=true)
    public static String getUserHomeMetricKey() {
        C360_User_Preferences__c prefs = C360_User_Preferences__c.getInstance();
        String resolved = resolveMetricKey(prefs != null ? prefs.Home_Metric_Key__c : null);
        return resolved != null ? resolved : DEFAULT_METRIC_KEY;
    }

    @AuraEnabled
    public static void saveUserHomeMetricKey(String metricKey) {
        String resolvedKey = resolveMetricKey(metricKey);
        if (resolvedKey == null) {
            throw new AuraHandledException('Invalid metric key.');
        }
        C360_User_Preferences__c prefs = C360_User_Preferences__c.getInstance(UserInfo.getUserId());
        if (prefs == null) {
            prefs = new C360_User_Preferences__c();
            prefs.SetupOwnerId = UserInfo.getUserId();
        }
        prefs.Home_Metric_Key__c = resolvedKey;
        upsert prefs;
    }

    public static List<C360_Metric_Definition__mdt> queryMetricDefinitions() {
        return [
            SELECT Metric_Key__c, Label__c
            FROM C360_Metric_Definition__mdt
            WHERE Metric_Key__c != null
            WITH USER_MODE
            ORDER BY Label__c
        ];
    }

    private static String resolveMetricKey(String metricKey) {
        if (String.isBlank(metricKey)) {
            metricKey = DEFAULT_METRIC_KEY;
        }
        Set<String> validKeys = new Set<String>();
        for (C360_Metric_Definition__mdt row : queryMetricDefinitions()) {
            validKeys.add(row.Metric_Key__c);
        }
        if (validKeys.contains(metricKey)) {
            return metricKey;
        }
        if (validKeys.contains(DEFAULT_METRIC_KEY)) {
            return DEFAULT_METRIC_KEY;
        }
        return validKeys.isEmpty() ? null : validKeys.iterator().next();
    }

    private static MetricTileDto notConfigured(MetricTileDto dto) {
        dto.label = 'Metric';
        dto.value = '—';
        dto.detail = 'Metric not configured';
        dto.variant = 'default';
        return dto;
    }
}
