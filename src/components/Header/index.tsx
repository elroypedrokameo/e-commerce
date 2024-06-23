import { useState } from "react";
import { Link } from "react-router-dom";

type headerTypes = {
  isHomePage?: boolean;
  onSearch?: (query: string) => void;
}

const Header: React.FC<headerTypes> = ({ isHomePage, onSearch }) => {
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

  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (onSearch) {
      onSearch(value)
    }
  }

  return (
    <header className="shadow-lg p-5">
      <div className="flex items-center justify-between max-w-container mx-auto">
        <div className="flex items-center gap-8">
          <Link to="/">E-Commerce</Link>
          {isHomePage ? (
            <div className="search">
              <input
                type="text"
                onChange={handleChange}
                value={query}
                placeholder="Cari Di E-Commerce"
                className="border border-black rounded-md p-2 w-80"
              />
            </div>
          ) : null}
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