"use client"

import Image from "next/image"
import { LoadAndGetUserAuthenticated } from "./data/user"
import { UserSkeleton } from "./user-skeleton";

export function UserProfile() {
    const { data, isLoading, error } = LoadAndGetUserAuthenticated();

    return (
        <>
            {isLoading ? (
                <UserSkeleton />
            ) : error ? (
                <p>Erro ao obter dados do usuário.</p>
            ) : (
                <div
                    className="flex items-center justify-center gap-4 py-2.5 px-6 bg-header border-r-[#434343] border-l-[#434343] border-r-[1px] border-l-[1px] max-w-[260px] w-full"
                >
                    <div className="min-w-10 max-w-10 min-h-10 max-h-10 bg-black rounded-full flex items-center justify-center">
                        <Image
                            src="/icons/user.svg"
                            width={16}
                            height={18}
                            alt="Icon of person with white tie"
                        />
                    </div>

                    <div className="w-full">
                        <h5 className="font-bold text-sm">{data?.firstName} {data?.lastName}</h5>
                        <span className="font-bold uppercase text-[10px] text-[#DDDDDD]">123 - BASE_EX DTVM</span>
                    </div>
                </div>
            )}
        </>
    )
}