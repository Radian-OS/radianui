"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Radian } from "../icon/radian"

const themeOptions = [
	{ id: "system", label: "System Default" },
	{ id: "light", label: "Light" },
	{ id: "dark", label: "Dark" },
] as const

function SystemPreview() {
	return (
		<div className="relative h-[143px] w-full overflow-hidden rounded-2xl">
			<svg
				width="152"
				height="185"
				viewBox="0 0 152 185"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<g clipPath="url(#clip0_199_18098)">
					<rect width="152" height="143" rx="16" fill="#DEE0E3" />
					<g filter="url(#filter0_d_199_18098)">
						<g clipPath="url(#clip1_199_18098)">
							<rect
								width="180"
								height="140"
								transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 52)"
								fill="white"
							/>
						</g>
						<rect
							width="180"
							height="140"
							rx="12"
							transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 52)"
							stroke="#DEE0E3"
							strokeLinecap="round"
							shapeRendering="crispEdges"
						/>
					</g>
					<g filter="url(#filter1_d_199_18098)">
						<g clipPath="url(#clip2_199_18098)">
							<rect
								width="180"
								height="140"
								transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 26)"
								fill="white"
							/>
						</g>
						<rect
							width="180"
							height="140"
							rx="12"
							transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 26)"
							stroke="#DEE0E3"
							strokeLinecap="round"
							shapeRendering="crispEdges"
						/>
					</g>
					<g filter="url(#filter2_d_199_18098)">
						<g clipPath="url(#clip3_199_18098)">
							<rect
								width="93"
								height="140"
								transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 0)"
								fill="#EEEFF1"
							/>
							<circle
								cx="3"
								cy="3"
								r="3"
								transform="matrix(-0.857596 0.50482 -0.874374 -0.495133 150.875 15)"
								fill="#F53D3D"
							/>
							<circle
								cx="3"
								cy="3"
								r="3"
								transform="matrix(-0.857596 0.50482 -0.874374 -0.495133 159.586 20.0283)"
								fill="#FFAA00"
							/>
							<circle
								cx="5"
								cy="5"
								r="5"
								transform="matrix(0.866025 0.5 -0.866025 0.5 130.043 21.0293)"
								fill="#DEE0E3"
							/>
							<rect
								width="28"
								height="4"
								rx="2"
								transform="matrix(0.866025 0.5 -0.866025 0.5 141.301 30.5293)"
								fill="#DEE0E3"
							/>
							<circle
								cx="5"
								cy="5"
								r="5"
								transform="matrix(0.866025 0.5 -0.866025 0.5 117.918 28.0293)"
								fill="#DEE0E3"
							/>
							<rect
								width="53"
								height="4"
								rx="2"
								transform="matrix(0.866025 0.5 -0.866025 0.5 129.176 37.5293)"
								fill="#DEE0E3"
							/>
							<circle
								cx="5"
								cy="5"
								r="5"
								transform="matrix(0.866025 0.5 -0.866025 0.5 105.793 35.0293)"
								fill="#DEE0E3"
							/>
							<rect
								width="53"
								height="4"
								rx="2"
								transform="matrix(0.866025 0.5 -0.866025 0.5 117.051 44.5293)"
								fill="#DEE0E3"
							/>
							<circle
								cx="5"
								cy="5"
								r="5"
								transform="matrix(0.866025 0.5 -0.866025 0.5 93.668 42.0293)"
								fill="#067FF9"
							/>
							<rect
								width="53"
								height="4"
								rx="2"
								transform="matrix(0.866025 0.5 -0.866025 0.5 104.926 51.5293)"
								fill="#DEE0E3"
							/>
							<circle
								cx="5"
								cy="5"
								r="5"
								transform="matrix(0.866025 0.5 -0.866025 0.5 81.5469 49.0293)"
								fill="#623DF5"
							/>
							<rect
								width="53"
								height="4"
								rx="2"
								transform="matrix(0.866025 0.5 -0.866025 0.5 92.8047 58.5293)"
								fill="#DEE0E3"
							/>
							<rect
								width="87"
								height="140"
								transform="matrix(0.866025 0.5 -0.866025 0.5 226.219 46.5)"
								fill="white"
							/>
						</g>
						<rect
							y="0.5"
							width="179"
							height="139"
							rx="11.5"
							transform="matrix(0.866025 0.5 -0.866025 0.5 146.113 0.25)"
							stroke="#E9EAEC"
							shapeRendering="crispEdges"
						/>
					</g>
				</g>
				<g filter="url(#filter3_d_199_18098)">
					<path
						d="M21 168.6C21 165.24 21 163.56 21.654 162.276C22.2292 161.147 23.1471 160.229 24.2761 159.654C25.5595 159 27.2397 159 30.6 159H121.4C124.76 159 126.44 159 127.724 159.654C128.853 160.229 129.771 161.147 130.346 162.276C131 163.56 131 165.24 131 168.6V173.4C131 176.76 131 178.44 130.346 179.724C129.771 180.853 128.853 181.771 127.724 182.346C126.44 183 124.76 183 121.4 183H30.6C27.2397 183 25.5595 183 24.2761 182.346C23.1471 181.771 22.2292 180.853 21.654 179.724C21 178.44 21 176.76 21 173.4V168.6Z"
						fill="#623DF5"
						shapeRendering="crispEdges"
					/>
					<path
						d="M30.5996 159.5H121.4C123.088 159.5 124.324 159.5 125.3 159.58C126.269 159.659 126.938 159.815 127.497 160.1C128.532 160.627 129.373 161.468 129.9 162.503C130.185 163.062 130.341 163.731 130.42 164.7C130.5 165.676 130.5 166.912 130.5 168.6V173.4C130.5 175.088 130.5 176.324 130.42 177.3C130.341 178.269 130.185 178.938 129.9 179.497C129.373 180.532 128.532 181.373 127.497 181.9C126.938 182.185 126.269 182.341 125.3 182.42C124.324 182.5 123.088 182.5 121.4 182.5H30.5996C28.9116 182.5 27.6755 182.5 26.7002 182.42C25.7306 182.341 25.0624 182.185 24.5029 181.9C23.4682 181.373 22.6269 180.532 22.0996 179.497C21.8145 178.938 21.6593 178.269 21.5801 177.3C21.5004 176.324 21.5 175.088 21.5 173.4V168.6C21.5 166.912 21.5004 165.676 21.5801 164.7C21.6593 163.731 21.8145 163.062 22.0996 162.503C22.6269 161.468 23.4682 160.627 24.5029 160.1C25.0624 159.815 25.7306 159.659 26.7002 159.58C27.6755 159.5 28.9116 159.5 30.5996 159.5Z"
						stroke="#090A0B"
						strokeOpacity="0.12"
						shapeRendering="crispEdges"
					/>
					<path
						d="M35.6297 169.029C35.5804 168.592 35.3773 168.254 35.0203 168.013C34.6633 167.77 34.2139 167.649 33.6723 167.649C33.2845 167.649 32.949 167.71 32.6659 167.833C32.3827 167.953 32.1627 168.12 32.0057 168.332C31.8519 168.541 31.7749 168.78 31.7749 169.048C31.7749 169.272 31.8272 169.466 31.9319 169.629C32.0396 169.792 32.1796 169.929 32.352 170.04C32.5274 170.148 32.7151 170.239 32.9152 170.312C33.1152 170.383 33.3076 170.442 33.4922 170.488L34.4155 170.728C34.7171 170.802 35.0264 170.902 35.3434 171.028C35.6604 171.154 35.9544 171.32 36.2252 171.527C36.496 171.733 36.7145 171.988 36.8807 172.293C37.05 172.598 37.1346 172.962 37.1346 173.387C37.1346 173.923 36.9961 174.398 36.7192 174.814C36.4452 175.229 36.0467 175.557 35.5235 175.797C35.0034 176.037 34.374 176.157 33.6354 176.157C32.9275 176.157 32.315 176.045 31.798 175.82C31.2809 175.595 30.8762 175.277 30.5839 174.864C30.2915 174.449 30.1299 173.956 30.0991 173.387H31.5302C31.5579 173.729 31.6687 174.013 31.8626 174.241C32.0596 174.466 32.3104 174.634 32.6151 174.744C32.9229 174.852 33.2599 174.906 33.6261 174.906C34.0293 174.906 34.3878 174.843 34.7018 174.717C35.0188 174.587 35.268 174.409 35.4496 174.181C35.6312 173.95 35.722 173.681 35.722 173.373C35.722 173.093 35.642 172.864 35.4819 172.685C35.325 172.507 35.1111 172.359 34.8403 172.242C34.5725 172.125 34.2693 172.022 33.9308 171.933L32.8136 171.628C32.0565 171.422 31.4564 171.119 31.0132 170.719C30.5731 170.319 30.353 169.789 30.353 169.131C30.353 168.586 30.5008 168.11 30.7962 167.704C31.0917 167.298 31.4918 166.982 31.9965 166.758C32.5012 166.53 33.0706 166.416 33.7046 166.416C34.3447 166.416 34.9095 166.529 35.3988 166.753C35.8913 166.978 36.2791 167.287 36.5622 167.681C36.8453 168.072 36.9931 168.521 37.0054 169.029H35.6297ZM39.471 178.659C39.2648 178.659 39.0771 178.642 38.9078 178.608C38.7385 178.578 38.6123 178.544 38.5292 178.507L38.8616 177.376C39.114 177.443 39.3387 177.473 39.5356 177.463C39.7326 177.454 39.9065 177.38 40.0573 177.242C40.2112 177.103 40.3466 176.877 40.4635 176.563L40.6343 176.092L38.0399 168.909H39.5172L41.313 174.412H41.3868L43.1826 168.909H44.6645L41.7423 176.946C41.6069 177.316 41.4345 177.628 41.2253 177.884C41.016 178.142 40.7667 178.336 40.4774 178.465C40.1881 178.594 39.8526 178.659 39.471 178.659ZM51.1453 170.64L49.8943 170.862C49.8419 170.702 49.7588 170.549 49.645 170.405C49.5342 170.26 49.3834 170.142 49.1926 170.049C49.0017 169.957 48.7632 169.911 48.477 169.911C48.0861 169.911 47.7599 169.999 47.4983 170.174C47.2367 170.346 47.1059 170.569 47.1059 170.843C47.1059 171.08 47.1936 171.271 47.369 171.416C47.5445 171.56 47.8276 171.679 48.2185 171.771L49.3449 172.03C49.9974 172.181 50.4836 172.413 50.8037 172.727C51.1238 173.041 51.2838 173.449 51.2838 173.95C51.2838 174.375 51.1607 174.754 50.9145 175.086C50.6714 175.415 50.3313 175.674 49.8943 175.862C49.4603 176.049 48.9571 176.143 48.3847 176.143C47.5906 176.143 46.9428 175.974 46.4411 175.635C45.9395 175.294 45.6317 174.809 45.5178 174.181L46.852 173.978C46.9351 174.326 47.1059 174.589 47.3644 174.767C47.623 174.943 47.96 175.031 48.3754 175.031C48.8279 175.031 49.1895 174.937 49.4603 174.749C49.7311 174.558 49.8666 174.326 49.8666 174.052C49.8666 173.83 49.7835 173.644 49.6173 173.493C49.4542 173.342 49.2033 173.229 48.8648 173.152L47.6645 172.888C47.0028 172.738 46.5135 172.498 46.1965 172.168C45.8825 171.839 45.7256 171.422 45.7256 170.917C45.7256 170.499 45.8425 170.132 46.0764 169.819C46.3103 169.505 46.6335 169.26 47.0459 169.085C47.4583 168.906 47.9307 168.817 48.4632 168.817C49.2295 168.817 49.8327 168.983 50.2728 169.315C50.7129 169.645 51.0038 170.086 51.1453 170.64ZM55.9815 168.909V170.017H52.1083V168.909H55.9815ZM53.147 167.21H54.5273V173.918C54.5273 174.186 54.5673 174.387 54.6473 174.523C54.7274 174.655 54.8305 174.746 54.9566 174.795C55.0859 174.841 55.2259 174.864 55.3767 174.864C55.4875 174.864 55.5845 174.857 55.6676 174.841C55.7507 174.826 55.8153 174.814 55.8615 174.804L56.1108 175.945C56.0307 175.975 55.9169 176.006 55.7691 176.037C55.6214 176.071 55.4368 176.089 55.2152 176.092C54.852 176.098 54.5135 176.034 54.1995 175.898C53.8856 175.763 53.6317 175.554 53.4378 175.271C53.2439 174.987 53.147 174.632 53.147 174.204V167.21ZM60.3583 176.143C59.6597 176.143 59.058 175.994 58.5533 175.695C58.0516 175.394 57.6639 174.971 57.3899 174.426C57.1191 173.878 56.9837 173.236 56.9837 172.501C56.9837 171.774 57.1191 171.134 57.3899 170.58C57.6639 170.026 58.0455 169.594 58.5348 169.283C59.0273 168.972 59.6028 168.817 60.2614 168.817C60.6615 168.817 61.0493 168.883 61.4247 169.015C61.8002 169.148 62.1372 169.355 62.4358 169.638C62.7343 169.922 62.9697 170.289 63.1421 170.742C63.3144 171.191 63.4006 171.737 63.4006 172.381V172.87H57.7639V171.836H62.048C62.048 171.473 61.9741 171.151 61.8264 170.871C61.6786 170.588 61.4709 170.365 61.2032 170.202C60.9385 170.039 60.6276 169.957 60.2706 169.957C59.8828 169.957 59.5443 170.052 59.255 170.243C58.9688 170.431 58.7472 170.677 58.5902 170.982C58.4363 171.283 58.3594 171.611 58.3594 171.965V172.773C58.3594 173.247 58.4425 173.65 58.6087 173.983C58.778 174.315 59.0134 174.569 59.315 174.744C59.6166 174.917 59.969 175.003 60.3722 175.003C60.6338 175.003 60.8723 174.966 61.0877 174.892C61.3032 174.815 61.4894 174.701 61.6463 174.55C61.8033 174.4 61.9233 174.213 62.0064 173.992L63.3129 174.227C63.2082 174.612 63.0205 174.949 62.7497 175.238C62.4819 175.525 62.1449 175.748 61.7387 175.908C61.3355 176.065 60.8754 176.143 60.3583 176.143ZM64.8021 176V168.909H66.127V170.063H66.2148C66.3625 169.672 66.6041 169.368 66.9395 169.149C67.275 168.928 67.6766 168.817 68.1444 168.817C68.6184 168.817 69.0154 168.928 69.3355 169.149C69.6586 169.371 69.8972 169.675 70.051 170.063H70.1249C70.2942 169.685 70.5635 169.383 70.9328 169.158C71.3021 168.931 71.7422 168.817 72.2531 168.817C72.8963 168.817 73.4211 169.018 73.8273 169.422C74.2367 169.825 74.4413 170.433 74.4413 171.245V176H73.061V171.374C73.061 170.894 72.9302 170.546 72.6686 170.331C72.407 170.116 72.0946 170.008 71.7314 170.008C71.2821 170.008 70.9328 170.146 70.6835 170.423C70.4342 170.697 70.3096 171.05 70.3096 171.48V176H68.9339V171.287C68.9339 170.902 68.8138 170.593 68.5738 170.359C68.3337 170.125 68.0213 170.008 67.6366 170.008C67.375 170.008 67.1334 170.077 66.9118 170.216C66.6933 170.351 66.5164 170.54 66.3809 170.783C66.2486 171.027 66.1824 171.308 66.1824 171.628V176H64.8021ZM82.6433 176H79.5826V166.545H82.7403C83.6666 166.545 84.4622 166.735 85.127 167.113C85.7918 167.489 86.3011 168.029 86.655 168.734C87.012 169.435 87.1906 170.277 87.1906 171.259C87.1906 172.244 87.0105 173.09 86.6504 173.798C86.2934 174.506 85.7764 175.051 85.0993 175.432C84.4222 175.811 83.6035 176 82.6433 176ZM81.0091 174.754H82.5648C83.285 174.754 83.8836 174.618 84.3606 174.347C84.8377 174.073 85.1947 173.678 85.4317 173.161C85.6687 172.641 85.7871 172.007 85.7871 171.259C85.7871 170.517 85.6687 169.888 85.4317 169.371C85.1978 168.854 84.8485 168.461 84.3837 168.194C83.919 167.926 83.3419 167.792 82.6526 167.792H81.0091V174.754ZM91.7797 176.143C91.0811 176.143 90.4794 175.994 89.9747 175.695C89.473 175.394 89.0853 174.971 88.8113 174.426C88.5405 173.878 88.4051 173.236 88.4051 172.501C88.4051 171.774 88.5405 171.134 88.8113 170.58C89.0853 170.026 89.4669 169.594 89.9562 169.283C90.4487 168.972 91.0242 168.817 91.6828 168.817C92.0829 168.817 92.4707 168.883 92.8461 169.015C93.2216 169.148 93.5586 169.355 93.8572 169.638C94.1557 169.922 94.3911 170.289 94.5635 170.742C94.7358 171.191 94.822 171.737 94.822 172.381V172.87H89.1853V171.836H93.4694C93.4694 171.473 93.3955 171.151 93.2478 170.871C93.1001 170.588 92.8923 170.365 92.6246 170.202C92.3599 170.039 92.049 169.957 91.692 169.957C91.3042 169.957 90.9657 170.052 90.6764 170.243C90.3902 170.431 90.1686 170.677 90.0116 170.982C89.8577 171.283 89.7808 171.611 89.7808 171.965V172.773C89.7808 173.247 89.8639 173.65 90.0301 173.983C90.1994 174.315 90.4348 174.569 90.7364 174.744C91.038 174.917 91.3904 175.003 91.7936 175.003C92.0552 175.003 92.2937 174.966 92.5091 174.892C92.7246 174.815 92.9108 174.701 93.0677 174.55C93.2247 174.4 93.3447 174.213 93.4278 173.992L94.7343 174.227C94.6296 174.612 94.4419 174.949 94.1711 175.238C93.9033 175.525 93.5663 175.748 93.1601 175.908C92.7569 176.065 92.2968 176.143 91.7797 176.143ZM99.5982 168.909V170.017H95.5911V168.909H99.5982ZM96.6898 176V168.087C96.6898 167.644 96.7867 167.276 96.9806 166.984C97.1745 166.689 97.4315 166.469 97.7516 166.324C98.0717 166.176 98.4194 166.102 98.7949 166.102C99.0719 166.102 99.3089 166.125 99.5058 166.172C99.7028 166.215 99.849 166.255 99.9444 166.292L99.6212 167.409C99.5566 167.39 99.4735 167.369 99.372 167.344C99.2704 167.316 99.1473 167.303 99.0026 167.303C98.6672 167.303 98.4271 167.386 98.2825 167.552C98.1409 167.718 98.0701 167.958 98.0701 168.272V176H96.6898ZM102.74 176.157C102.291 176.157 101.885 176.074 101.521 175.908C101.158 175.738 100.87 175.494 100.658 175.174C100.449 174.854 100.344 174.461 100.344 173.996C100.344 173.596 100.421 173.267 100.575 173.009C100.729 172.75 100.937 172.545 101.198 172.395C101.46 172.244 101.752 172.13 102.075 172.053C102.398 171.976 102.728 171.917 103.063 171.877C103.488 171.828 103.833 171.788 104.097 171.757C104.362 171.724 104.554 171.67 104.674 171.596C104.794 171.522 104.854 171.402 104.854 171.236V171.203C104.854 170.8 104.741 170.488 104.513 170.266C104.288 170.045 103.953 169.934 103.506 169.934C103.042 169.934 102.675 170.037 102.408 170.243C102.143 170.446 101.96 170.673 101.858 170.922L100.561 170.626C100.715 170.196 100.94 169.848 101.235 169.583C101.534 169.315 101.877 169.121 102.265 169.001C102.652 168.878 103.06 168.817 103.488 168.817C103.771 168.817 104.071 168.851 104.388 168.918C104.708 168.983 105.007 169.103 105.284 169.278C105.564 169.454 105.793 169.705 105.972 170.031C106.15 170.354 106.239 170.774 106.239 171.291V176H104.891V175.031H104.836C104.747 175.209 104.613 175.384 104.434 175.557C104.256 175.729 104.027 175.872 103.746 175.986C103.466 176.1 103.131 176.157 102.74 176.157ZM103.04 175.049C103.422 175.049 103.748 174.974 104.019 174.823C104.293 174.672 104.501 174.475 104.642 174.232C104.787 173.986 104.859 173.723 104.859 173.442V172.528C104.81 172.578 104.714 172.624 104.573 172.667C104.434 172.707 104.276 172.742 104.097 172.773C103.919 172.801 103.745 172.827 103.576 172.852C103.406 172.873 103.265 172.892 103.151 172.907C102.883 172.941 102.639 172.998 102.417 173.078C102.198 173.158 102.023 173.273 101.891 173.424C101.761 173.572 101.697 173.769 101.697 174.015C101.697 174.357 101.823 174.615 102.075 174.79C102.328 174.963 102.649 175.049 103.04 175.049ZM112.44 173.059V168.909H113.825V176H112.467V174.772H112.394C112.23 175.151 111.969 175.466 111.609 175.718C111.252 175.968 110.807 176.092 110.275 176.092C109.819 176.092 109.416 175.992 109.065 175.792C108.717 175.589 108.443 175.289 108.243 174.892C108.046 174.495 107.948 174.004 107.948 173.419V168.909H109.328V173.253C109.328 173.736 109.462 174.121 109.73 174.407C109.998 174.694 110.345 174.837 110.773 174.837C111.032 174.837 111.289 174.772 111.544 174.643C111.803 174.513 112.017 174.318 112.186 174.056C112.358 173.795 112.443 173.462 112.44 173.059ZM116.93 166.545V176H115.549V166.545H116.93ZM121.967 168.909V170.017H118.093V168.909H121.967ZM119.132 167.21H120.512V173.918C120.512 174.186 120.552 174.387 120.632 174.523C120.713 174.655 120.816 174.746 120.942 174.795C121.071 174.841 121.211 174.864 121.362 174.864C121.473 174.864 121.57 174.857 121.653 174.841C121.736 174.826 121.8 174.814 121.847 174.804L122.096 175.945C122.016 175.975 121.902 176.006 121.754 176.037C121.607 176.071 121.422 176.089 121.2 176.092C120.837 176.098 120.499 176.034 120.185 175.898C119.871 175.763 119.617 175.554 119.423 175.271C119.229 174.987 119.132 174.632 119.132 174.204V167.21Z"
						fill="white"
					/>
				</g>
				<g clipPath="url(#clip4_199_18098)">
					<path
						d="M76 0H136C144.837 0 152 7.16344 152 16V127C152 135.837 144.837 143 136 143H76V0Z"
						fill="#2F3237"
					/>
					<g filter="url(#filter4_d_199_18098)">
						<g clipPath="url(#clip5_199_18098)">
							<rect
								width="180"
								height="140"
								transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 52)"
								fill="#131416"
							/>
						</g>
						<rect
							width="180"
							height="140"
							rx="12"
							transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 52)"
							stroke="#26282C"
							strokeLinecap="round"
							shapeRendering="crispEdges"
						/>
					</g>
					<g filter="url(#filter5_d_199_18098)">
						<g clipPath="url(#clip6_199_18098)">
							<rect
								width="180"
								height="140"
								transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 26)"
								fill="#131416"
							/>
						</g>
						<rect
							width="180"
							height="140"
							rx="12"
							transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 26)"
							stroke="#26282C"
							strokeLinecap="round"
							shapeRendering="crispEdges"
						/>
					</g>
					<g filter="url(#filter6_d_199_18098)">
						<g clipPath="url(#clip7_199_18098)">
							<rect
								width="93"
								height="140"
								transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 0)"
								fill="#1C1E21"
							/>
							<circle
								cx="3"
								cy="3"
								r="3"
								transform="matrix(-0.857596 0.50482 -0.874374 -0.495133 150.875 15)"
								fill="#F53D3D"
							/>
							<circle
								cx="3"
								cy="3"
								r="3"
								transform="matrix(-0.857596 0.50482 -0.874374 -0.495133 159.586 20.0283)"
								fill="#FFAA00"
							/>
							<circle
								cx="5"
								cy="5"
								r="5"
								transform="matrix(0.866025 0.5 -0.866025 0.5 130.043 21.0293)"
								fill="#2F3237"
							/>
							<rect
								width="28"
								height="4"
								rx="2"
								transform="matrix(0.866025 0.5 -0.866025 0.5 141.301 30.5293)"
								fill="#2F3237"
							/>
							<circle
								cx="5"
								cy="5"
								r="5"
								transform="matrix(0.866025 0.5 -0.866025 0.5 117.918 28.0293)"
								fill="#2F3237"
							/>
							<rect
								width="53"
								height="4"
								rx="2"
								transform="matrix(0.866025 0.5 -0.866025 0.5 129.176 37.5293)"
								fill="#2F3237"
							/>
							<circle
								cx="5"
								cy="5"
								r="5"
								transform="matrix(0.866025 0.5 -0.866025 0.5 105.793 35.0293)"
								fill="#2F3237"
							/>
							<rect
								width="53"
								height="4"
								rx="2"
								transform="matrix(0.866025 0.5 -0.866025 0.5 117.051 44.5293)"
								fill="#2F3237"
							/>
							<circle
								cx="5"
								cy="5"
								r="5"
								transform="matrix(0.866025 0.5 -0.866025 0.5 93.668 42.0293)"
								fill="#067FF9"
							/>
							<rect
								width="53"
								height="4"
								rx="2"
								transform="matrix(0.866025 0.5 -0.866025 0.5 104.926 51.5293)"
								fill="#2F3237"
							/>
							<circle
								cx="5"
								cy="5"
								r="5"
								transform="matrix(0.866025 0.5 -0.866025 0.5 81.5469 49.0293)"
								fill="#623DF5"
							/>
							<rect
								width="53"
								height="4"
								rx="2"
								transform="matrix(0.866025 0.5 -0.866025 0.5 92.8047 58.5293)"
								fill="#2F3237"
							/>
							<rect
								width="87"
								height="140"
								transform="matrix(0.866025 0.5 -0.866025 0.5 226.219 46.5)"
								fill="#1C1E21"
							/>
						</g>
						<rect
							y="0.5"
							width="179"
							height="139"
							rx="11.5"
							transform="matrix(0.866025 0.5 -0.866025 0.5 146.113 0.25)"
							stroke="#1C1E21"
							shapeRendering="crispEdges"
						/>
					</g>
				</g>
				<defs>
					<filter
						id="filter0_d_199_18098"
						x="10.4375"
						y="42"
						width="305.125"
						height="188"
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB">
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dy="4" />
						<feGaussianBlur stdDeviation="7" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
						/>
						<feBlend
							mode="normal"
							in2="BackgroundImageFix"
							result="effect1_dropShadow_199_18098"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_199_18098"
							result="shape"
						/>
					</filter>
					<filter
						id="filter1_d_199_18098"
						x="10.4375"
						y="16"
						width="305.125"
						height="188"
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB">
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dy="4" />
						<feGaussianBlur stdDeviation="7" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
						/>
						<feBlend
							mode="normal"
							in2="BackgroundImageFix"
							result="effect1_dropShadow_199_18098"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_199_18098"
							result="shape"
						/>
					</filter>
					<filter
						id="filter2_d_199_18098"
						x="10.4375"
						y="-10"
						width="305.125"
						height="188"
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB">
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dy="4" />
						<feGaussianBlur stdDeviation="7" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
						/>
						<feBlend
							mode="normal"
							in2="BackgroundImageFix"
							result="effect1_dropShadow_199_18098"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_199_18098"
							result="shape"
						/>
					</filter>
					<filter
						id="filter3_d_199_18098"
						x="20"
						y="159"
						width="112"
						height="26"
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB">
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dy="1" />
						<feGaussianBlur stdDeviation="0.5" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0.0980392 0 0 0 0 0.0941176 0 0 0 0 0.105882 0 0 0 0.04 0"
						/>
						<feBlend
							mode="normal"
							in2="BackgroundImageFix"
							result="effect1_dropShadow_199_18098"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_199_18098"
							result="shape"
						/>
					</filter>
					<filter
						id="filter4_d_199_18098"
						x="10.4375"
						y="42"
						width="305.125"
						height="188"
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB">
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dy="4" />
						<feGaussianBlur stdDeviation="7" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
						/>
						<feBlend
							mode="normal"
							in2="BackgroundImageFix"
							result="effect1_dropShadow_199_18098"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_199_18098"
							result="shape"
						/>
					</filter>
					<filter
						id="filter5_d_199_18098"
						x="10.4375"
						y="16"
						width="305.125"
						height="188"
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB">
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dy="4" />
						<feGaussianBlur stdDeviation="7" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
						/>
						<feBlend
							mode="normal"
							in2="BackgroundImageFix"
							result="effect1_dropShadow_199_18098"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_199_18098"
							result="shape"
						/>
					</filter>
					<filter
						id="filter6_d_199_18098"
						x="10.4375"
						y="-10"
						width="305.125"
						height="188"
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB">
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dy="4" />
						<feGaussianBlur stdDeviation="7" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
						/>
						<feBlend
							mode="normal"
							in2="BackgroundImageFix"
							result="effect1_dropShadow_199_18098"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_199_18098"
							result="shape"
						/>
					</filter>
					<clipPath id="clip0_199_18098">
						<rect width="152" height="143" rx="16" fill="white" />
					</clipPath>
					<clipPath id="clip1_199_18098">
						<rect
							width="180"
							height="140"
							rx="12"
							transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 52)"
							fill="white"
						/>
					</clipPath>
					<clipPath id="clip2_199_18098">
						<rect
							width="180"
							height="140"
							rx="12"
							transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 26)"
							fill="white"
						/>
					</clipPath>
					<clipPath id="clip3_199_18098">
						<rect
							width="180"
							height="140"
							rx="12"
							transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 0)"
							fill="white"
						/>
					</clipPath>
					<clipPath id="clip4_199_18098">
						<path
							d="M76 0H136C144.837 0 152 7.16344 152 16V127C152 135.837 144.837 143 136 143H76V0Z"
							fill="white"
						/>
					</clipPath>
					<clipPath id="clip5_199_18098">
						<rect
							width="180"
							height="140"
							rx="12"
							transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 52)"
							fill="white"
						/>
					</clipPath>
					<clipPath id="clip6_199_18098">
						<rect
							width="180"
							height="140"
							rx="12"
							transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 26)"
							fill="white"
						/>
					</clipPath>
					<clipPath id="clip7_199_18098">
						<rect
							width="180"
							height="140"
							rx="12"
							transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 0)"
							fill="white"
						/>
					</clipPath>
				</defs>
			</svg>
		</div>
	)
}

