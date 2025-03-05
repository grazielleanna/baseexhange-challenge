import { AdminFilter } from "./components/filter";
import { AdminList } from "./components/list";

export default function AdminPage() {

    return (
        <section className="px-8 md:px-24 mt-12">
            <AdminFilter />

            <AdminList />
        </section>
    )
}