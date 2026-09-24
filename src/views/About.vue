<script setup>
const faqs = [
  {
    id: 1,
    question: 'What is AutoLux?',
    answer:
      'AutoLux is a modern car marketplace where users can discover premium cars from different automotive brands.'
  },
  {
    id: 2,
    question: 'What brands are available?',
    answer:
      'AutoLux includes several premium brands such as BMW, Mercedes-Benz, Audi, Porsche, and Tesla.'
  },
  {
    id: 3,
    question: 'Can I view detailed information about a car?',
    answer:
      'Yes. Every car has its own details page containing information such as the brand, year, price, tags, stock, and description.'
  },
  {
    id: 4,
    question: 'Can I explore cars by brand?',
    answer:
      'Yes. You can browse all available brands and open a brand page to see the cars associated with that brand.'
  }
]
</script>

<template>
  <section class="container py-5">

    <div class="row align-items-center g-5 mb-5">

      <div class="col-lg-6">

        <span class="text-uppercase text-secondary small fw-bold">
          About AutoLux
        </span>

        <h1 class="display-4 fw-bold mt-2 mb-4">
          Your Gateway to Exceptional Cars
        </h1>

        <p class="lead text-secondary">
          AutoLux is a modern car marketplace designed to make
          discovering premium cars simple, enjoyable, and informative.
        </p>

        <p class="text-secondary">
          Our platform connects users with cars from trusted automotive
          brands while providing detailed information about every vehicle.
          Whether you are looking for performance, luxury, technology,
          or everyday comfort, AutoLux helps you explore your options.
        </p>

      </div>

      <div class="col-lg-6">

        <div class="about-highlight rounded-4 p-5">

          <h2 class="fw-bold mb-4">
            Our Mission
          </h2>

          <p class="mb-0">
            We want to create a simple and modern experience where
            car enthusiasts can discover vehicles, explore brands,
            compare options, and learn more about the cars they love.
          </p>

        </div>

      </div>

    </div>

    <div class="row g-4 mb-5">

      <div class="col-md-4">
        <div class="border rounded-4 p-4 h-100">
          <h4 class="fw-bold">
            Quality
          </h4>

          <p class="text-secondary mb-0">
            We focus on presenting premium vehicles with clear
            and useful information.
          </p>
        </div>
      </div>

      <div class="col-md-4">
        <div class="border rounded-4 p-4 h-100">
          <h4 class="fw-bold">
            Simplicity
          </h4>

          <p class="text-secondary mb-0">
            Our interface makes it easy to browse cars and brands
            without unnecessary complexity.
          </p>
        </div>
      </div>

      <div class="col-md-4">
        <div class="border rounded-4 p-4 h-100">
          <h4 class="fw-bold">
            Technology
          </h4>

          <p class="text-secondary mb-0">
            AutoLux combines modern web technologies with
            an AI-powered experience.
          </p>
        </div>
      </div>

    </div>

    <!-- FAQ -->

    <div class="py-4">

      <div class="text-center mb-4">

        <span class="text-uppercase text-secondary small fw-bold">
          FAQ
        </span>

        <h2 class="fw-bold mt-2">
          Frequently Asked Questions
        </h2>

      </div>

      <div class="accordion" id="faqAccordion">

        <div
          v-for="faq in faqs"
          :key="faq.id"
          class="accordion-item"
        >

          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed fw-semibold"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="`#faq-${faq.id}`"
              :aria-controls="`faq-${faq.id}`"
            >
              {{ faq.question }}
            </button>
          </h2>

          <div
            :id="`faq-${faq.id}`"
            class="accordion-collapse collapse"
            data-bs-parent="#faqAccordion"
          >
            <div class="accordion-body text-secondary">
              {{ faq.answer }}
            </div>
          </div>

        </div>

      </div>

    </div>

  </section>
</template>