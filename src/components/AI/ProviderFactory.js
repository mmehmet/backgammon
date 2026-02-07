import RemoteProvider from './Providers/RemoteProvider'
import LocalProvider from './Providers/LocalProvider'
import { API_URL } from '../../utils/constants'

class ProviderFactory {
  static create = async () => {
    try {
      const response = await fetch(`${API_URL}/eval`)
      if (response.ok) return new RemoteProvider()
    } catch (error) {
      console.error(error)
    }

    return new LocalProvider()
  }
}

export default ProviderFactory
