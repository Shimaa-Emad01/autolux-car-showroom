const API_URL = 'http://localhost:3000/cars'

async function request(url, options = {}) {
  const response = await fetch(url, options)

  if (!response.ok) {
    let message = 'Something went wrong'

    try {
      const data = await response.json()
      message = data.message || message
    } catch {
      // Keep default message
    }

    throw new Error(message)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export async function getCars() {
  return request(API_URL)
}

export async function getCarById(id) {
  return request(`${API_URL}/${id}`)
}

export async function getCarsByBrand(brandId) {
  return request(
    `${API_URL}?brandId=${encodeURIComponent(brandId)}`
  )
}

export async function createCar(car) {
  return request(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(car)
  })
}

export async function updateCar(id, car) {
  return request(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(car)
  })
}

export async function deleteCar(id) {
  return request(`${API_URL}/${id}`, {
    method: 'DELETE'
  })
}

export async function updateCarStock(id, stock) {
  return request(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ stock })
  })
}