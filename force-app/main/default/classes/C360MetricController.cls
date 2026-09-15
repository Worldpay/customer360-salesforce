/**
 * Metric tile values for c360ConfigurableKpiTileEx05 (@wire getMetricTile).
 * Phase 1: reads pilot values from C360_Metric_Definition__mdt.
 */
public with sharing class C360MetricController {
    public class MetricTileDto {
        @AuraEnabled public String label;
        @AuraEnabled public String value;
        @AuraEnabled public String detail;
        @AuraEnabled public String variant;
    }

    @AuraEnabled(cacheable=true)
    public static MetricTileDto getMetricTile(String metricKey) {
        MetricTileDto dto = new MetricTileDto();
        if (String.isBlank(metricKey)) {
            return notConfigured(dto);
        }

        // Future: apply RM / portfolio scope when values move off CMDT.
        List<C360_Metric_Definition__mdt> rows = [
            SELECT Label__c, Value__c, Detail__c, Attention__c
            FROM C360_Metric_Definition__mdt
            WHERE Metric_Key__c = :metricKey
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

    private static MetricTileDto notConfigured(MetricTileDto dto) {
        dto.label = 'Metric';
        dto.value = '—';
        dto.detail = 'Metric not configured';
        dto.variant = 'default';
        return dto;
    }
}
