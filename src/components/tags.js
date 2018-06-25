import React from 'react';
import PropTypes from 'prop-types';

const TagsSelector = ({name, collection, actions, marker=""}) => {
    let input;

    console.error('collection', collection)

    return (
        <section>
            <h1>{name}</h1>
            <form  onSubmit={e => {
                    e.preventDefault()
                    if (!input.value.trim()) {
                        return
                    }
                    actions.add(input.value)
                    input.value = ''
            }}>
                <input ref={node => input = node} />
                <button type='submit'>add</button>
            </form>
            <ul className="List">
                {Object.keys(collection).map((item, key) => (
                    <li key={`${item}`} className="List-item">
                        <span>{marker}{item}</span>
                        <button onClick={() => actions.remove(item)}>remove</button>
                    </li>
                ))}
            </ul>
        </section>
    )
}

TagsSelector.propTypes = {
    name: PropTypes.string.isRequired,
    collection: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
}

export { TagsSelector as default }
