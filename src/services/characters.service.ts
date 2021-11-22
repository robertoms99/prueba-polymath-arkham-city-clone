import superagent from 'superagent'
import { API_TOKEN } from '../settings/api-token'

const getCharacters = async (charactersCount: number) => {
  const characterIds = Array.from(new Array(charactersCount), (_, index) => index + 1)
  const requests = characterIds.map((id: number) =>
    superagent
      .get(`https://superheroapi.com/api.php/${API_TOKEN}/${id}`)
      .set('Content-Type', 'application/json')
      .set('x-requested-with', 'XMLHttpRequest')
  )
  const requestsValues = await Promise.allSettled(requests)
  return requestsValues.map((requestValue) =>
    requestValue.status === 'fulfilled' ? requestValue.value.body : null
  )
}

export { getCharacters }
