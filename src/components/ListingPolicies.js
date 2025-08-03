import React from 'react';

const icons = {
  'Check-in': '⏰',
  'Check-out': '⏰',
  'Self check-in': '🔑',
  'Not suitable for infants': '🛒',
  'No smoking': '🔥',
  'No pets': '🐾',
  'No parties or events': '🎉',
  'Enhanced cleaning': '✨',
  'Social distancing': '🦠',
  'Carbon monoxide alarm': '🎛️',
  'Smoke alarm': '⏺️',
  'Security deposit': '💳',
};

const ListingPolicies = ({ houseRules = [], cancellationPolicy = '', pricing = {} }) => {
  //static health & safety policies
  const healthSafety = [
    { text: "Committed to Airbnb's enhanced cleaning process.", icon: icons['Enhanced cleaning'] },
    { text: "Airbnb's social-distancing and other COVID-19-related guidelines apply", icon: icons['Social distancing'] },
    { text: 'Carbon monoxide alarm', icon: icons['Carbon monoxide alarm'] },
    { text: 'Smoke alarm', icon: icons['Smoke alarm'] },
            { text: `Security Deposit - if you damage the home, you may be charged up to R${pricing.securityDeposit || 500}`, icon: icons['Security deposit'] },
  ];

  // Map house rules to icons
  const houseRulesList = houseRules.length
    ? houseRules.map(rule => {
        let icon = '';
        if (rule.toLowerCase().includes('check-in')) icon = icons['Check-in'];
        else if (rule.toLowerCase().includes('check-out')) icon = icons['Check-out'];
        else if (rule.toLowerCase().includes('self check-in')) icon = icons['Self check-in'];
        else if (rule.toLowerCase().includes('infant')) icon = icons['Not suitable for infants'];
        else if (rule.toLowerCase().includes('smoking')) icon = icons['No smoking'];
        else if (rule.toLowerCase().includes('pets')) icon = icons['No pets'];
        else if (rule.toLowerCase().includes('party') || rule.toLowerCase().includes('event')) icon = icons['No parties or events'];
        return { text: rule, icon };
      })
    : [
        { text: 'Check-in: After 4:00 PM', icon: icons['Check-in'] },
        { text: 'Check-out: 10:00 AM', icon: icons['Check-out'] },
        { text: 'Self check-in with lock-box', icon: icons['Self check-in'] },
        { text: 'Not suitable for infants (under 2 years)', icon: icons['Not suitable for infants'] },
        { text: 'No smoking', icon: icons['No smoking'] },
        { text: 'No pets', icon: icons['No pets'] },
        { text: 'No parties or events', icon: icons['No parties or events'] },
      ];

  return (
    <div style={{ display: 'flex', gap: 40, margin: '32px 0', justifyContent: 'space-between', flexWrap: 'wrap' }}>
      {/* House Rules */}
      <div style={{ flex: 1, minWidth: 260 }}>
        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 12 }}>House Rules</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {houseRulesList.map((rule, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: 8, fontSize: 16 }}>
              <span style={{ fontSize: 18, marginRight: 10 }}>{rule.icon}</span>
              {rule.text}
            </li>
          ))}
        </ul>
      </div>
      {/* Health & Safety */}
      <div style={{ flex: 1, minWidth: 260 }}>
        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 12 }}>Health & Safety</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {healthSafety.map((item, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: 8, fontSize: 16 }}>
              <span style={{ fontSize: 18, marginRight: 10 }}>{item.icon}</span>
              {item.text}
            </li>
          ))}
        </ul>
        <a href="#" style={{ color: '#1976d2', fontSize: 15, textDecoration: 'underline' }}>Show more</a>
      </div>
      {/* Cancellation Policy */}
      <div style={{ flex: 1, minWidth: 260 }}>
        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 12 }}>Cancellation Policy</div>
        <div style={{ fontSize: 16, marginBottom: 8 }}>{cancellationPolicy || 'Free cancellation before Feb 14'}</div>
        <a href="#" style={{ color: '#1976d2', fontSize: 15, textDecoration: 'underline' }}>Show more</a>
      </div>
    </div>
  );
};

export default ListingPolicies; 