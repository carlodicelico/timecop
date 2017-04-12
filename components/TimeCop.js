import guessUserTz, { timeForTz, tzForName } from '../lib/timecopUtils';
import handleSearchInput from '../lib/searchUtils';

import React, { PropTypes } from 'react';

const TimeCop = (props) => {
    const { timezone, onChange, value } = props;
    const { city, zoneName, zoneAbbr } = tzForName(timezone);
    const timestamp = timeForTz(zoneName);
    const westAbbr = tzForName('US/Pacific').zoneAbbr;
    const eastAbbr = tzForName('US/Eastern').zoneAbbr;
    const defaultStyles = {
        backgroundColor: 'rgb(250,250,250)',
        padding: '0.5rem',
        lineHeight: '1.5',
        fontFamily: `
            -apple-system, ".SFNSText-Regular", "San Francisco", "Roboto",
            "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif
        `,
        color: '#444',
        WebkitFontSmoothing: 'antialiased',
    };

    return (
        <div style={defaultStyles}>
            <label htmlFor="timezone">Choose a timezone <br/>
                <h6>You can search by largest city, timezone name, or timezone abbreviation.<br />
                e.g., "Los Angeles", "Pacific", or "{westAbbr}" - "New York", "Eastern", or "{eastAbbr}"</h6>
                <input id="timezone" type="text" placeholder={city} value={value} onChange={handleSearchInput} style={{width: '200px'}}></input>
                <p><b>Your selected datetime information is:</b><br />{timestamp}<br />{zoneName}<br />{zoneAbbr}</p>
            </label>
        </div>
    )
};

TimeCop.propTypes = {
    timezone: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string
};

TimeCop.defaultProps = {
    timezone: guessUserTz(),
    onChange: () => {},
    value: ''
};

export default TimeCop;
