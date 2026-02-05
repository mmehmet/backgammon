import RemoteProvider from './RemoteProvider'
import { API_URL } from '../../utils/constants'

class ProviderFactory {
  static create = async() => {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 2000)

      const response = await fetch(API_URL, {
        signal: controller.signal,
      });

      clearTimeout(timeout)
      if (response.ok) return new RemoteProvider()
    } catch (error) {
      console.error(error)
    }

    return null
  }
}

export default ProviderFactory;
