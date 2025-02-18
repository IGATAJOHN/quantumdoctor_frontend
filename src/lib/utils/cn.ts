import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

const cn = (...args: any) => {
    return twMerge(clsx(args))
}

export default cn
