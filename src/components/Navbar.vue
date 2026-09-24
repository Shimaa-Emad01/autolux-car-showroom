<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">

    <div class="container">

      <RouterLink
        class="navbar-brand fw-bold fs-4"
        to="/"
      >
        AutoLux
      </RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        id="navbarContent"
        class="collapse navbar-collapse"
      >

        <ul class="navbar-nav ms-auto">

          <li class="nav-item">
            <RouterLink
              class="nav-link"
              to="/"
            >
              Home
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink
              class="nav-link"
              to="/about"
            >
              About
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink
              class="nav-link"
              to="/cars"
            >
              Cars
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink
              class="nav-link"
              to="/brands"
            >
              Brands
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink
              class="nav-link"
              to="/admin"
            >
              Admin
            </RouterLink>
          </li>

        </ul>

      </div>

    </div>

  </nav>
</template>