/** Schema v3 account detail mock DTOs (aligned to C360 Prototype v5). */

var CHURN_SCORE_LABEL = 'Predicted change in transaction count in 3-6 months';

function formatDrillValue(driverValue, index) {
  var value = String(driverValue);
  if (value === 'Yes' || value === 'No') return index % 4 === 0 ? 'No' : 'Yes';
  if (value === 'Rising') return ['Low', 'Medium', 'High', 'Rising'][index % 4];
  if (value.indexOf('days') !== -1) {
    var baseDays = parseInt(value, 10) || 0;
    return Math.max(1, baseDays + (index - 5)) + ' days';
  }
  if (value.indexOf('%') !== -1) {
    var basePct = parseFloat(value) || 0;
    return (Math.round((basePct + (index - 5) * 0.7) * 10) / 10) + '%';
  }
  if (/^\d+$/.test(value)) return String(Math.max(0, parseInt(value, 10) + (index - 5)));
  return value;
}

function expandDrillRows(driverValue, existing, idBase) {
  var rows = [];
  for (var i = 0; i < 10; i++) {
    var source = existing && existing[i];
    rows.push({
      id: (source && (source.id || source.humanCustomerId)) || ('HC-' + idBase + String(i + 1).padStart(3, '0')),
      value: i === 0 ? String(driverValue) : formatDrillValue(driverValue, i)
    });
  }
  return rows;
}

function normalizeDriverDrilldown(detail, accountSeed) {
  var drill = {};
  var drivers = (detail.positiveDrivers || []).concat(detail.negativeDrivers || []);
  drivers.forEach(function (driver, index) {
    var existing = detail.driverDrilldown && detail.driverDrilldown[driver.name];
    drill[driver.name] = expandDrillRows(driver.value, existing, accountSeed + index * 10);
  });
  return drill;
}

