import { HTMLProps } from 'react';

export function Textarea({ ...rest }: HTMLProps<HTMLTextAreaElement>) {
  return (
    <textarea
      className="w-full h-40 bg-slate-900 border border-slate-800 text-slate-200 placeholder:text-slate-500 rounded-md p-4 focus:outline-none focus:border-[#ff7a00]"
      {...rest}
    ></textarea>
  );
}
