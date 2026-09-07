/**
 * BR-005 PowerPoint export stub.
 * UI triggers this via imperative Apex; real implementation calls external doc service.
 */
public with sharing class C360ExportController {

    public class ExportRequest {
        @AuraEnabled public Id accountId;
        @AuraEnabled public List<String> artefacts;
    }

    public class ExportResult {
        @AuraEnabled public Boolean success;
        @AuraEnabled public String message;
        @AuraEnabled public String downloadUrl;
    }

    @AuraEnabled
    public static ExportResult generateDeck(ExportRequest request) {
        ExportResult result = new ExportResult();
        result.success = true;
        result.message = 'Export preview: deck generation deferred to external doc service (BR-005 spike).';
        result.downloadUrl = null;
        return result;
    }
}
