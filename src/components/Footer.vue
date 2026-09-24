<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">

    <div class="container">

      <div class="row g-4 py-5">

        <!-- Brand -->
        <div class="col-lg-5 col-md-6">

          <h3 class="footer-brand">
            AutoLux
          </h3>

          <p class="footer-description">
            Discover premium cars from trusted brands
            and find the perfect car for your lifestyle.
          </p>

        </div>

        <!-- Quick Links -->
        <div class="col-lg-3 col-md-3">

          <h5 class="footer-title">
            Quick Links
          </h5>

          <div class="footer-links">

            <RouterLink to="/">
              Home
            </RouterLink>

            <RouterLink to="/about">
              About
            </RouterLink>

            <RouterLink to="/cars">
              Cars
            </RouterLink>

            <RouterLink to="/brands">
              Brands
            </RouterLink>

          </div>

        </div>

        <!-- Explore -->
        <div class="col-lg-4 col-md-3">

          <h5 class="footer-title">
            Explore AutoLux
          </h5>

          <p class="footer-description">
            Explore our collection of premium vehicles
            and learn more about the world's leading
            automotive brands.
          </p>

          <RouterLink
            to="/cars"
            class="btn btn-light"
          >
            Explore Cars
          </RouterLink>

        </div>

      </div>

      <hr class="footer-line">

      <div class="footer-bottom py-3">

        <p class="mb-0">
          © {{ currentYear }} AutoLux. All rights reserved.
        </p>

        <p class="mb-0">
          Premium Cars. Trusted Brands.
        </p>

      </div>

    </div>

  </footer>
</template>