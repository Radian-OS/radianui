// function SimpleSpinner(props: React.SVGProps<SVGSVGElement>) {
// 	return (
// 		<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" className="animate-spin" {...props}>
// 			<circle opacity={0.16} cx={12} cy={12} r={9.5} stroke="#0A0A0B" strokeWidth={3} />
// 			<path
// 				d="M3.52276 16.75C4.52586 18.4874 6.05324 19.8627 7.886 20.6787C9.71876 21.4947 11.7628 21.7095 13.7252 21.2924C15.6875 20.8753 17.4675 19.8476 18.8099 18.3567C20.1523 16.8658 20.9883 14.9882 21.198 12.993"
// 				stroke="#0A0A0B"
// 				strokeWidth={3}
// 				strokeLinecap="round"
// 				strokeLinejoin="round"
// 			/>
// 		</svg>
// 	)
// }

function DefaultSpinner(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" {...props} className="animate-spin">
			<path
				d="M11.75 21.5C13.7562 21.5 15.7109 20.8649 17.334 19.6857C18.957 18.5064 20.1651 16.8437 20.785 14.9357C21.405 13.0276 21.405 10.9724 20.785 9.06434C20.1651 7.15633 18.957 5.49355 17.334 4.31434"
				stroke="#0A0A0B"
				strokeWidth={2}
				strokeLinejoin="round"
			/>
		</svg>
	)
}

function Spinner() {
	// return (
	// 	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin">
	// 		<circle opacity="0.16" cx="12" cy="12" r="9.5" stroke="#0A0A0B" strokeWidth="3" />
	// 		<path
	// 			d="M16.75 20.2272C18.4874 19.2241 19.8627 17.6968 20.6787 15.864C21.4947 14.0312 21.7095 11.9872 21.2924 10.0248C20.8753 8.06248 19.8476 6.28254 18.3567 4.94012C16.8658 3.59771 14.9882 2.76175 12.993 2.55204"
	// 			stroke="#0A0A0B"
	// 			strokeWidth="3"
	// 			strokeLinecap="round"
	// 			strokeLinejoin="round"
	// 		/>
	// 	</svg>
	// )
	return <DefaultSpinner />
}

export { Spinner }
