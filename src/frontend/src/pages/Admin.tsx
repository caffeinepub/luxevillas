import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { VILLAS } from "@/data/villas";
import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Building,
  Calendar,
  Diamond,
  DollarSign,
  LayoutDashboard,
  LogOut,
  Settings,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type AdminTab = "dashboard" | "villas" | "bookings" | "users" | "settings";

const BOOKINGS = [
  {
    id: "BK001",
    guest: "Priya Sharma",
    villa: "The Golden Retreat",
    checkin: "2026-03-15",
    checkout: "2026-03-18",
    amount: 151200,
    status: "confirmed",
  },
  {
    id: "BK002",
    guest: "Rahul Gupta",
    villa: "Udaipur Palace Villa",
    checkin: "2026-03-20",
    checkout: "2026-03-25",
    amount: 366200,
    status: "pending",
  },
  {
    id: "BK003",
    guest: "Arjun Mehta",
    villa: "Coorg Coffee Estate",
    checkin: "2026-03-22",
    checkout: "2026-03-24",
    amount: 66080,
    status: "confirmed",
  },
  {
    id: "BK004",
    guest: "Sneha Iyer",
    villa: "Himalayan Sky Villa",
    checkin: "2026-03-28",
    checkout: "2026-04-02",
    amount: 206500,
    status: "cancelled",
  },
  {
    id: "BK005",
    guest: "Vikram Patel",
    villa: "Kerala Backwater Retreat",
    checkin: "2026-04-05",
    checkout: "2026-04-08",
    amount: 134820,
    status: "confirmed",
  },
];

const USERS_DATA = [
  {
    name: "Priya Sharma",
    email: "priya@example.com",
    role: "user",
    bookings: 3,
  },
  {
    name: "Rahul Gupta",
    email: "rahul@example.com",
    role: "user",
    bookings: 2,
  },
  {
    name: "Arjun Mehta",
    email: "arjun@example.com",
    role: "user",
    bookings: 5,
  },
  {
    name: "Admin User",
    email: "admin@luxevillas.in",
    role: "admin",
    bookings: 0,
  },
];

