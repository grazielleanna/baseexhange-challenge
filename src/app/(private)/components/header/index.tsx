import { Agent } from "./agent";
import { UserProfile } from "./user";

interface AdminHeaderProps {
    page: string;
}

type TitleType = {
    [x: string]: string;
}

export function AdminHeader({ page }: AdminHeaderProps) {

    const title: TitleType = {
        'orders': "Ordens"
    };

    return (
        <header className="flex items-center flex-wrap xl:flex-nowrap justify-between">
            <UserProfile />
            <h1 className="w-full text-center mt-4 md:mt-0">{title[page]}</h1>
            <Agent />
        </header>
    )
}