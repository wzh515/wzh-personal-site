/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 联系表单提交地址（Formspree / Web3Forms 等），留空则使用模拟提交 */
  readonly VITE_CONTACT_ENDPOINT?: string
}
