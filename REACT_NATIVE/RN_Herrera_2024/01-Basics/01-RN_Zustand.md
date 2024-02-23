# REACT NATIVE - ZUSTAND

- Zustand es genial para manejar el estado

> npm i zustand

- Creo el store global en src/store/auth.store.ts
- Creo una interfaz para definir el estado

~~~js
interface AuthState{
    status: 'authenticated' | 'unauthenticated' | 'checking'
    token?: string
    user?: {
        name: string
        email: string
    }
}
~~~