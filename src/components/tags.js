import React from 'react';
import PropTypes from 'prop-types';

import { shell } from 'electron';

const openLocal = (url) => (e) => {
    e.preventDefault()
    shell.openExternal(url)
}

const TagsSelector = ({name, baseURL, defaultField, collection, actions, marker=""}) => {
    let input;

    return (
        <section>
            <h1>{name}</h1>
            <form  onSubmit={e => {
                    e.preventDefault()
                    if (!input.value.trim()) {
                        return
                    }
                    actions.create({_id: input.value, [defaultField]: input.value})
                    input.value = ''
            }}>
                <input ref={node => input = node} />
                <button type='submit'>add</button>
            </form>
            <ul className="List">
                {collection.map((item) => {
                     const key = item[defaultField] || item._id
                     return (
                         <li key={`${key}`} className="List-item">
                             <a onClick={openLocal(`${baseURL}${key}`)}>
                                 {marker}{key}
                             </a>
                             <button onClick={() => actions.delete(item)}>remove</button>
                         </li>
                     )
                })}
            </ul>
        </section>)
}

TagsSelector.propTypes = {
    name: PropTypes.string.isRequired,
    collection: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
}

export { TagsSelector as default }