var ACCOUNT_DETAIL = {
    'Pets at Home': {
      accountId: '1',
      merchantCount: 18,
      market: 'GBR',
      authRate: '81.2%',
      chargebacks: '0.41%',
      servicing: '2',
      volumeTrend: '-6%',
      volumeTrendNote: 'QoQ decline',
      authTrend: 'In range',
      cbTrend: 'Below threshold',
      servicingNote: 'open tickets',
      churnScore: 0.3,
      churnScorePct: '30%',
      txnTrend1m: '-4%',
      txnTrend3m: '-18%',
      txnTrend6m: '-32%',
      positiveDrivers: [
        { name: 'Authorisation rate', value: '94.2%' },
        { name: 'Pricing review completed flag', value: 'Yes' },
        { name: 'NPS / CSAT / OSAT score', value: '72' }
      ],
      negativeDrivers: [
        { name: 'Pricing adjustment count (in past 1-3 months)', value: '4' },
        { name: 'Transaction decline percentage (in past 3-6 months)', value: '-18%' },
        { name: 'Dispute rate', value: '0.82%' }
      ],
      driverDrilldown: {
        'Authorisation rate': [
          { humanCustomerId: 'HC-100234', authRateAvg6m: '94.2%' },
          { humanCustomerId: 'HC-100235', authRateAvg6m: '91.8%' },
          { humanCustomerId: 'HC-100236', authRateAvg6m: '89.4%' }
        ],
        'Pricing adjustment count (in past 1-3 months)': [
          { humanCustomerId: 'HC-100234', authRateAvg6m: '94.2%' },
          { humanCustomerId: 'HC-100237', authRateAvg6m: '87.1%' }
        ],
        'Transaction decline percentage (in past 3-6 months)': [
          { humanCustomerId: 'HC-100238', authRateAvg6m: '82.6%' },
          { humanCustomerId: 'HC-100239', authRateAvg6m: '79.3%' },
          { humanCustomerId: 'HC-100240', authRateAvg6m: '76.8%' }
        ],
        'Dispute rate': [
          { humanCustomerId: 'HC-100241', authRateAvg6m: '88.5%' }
        ],
        'Pricing review completed flag': [
          { humanCustomerId: 'HC-100234', authRateAvg6m: '94.2%' }
        ],
        'NPS / CSAT / OSAT score': [
          { humanCustomerId: 'HC-100242', authRateAvg6m: '93.1%' },
          { humanCustomerId: 'HC-100243', authRateAvg6m: '90.7%' }
        ]
      },
      mids: [
        { id: '123', name: 'ABC', negName: 'Transaction decline percentage (in past 3-6 months)', negValue: '-18%', posName: 'Authorisation rate', posValue: '94.2%' },
        { id: '456', name: 'DEF', negName: 'Transaction decline percentage (in past 3-6 months)', negValue: '-20%', posName: 'Authorisation rate', posValue: '88.1%' },
        { id: '789', name: 'XYZ', negName: 'Transaction decline percentage (in past 3-6 months)', negValue: '-32%', posName: 'NPS / CSAT / OSAT score', posValue: '81' }
      ],
      crossSell: {
        likelihoodToAcquire: 'High',
        peerSegmentId: 'PS-GBR-RET',
        summary: {
          netBenefit: 187500,
          cost: 62000,
          tokenisationImpact: 14500,
          grossUplift: 312000,
          inScopeVolume: 4850000,
          inScopeTransactions: 97000,
          declineCodeList: '05, 51, 54, 82, N7, 608',
          merchantApprovalRate: '81.2%',
          peerApprovalRate: '84.7%',
          merchantVsPeer: '-3.50%',
          recoverableSplitMerchant: '34%',
          recoverableSplitPeer: '29%',
          valueOfDeclines: '$0.84M',
          countDeclines: '12K'
        },
        slices: [
          { credential: 'MIT', channel: 'CNP', scheme: 'Visa', market: 'GBR', volume: '$1.42M', transactions: '28,400', approval: '80.9%', recMerchant: '3.6%', peerApproval: '85.1%', recPeer: '3.1%' },
          { credential: 'CIT', channel: 'CNP', scheme: 'Visa', market: 'GBR', volume: '$980K', transactions: '19,600', approval: '82.1%', recMerchant: '2.8%', peerApproval: '83.9%', recPeer: '2.7%' }
        ],
        declineCodes: [
          { code: '54', name: 'Expired card', volume: '$842K', count: '12,450', countNum: 12450, color: '#dd7a01', shareMerchant: '38%', sharePeer: '29%', curable: 'Y', curePct: '10%', eligible: 'Yes', recoveredRevenue: '$84K' },
          { code: '51', name: 'Insufficient funds', volume: '$616K', count: '9,820', countNum: 9820, color: '#ba0517', shareMerchant: '27%', sharePeer: '31%', curable: 'N', curePct: '—', eligible: 'No', recoveredRevenue: '—' },
          { code: '05', name: 'Do not honour', volume: '$478K', count: '7,310', countNum: 7310, color: '#0176d3', shareMerchant: '21%', sharePeer: '24%', curable: 'N', curePct: '—', eligible: 'No', recoveredRevenue: '—' }
        ],
        schemeInterchangeBenefit: 42000,
        productDrivers: [
          { label: 'High do-not-honour / 05 declines', sub: 'recoverable via intelligent routing', pct: '41%', width: '84%' },
          { label: 'Non-MIT scheme fees', sub: 'recurring transactions mis-flagged', pct: '27%', width: '58%' },
          { label: 'Ageing card data (MAU)', sub: 'expired-card declines suitable for Account Updater', pct: '19%', width: '44%' }
        ]
      }
    },
    'Willow Travel': {
      accountId: '2',
      merchantCount: 12,
      market: 'GBR',
      authRate: '78.4%',
      chargebacks: '0.52%',
      servicing: '4',
      volumeTrend: '-18%',
      volumeTrendNote: '60-day compression',
      authTrend: 'Below peer',
      cbTrend: 'Watch',
      servicingNote: 'open tickets',
      churnScore: 0.5,
      churnScorePct: '50%',
      txnTrend1m: '-8%',
      txnTrend3m: '-32%',
      txnTrend6m: '-41%',
      positiveDrivers: [
        { name: 'Authorisation rate', value: '88.1%' },
        { name: 'Product count', value: '3' },
        { name: 'Pricing review completed flag', value: 'Yes' }
      ],
      negativeDrivers: [
        { name: 'Pricing adjustment count (in past 1-3 months)', value: '7' },
        { name: 'Transaction decline (in past 3-6 months)', value: '-32%' },
        { name: 'Complaint resolution time', value: '14 days' }
      ],
      driverDrilldown: {
        'Authorisation rate': [
          { humanCustomerId: 'HC-200114', authRateAvg6m: '88.1%' },
          { humanCustomerId: 'HC-200115', authRateAvg6m: '85.4%' }
        ],
        'Transaction decline (in past 3-6 months)': [
          { humanCustomerId: 'HC-200116', authRateAvg6m: '74.2%' },
          { humanCustomerId: 'HC-200117', authRateAvg6m: '71.8%' }
        ],
        'Pricing adjustment count (in past 1-3 months)': [
          { humanCustomerId: 'HC-200118', authRateAvg6m: '83.6%' }
        ],
        'Complaint resolution time': [
          { humanCustomerId: 'HC-200119', authRateAvg6m: '80.9%' }
        ],
        'Product count': [
          { humanCustomerId: 'HC-200120', authRateAvg6m: '86.7%' }
        ],
        'Pricing review completed flag': [
          { humanCustomerId: 'HC-200121', authRateAvg6m: '89.2%' }
        ]
      },
      mids: [
        { id: '201', name: 'Willow UK', negName: 'Transaction decline (in past 3-6 months)', negValue: '-32%', posName: 'Product count', posValue: '3' },
        { id: '202', name: 'Willow BR', negName: 'Pricing adjustment count (in past 1-3 months)', negValue: '7', posName: 'Authorisation rate', posValue: '88.1%' }
      ],
      crossSell: {
        likelihoodToAcquire: 'Medium',
        peerSegmentId: 'PS-GBR-TRV',
        summary: {
          netBenefit: 94000,
          cost: 41000,
          tokenisationImpact: 0,
          grossUplift: 158000,
          inScopeVolume: 2210000,
          inScopeTransactions: 28000,
          declineCodeList: '05, 51, 54, 14, 65',
          merchantApprovalRate: '77.6%',
          peerApprovalRate: '80.1%',
          merchantVsPeer: '-2.50%',
          recoverableSplitMerchant: '41%',
          recoverableSplitPeer: '33%',
          valueOfDeclines: '$0.52M',
          countDeclines: '8K'
        },
        slices: [
          { credential: 'MIT', channel: 'CNP', scheme: 'Visa', market: 'GBR', volume: '$620K', transactions: '12,400', approval: '77.1%', recMerchant: '5.2%', peerApproval: '79.8%', recPeer: '4.8%' }
        ],
        declineCodes: [
          { code: '54', name: 'Expired card', volume: '$125K', count: '1,860', countNum: 1860, color: '#dd7a01', shareMerchant: '44%', sharePeer: '33%', curable: 'Y', curePct: '8%', eligible: 'Yes', recoveredRevenue: '$10K' },
          { code: '51', name: 'Insufficient funds', volume: '$89K', count: '1,124', countNum: 1124, color: '#ba0517', shareMerchant: '31%', sharePeer: '28%', curable: 'N', curePct: '—', eligible: 'No', recoveredRevenue: '—' }
        ],
        schemeInterchangeBenefit: 18000,
        productDrivers: [
          { label: 'Brazil market under plan', sub: 'volume compression risk', pct: '38%', width: '76%' }
        ]
      }
    },
    'Deep Blue Retail': {
      accountId: '3',
      merchantCount: 9,
      market: 'GBR',
      authRate: '86.3%',
      chargebacks: '0.38%',
      servicing: '3',
      volumeTrend: '-5%',
      volumeTrendNote: 'QoQ decline',
      authTrend: 'In range',
      cbTrend: 'Below threshold',
      servicingNote: 'open tickets',
      churnScore: 0.2,
      churnScorePct: '20%',
      txnTrend1m: '-2%',
      txnTrend3m: '-8%',
      txnTrend6m: '-15%',
      positiveDrivers: [
        { name: 'NPS / CSAT / OSAT score', value: '81' },
        { name: 'Product count', value: '10' },
        { name: 'Authorisation rate', value: '91.5%' }
      ],
      negativeDrivers: [
        { name: 'Transaction decline percentage (in past 3-6 months)', value: '-8%' },
        { name: 'Pricing adjustment count (in past 1-3 months)', value: '1' },
        { name: 'Complaint resolution time', value: '6 days' }
      ],
      driverDrilldown: {
        'NPS / CSAT / OSAT score': [
          { humanCustomerId: 'HC-300201', authRateAvg6m: '91.5%' },
          { humanCustomerId: 'HC-300202', authRateAvg6m: '90.2%' }
        ],
        'Transaction decline percentage (in past 3-6 months)': [
          { humanCustomerId: 'HC-300203', authRateAvg6m: '86.4%' }
        ],
        'Authorisation rate': [
          { humanCustomerId: 'HC-300204', authRateAvg6m: '91.5%' }
        ],
        'Product count': [
          { humanCustomerId: 'HC-300205', authRateAvg6m: '92.8%' }
        ]
      },
      mids: [
        { id: '301', name: 'Deep Blue Main', negName: 'Transaction decline percentage (in past 3-6 months)', negValue: '-8%', posName: 'NPS / CSAT / OSAT score', posValue: '81' }
      ],
      crossSell: {
        likelihoodToAcquire: 'Medium',
        peerSegmentId: 'PS-GBR-RET',
        summary: {
          netBenefit: 412000,
          cost: 118000,
          tokenisationImpact: 28700,
          grossUplift: 645000,
          inScopeVolume: 9120000,
          inScopeTransactions: 182400,
          declineCodeList: '05, 51, 54, 82, N7, 14, 608',
          merchantApprovalRate: '86.3%',
          peerApprovalRate: '88.1%',
          merchantVsPeer: '-1.80%',
          recoverableSplitMerchant: '22%',
          recoverableSplitPeer: '31%',
          valueOfDeclines: '$1.2M',
          countDeclines: '18K'
        },
        slices: [
          { credential: 'MIT', channel: 'CNP', scheme: 'Visa', market: 'GBR', volume: '$2.1M', transactions: '42,000', approval: '86.1%', recMerchant: '2.0%', peerApproval: '87.9%', recPeer: '1.9%' }
        ],
        declineCodes: [
          { code: '54', name: 'Expired card', volume: '$2.1M', count: '24,800', countNum: 24800, color: '#dd7a01', shareMerchant: '52%', sharePeer: '41%', curable: 'Y', curePct: '12%', eligible: 'Yes', recoveredRevenue: '$252K' }
        ],
        schemeInterchangeBenefit: 95000,
        productDrivers: [
          { label: '05-decline and servicing', sub: 'auth-rate dip concentrated on do-not-honour', pct: '35%', width: '70%' }
        ]
      }
    },
    'Northwind Foods': {
      accountId: '4',
      merchantCount: 6,
      market: 'GBR',
      authRate: '79.8%',
      chargebacks: '0.35%',
      servicing: '1',
      volumeTrend: '+2%',
      volumeTrendNote: 'Stable',
      authTrend: 'In range',
      cbTrend: 'Below threshold',
      servicingNote: 'open tickets',
      churnScore: 0.15,
      churnScorePct: '15%',
      txnTrend1m: '+1%',
      txnTrend3m: '-2%',
      txnTrend6m: '-4%',
      positiveDrivers: [
        { name: 'Authorisation rate', value: '92.0%' },
        { name: 'Product count', value: '5' },
        { name: 'NPS / CSAT / OSAT score', value: '78' }
      ],
      negativeDrivers: [
        { name: 'Non-MIT scheme fees', value: 'Rising' },
        { name: 'Transaction decline percentage (in past 3-6 months)', value: '-4%' },
        { name: 'Dispute rate', value: '0.45%' }
      ],
      driverDrilldown: {
        'Authorisation rate': [
          { humanCustomerId: 'HC-400301', authRateAvg6m: '92.0%' }
        ],
        'Non-MIT scheme fees': [
          { humanCustomerId: 'HC-400302', authRateAvg6m: '79.8%' },
          { humanCustomerId: 'HC-400303', authRateAvg6m: '78.2%' }
        ],
        'Transaction decline percentage (in past 3-6 months)': [
          { humanCustomerId: 'HC-400304', authRateAvg6m: '81.4%' }
        ],
        'Dispute rate': [
          { humanCustomerId: 'HC-400305', authRateAvg6m: '80.1%' }
        ],
        'NPS / CSAT / OSAT score': [
          { humanCustomerId: 'HC-400306', authRateAvg6m: '88.3%' }
        ],
        'Product count': [
          { humanCustomerId: 'HC-400307', authRateAvg6m: '90.5%' }
        ]
      },
      mids: [
        { id: '401', name: 'Northwind Main', negName: 'Non-MIT scheme fees', negValue: 'Rising', posName: 'Authorisation rate', posValue: '92.0%' }
      ],
      crossSell: {
        likelihoodToAcquire: 'Medium',
        peerSegmentId: 'PS-GBR-RET',
        summary: {
          netBenefit: 120000,
          cost: 48000,
          tokenisationImpact: 8200,
          grossUplift: 195000,
          inScopeVolume: 1850000,
          inScopeTransactions: 42000,
          declineCodeList: '05, 51, 54',
          merchantApprovalRate: '79.8%',
          peerApprovalRate: '84.7%',
          merchantVsPeer: '-4.90%',
          recoverableSplitMerchant: '36%',
          recoverableSplitPeer: '29%',
          valueOfDeclines: '$0.45M',
          countDeclines: '6K'
        },
        slices: [
          { credential: 'MIT', channel: 'CNP', scheme: 'Visa', market: 'GBR', volume: '$890K', transactions: '18,200', approval: '78.5%', recMerchant: '4.2%', peerApproval: '84.2%', recPeer: '3.5%' }
        ],
        declineCodes: [
          { code: '51', name: 'Insufficient funds', volume: '$320K', count: '4,200', countNum: 4200, color: '#ba0517', shareMerchant: '32%', sharePeer: '30%', curable: 'N', curePct: '—', eligible: 'No', recoveredRevenue: '—' }
        ],
        schemeInterchangeBenefit: 22000,
        productDrivers: [
          { label: 'Non-MIT scheme fees', sub: 'recurring transactions mis-flagged', pct: '45%', width: '90%' }
        ]
      }
    }
  };

function getAccountDetail(name) {
  var detail = ACCOUNT_DETAIL[name] || ACCOUNT_DETAIL['Pets at Home'];
  var seed = (parseInt(detail.accountId, 10) || 1) * 100;
  return Object.assign({}, detail, { driverDrilldown: normalizeDriverDrilldown(detail, seed) });
}

function accountsWithDetail() {
  return ACCOUNTS.filter(function (account) { return ACCOUNT_DETAIL[account.name]; });
}
