import { CSSProperties, useState } from 'react'
import { Eventer } from '@unionavatars/iframe/client'

const styles: Record<string, CSSProperties> = {
  form: {
    display: 'flex',
    fontFamily: 'sans-serif',
    flexDirection: 'column',
    gap: '1rem',
    padding: '1rem',
    width: '50dvh',
    alignSelf: 'center',
    backgroundColor: '#CCC',
    borderRadius: '0.5rem',
    maxWidth: '80dvw'
  },
  label: {
    display: 'inline-flex',
    width: '100%',
    flexDirection: 'row',
    gap: '1rem'
  },
  text: {
    width: '30%',
    display: 'inline-flex',
    fontSize: '1rem',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  input: {
    display: 'inline-flex',
    width: '100%',
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '0.25rem',
    border: '1px solid #ccc',
    backgroundColor: '#DDD'
  },
  submit: {
    padding: '0.5rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    backgroundColor: '#DDD',
    borderRadius: '0.25rem',
    boxShadow: '0 0 0.5rem #AAA',
  }
}

export default function Register({ client }: { client: Eventer }) {
  const [busy, setBusy] = useState(false)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setBusy(true)
    const form = e.currentTarget
    const email = form.email.value
    const password = form.password.value
    client.request('register', email, password).then(result => {
      console.log({ result })
      setBusy(false)
    })
  }
  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <label style={styles.label}>
        <span style={styles.text}>Email:</span> 
        <input disabled={busy} style={styles.input} type="email" name="email" placeholder="Enter your email" required />
      </label>
      <label style={styles.label}>
        <span style={styles.text}>Password:</span>
        <input disabled={busy} style={styles.input} type="password" name="password" placeholder="Enter your password" required />
      </label>
      <button disabled={busy} style={styles.submit} type="submit">
        {busy ? 'Registering...' : 'Register'}
      </button>
    </form>
  )
}