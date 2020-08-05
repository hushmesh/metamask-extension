import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { requestRevealSeedWords, getMeshDataBg } from '../../store/actions'
import { DEFAULT_ROUTE } from '../../helpers/constants/routes'
import ExportTextContainer from '../../components/ui/export-text-container'

import Button from '../../components/ui/button'

class RevealSeedPage extends Component {
  state = {
    seedWords: null,
  }

  componentDidMount () {
    this.getSeedData().then((res) => {
      this.props.requestRevealSeedWords(res.relationshipKey)
        .then((seedWords) => this.setState({ seedWords }))
    })
  }

  async getSeedData () {
    const data = await this.props.getMeshDataBg()
    return data
  }

  renderWarning () {
    return (
      <div className="page-container__warning-container">
        <img className="page-container__warning-icon" src="images/warning.svg" alt="" />
        <div className="page-container__warning-message">
          <div className="page-container__warning-title">
            {this.context.t('revealSeedWordsWarningTitle')}
          </div>
          <div>
            {this.context.t('revealSeedWordsWarning')}
          </div>
        </div>
      </div>
    )
  }

  renderContent () {
    return this.renderRevealSeedContent()
  }

  renderRevealSeedContent () {
    const { t } = this.context

    return (
      <div>
        <label className="reveal-seed__label">{t('yourPrivateSeedPhrase')}</label>
        <ExportTextContainer text={this.state.seedWords} />
      </div>
    )
  }

  renderFooter () {
    return this.renderRevealSeedFooter()
  }

  renderRevealSeedFooter () {
    return (
      <div className="page-container__footer">
        <Button
          type="default"
          large
          className="page-container__footer-button"
          onClick={() => this.props.history.push(DEFAULT_ROUTE)}
        >
          {this.context.t('close')}
        </Button>
      </div>
    )
  }

  render () {
    return (
      <div className="page-container">
        <div className="page-container__header">
          <div className="page-container__title">
            {this.context.t('revealSeedWordsTitle')}
          </div>
          <div className="page-container__subtitle">
            {this.context.t('revealSeedWordsDescription')}
          </div>
        </div>
        <div className="page-container__content">
          {this.renderWarning()}
          <div className="reveal-seed__content">
            {this.renderContent()}
          </div>
        </div>
        {this.renderFooter()}
      </div>
    )
  }
}

RevealSeedPage.propTypes = {
  requestRevealSeedWords: PropTypes.func,
  getMeshDataBg: PropTypes.func,
  history: PropTypes.object,
}

RevealSeedPage.contextTypes = {
  t: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestRevealSeedWords: (password) => dispatch(requestRevealSeedWords(password)),
    getMeshDataBg: () => dispatch(getMeshDataBg()),
  }
}

export default connect(null, mapDispatchToProps)(RevealSeedPage)
