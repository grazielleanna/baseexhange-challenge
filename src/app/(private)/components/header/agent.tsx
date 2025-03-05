import Image from "next/image";

export function Agent() {
    return (
        <button
            type="button"
            className="fixed bottom-2 right-2 xl:relative xl:bottom-auto xl:right-auto bg-header p-4 xl:px-6 xl:py-6 z-50"
        >
            <Image
                src="/icons/face-agent.svg"
                width={20}
                height={20}
                alt="Icon white of face agent"
            />
        </button>
    )
}