import guessUserTz, { timeForTz, tzForName } from '../lib/timecopUtils';

import PropTypes from 'prop-types';
import React from 'react';

const TimeCop = (props) => {
    const { timezone, onChange } = props;
    const { city, zoneName, zoneAbbr } = tzForName(timezone);
    const timestamp = timeForTz(zoneName);
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
            <label htmlFor="timezone">Closest City <br/>
                <input id="timezone" type="text" value={city} onChange={onChange} style={{width: '200px'}}></input>
                <p><b>Your selected datetime information is:</b><br />{timestamp}<br />{zoneName}<br />{zoneAbbr}</p>
            </label>
        </div>
    )
};

TimeCop.propTypes = {
    timezone: PropTypes.string,
    onChange: PropTypes.func
};

TimeCop.defaultProps = {
    timezone: guessUserTz(),
    onChange: () => {}
};

export default TimeCop;