function LightPreview() {
	return (
		<div className="bg-bg relative h-[143px] w-full overflow-hidden rounded-2xl">
			<svg
				width="152"
				height="143"
				viewBox="0 0 152 143"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<g clipPath="url(#clip0_199_18159)">
					<rect width="152" height="143" rx="16" fill="#DEE0E3" />
					<g filter="url(#filter0_d_199_18159)">
						<g clipPath="url(#clip1_199_18159)">
							<rect
								width="180"
								height="140"
								transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 52)"
								fill="white"
							/>
						</g>
						<rect
							width="180"
							height="140"
							rx="12"
							transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 52)"
							stroke="#DEE0E3"
							strokeLinecap="round"
							shapeRendering="crispEdges"
						/>
					</g>
					<g filter="url(#filter1_d_199_18159)">
						<g clipPath="url(#clip2_199_18159)">
							<rect
								width="180"
								height="140"
								transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 26)"
								fill="white"
							/>
						</g>
						<rect
							width="180"
							height="140"
							rx="12"
							transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 26)"
							stroke="#DEE0E3"
							strokeLinecap="round"
							shapeRendering="crispEdges"
						/>
					</g>
					<g filter="url(#filter2_d_199_18159)">
						<g clipPath="url(#clip3_199_18159)">
							<rect
								width="93"
								height="140"
								transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 0)"
								fill="#EEEFF1"
							/>
							<circle
								cx="3"
								cy="3"
								r="3"
								transform="matrix(-0.857596 0.50482 -0.874374 -0.495133 150.875 15)"
								fill="#F53D3D"
							/>
							<circle
								cx="3"
								cy="3"
								r="3"
								transform="matrix(-0.857596 0.50482 -0.874374 -0.495133 159.586 20.0283)"
								fill="#FFAA00"
							/>
							<circle
								cx="5"
								cy="5"
								r="5"
								transform="matrix(0.866025 0.5 -0.866025 0.5 130.043 21.0293)"
								fill="#DEE0E3"
							/>
							<rect
								width="28"
								height="4"
								rx="2"
								transform="matrix(0.866025 0.5 -0.866025 0.5 141.301 30.5293)"
								fill="#DEE0E3"
							/>
							<circle
								cx="5"
								cy="5"
								r="5"
								transform="matrix(0.866025 0.5 -0.866025 0.5 117.918 28.0293)"
								fill="#DEE0E3"
							/>
							<rect
								width="53"
								height="4"
								rx="2"
								transform="matrix(0.866025 0.5 -0.866025 0.5 129.176 37.5293)"
								fill="#DEE0E3"
							/>
							<circle
								cx="5"
								cy="5"
								r="5"
								transform="matrix(0.866025 0.5 -0.866025 0.5 105.793 35.0293)"
								fill="#DEE0E3"
							/>
							<rect
								width="53"
								height="4"
								rx="2"
								transform="matrix(0.866025 0.5 -0.866025 0.5 117.051 44.5293)"
								fill="#DEE0E3"
							/>
							<circle
								cx="5"
								cy="5"
								r="5"
								transform="matrix(0.866025 0.5 -0.866025 0.5 93.668 42.0293)"
								fill="#067FF9"
							/>
							<rect
								width="53"
								height="4"
								rx="2"
								transform="matrix(0.866025 0.5 -0.866025 0.5 104.926 51.5293)"
								fill="#DEE0E3"
							/>
							<circle
								cx="5"
								cy="5"
								r="5"
								transform="matrix(0.866025 0.5 -0.866025 0.5 81.5469 49.0293)"
								fill="#623DF5"
							/>
							<rect
								width="53"
								height="4"
								rx="2"
								transform="matrix(0.866025 0.5 -0.866025 0.5 92.8047 58.5293)"
								fill="#DEE0E3"
							/>
							<rect
								width="87"
								height="140"
								transform="matrix(0.866025 0.5 -0.866025 0.5 226.219 46.5)"
								fill="white"
							/>
						</g>
						<rect
							y="0.5"
							width="179"
							height="139"
							rx="11.5"
							transform="matrix(0.866025 0.5 -0.866025 0.5 146.113 0.25)"
							stroke="#E9EAEC"
							shapeRendering="crispEdges"
						/>
					</g>
				</g>
				<defs>
					<filter
						id="filter0_d_199_18159"
						x="10.4375"
						y="42"
						width="305.125"
						height="188"
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB">
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dy="4" />
						<feGaussianBlur stdDeviation="7" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
						/>
						<feBlend
							mode="normal"
							in2="BackgroundImageFix"
							result="effect1_dropShadow_199_18159"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_199_18159"
							result="shape"
						/>
					</filter>
					<filter
						id="filter1_d_199_18159"
						x="10.4375"
						y="16"
						width="305.125"
						height="188"
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB">
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dy="4" />
						<feGaussianBlur stdDeviation="7" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
						/>
						<feBlend
							mode="normal"
							in2="BackgroundImageFix"
							result="effect1_dropShadow_199_18159"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_199_18159"
							result="shape"
						/>
					</filter>
					<filter
						id="filter2_d_199_18159"
						x="10.4375"
						y="-10"
						width="305.125"
						height="188"
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB">
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dy="4" />
						<feGaussianBlur stdDeviation="7" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
						/>
						<feBlend
							mode="normal"
							in2="BackgroundImageFix"
							result="effect1_dropShadow_199_18159"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_199_18159"
							result="shape"
						/>
					</filter>
					<clipPath id="clip0_199_18159">
						<rect width="152" height="143" rx="16" fill="white" />
					</clipPath>
					<clipPath id="clip1_199_18159">
						<rect
							width="180"
							height="140"
							rx="12"
							transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 52)"
							fill="white"
						/>
					</clipPath>
					<clipPath id="clip2_199_18159">
						<rect
							width="180"
							height="140"
							rx="12"
							transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 26)"
							fill="white"
						/>
					</clipPath>
					<clipPath id="clip3_199_18159">
						<rect
							width="180"
							height="140"
							rx="12"
							transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 0)"
							fill="white"
						/>
					</clipPath>
				</defs>
			</svg>
		</div>
	)
}

