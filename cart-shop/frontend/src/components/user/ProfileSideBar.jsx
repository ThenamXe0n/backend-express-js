

const menuItems = [
  { label: "My Profile", icon: "👤", key: "profile" },
  { label: "My Orders", icon: "📦", key: "orders" },
  { label: "Wishlist", icon: "❤️", key: "wishlist" },
  { label: "Settings", icon: "⚙️", key: "settings" },
  { label: "change password", icon: "🔒", key: "changePassword" },
];

export default function ProfileSideBar({ user,active,setActive }) {
  

  return (
    <aside className="w-full md:w-64 min-h-screen bg-white border-r border-gray-200">
      {/* User Info */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || "https://i.pravatar.cc/100"}
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <p className="font-semibold text-gray-900">
              {user?.name || "John Doe"}
            </p>
            <p className="text-sm text-gray-500 text-wrap max-w-44">
              {user?.email || "user@email.com"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActive(item.key)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
              ${
                active === item.key
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