const STATUS_COLORS: Record<string, string> = {
  confirmed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function Admin() {
  const navigate = useNavigate();
  const { actor } = useActor();
  const { clear } = useInternetIdentity();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [statusFilter, setStatusFilter] = useState("all");
  const [addVillaOpen, setAddVillaOpen] = useState(false);

  useEffect(() => {
    if (!actor) return;
    actor
      .isCallerAdmin()
      .then(setIsAdmin)
      .catch(() => setIsAdmin(false));
  }, [actor]);

  if (isAdmin === null) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <div className="text-center">
          <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        data-ocid="admin.error_state"
      >
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">Access Denied</h2>
          <p className="text-muted-foreground mb-6">
            You don't have administrator access.
          </p>
          <Link
            to="/"
            data-ocid="admin.link"
            className="text-gold hover:underline"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const filteredBookings =
    statusFilter === "all"
      ? BOOKINGS
      : BOOKINGS.filter((b) => b.status === statusFilter);
  const totalRevenue = BOOKINGS.filter((b) => b.status === "confirmed").reduce(
    (s, b) => s + b.amount,
    0,
  );

  const NAV_ITEMS: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    { id: "villas", label: "Villas", icon: <Building className="w-4 h-4" /> },
    {
      id: "bookings",
      label: "Bookings",
      icon: <Calendar className="w-4 h-4" />,
    },
    { id: "users", label: "Users", icon: <Users className="w-4 h-4" /> },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen pt-20 flex">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-sidebar border-r border-sidebar-border hidden lg:flex flex-col sticky top-20 h-[calc(100vh-80px)]">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <Diamond className="w-4 h-4 text-gold" fill="currentColor" />
            <span className="font-serif text-sm font-bold text-gold">
              Admin Panel
            </span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              data-ocid="admin.tab"
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id
                  ? "bg-gold text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <button
            type="button"
            onClick={() => {
              clear();
              navigate({ to: "/" });
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6 lg:p-8">
        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="font-serif text-2xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                {
                  label: "Total Villas",
                  value: VILLAS.length,
                  icon: <Building className="w-5 h-5" />,
                  change: "+2 this month",
                },
                {
                  label: "Total Bookings",
                  value: BOOKINGS.length,
                  icon: <Calendar className="w-5 h-5" />,
                  change: "+12 this month",
                },
                {
                  label: "Revenue",
                  value: `₹${(totalRevenue / 100000).toFixed(1)}L`,
                  icon: <DollarSign className="w-5 h-5" />,
                  change: "+18% vs last month",
                },
                {
                  label: "Avg. Rating",
                  value: "4.8",
                  icon: <Star className="w-5 h-5" />,
                  change: "+0.1 this month",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  data-ocid="admin.card"
                  className="bg-card border border-border rounded-xl p-5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                      {stat.icon}
                    </div>
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-1">
                    {stat.change}
                  </div>
                </div>
              ))}
            </div>

            <h2 className="font-serif text-lg font-bold mb-4">
              Recent Bookings
            </h2>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <Table data-ocid="admin.table">
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Villa</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {BOOKINGS.slice(0, 3).map((b, i) => (
                    <TableRow
                      key={b.id}
                      data-ocid={`admin.row.${i + 1}`}
                      className="border-border"
                    >
                      <TableCell className="font-mono text-xs text-gold">
                        {b.id}
                      </TableCell>
                      <TableCell className="text-sm">{b.guest}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {b.villa}
                      </TableCell>
                      <TableCell className="text-sm font-semibold">
                        ₹{b.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`text-[10px] border ${STATUS_COLORS[b.status]}`}
                        >
                          {b.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        )}

        {/* Villas */}
        {activeTab === "villas" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-serif text-2xl font-bold">Villas</h1>
              <Dialog open={addVillaOpen} onOpenChange={setAddVillaOpen}>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    data-ocid="admin.open_modal_button"
                    className="px-5 py-2.5 gold-gradient text-primary-foreground text-sm font-bold tracking-wide rounded-lg hover:opacity-90 transition-opacity"
                  >
                    + Add Villa
                  </button>
                </DialogTrigger>
                <DialogContent
                  data-ocid="admin.dialog"
                  className="bg-card border-border max-w-lg"
                >
                  <DialogHeader>
                    <DialogTitle className="font-serif text-xl">
                      Add New Villa
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-2">
                    <div>
                      <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
                        Villa Name
                      </Label>
                      <Input
                        data-ocid="admin.input"
                        placeholder="e.g. The Golden Retreat"
                        className="bg-background border-border"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
                          Location
                        </Label>
                        <Input
                          data-ocid="admin.input"
                          placeholder="e.g. Goa"
                          className="bg-background border-border"
                        />
                      </div>
                      <div>
                        <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
                          Price/night (₹)
                        </Label>
                        <Input
                          data-ocid="admin.input"
                          type="number"
                          placeholder="45000"
                          className="bg-background border-border"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
                          Bedrooms
                        </Label>
                        <Input
                          data-ocid="admin.input"
                          type="number"
                          placeholder="4"
                          className="bg-background border-border"
                        />
                      </div>
                      <div>
                        <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
                          Bathrooms
                        </Label>
                        <Input
                          data-ocid="admin.input"
                          type="number"
                          placeholder="4"
                          className="bg-background border-border"
                        />
                      </div>
                      <div>
                        <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
                          Max Guests
                        </Label>
                        <Input
                          data-ocid="admin.input"
                          type="number"
                          placeholder="8"
                          className="bg-background border-border"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        data-ocid="admin.cancel_button"
                        onClick={() => setAddVillaOpen(false)}
                        className="px-5 py-2.5 border border-border text-sm font-semibold rounded-lg hover:border-gold transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        data-ocid="admin.save_button"
                        onClick={() => {
                          setAddVillaOpen(false);
                          toast.success("Villa added!");
                        }}
                        className="px-5 py-2.5 gold-gradient text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90"
                      >
                        Save Villa
                      </button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <Table data-ocid="admin.table">
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead>Villa</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Price/Night</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {VILLAS.map((v, i) => (
                    <TableRow
                      key={v.id}
                      data-ocid={`admin.row.${i + 1}`}
                      className="border-border"
                    >
                      <TableCell className="font-semibold text-sm">
                        {v.name}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {v.city}
                      </TableCell>
                      <TableCell className="text-sm">
                        ₹{v.price.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-sm">★ {v.rating}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            data-ocid={`admin.edit_button.${i + 1}`}
                            onClick={() => toast.info(`Editing ${v.name}`)}
                            className="text-xs text-gold hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            data-ocid={`admin.delete_button.${i + 1}`}
                            onClick={() =>
                              toast.error("Villa deleted (demo only)")
                            }
                            className="text-xs text-destructive hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        )}

        {/* Bookings */}
        {activeTab === "bookings" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-serif text-2xl font-bold">Bookings</h1>
              <div className="flex gap-2">
                {["all", "confirmed", "pending", "cancelled"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    data-ocid="admin.tab"
                    onClick={() => setStatusFilter(s)}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                      statusFilter === s
                        ? "bg-gold text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <Table data-ocid="admin.table">
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead>ID</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Villa</TableHead>
                    <TableHead>Check-In</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((b, i) => (
                    <TableRow
                      key={b.id}
                      data-ocid={`admin.row.${i + 1}`}
                      className="border-border"
                    >
                      <TableCell className="font-mono text-xs text-gold">
                        {b.id}
                      </TableCell>
                      <TableCell className="text-sm">{b.guest}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {b.villa}
                      </TableCell>
                      <TableCell className="text-sm">{b.checkin}</TableCell>
                      <TableCell className="text-sm font-semibold">
                        ₹{b.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`text-[10px] border ${STATUS_COLORS[b.status]}`}
                        >
                          {b.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        )}

        {/* Users */}
        {activeTab === "users" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="font-serif text-2xl font-bold mb-6">Users</h1>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <Table data-ocid="admin.table">
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Bookings</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {USERS_DATA.map((u, i) => (
                    <TableRow
                      key={u.email}
                      data-ocid={`admin.row.${i + 1}`}
                      className="border-border"
                    >
                      <TableCell className="font-semibold text-sm">
                        {u.name}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {u.email}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            u.role === "admin"
                              ? "bg-gold/10 text-gold border-gold/20"
                              : "bg-secondary text-muted-foreground border-border"
                          }
                        >
                          {u.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{u.bookings}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        )}

        {/* Settings */}
        {activeTab === "settings" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="font-serif text-2xl font-bold mb-6">Settings</h1>
            <div className="bg-card border border-border rounded-xl p-6 max-w-lg">
              <h2 className="font-semibold mb-4">General Settings</h2>
              <div className="space-y-4">
                <div>
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                    Platform Name
                  </Label>
                  <Input
                    data-ocid="admin.input"
                    defaultValue="LuxeVillas"
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                    Contact Email
                  </Label>
                  <Input
                    data-ocid="admin.input"
                    defaultValue="hello@luxevillas.in"
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                    Support Phone
                  </Label>
                  <Input
                    data-ocid="admin.input"
                    defaultValue="+91 98765 43210"
                    className="bg-background border-border"
                  />
                </div>
                <button
                  type="button"
                  data-ocid="admin.save_button"
                  onClick={() => toast.success("Settings saved!")}
                  className="px-6 py-2.5 gold-gradient text-primary-foreground text-sm font-bold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
