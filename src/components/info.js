import React from 'react';

const Info = ({last = [], ...props}) => (
    <div>
        {JSON.stringify(props)}
        <ul>
            {last.map(t => (<li key={t.id}>{t.text}</li>))}
        </ul>
    </div>
)

export { Info as default }
