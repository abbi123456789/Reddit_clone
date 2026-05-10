export const appShellClass = "flex h-screen flex-col overflow-hidden bg-slate-50 text-slate-900";

export const appContentClass = "flex min-h-0 min-w-0 flex-1 bg-slate-50";

export const scrollContentClass = "flex min-h-0 min-w-0 flex-1 overflow-y-auto px-3 py-4 md:px-5 md:py-5";

export const cardClass = "rounded-[18px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]";

export const panelClass = `${cardClass} p-5`;

export const primaryButtonClass = "rounded-full border-0 bg-orange-600 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-orange-700 data-[disabled]:cursor-not-allowed data-[disabled]:bg-slate-300 data-[disabled]:text-slate-500 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500";

export const secondaryButtonClass = "rounded-full border border-slate-300 bg-white px-5 py-2.5 font-semibold text-slate-700 transition-colors hover:bg-slate-100";

export const subtleButtonClass = "rounded-full border-0 bg-slate-100 px-4 py-2 font-semibold text-slate-700 transition-colors hover:bg-orange-50 hover:text-orange-700";

export const iconButtonClass = "flex h-10 w-10 items-center justify-center rounded-full border-0 bg-transparent text-slate-700 transition-colors hover:bg-orange-50 hover:text-orange-700";

export const actionPillClass = "flex items-center gap-1 rounded-full bg-slate-100 px-4 py-2 text-slate-700";

export const votePillClass = "flex items-center gap-0.5 rounded-full bg-orange-50 px-2 py-2 text-slate-800";

export const voteButtonClass = "rounded-full border-0 bg-transparent px-2 py-1 transition-colors hover:bg-orange-100 hover:text-orange-700";

export const inputClass = "w-full rounded-[20px] border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

export const selectTriggerClass = "[&_.aria-select-trigger]:rounded-full [&_.aria-select-trigger]:border [&_.aria-select-trigger]:border-slate-300 [&_.aria-select-trigger]:bg-white [&_.aria-select-trigger]:px-5 [&_.aria-select-trigger]:py-2.5 [&_.aria-select-trigger]:text-slate-800";

export const switchClass = "group relative inline-block h-7 w-[50px] data-[disabled]:opacity-50";

export const switchSliderClass = "absolute inset-0 cursor-pointer rounded-[34px] bg-slate-200 transition before:absolute before:bottom-0.5 before:left-0.5 before:h-6 before:w-6 before:rounded-full before:bg-white before:shadow-sm before:transition group-data-[selected]:bg-orange-600 group-data-[selected]:before:translate-x-[22px]";

export const authWrapperClass = "flex min-h-screen items-center justify-center bg-slate-50 p-6 text-slate-900";

export const authPageClass = `${cardClass} m-auto w-[90%] max-w-[560px] p-6 text-[1.1rem]`;

export const authFieldClass = "flex flex-col gap-1.5 [&_input]:rounded-[20px] [&_input]:border [&_input]:border-slate-300 [&_input]:bg-white [&_input]:px-4 [&_input]:py-2.5 [&_input]:text-[1rem] [&_input]:outline-none [&_input]:transition [&_input]:focus:border-orange-500 [&_input]:focus:ring-2 [&_input]:focus:ring-orange-100";

export const tabButtonClass = "relative border-0 bg-transparent py-3 font-semibold text-slate-500 transition-colors hover:text-orange-700";
