import { createRoot } from 'react-dom/client'
import App from './App'

const elm = document.querySelector('#app') as HTMLElement
const root = createRoot(elm)
root.render(<App />)