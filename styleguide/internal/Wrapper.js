import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'

import store from './store'

import * as messages from 'react-mypages/src/i18n/'
import 'react-mypages/src/styles/global.scss'

export class Wrapper extends Component {
  render() {
    const { locale } = store.getState()
    const intlData = {
      locale,
      messages: messages[locale]
    }

    return (
      <Provider store={store}>
        <IntlProvider {...intlData}>
          {this.props.children}
        </IntlProvider>
      </Provider>
    )
  }
}

export default Wrapper
