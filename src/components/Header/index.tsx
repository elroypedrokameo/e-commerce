import { Link } from "react-router-dom"

function Header() {
  const listMenuHeader = [
    {
      id: "1",
      label: "Tentang E-Commerce",
      linkTo: "/about"
    },
    {
      id: "2",
      label: "Mitra E-Commerce",
      linkTo: "/mitra"
    },
    {
      id: "3",
      label: "Reseller",
      linkTo: "/reseller"
    },
    {
      id: "4",
      label: "Promo",
      linkTo: "/reseller"
    },
    {
      id: "5",
      label: "Keranjang",
      linkTo: "/cart"
    },
  ]

  return (
    <header className="shadow-lg p-5">
      <div className="flex items-center justify-between max-w-container mx-auto">
        <div>
          <Link to="/">E-Commerce</Link>
        </div>
        <div className="flex gap-5">
          {listMenuHeader.map((item) => (
            <nav key={item.id}>
              <ul>
                <li><Link to={item.linkTo}>{item.label}</Link></li>
              </ul>
            </nav>
          ))}
        </div>

      </div>
    </header>
  )
}

export default Header