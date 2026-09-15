/**
 * Cross-sell rows for c360CrossSellTableEx05 (@wire getCrossSellAccounts).
 *
 * Replace this file with the exact sandbox version when available:
 *   sf project retrieve start -m ApexClass:C360CrossSellController
 * (see scripts/retrieveC360CrossSellController.ps1)
 *
 * Placeholder compiles in any org; returns no rows until replaced with org SOQL.
 */
public with sharing class C360CrossSellController {
    public class CrossSellRow {
        @AuraEnabled public String account;
        @AuraEnabled public String product;
        @AuraEnabled public String propensity;
        @AuraEnabled public String propensityClass;
        @AuraEnabled public String uplift;
        @AuraEnabled public String driver;
    }

    @AuraEnabled(cacheable=true)
    public static List<CrossSellRow> getCrossSellAccounts() {
        return new List<CrossSellRow>();
    }
}
