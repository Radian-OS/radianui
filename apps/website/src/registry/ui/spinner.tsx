function Spinner() {
	return (
		<div className="border-3 border-fill-level3 inline-block size-8 animate-spin rounded-full border-t-black text-blue-600 dark:text-blue-500" role="status" aria-label="loading">
			<span className="sr-only">Loading...</span>
		</div>
	)
}

export { Spinner }
