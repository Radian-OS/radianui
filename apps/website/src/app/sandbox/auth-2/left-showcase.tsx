"use client"

import React, { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

function Login03Shader() {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		let animationFrameId: number
		const canvas = canvasRef.current
		if (!canvas) return

		const gl = canvas.getContext("webgl")
		if (!gl) return

		const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `

		const fsSource = `
      precision highp float;

      uniform vec2 resolution;
      uniform float time;

      float random (in float x) {
          return fract(sin(x) * 1e4);
      }

      void main() {
          vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy)
                    / min(resolution.x, resolution.y);

          vec2 fMosaicScal = vec2(4.0, 2.0);
          vec2 vScreenSize = vec2(256.0, 256.0);

          uv.x = floor(uv.x * vScreenSize.x / fMosaicScal.x)
                 / (vScreenSize.x / fMosaicScal.x);

          uv.y = floor(uv.y * vScreenSize.y / fMosaicScal.y)
                 / (vScreenSize.y / fMosaicScal.y);

          float t = time * 0.06 + random(uv.x) * 0.4;

          float lineWidth = 0.0008;

          vec3 color = vec3(0.0);

          for(int j = 0; j < 3; j++){
              for(int i = 0; i < 5; i++){
                  color[j] += lineWidth * float(i * i) /
                      abs(fract(t - 0.01 * float(j)
                      + float(i) * 0.01) - length(uv));
              }
          }

          gl_FragColor = vec4(color.b, color.g, color.r, 1.0);
      }
    `

		const createShader = (type: number, source: string) => {
			const shader = gl.createShader(type)
			if (!shader) return null
			gl.shaderSource(shader, source)
			gl.compileShader(shader)
			return shader
		}

		const vs = createShader(gl.VERTEX_SHADER, vsSource)
		const fs = createShader(gl.FRAGMENT_SHADER, fsSource)
		if (!vs || !fs) return

		const program = gl.createProgram()
		if (!program) return
		gl.attachShader(program, vs)
		gl.attachShader(program, fs)
		gl.linkProgram(program)
		gl.useProgram(program)

		const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
		const buffer = gl.createBuffer()
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
		gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

		const positionLoc = gl.getAttribLocation(program, "position")
		gl.enableVertexAttribArray(positionLoc)
		gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0)

		const resolutionLoc = gl.getUniformLocation(program, "resolution")
		const timeLoc = gl.getUniformLocation(program, "time")

		const resize = () => {
			const dpr = window.devicePixelRatio || 1
			const width = canvas.clientWidth * dpr
			const height = canvas.clientHeight * dpr
			canvas.width = width
			canvas.height = height
			gl.viewport(0, 0, width, height)
			gl.uniform2f(resolutionLoc, width, height)
		}

		resize()
		window.addEventListener("resize", resize)

		const startTime = performance.now()
		const render = (now: number) => {
			gl.uniform1f(timeLoc, (now - startTime) * 0.005)
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
			animationFrameId = requestAnimationFrame(render)
		}

		animationFrameId = requestAnimationFrame(render)

		return () => {
			cancelAnimationFrame(animationFrameId)
			window.removeEventListener("resize", resize)
		}
	}, [])

	return <canvas ref={canvasRef} className="absolute inset-0 size-full" />
}

export function LeftShowcase() {
	return (
		<div className="dark hidden shrink-0 overflow-hidden select-none lg:flex lg:w-lg">
			<div className="relative flex size-full flex-col items-center justify-center overflow-hidden bg-black p-12 text-center text-white lg:p-16">
				{/* Center Content Box */}
				<div className="z-10 flex max-w-sm flex-col items-center gap-6">
					<Link
						href="#"
						className="flex shrink-0 items-center justify-center transition-transform hover:scale-105"
						aria-label="Home">
						<Image
							src="https://images.shadcnspace.com/assets/logo/logo-icon-white.svg"
							alt="Shadcn Space Logo"
							width={48}
							height={48}
							className="size-12"
							priority
						/>
					</Link>
					<p className="max-w-sm text-center text-[30px] leading-9 font-medium text-white">
						Welcome Back to Your Creative Space
					</p>
				</div>

				{/* Visual Animation from login-03 */}
				<div className="absolute inset-0 z-0 size-full overflow-hidden">
					<Login03Shader />
					{/* Subtle overlay gradient to ensure high contrast and readability */}
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 bg-black/25"
					/>
				</div>
			</div>
		</div>
	)
}
