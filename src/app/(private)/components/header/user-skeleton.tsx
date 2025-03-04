import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export function UserSkeleton() {
    return (
        <div
            className="flex items-center justify-center gap-4 py-2.5 px-6 bg-header border-r-[#434343] border-l-[#434343] border-r-[1px] border-l-[1px] max-w-[260px] w-full"
        >
            <div className="min-w-10 max-w-10 min-h-10 max-h-10 bg-black rounded-full flex items-center justify-center" >
                <Image
                    src="/icons/user.svg"
                    width={16}
                    height={18}
                    alt="Icon of person with white tie"
                />
            </div>

            <div className="w-full">
                <Skeleton className="h-5 w-40 rounded-xs" />
                <Skeleton className="h-3 w-24 mt-2 rounded-xs" />
            </div>
        </div>
    )
}