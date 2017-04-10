import { action, addDecorator, storiesOf } from '@kadira/storybook';
import { text, withKnobs } from '@kadira/storybook-addon-knobs';

import React from 'react';
import TimeCop from '../components/TimeCop';

const stories = storiesOf('TimeCop', module);
stories.addDecorator(withKnobs);

stories.addWithInfo('with default timezone',
    `
        By default, TimeCop will try to detect the user's timezone and use that.
    `, () => (
        <TimeCop onChange={action('onChange')}/>
    ),
    { inline: true }
);
