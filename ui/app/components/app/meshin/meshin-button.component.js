import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../../ui/mesh-button'

export default class MeshinButton extends Component {

  static propTypes = {
    history: PropTypes.object,
    getSeedFromMesh: PropTypes.func,
    getMeshCredentials: PropTypes.func,
  }

  render () {
    const {
      getMeshCredentials,
      getSeedFromMesh,
      history,
    } = this.props

    const handler = async () => {
      await getMeshCredentials()
      getSeedFromMesh().then((res) => {
        history.push(res)
      })
    }

    return (
      <div className="meshin-wrap">
        <Button
          onClick={handler}
        >
          Meshin
        </Button>
      </div>
    )
  }

}
