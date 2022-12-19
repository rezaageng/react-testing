import Link from "next/link"

export default function Home() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="text-center">
        <p>im here to testing</p>
        <Link className="hover:bg-indigo-500 hover:text-white" href="/login">
          Login
        </Link>
      </div>
    </div>
  )
}
