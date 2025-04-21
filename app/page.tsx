"use client"
import { useState,FormEvent } from 'react'


export default function Home() {
  const [content, setContent] = useState<string>("")
  const [response, setResponse] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setResponse("")

    try {
      const res = await fetch("http://localhost:8000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      })

      if (!res.ok) throw new Error("Failed to fetch")

      const data = await res.json()
      setResponse(data.response)
      setContent("")
    } catch (err) {
      console
      setResponse("Something went wrong.")
    } finally {
       setContent("")
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">Pawa IT Chatbot</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full p-3 border rounded-md shadow-sm"
            placeholder="Type something..."
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>

        {response && (
          <div className="bg-white p-4 border rounded-md shadow-md whitespace-pre-line">
            <h2 className="font-semibold mb-2">Response:</h2>
            <p>{response}</p>
          </div>
        )}
      </div>
    </main>
  )
}
