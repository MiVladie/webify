export function clsx(...classes: (string | Record<string, boolean> | null | undefined | false)[]): string {
	return classes
		.flatMap((cls) =>
			typeof cls === 'string'
				? cls
				: typeof cls === 'object' && cls !== null
				? Object.keys(cls).filter((key) => cls[key])
				: []
		)
		.join(' ');
}
