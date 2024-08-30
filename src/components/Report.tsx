import { Skeleton } from "@/components/ui/skeleton"

export const Report = () => {
    return (
        <div className="flex justify-center p-4">
            <div className="flex flex-col space-y-3">
                <div>
                    <span className="text-2xl text-center">Final Verdict:</span>
                    <span className="text-red-500 text-2xl"> Deep-Faked</span>
                </div>
                    <p className="text-2xl text-center">Frame-Wise breakdown</p>
                    <Skeleton className="h-[225px] w-[1050px] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
            </div>
        </div>
    )
}
