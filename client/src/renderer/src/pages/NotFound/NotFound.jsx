import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1>Oops! Lost in Space?</h1>
      <p>It looks like you&apos;ve ventured into uncharted territory.</p>
      <p>
        {` `}
        Let&apos;s get you back {` `}
        <Link to="/">home</Link>.
      </p>
    </div>
  )
}

export default NotFoundPage
