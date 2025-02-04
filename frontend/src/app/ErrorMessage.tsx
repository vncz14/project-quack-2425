export default function Error_banner({ error }) {
  return (
    <div className="error">
      <h1>Error {error.status}</h1>
      
      <p>{error.message}</p>
  </div>
  )
}