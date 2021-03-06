import React from 'react'
import PropTypes from 'prop-types'

export class Page extends React.Component {
  onYearBtnClick = e => {
    const year = +e.currentTarget.innerText
    this.props.getPhotos(year)
  }

  renderTemplate = () => {
    const { photos, isFetching, error } = this.props
    if (error) {
      return <p className="error">Во время загрузки фото произошла ошибка</p>
    }

    if (isFetching) {
      return <p>Загрузка...</p>
    } else {
      return photos.map(entry => (
        <div key={entry.id} className="photo">
          <p>
            <img src={entry.sizes[3].url} alt="" />
          </p>
          <p>
            {entry.likes.count} <span className="heart">❤</span>
          </p>
        </div>
      ))
    }
  }
  renderButtons = () => {
    const { years } = this.props

    return years.map((item, index) => {
      return (
        <button key={index} className="btn" onClick={this.onYearBtnClick}>
          {item}
        </button>
      )
    })
  }
  render() {
    const { year, photos } = this.props
    return (
      <div className="ib page">
        <p>{this.renderButtons()}</p>
        <h3>
          {year} год [{photos.length}]
        </h3>
        {this.renderTemplate()}
      </div>
    )
  }
}

Page.propTypes = {
  year: PropTypes.number.isRequired,
  years: PropTypes.array.isRequired,
  photos: PropTypes.array.isRequired,
  getPhotos: PropTypes.func.isRequired,
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
}
