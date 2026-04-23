import AppLayout from "@/components/layouts/AppLayout/AppLayout"

export default function MainLayout(props: React.PropsWithChildren) {
  return <AppLayout>{props.children}</AppLayout>
}
