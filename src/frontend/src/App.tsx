import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import About from "@/pages/About";
import Admin from "@/pages/Admin";
import Blog from "@/pages/Blog";
import Booking from "@/pages/Booking";
import Contact from "@/pages/Contact";
import Experiences from "@/pages/Experiences";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import MapSearch from "@/pages/MapSearch";
import Register from "@/pages/Register";
import VillaDetail from "@/pages/VillaDetail";
import Villas from "@/pages/Villas";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

// Root layout
function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Outlet />
      <Footer />
      <Toaster richColors position="bottom-right" />
    </div>
  );
}

// Routes
const rootRoute = createRootRoute({ component: RootLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const villasRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/villas",
  component: Villas,
});

const villaDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/villas/$id",
  component: VillaDetail,
});

const bookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/booking/$id",
  component: Booking,
});

const experiencesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/experiences",
  component: Experiences,
});

const mapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/map",
  component: MapSearch,
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: Blog,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: Admin,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: Register,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  villasRoute,
  villaDetailRoute,
  bookingRoute,
  experiencesRoute,
  mapRoute,
  blogRoute,
  aboutRoute,
  contactRoute,
  adminRoute,
  loginRoute,
  registerRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
