function SkeletonCardPostagem() {
    return (
        <div className="border border-slate-200 dark:border-slate-700 flex flex-col rounded-xl overflow-hidden shadow-lg animate-pulse bg-white dark:bg-slate-800">
            {/* Header */}
            <div className="flex items-center gap-4 py-3 px-4 bg-indigo-200 dark:bg-slate-700">
                <div className="h-12 w-12 rounded-full bg-indigo-300 dark:bg-slate-600 flex-shrink-0" />
                <div className="h-4 w-32 rounded bg-indigo-300 dark:bg-slate-600" />
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col gap-3 flex-1">
                <div className="h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-700" />

                <div className="h-5 w-24 rounded-full bg-indigo-100 dark:bg-indigo-900 mt-2" />
                <div className="h-3 w-40 rounded bg-slate-100 dark:bg-slate-700 mt-1" />
            </div>

            {/* Footer buttons */}
            <div className="flex border-t dark:border-slate-700">
                <div className="w-full h-10 bg-indigo-50 dark:bg-slate-700" />
                <div className="w-full h-10 bg-indigo-100 dark:bg-slate-600" />
                <div className="w-full h-10 bg-red-50 dark:bg-slate-700" />
            </div>
        </div>
    );
}

export default SkeletonCardPostagem;
