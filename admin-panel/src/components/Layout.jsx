import Sidebar from './Sidebar'

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 max-w-6xl">{children}</main>
    </div>
  )
}