function DarkPreview() {
	return (
		<div className="relative h-[143px] w-full overflow-hidden rounded-2xl bg-[#2f3237]">
			<svg
				width="152"
				height="143"
				viewBox="0 0 152 143"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<g clipPath="url(#clip0_199_18190)">
					<rect width="152" height="143" rx="16" fill="#2F3237" />
					<g filter="url(#filter0_d_199_18190)">
						<g clipPath="url(#clip1_199_18190)">
							<rect
								width="180"
								height="140"
								transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 52)"
								fill="#131416"
							/>
						</g>
						<rect
							width="180"
							height="140"
							rx="12"
							transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 52)"
							stroke="#26282C"
							strokeLinecap="round"
							shapeRendering="crispEdges"
						/>
					</g>
					<g filter="url(#filter1_d_199_18190)">
						<g clipPath="url(#clip2_199_18190)">
							<rect
								width="180"
								height="140"
								transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 26)"
								fill="#131416"
							/>
						</g>
						<rect
							width="180"
							height="140"
							rx="12"
							transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 26)"
							stroke="#26282C"
							strokeLinecap="round"
							shapeRendering="crispEdges"
						/>
					</g>
					<g filter="url(#filter2_d_199_18190)">
						<g clipPath="url(#clip3_199_18190)">
							<rect
								width="93"
								height="140"
								transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 0)"
								fill="#1C1E21"
							/>
							<circle
								cx="3"
								cy="3"
								r="3"
								transform="matrix(-0.857596 0.50482 -0.874374 -0.495133 150.875 15)"
								fill="#F53D3D"
							/>
							<circle
								cx="3"
								cy="3"
								r="3"
								transform="matrix(-0.857596 0.50482 -0.874374 -0.495133 159.586 20.0283)"
								fill="#FFAA00"
							/>
							<circle
								cx="5"
								cy="5"
								r="5"
								transform="matrix(0.866025 0.5 -0.866025 0.5 130.043 21.0293)"
								fill="#2F3237"
							/>
							<rect
								width="28"
								height="4"
								rx="2"
								transform="matrix(0.866025 0.5 -0.866025 0.5 141.301 30.5293)"
								fill="#2F3237"
							/>
							<circle
								cx="5"
								cy="5"
								r="5"
								transform="matrix(0.866025 0.5 -0.866025 0.5 117.918 28.0293)"
								fill="#2F3237"
							/>
							<rect
								width="53"
								height="4"
								rx="2"
								transform="matrix(0.866025 0.5 -0.866025 0.5 129.176 37.5293)"
								fill="#2F3237"
							/>
							<circle
								cx="5"
								cy="5"
								r="5"
								transform="matrix(0.866025 0.5 -0.866025 0.5 105.793 35.0293)"
								fill="#2F3237"
							/>
							<rect
								width="53"
								height="4"
								rx="2"
								transform="matrix(0.866025 0.5 -0.866025 0.5 117.051 44.5293)"
								fill="#2F3237"
							/>
							<circle
								cx="5"
								cy="5"
								r="5"
								transform="matrix(0.866025 0.5 -0.866025 0.5 93.668 42.0293)"
								fill="#067FF9"
							/>
							<rect
								width="53"
								height="4"
								rx="2"
								transform="matrix(0.866025 0.5 -0.866025 0.5 104.926 51.5293)"
								fill="#2F3237"
							/>
							<circle
								cx="5"
								cy="5"
								r="5"
								transform="matrix(0.866025 0.5 -0.866025 0.5 81.5469 49.0293)"
								fill="#623DF5"
							/>
							<rect
								width="53"
								height="4"
								rx="2"
								transform="matrix(0.866025 0.5 -0.866025 0.5 92.8047 58.5293)"
								fill="#2F3237"
							/>
							<rect
								width="87"
								height="140"
								transform="matrix(0.866025 0.5 -0.866025 0.5 226.219 46.5)"
								fill="#1C1E21"
							/>
						</g>
						<rect
							y="0.5"
							width="179"
							height="139"
							rx="11.5"
							transform="matrix(0.866025 0.5 -0.866025 0.5 146.113 0.25)"
							stroke="#1C1E21"
							shapeRendering="crispEdges"
						/>
					</g>
				</g>
				<defs>
					<filter
						id="filter0_d_199_18190"
						x="10.4375"
						y="42"
						width="305.125"
						height="188"
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB">
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dy="4" />
						<feGaussianBlur stdDeviation="7" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
						/>
						<feBlend
							mode="normal"
							in2="BackgroundImageFix"
							result="effect1_dropShadow_199_18190"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_199_18190"
							result="shape"
						/>
					</filter>
					<filter
						id="filter1_d_199_18190"
						x="10.4375"
						y="16"
						width="305.125"
						height="188"
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB">
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dy="4" />
						<feGaussianBlur stdDeviation="7" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
						/>
						<feBlend
							mode="normal"
							in2="BackgroundImageFix"
							result="effect1_dropShadow_199_18190"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_199_18190"
							result="shape"
						/>
					</filter>
					<filter
						id="filter2_d_199_18190"
						x="10.4375"
						y="-10"
						width="305.125"
						height="188"
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB">
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dy="4" />
						<feGaussianBlur stdDeviation="7" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
						/>
						<feBlend
							mode="normal"
							in2="BackgroundImageFix"
							result="effect1_dropShadow_199_18190"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_199_18190"
							result="shape"
						/>
					</filter>
					<clipPath id="clip0_199_18190">
						<rect width="152" height="143" rx="16" fill="white" />
					</clipPath>
					<clipPath id="clip1_199_18190">
						<rect
							width="180"
							height="140"
							rx="12"
							transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 52)"
							fill="white"
						/>
					</clipPath>
					<clipPath id="clip2_199_18190">
						<rect
							width="180"
							height="140"
							rx="12"
							transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 26)"
							fill="white"
						/>
					</clipPath>
					<clipPath id="clip3_199_18190">
						<rect
							width="180"
							height="140"
							rx="12"
							transform="matrix(0.866025 0.5 -0.866025 0.5 145.68 0)"
							fill="white"
						/>
					</clipPath>
				</defs>
			</svg>
		</div>
	)
}

