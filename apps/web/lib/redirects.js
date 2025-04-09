export default [
  { source: "/signup", destination: "/register", permanent: true },
  { source: "/sign-up", destination: "/register", permanent: true },
  { source: "/signin", destination: "/login", permanent: true },
  { source: "/sign-in", destination: "/login", permanent: true },
  {
    source: "/dashboard",
    destination: "/studio/overview",
    permanent: true
  },
  // TODO: change dest. route to /settings/profile soon
  { source: "/settings", destination: "/settings/profile", permanent: true }
]
