import Image from "next/image";

export function Agent() {
    return (
        <button
            type="button"
            className="fixed bottom-2 right-2 xl:relative xl:bottom-auto xl:right-auto bg-header px-6 py-6"
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