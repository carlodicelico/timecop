import { action, addDecorator, storiesOf } from '@kadira/storybook';
import { text, withKnobs } from '@kadira/storybook-addon-knobs';

import React from 'react';
import TimeCop from '../components/TimeCop';

const stories = storiesOf('TimeCop', module);
stories.addDecorator(withKnobs);

stories.addWithInfo('with default timezone',
    `
        By default, TimeCop will try to detect the user's timezone and use that. Click 
        "Knobs" below and experiment with different timezone values to simulate this 
        value being set by default by TimeCop. Try "Asia/Singapore", "Mexico/BajaSur", 
        or "Canada/Saskatchewan"!

    `, () => (
        <TimeCop timezone={text('Timezone', 'America/New_York')} onChange={action('onChange')}/>
    ),
    { inline: true }
);

stories.addWithInfo('with timezone search',
    `
        A user can search for a timezone by that timezone's name ("America/New_York"), 
        largest city name ("New York"), short name ("Eastern"), or abbreviation ("EDT" or "EST"). 
        TimeCop will return a list of matches for the search query in realtime.
    `, () => (
        <TimeCop timezone={text('Timezone', 'America/New_York')} onChange={action('onChange')}/>
    ),
    { inline: true }
);