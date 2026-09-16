/**
 * Reference copy of C360CrossSellController — keep in sync with
 * force-app/main/default/classes/C360CrossSellController.cls after org retrieve.
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
