import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () =>
  <div className="text-center">
    <div>
      <h1>
        <strong>Error 404</strong>
      </h1>
      <p>
        The page you are looking for does not exist it may have been moved, or removed altogether.
        You might want to try the search function. Alternatively, return to the front page.
      </p>
      <Link to="/" className="btn">
        Go back to the main page
      </Link>
    </div>
  </div>

export default NotFoundPage