import { AdminHeader } from "../../components/header"

export default async function AdminLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ page: string }>
}) {
    const { page } = await params

    return (
        <>
            <AdminHeader page={page} />
            {children}
        </>
    )
}