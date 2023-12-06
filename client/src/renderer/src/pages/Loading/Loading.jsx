import './Loading.css'

const Loading = () => {
  return (
    <div className="loading" aria-label="Loading">
      <div className="loading__container">
        <div className="loading__container__spinner">Loading...</div>
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Loading
