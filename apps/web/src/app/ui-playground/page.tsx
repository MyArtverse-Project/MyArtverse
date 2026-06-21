"use client"

/**
 * MyArtverse Internal UI Kit
 * -------------------------------------------------------------------------
 * A single-page, living reference of every shadcn/ui primitive installed in
 * this app. It mirrors the real UI elements used across the product (buttons,
 * forms, badges, avatars, cards, tabs, modals, tooltips, tables, etc.) so the
 * team can copy/paste canonical shadcn usage instead of hand-rolling Tailwind.
 *
 * Every component here comes from `@/components/ui/*` (added via the official
 * `shadcn` CLI). The pastel theme lives in ./shadcn.css and is applied to
 * <html> via the `.shadcn-scope` class while this page is mounted so that
 * portalled overlays inherit it too.
 */

import * as React from "react"
import {
  ArrowUpRight,
  Bell,
  Bold,
  Check,
  ChevronDown,
  CreditCard,
  Eye,
  Heart,
  Image as ImageIcon,
  Info,
  Italic,
  Loader2,
  LogOut,
  Mail,
  Moon,
  MoreHorizontal,
  Palette,
  Plus,
  Search,
  Settings,
  Sparkles,
  Star,
  Sun,
  Trash2,
  TriangleAlert,
  Underline,
  Upload,
  User,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

// CSP-safe inline avatar — the app's img-src policy blocks external image hosts,
// so we showcase <AvatarImage> with a self-contained data: gradient.
const DEMO_AVATAR =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#a78bfa'/><stop offset='1' stop-color='#f0abfc'/></linearGradient></defs><rect width='80' height='80' fill='url(#g)'/></svg>"
  )

/* ------------------------------------------------------------------ */
/* Layout helpers                                                     */
/* ------------------------------------------------------------------ */

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-6">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          {eyebrow}
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  )
}

function Demo({
  label,
  children,
  className,
}: {
  label?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      {label ? (
        <p className="mb-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
      ) : null}
      <div className={cn("flex flex-wrap items-center gap-3", className)}>
        {children}
      </div>
    </div>
  )
}

