const API_URL = 'http://localhost:3000/brands'

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

export async function getBrands(search = '') {
  const url = search
    ? `${API_URL}?q=${encodeURIComponent(search)}`
    : API_URL

  return request(url)
}

export async function getBrandById(id) {
  return request(`${API_URL}/${id}`)
}

export async function createBrand(brand) {
  return request(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(brand)
  })
}

export async function updateBrand(id, brand) {
  return request(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(brand)
  })
}

export async function deleteBrand(id) {
  return request(`${API_URL}/${id}`, {
    method: 'DELETE'
  })
}