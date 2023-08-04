declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.scss'

declare module '*.png'

declare const overlay: HTMLDivElement

declare type InputChange = React.ChangeEvent<
  HTMLInputElement & HTMLTextAreaElement
>
declare type FormSubmit = React.FormEvent<HTMLButtonElement>