const NAV = [
  { id: "buttons", label: "Buttons & actions" },
  { id: "forms", label: "Forms & inputs" },
  { id: "selection", label: "Selection controls" },
  { id: "data", label: "Data display" },
  { id: "feedback", label: "Feedback & status" },
  { id: "navigation", label: "Navigation" },
  { id: "overlays", label: "Overlays & modals" },
  { id: "tokens", label: "Design tokens" },
]

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default function UIKitPage() {
  const [dark, setDark] = React.useState(false)
  const [progress, setProgress] = React.useState(64)
  const [liked, setLiked] = React.useState(false)
  const [marketing, setMarketing] = React.useState(true)
  const [notifications, setNotifications] = React.useState(true)
  const [plan, setPlan] = React.useState("pro")

  // Apply the scoped pastel theme to <html> while this page is mounted so that
  // portalled overlays (dialogs, popovers, selects, tooltips) inherit it.
  React.useEffect(() => {
    const root = document.documentElement
    root.classList.add("shadcn-scope")
    return () => {
      root.classList.remove("shadcn-scope", "dark")
    }
  }, [])

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  return (
    <TooltipProvider delayDuration={150}>
      <div className="min-h-screen bg-background text-foreground">
        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow">
                <Sparkles className="h-4 w-4" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold">MyArtverse UI Kit</p>
                <p className="text-xs text-muted-foreground">
                  built with shadcn/ui
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="hidden sm:inline-flex">
                internal
              </Badge>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setDark((d) => !d)}
                    aria-label="Toggle theme"
                  >
                    {dark ? (
                      <Sun className="h-4 w-4" />
                    ) : (
                      <Moon className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Toggle {dark ? "light" : "dark"} mode</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl gap-10 px-6 py-10 lg:grid lg:grid-cols-[200px_1fr]">
          {/* Side nav */}
          <aside className="hidden lg:block">
            <nav className="sticky top-24 space-y-1">
              {NAV.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>

          <main className="min-w-0 space-y-16">
            {/* Hero */}
            <div className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-accent via-secondary to-background p-8 shadow-sm">
              <Badge className="mb-4" variant="info">
                <Sparkles className="mr-1 h-3 w-3" /> pastel UI kit
              </Badge>
              <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    MyArtverse Shadcn UI Playground
              </h1>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground">
                
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={() => toast.success("Welcome to the kit!")}>
                  <Sparkles className="h-4 w-4" /> Get started
                </Button>
                <Button variant="outline" asChild>
                  <a href="#buttons">
                    Browse components <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* ---------------------------------------------------------- */}
            {/* BUTTONS & ACTIONS                                          */}
            {/* ---------------------------------------------------------- */}
            <Section
              id="buttons"
              eyebrow="Actions"
              title="Buttons & actions"
              description="The Button component with every variant, size and state, plus toggles and a dropdown menu for overflow actions."
            >
              <Demo label="Variants">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
              </Demo>

              <Demo label="Sizes & icons">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon" aria-label="Add">
                  <Plus className="h-4 w-4" />
                </Button>
                <Button>
                  <Upload className="h-4 w-4" /> Upload art
                </Button>
                <Button variant="outline">
                  Continue <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Demo>

              <Demo label="States">
                <Button disabled>Disabled</Button>
                <Button disabled>
                  <Loader2 className="h-4 w-4 animate-spin" /> Saving…
                </Button>
                <Button variant="secondary" disabled>
                  Disabled
                </Button>
              </Demo>

              <Demo label="Toggles & overflow menu">
                <Toggle aria-label="Like" pressed={liked} onPressedChange={setLiked}>
                  <Heart
                    className={cn("h-4 w-4", liked && "fill-current text-destructive")}
                  />
                </Toggle>
                <ToggleGroup type="multiple" variant="outline">
                  <ToggleGroupItem value="bold" aria-label="Bold">
                    <Bold className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="italic" aria-label="Italic">
                    <Italic className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="underline" aria-label="Underline">
                    <Underline className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" aria-label="More">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>My account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="h-4 w-4" /> Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="h-4 w-4" /> Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard className="h-4 w-4" /> Billing
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                      <LogOut className="h-4 w-4" /> Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Demo>
            </Section>

            {/* ---------------------------------------------------------- */}
            {/* FORMS & INPUTS                                             */}
            {/* ---------------------------------------------------------- */}
            <Section
              id="forms"
              eyebrow="Inputs"
              title="Forms & inputs"
              description="Text fields, search, textareas and selects with labels — the building blocks of every modal and settings screen."
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Text fields</CardTitle>
                    <CardDescription>Input, search and textarea.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="display-name">Display name</Label>
                      <Input id="display-name" placeholder="e.g. Nova" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="search">Search</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="search" className="pl-9" placeholder="Search artwork…" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" placeholder="Tell the world about your art…" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="disabled">Disabled</Label>
                      <Input id="disabled" disabled placeholder="Read only" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Select</CardTitle>
                    <CardDescription>Single-choice dropdown.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Pick a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Visual</SelectLabel>
                            <SelectItem value="illustration">Illustration</SelectItem>
                            <SelectItem value="3d">3D / Sculpt</SelectItem>
                            <SelectItem value="pixel">Pixel art</SelectItem>
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel>Writing</SelectLabel>
                            <SelectItem value="lore">Lore</SelectItem>
                            <SelectItem value="fiction">Fiction</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Volume</Label>
                      <Slider defaultValue={[60]} max={100} step={1} />
                    </div>
                    <div className="space-y-2">
                      <Label>Brush size</Label>
                      <Slider defaultValue={[20, 80]} max={100} step={1} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Section>

            {/* ---------------------------------------------------------- */}
            {/* SELECTION CONTROLS                                         */}
            {/* ---------------------------------------------------------- */}
            <Section
              id="selection"
              eyebrow="Toggles"
              title="Selection controls"
              description="Checkboxes, radio groups and switches for boolean and single-choice settings."
            >
              <div className="grid gap-6 sm:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Checkboxes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Checkbox id="c1" defaultChecked />
                      <Label htmlFor="c1" className="font-normal">
                        Allow comments
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="c2" />
                      <Label htmlFor="c2" className="font-normal">
                        Mature content
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="c3" disabled />
                      <Label htmlFor="c3" className="font-normal text-muted-foreground">
                        Disabled
                      </Label>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Radio group</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={plan} onValueChange={setPlan} className="gap-3">
                      {[
                        { v: "free", l: "Free" },
                        { v: "pro", l: "Pro" },
                        { v: "studio", l: "Studio" },
                      ].map((opt) => (
                        <div key={opt.v} className="flex items-center gap-2">
                          <RadioGroupItem value={opt.v} id={`plan-${opt.v}`} />
                          <Label htmlFor={`plan-${opt.v}`} className="font-normal">
                            {opt.l}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Switches</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="s1" className="font-normal">
                        Notifications
                      </Label>
                      <Switch
                        id="s1"
                        checked={notifications}
                        onCheckedChange={setNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="s2" className="font-normal">
                        Marketing emails
                      </Label>
                      <Switch
                        id="s2"
                        checked={marketing}
                        onCheckedChange={setMarketing}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="s3" className="font-normal text-muted-foreground">
                        Disabled
                      </Label>
                      <Switch id="s3" disabled />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Section>

            {/* ---------------------------------------------------------- */}
            {/* DATA DISPLAY                                               */}
            {/* ---------------------------------------------------------- */}
            <Section
              id="data"
              eyebrow="Display"
              title="Data display"
              description="Badges, avatars, cards, stats, tables, accordions and skeletons used across profiles, galleries and the studio."
            >
              <Demo label="Badges">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="destructive">Alert</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="success">
                  <Check className="mr-1 h-3 w-3" /> Verified
                </Badge>
              </Demo>

              <Demo label="Avatars & presence">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={DEMO_AVATAR} alt="" />
                  <AvatarFallback>NV</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src={DEMO_AVATAR} alt="" />
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <Avatar className="h-12 w-12 ring-2 ring-primary ring-offset-2 ring-offset-background">
                  <AvatarImage src={DEMO_AVATAR} alt="" />
                  <AvatarFallback>MV</AvatarFallback>
                </Avatar>
                <Avatar className="h-12 w-12">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex -space-x-3">
                  {["AR", "MV", "JS", "EC"].map((initials) => (
                    <Avatar key={initials} className="h-9 w-9 ring-2 ring-background">
                      <AvatarImage src={DEMO_AVATAR} alt="" />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  ))}
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground ring-2 ring-background">
                    +9
                  </span>
                </div>
              </Demo>

              {/* Stat cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Followers", value: "12.4k", delta: "+8.2%", icon: User },
                  { label: "Artworks", value: "318", delta: "+12", icon: ImageIcon },
                  { label: "Likes", value: "94.1k", delta: "+3.1%", icon: Heart },
                  { label: "Revenue", value: "$2,480", delta: "-1.4%", icon: CreditCard },
                ].map((stat) => (
                  <Card key={stat.label}>
                    <CardContent className="flex items-center justify-between p-5">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="mt-1 text-2xl font-semibold">{stat.value}</p>
                        <p
                          className={cn(
                            "mt-1 text-xs",
                            stat.delta.startsWith("-")
                              ? "text-destructive"
                              : "text-success"
                          )}
                        >
                          {stat.delta} this month
                        </p>
                      </div>
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                        <stat.icon className="h-5 w-5" />
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Artwork card */}
                <Card className="overflow-hidden">
                  <AspectRatio ratio={16 / 9}>
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/30 via-accent to-secondary">
                      <ImageIcon className="h-10 w-10 text-primary" />
                    </div>
                  </AspectRatio>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Aurora Drift</CardTitle>
                      <Badge variant="secondary">Illustration</Badge>
                    </div>
                    <CardDescription>
                      Posted 2 days ago · 1.2k views
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={DEMO_AVATAR} alt="" />
                        <AvatarFallback>NV</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">@nova</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setLiked((v) => !v)}
                    >
                      <Heart
                        className={cn(
                          "h-4 w-4",
                          liked && "fill-current text-destructive"
                        )}
                      />
                      {liked ? "942" : "941"}
                    </Button>
                  </CardFooter>
                </Card>

                {/* Table */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Recent uploads</CardTitle>
                    <CardDescription>A compact data table.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableCaption>Last 3 uploads this week.</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Views</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          { t: "Aurora Drift", s: "Published", v: "1,204" },
                          { t: "Neon Garden", s: "Draft", v: "—" },
                          { t: "Tidepool", s: "Published", v: "842" },
                        ].map((row) => (
                          <TableRow key={row.t}>
                            <TableCell className="font-medium">{row.t}</TableCell>
                            <TableCell>
                              <Badge
                                variant={row.s === "Published" ? "success" : "secondary"}
                              >
                                {row.s}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">{row.v}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              {/* Accordion + Hover card + Skeleton */}
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">FAQ (Accordion)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible>
                      <AccordionItem value="a">
                        <AccordionTrigger>Can I sell commissions?</AccordionTrigger>
                        <AccordionContent>
                          Yes — open your studio, enable commissions and set your
                          tiers.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="b">
                        <AccordionTrigger>How do folders work?</AccordionTrigger>
                        <AccordionContent>
                          Folders group artworks and can be reordered with
                          drag-and-drop.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="c">
                        <AccordionTrigger>Is there an API?</AccordionTrigger>
                        <AccordionContent>
                          A public REST API is on the roadmap for verified studios.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Hover card & loading</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button variant="link" className="px-0">
                          @nova
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-72">
                        <div className="flex gap-3">
                          <Avatar>
                            <AvatarImage src={DEMO_AVATAR} alt="" />
                            <AvatarFallback>NV</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <p className="text-sm font-semibold">Nova</p>
                            <p className="text-sm text-muted-foreground">
                              Illustrator · 12.4k followers
                            </p>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>

                    <div className="flex items-center gap-3">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Upload progress</span>
                        <span className="font-medium">{progress}%</span>
                      </div>
                      <Progress value={progress} />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setProgress((p) => Math.max(0, p - 10))}
                        >
                          -10
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setProgress((p) => Math.min(100, p + 10))}
                        >
                          +10
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Section>

            {/* ---------------------------------------------------------- */}
            {/* FEEDBACK & STATUS                                          */}
            {/* ---------------------------------------------------------- */}
            <Section
              id="feedback"
              eyebrow="Feedback"
              title="Feedback & status"
              description="Alerts, toasts, tooltips and empty states keep people informed about what's happening."
            >
              <div className="grid gap-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Heads up</AlertTitle>
                  <AlertDescription>
                    Your changes are saved automatically as you edit.
                  </AlertDescription>
                </Alert>
                <Alert variant="success">
                  <Check className="h-4 w-4" />
                  <AlertTitle>Published</AlertTitle>
                  <AlertDescription>
                    Aurora Drift is now live on your profile.
                  </AlertDescription>
                </Alert>
                <Alert variant="warning">
                  <TriangleAlert className="h-4 w-4" />
                  <AlertTitle>Storage almost full</AlertTitle>
                  <AlertDescription>
                    You're using 92% of your plan's storage.
                  </AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <TriangleAlert className="h-4 w-4" />
                  <AlertTitle>Upload failed</AlertTitle>
                  <AlertDescription>
                    The file exceeds the 25 MB limit. Try a smaller export.
                  </AlertDescription>
                </Alert>
              </div>

              <Demo label="Toasts & tooltips">
                <Button variant="outline" onClick={() => toast("Saved to drafts")}>
                  Default toast
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toast.success("Artwork published!")}
                >
                  Success toast
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    toast.error("Something went wrong", {
                      description: "Please try again in a moment.",
                    })
                  }
                >
                  Error toast
                </Button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Info">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Helpful tooltip text</TooltipContent>
                </Tooltip>
              </Demo>

              {/* Empty state */}
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center">
                <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  <ImageIcon className="h-6 w-6" />
                </span>
                <p className="text-sm font-semibold">No artworks yet</p>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  Upload your first piece to start building your gallery.
                </p>
                <Button className="mt-4" size="sm">
                  <Upload className="h-4 w-4" /> Upload art
                </Button>
              </div>
            </Section>

            {/* ---------------------------------------------------------- */}
            {/* NAVIGATION                                                 */}
            {/* ---------------------------------------------------------- */}
            <Section
              id="navigation"
              eyebrow="Wayfinding"
              title="Navigation"
              description="Tabs, breadcrumbs and pagination help people move through profiles, galleries and search results."
            >
              <Card>
                <CardContent className="space-y-6 p-6">
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#">Home</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#">@nova</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Gallery</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>

                  <Tabs defaultValue="gallery">
                    <TabsList>
                      <TabsTrigger value="gallery">
                        <ImageIcon className="h-4 w-4" /> Gallery
                      </TabsTrigger>
                      <TabsTrigger value="about">
                        <User className="h-4 w-4" /> About
                      </TabsTrigger>
                      <TabsTrigger value="shop">
                        <CreditCard className="h-4 w-4" /> Shop
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="gallery" className="pt-4 text-sm text-muted-foreground">
                      318 artworks across 12 folders.
                    </TabsContent>
                    <TabsContent value="about" className="pt-4 text-sm text-muted-foreground">
                      Digital illustrator based in the cloud.
                    </TabsContent>
                    <TabsContent value="shop" className="pt-4 text-sm text-muted-foreground">
                      Prints and commissions available.
                    </TabsContent>
                  </Tabs>

                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>
                          2
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </CardContent>
              </Card>
            </Section>

            {/* ---------------------------------------------------------- */}
            {/* OVERLAYS & MODALS                                          */}
            {/* ---------------------------------------------------------- */}
            <Section
              id="overlays"
              eyebrow="Overlays"
              title="Overlays & modals"
              description="Dialogs, destructive confirmations, side sheets and popovers — all portalled and themed."
            >
              <Demo label="Triggers">
                {/* Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4" /> New folder
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create folder</DialogTitle>
                      <DialogDescription>
                        Group related artworks into a folder.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                      <div className="space-y-2">
                        <Label htmlFor="folder-name">Folder name</Label>
                        <Input id="folder-name" placeholder="e.g. Sketches" />
                      </div>
                      <div className="space-y-2">
                        <Label>Accent color</Label>
                        <div className="flex gap-2">
                          {[
                            "bg-primary",
                            "bg-success",
                            "bg-warning",
                            "bg-info",
                            "bg-destructive",
                          ].map((c) => (
                            <button
                              key={c}
                              type="button"
                              className={cn(
                                "h-7 w-7 rounded-full ring-offset-2 ring-offset-background transition hover:ring-2 hover:ring-ring",
                                c
                              )}
                              aria-label={c}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button onClick={() => toast.success("Folder created")}>
                          Create
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Alert dialog */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4" /> Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this artwork?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action can't be undone. The artwork and its stats will
                        be permanently removed.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => toast.error("Artwork deleted")}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                {/* Sheet */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">
                      <Settings className="h-4 w-4" /> Settings
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Profile settings</SheetTitle>
                      <SheetDescription>
                        Update how others see you.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="space-y-4 py-6">
                      <div className="space-y-2">
                        <Label htmlFor="sheet-name">Name</Label>
                        <Input id="sheet-name" defaultValue="Nova" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sheet-public" className="font-normal">
                          Public profile
                        </Label>
                        <Switch id="sheet-public" defaultChecked />
                      </div>
                    </div>
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button onClick={() => toast.success("Settings saved")}>
                          Save changes
                        </Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>

                {/* Popover */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <Bell className="h-4 w-4" /> Notifications
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-80">
                    <p className="mb-3 text-sm font-semibold">Notifications</p>
                    <ScrollArea className="h-40 pr-3">
                      <div className="space-y-3">
                        {[
                          { u: "Aria", t: "started following you", img: 32 },
                          { u: "Milo", t: "liked Aurora Drift", img: 15 },
                          { u: "Sage", t: "commented on Tidepool", img: 22 },
                          { u: "Echo", t: "shared your gallery", img: 49 },
                          { u: "Wren", t: "mentioned you", img: 8 },
                        ].map((n, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={DEMO_AVATAR} alt="" />
                              <AvatarFallback>{n.u[0]}</AvatarFallback>
                            </Avatar>
                            <p className="text-sm">
                              <span className="font-medium">{n.u}</span>{" "}
                              <span className="text-muted-foreground">{n.t}</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </PopoverContent>
                </Popover>
              </Demo>
            </Section>

            {/* ---------------------------------------------------------- */}
            {/* DESIGN TOKENS                                              */}
            {/* ---------------------------------------------------------- */}
            <Section
              id="tokens"
              eyebrow="Foundations"
              title="Design tokens"
              description="The semantic color palette that powers every component. Toggle dark mode in the header to see them adapt."
            >
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                {[
                  { name: "background", cls: "bg-background" },
                  { name: "foreground", cls: "bg-foreground" },
                  { name: "card", cls: "bg-card" },
                  { name: "primary", cls: "bg-primary" },
                  { name: "secondary", cls: "bg-secondary" },
                  { name: "muted", cls: "bg-muted" },
                  { name: "accent", cls: "bg-accent" },
                  { name: "success", cls: "bg-success" },
                  { name: "warning", cls: "bg-warning" },
                  { name: "info", cls: "bg-info" },
                  { name: "destructive", cls: "bg-destructive" },
                  { name: "border", cls: "bg-border" },
                ].map((tok) => (
                  <div
                    key={tok.name}
                    className="overflow-hidden rounded-lg border border-border bg-card"
                  >
                    <div className={cn("h-14 w-full", tok.cls)} />
                    <div className="flex items-center gap-1.5 px-2.5 py-2">
                      <Palette className="h-3 w-3 text-muted-foreground" />
                      <span className="truncate text-xs font-medium">{tok.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Footer */}
            <footer className="flex flex-col items-center gap-2 border-t border-border pt-8 text-center text-sm text-muted-foreground">
              <p className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-primary" /> MyArtverse Shadcn UI Playground
              </p>
            </footer>
          </main>
        </div>

        <Toaster richColors closeButton />
      </div>
    </TooltipProvider>
  )
}
