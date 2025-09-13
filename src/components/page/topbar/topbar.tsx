import ThemeToggle from "@/components/common/theme-toggle"

const Topbar = () => {
  return (
    <section className="w-full flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold">Seller Console</h1>
      <ThemeToggle />
    </section>
  )
}

export default Topbar