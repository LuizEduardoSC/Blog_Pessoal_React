function SkeletonCardTema() {
    return (
        <div className="border border-slate-200 dark:border-slate-700 flex flex-col rounded-2xl overflow-hidden shadow-md animate-pulse bg-white dark:bg-slate-800">
            {/* Header */}
            <div className="py-3 px-6 bg-indigo-200 dark:bg-slate-700 h-12" />

            {/* Body */}
            <div className="p-8 flex-1 bg-slate-100 dark:bg-slate-800">
                <div className="h-7 w-2/3 rounded bg-slate-200 dark:bg-slate-700" />
            </div>

            {/* Footer buttons */}
            <div className="flex border-t dark:border-slate-700">
                <div className="w-full h-11 bg-indigo-50 dark:bg-slate-700" />
                <div className="w-full h-11 bg-red-50 dark:bg-slate-700" />
            </div>
        </div>
    );
}

export default SkeletonCardTema;
