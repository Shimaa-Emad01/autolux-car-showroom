<script setup>
const featuredCars = [
  {
    id: 1,
    name: 'BMW M4 Competition',
    brand: 'BMW',
    image:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 5,
    name: 'Audi R8',
    brand: 'Audi',
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 6,
    name: 'Porsche 911',
    brand: 'Porsche',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
  }
]
</script>

<template>
  <div>

    <!-- HERO -->
    <section class="home-hero">
      <div class="container">
        <div class="row align-items-center g-5">

          <div class="col-lg-6">
            <div class="home-hero-content">
              <span class="section-label">
                PREMIUM AUTOMOTIVE COLLECTION
              </span>

              <h1 class="display-3 fw-bold mt-3">
                Find Your
                <span class="text-secondary">Perfect Car</span>
              </h1>

              <p class="lead text-secondary mt-4">
                Explore premium cars from the world's most trusted
                automotive brands.
              </p>

              <div class="d-flex gap-3 mt-4">
                <RouterLink
                  to="/cars"
                  class="btn btn-dark btn-lg px-4"
                >
                  Browse Cars
                </RouterLink>

                <RouterLink
                  to="/brands"
                  class="btn btn-outline-dark btn-lg px-4"
                >
                  Explore Brands
                </RouterLink>
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="home-hero-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=80"
                alt="Premium BMW car"
                class="home-hero-image"
              >
            </div>
          </div>

        </div>
      </div>
    </section>


    <!-- FEATURED CARS -->
    <section class="py-5">
      <div class="container">

        <div class="text-center mb-5">
          <span class="section-label">
            FEATURED COLLECTION
          </span>

          <h2 class="fw-bold mt-2">
            Featured Cars
          </h2>

          <p class="text-secondary">
            Discover some of our most popular vehicles.
          </p>
        </div>

        <div class="row g-4">

          <div
            v-for="car in featuredCars"
            :key="car.id"
            class="col-md-6 col-lg-4"
          >
            <div class="card border-0 shadow-sm h-100 home-featured-card">

              <div class="home-featured-image-wrapper">
                <img
                  :src="car.image"
                  :alt="car.name"
                  class="home-featured-image"
                >
              </div>

              <div class="card-body p-4">
                <p class="text-secondary small mb-1">
                  {{ car.brand }}
                </p>

                <h5 class="fw-bold">
                  {{ car.name }}
                </h5>

                <RouterLink
                  :to="`/cars/${car.id}`"
                  class="btn btn-outline-dark mt-3"
                >
                  View Details
                </RouterLink>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>


    <!-- CTA -->
    <section class="home-cta py-5">
      <div class="container text-center py-4">

        <h2 class="fw-bold">
          Ready to Find Your Next Car?
        </h2>

        <p class="text-secondary mt-3">
          Explore our complete collection of premium vehicles.
        </p>

        <RouterLink
          to="/cars"
          class="btn btn-dark btn-lg px-5 mt-3"
        >
          Explore All Cars
        </RouterLink>

      </div>
    </section>

  </div>
</template>