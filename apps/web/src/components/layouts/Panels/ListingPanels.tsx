import type { UserType } from "@/types/users"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LuClipboardList, LuShoppingBag, LuSparkles } from "react-icons/lu"
import { PanelCard, PanelEmptyState } from "./PanelCard"

const statusLabel: Record<string, string> = {
  open: "Open",
  closed: "Closed",
  limited: "Limited",
}

export function CommissionQueuePanel({
  user,
  isOwner,
}: {
  user: UserType
  isOwner?: boolean
}) {
  const rows = [
    { label: "Commissions", value: user.commissionStatus },
    { label: "Requests", value: user.requestStatus },
    { label: "Art trades", value: user.artTradeStatus },
  ]

  return (
    <PanelCard title="Commission queue" icon={<LuClipboardList />}>
      <div className="space-y-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="bg-background/70 flex items-center justify-between rounded-xl border border-primary/10 px-4 py-3"
          >
            <span className="text-sm font-medium">{row.label}</span>
            <Badge variant={row.value === "open" ? "default" : "secondary"}>
              {statusLabel[row.value] ?? row.value}
            </Badge>
          </div>
        ))}
      </div>
      {user.hasArtistAccess ? (
        <Button className="w-full" variant="secondary" asChild>
          <Link href="/studio/listings">Manage listings</Link>
        </Button>
      ) : isOwner ? (
        <p className="text-muted-foreground text-center text-xs">
          Enable artist access in settings to manage commission queues.
        </p>
      ) : null}
    </PanelCard>
  )
}

export function FeaturedListingPanel({ isOwner }: { isOwner?: boolean }) {
  return (
    <PanelCard title="Featured listing" icon={<LuSparkles />}>
      <PanelEmptyState isOwner={isOwner} ownerHint="Listings are coming soon.">
        Featured shop listings will appear here.
      </PanelEmptyState>
    </PanelCard>
  )
}

export function RecentListingsPanel({ isOwner }: { isOwner?: boolean }) {
  return (
    <PanelCard title="Recent listings" icon={<LuShoppingBag />}>
      <PanelEmptyState isOwner={isOwner} ownerHint="Listings are coming soon.">
        Your most recent listings will show up here.
      </PanelEmptyState>
    </PanelCard>
  )
}
