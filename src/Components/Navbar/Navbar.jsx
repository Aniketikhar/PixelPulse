import React from 'react'

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-transparent  navbar-dark">
        <div className="container  mx-auto">
          <a className="navbar-brand fs-2" href="#">
          PixelPulse
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto fs-5">
              <li className="nav-item">
                <a className="nav-link active " aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://port-folio-aniket-ikhar.vercel.app/">
                  About Me
                </a>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
