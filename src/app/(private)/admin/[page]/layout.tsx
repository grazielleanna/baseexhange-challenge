import { SearchParamsProvider } from "@/contexts/search-params"
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
            <SearchParamsProvider>
                <AdminHeader page={page} />
                {children}
            </SearchParamsProvider>
        </>
    )
}