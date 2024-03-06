import { CSSProperties, useEffect, useRef, useState } from 'react'
import { setup } from '@unionavatars/iframe'
import './reset.css'
import Register from './Register'
import { Eventer } from '@unionavatars/iframe/src/client'

const styles: Record<string, CSSProperties> = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  header: {
    padding: '1rem',
  },
  iframe: {
    border: 'none',
    width: '100%',
    height: '40dvh'
  }
}

export default function App() {
  const [client, setClient] = useState<Eventer | undefined>()
  const ref = useRef<HTMLIFrameElement>(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const onLoad = () => {
    setClient(setup(ref.current))
  }
  useEffect(() => { // detect logged-in event
    if (client) client.on('logged-in', (data) => {
      console.log({ data })
      setLoggedIn(true)
      client.request('goto', '/create')
    })
  }, [client])
  return (
    <div style={styles.main}>
      <h1 style={styles.header}>This is the web hosting the iframe app</h1>
      {loggedIn ? <h2>Logged in</h2> : <h2>Not logged in</h2>}
      <iframe ref={ref} onLoad={onLoad} style={{
        ...styles.iframe,
        ...(loggedIn ? { height: '50dvh' } : { height: 0, overflow: 'hidden' })
      }} src="http://iframe.unionavatars.com/" />
      {loggedIn ? (
        <>
          <p>Display anything needed after user registration</p>
        </>
        ): (
          client && <Register client={client} />
        )}
    </div>
  )
}