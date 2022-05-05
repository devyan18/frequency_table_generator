import { useState,useEffect } from "react"
import copyToClipboard from "../utils/copyToClipboard"

export default function Btn({title, data}){

  const [copied, setCopied] = useState(false)

  const handleCopiedData = () => {
    copyToClipboard(data)
    setCopied(true)
  }

  useEffect(() => {
    setCopied(false)
  }, [])


  return (
    <>
      <button
      style={{ minWidth: '80px' }}
        onClick={handleCopiedData}
      >
      Copy - {title}
      </button>
      <span>{copied && ' ✅'}</span>
      <br />
    </>
  )
}