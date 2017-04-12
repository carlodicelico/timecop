import memoize from 'fast-memoize';
import moment from 'moment-timezone';

// loads moment-timezone's timezone data, which comes from the IANA Time Zone Database
// at https://www.iana.org/time-zones
moment.tz.load({ version: 'latest', zones: [], links: [] });

const guessUserTz = () => {
    // User-Agent sniffing is not always reliable, but is the recommended technique
    // for determining whether or not we're on a mobile device according to MDN
    const isMobile = (global.navigator !== undefined)
        ? global.navigator.userAgent.match(/Mobi/)
        : false;

    const supportsIntl = (typeof global.Intl !== undefined);

    let userTimezone;

    if (isMobile && supportsIntl) {
        /*
        * Due to the fact that moment-timezone gives preference to the Intl API
        * regardless of the device type, we need to unset global.Intl & re-set it to
        * turn off moment-timezone's use of the Intl API on unsupported (mobile) platforms
        * in order to get accurate results.
        */
        const globalIntl = global.Intl;
        global.Intl = undefined;
        userTimezone = moment.tz.guess();
        global.Intl = globalIntl;
    } else {
        userTimezone = moment.tz.guess();
    }

    return userTimezone;
};

const tzNames = (() => {
    /*
    *  We want to subset the existing timezone data as much as possible, both for efficiency
    *  and to avoid confusing the user. Here, we focus on removing reduntant timezone names
    *  and timezone names for timezones we don't necessarily care about, like Antarctica, and
    *  special timezone names that exist for convenience.
    */
    const scrubbedPrefixes = ['Antarctica', 'Arctic', 'Chile', 'Etc'];
    const scrubbedSuffixes = ['ACT', 'East', 'Knox_IN', 'LHI', 'North', 'NSW', 'South', 'West'];

    const tzNames = moment.tz.names()
        .filter(name => name.indexOf('/') !== -1)
        .filter(name => !scrubbedPrefixes.includes(name.split('/')[0]))
        .filter(name => !scrubbedSuffixes.includes(name.split('/').slice(-1)[0]));

    return tzNames;
})();

// We need a human-friendly city name for each timezone identifier
const tzCities = tzNames
    .map(name => ['Canada', 'Mexico', 'US'].includes(name.split('/')[0]) ?
        name : name.split('/').slice(-1)[0])
    .map(name => name.replace(/_/g, ' '));

// Util+test functions
export const tzForCity = memoize(city => tzMaps
    .filter(tzMap => tzMap['city'] === city)
    .reduce(tzMap => tzMap));

export const tzForAbbr = memoize(abbr => tzMaps
    .filter(tzMap => tzMap['zoneAbbr'] === abbr));

export const tzForName = memoize(name => tzMaps
    .filter(tzMap => tzMap['zoneName'] === name)
    .reduce(tzMap => tzMap));

export const timeForTz = tz => moment().tz(tz).format();

/*
 * Provide a mapping between a human-friendly city name and its corresponding
 * timezone identifier and timezone abbreviation as a named export.
 * We can fuzzy match on any of these. This is the data that is searched in
 * ./lib/searchUtils.js.
 */
export const tzMaps = tzCities.map(city => {
        let tzMap = {};
        const tzName = tzNames[tzCities.indexOf(city)];

        tzMap['city'] = city;
        tzMap['zoneName'] = tzName;
        tzMap['zoneAbbr'] = moment().tz(tzName).zoneAbbr();

        return tzMap;
    });

export default guessUserTz;
