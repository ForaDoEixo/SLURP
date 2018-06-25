import React from 'react';

const settingDescriptors = {
    consumer_key: 'Consumer Key',
    consumer_secret: 'Consumer Secret',
    access_token: 'Access Token',
    access_token_secret: 'Access Token Secret'
}

class Settings extends React.Component {
    constructor(props) {
        super(props)

        this.inputs = {}
    }

    updateInputs(props) {
        const {settings} = props
        Object.keys(this.inputs).map(key => this.inputs[key].value = settings[key] || "")
    }

    componentWillMount() {
        setTimeout(() => this.updateInputs(this.props), 200)
    }

    componentWillUpdate(nextProps) {
        this.updateInputs(nextProps)
    }

    render () {
        const {action, settings} = this.props

        const updateSettings = () => {
            const ret = Object.keys(this.inputs).reduce((acc, key) => Object.assign({}, acc, {
                [key]: this.inputs[key].value
            }), {})

            action(ret)
        }

        return (
            <div className="Settings">
                <h1>Twitter</h1>
                <form onSubmit={e => {
                        e.preventDefault()
                        updateSettings()
                }}>
                    <ul>
                        {
                            Object.entries(settingDescriptors).map(([key, value]) => (
                                <li key={key}>
                                    <label htmlFor={key}>{value}</label>
                                    <input name={key} ref={node => this.inputs[key] = node}/>
                                </li>
                            ))
                        }
                    </ul>
                    <button type='submit'>Set</button>
                </form>
            </div>
        )
    }
}

export { Settings as default }
