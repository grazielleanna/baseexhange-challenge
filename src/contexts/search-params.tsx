"use client"

import { createContext, useContext, ReactNode } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface SearchParamsContextType {
    searchParams: URLSearchParams;
    handleSearch: (params: Record<string, string>) => void
}

const SearchParamsContext = createContext<SearchParamsContextType | undefined>(undefined);

export const useSearchParamsContext = (): SearchParamsContextType => {
    const context = useContext(SearchParamsContext);
    if (!context) {
        throw new Error('useSearchParamsContext must be used within a SearchParamsProvider');
    }
    return context;
};

interface SearchParamsProviderProps {
    children: ReactNode;
}

export const SearchParamsProvider: React.FC<SearchParamsProviderProps> = ({ children }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    //   const [searchParams, setSearchParams] = useState<URLSearchParams>(new URLSearchParams(window.location.search));
    //   const nextSearchParams = useSearchParams();

    //   const updateSearchParams = (params: Record<string, string>) => {
    //     const newParams = new URLSearchParams(params);
    //     setSearchParams(newParams);
    //     nextSearchParams.replace(newParams); 
    //   };
    function handleSearch(params: Record<string, string>) {
        const newParams = new URLSearchParams(params);

        replace(`${pathname}?${newParams.toString()}`);
    }


    return (
        <SearchParamsContext.Provider value={{ searchParams, handleSearch }}>
            {children}
        </SearchParamsContext.Provider>
    );
};
