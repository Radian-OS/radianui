import Color from "@/registry/ui/color"

const DisplayColor = () => {
	const primaryVariants = [
		{ hex: "#F7F5FF", weight: 50 },
		{ hex: "#E9E5FF", weight: 100 },
		{ hex: "#DDD6FF", weight: 200 },
		{ hex: "#C4B8FF", weight: 300 },
		{ hex: "#9985FF", weight: 400 },
		{ hex: "#775CFF", weight: 500 },
		{ hex: "#6347EB", weight: 600 },
		{ hex: "#543BCE", weight: 700 },
		{ hex: "#4732AE", weight: 800 },
		{ hex: "#291F5C", weight: 900 },
		{ hex: "#1A1339", weight: 950 },
	]

	const neutralVariants = [
		{ hex: "#FAFAFA", weight: 50 },
		{ hex: "#F4F4F5", weight: 100 },
		{ hex: "#EAE9EC", weight: 200 },
		{ hex: "#DADADD", weight: 300 },
		{ hex: "#ABA9B1", weight: 400 },
		{ hex: "#716F7B", weight: 500 },
		{ hex: "#54525B", weight: 600 },
		{ hex: "#403F46", weight: 700 },
		{ hex: "#28272B", weight: 800 },
		{ hex: "#19181B", weight: 900 },
		{ hex: "#0A0A0B", weight: 950 },
	]

	const informationVariants = [
		{ hex: "#F5FAFF", weight: 50 },
		{ hex: "#E5F2FF", weight: 100 },
		{ hex: "#D6EAFF", weight: 200 },
		{ hex: "#B8DBFF", weight: 300 },
		{ hex: "#85C2FF", weight: 400 },
		{ hex: "#5CADFF", weight: 500 },
		{ hex: "#3399FF", weight: 600 },
		{ hex: "#007FFF", weight: 700 },
		{ hex: "#156BC1", weight: 800 },
		{ hex: "#193D62", weight: 900 },
		{ hex: "#14293D", weight: 950 },
	]

	const successVariants = [
		{ hex: "#F5FFF7", weight: 50 },
		{ hex: "#E8FCED", weight: 100 },
		{ hex: "#DAFBE2", weight: 200 },
		{ hex: "#BFF8CD", weight: 300 },
		{ hex: "#8BF9A6", weight: 400 },
		{ hex: "#55F17C", weight: 500 },
		{ hex: "#40DD68", weight: 600 },
		{ hex: "#33CC59", weight: 700 },
		{ hex: "#38A854", weight: 800 },
		{ hex: "#1F5C2E", weight: 900 },
		{ hex: "#143D1F", weight: 950 },
	]

	const errorVariants = [
		{ hex: "#FFF5F5", weight: 50 },
		{ hex: "#FFE5E5", weight: 100 },
		{ hex: "#FFD6D6", weight: 200 },
		{ hex: "#FFB8B8", weight: 300 },
		{ hex: "#FF8585", weight: 400 },
		{ hex: "#FF5C5C", weight: 500 },
		{ hex: "#FF3333", weight: 600 },
		{ hex: "#E62323", weight: 700 },
		{ hex: "#B32D2D", weight: 800 },
		{ hex: "#621818", weight: 900 },
		{ hex: "#3D1414", weight: 950 },
	]

	const warningVariants = [
		{ hex: "#FFFBF5", weight: 50 },
		{ hex: "#FFF4E5", weight: 100 },
		{ hex: "#FFEED6", weight: 200 },
		{ hex: "#FFE1B8", weight: 300 },
		{ hex: "#FFCC85", weight: 400 },
		{ hex: "#FFBB5C", weight: 500 },
		{ hex: "#FFAA33", weight: 600 },
		{ hex: "#FF9500", weight: 700 },
		{ hex: "#CA7F16", weight: 800 },
		{ hex: "#684412", weight: 900 },
		{ hex: "#621818", weight: 950 },
	]

	return (
		<div>
			<Color name="Primary" variants={primaryVariants} defaultWeight={600} />
			<Color name="Neutral" variants={neutralVariants} defaultWeight={700} />
			<Color name="Information" variants={informationVariants} defaultWeight={700} />
			<Color name="Success" variants={successVariants} defaultWeight={700} />
			<Color name="Error" variants={errorVariants} defaultWeight={600} />
			<Color name="Warning" variants={warningVariants} defaultWeight={700} />
		</div>
	)
}

export default DisplayColor