export default function ThemeStep({
	onNext,
	onSkip,
}: {
	onNext: () => void
	onSkip: () => void
}) {
	const [selectedTheme, setSelectedTheme] = useState<string>("system")

	const previews: Record<string, React.ReactNode> = {
		system: <SystemPreview />,
		light: <LightPreview />,
		dark: <DarkPreview />,
	}

	return (
		<div className="flex w-full max-w-[480px] flex-col gap-8">
			{/* Header */}
			<div className="flex flex-col gap-6">
				<Radian />

				<div className="flex flex-col gap-2">
					<h1 className="heading-5">Personalize your experience</h1>
					<p className="text-fg-secondary text-sm">
						Customize your experience with light, dark or system default mode.
					</p>
				</div>
			</div>

			{/* Theme Options */}
			<div className="flex gap-3">
				{themeOptions.map((theme) => (
					<button
						key={theme.id}
						type="button"
						onClick={() => setSelectedTheme(theme.id)}
						className="flex flex-1 flex-col items-center gap-4">
						<div
							className={cn(
								"w-full overflow-hidden rounded-2xl transition-all",
								selectedTheme === theme.id &&
									"ring-primary ring-offset-bg ring-[3px] ring-offset-2"
							)}>
							{previews[theme.id]}
						</div>
						{selectedTheme === theme.id ? (
							<Badge variant="strong" color="primary" size="24">
								{theme.label}
							</Badge>
						) : (
							<span className="text-fg text-[13px] font-medium">
								{theme.label}
							</span>
						)}
					</button>
				))}
			</div>

			{/* Actions */}
			<div className="flex gap-3">
				<Button
					type="button"
					variant="outline"
					color="neutral"
					size="36"
					className="flex-1"
					onClick={onSkip}>
					Skip
				</Button>
				<Button
					type="button"
					variant="strong"
					color="primary"
					size="36"
					className="flex-1"
					onClick={onNext}>
					Continue
				</Button>
			</div>
		</div>
	)
}
