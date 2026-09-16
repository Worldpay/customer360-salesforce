/**
 * App Builder dynamic picklist for c360ConfigurableKpiTile metricKey property.
 */
global with sharing class C360MetricKeyPicklist extends VisualEditor.DynamicPickList {
    global override VisualEditor.DataRow getDefaultValue() {
        return new VisualEditor.DataRow('Total accounts', C360MetricController.DEFAULT_METRIC_KEY);
    }

    global override VisualEditor.DynamicPickListRows getValues() {
        VisualEditor.DynamicPickListRows opts = new VisualEditor.DynamicPickListRows();
        for (C360_Metric_Definition__mdt row : C360MetricController.queryMetricDefinitions()) {
            String label = String.isNotBlank(row.Label__c) ? row.Label__c : row.Metric_Key__c;
            opts.addRow(new VisualEditor.DataRow(label, row.Metric_Key__c));
        }
        return opts;
    }
}
