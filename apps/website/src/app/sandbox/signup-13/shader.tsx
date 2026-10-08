"use client"

import React, { useEffect, useRef } from "react"

export function Shader() {
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
      uniform vec3 primaryColor;

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

          float intensity = 0.0;
          for(int i = 0; i < 5; i++){
              intensity += lineWidth * float(i * i) /
                  abs(fract(t + float(i) * 0.01) - length(uv));
          }

          gl_FragColor = vec4(primaryColor * intensity, 1.0);
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

		// Get primary color from CSS
		const tempEl = document.createElement("div")
		tempEl.style.color = "var(--color-primary)"
		tempEl.style.display = "none"
		if (canvas.parentElement) {
			canvas.parentElement.appendChild(tempEl)
		} else {
			document.body.appendChild(tempEl)
		}

		const computedColor = getComputedStyle(tempEl).color

		if (tempEl.parentElement) {
			tempEl.parentElement.removeChild(tempEl)
		}

		// Fallback purple: #9981F8
		let pr = 153 / 255,
			pg = 129 / 255,
			pb = 248 / 255

		const rgbMatch = computedColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
		if (rgbMatch) {
			pr = parseInt(rgbMatch[1]) / 255
			pg = parseInt(rgbMatch[2]) / 255
			pb = parseInt(rgbMatch[3]) / 255
		} else {
			// Try to parse modern color spaces (like oklch) using a 1x1 canvas
			try {
				const tempCanvas = document.createElement("canvas")
				tempCanvas.width = 1
				tempCanvas.height = 1
				const ctx = tempCanvas.getContext("2d", { willReadFrequently: true })
				if (ctx) {
					ctx.fillStyle = "#ffffff" // sentinel color
					ctx.fillStyle = computedColor
					ctx.fillRect(0, 0, 1, 1)
					const data = ctx.getImageData(0, 0, 1, 1).data
					if (data[0] !== 255 || data[1] !== 255 || data[2] !== 255) {
						pr = data[0] / 255
						pg = data[1] / 255
						pb = data[2] / 255
					}
				}
			} catch (e) {
				console.error("Canvas color parsing failed", e)
			}
		}

		const primaryColorLoc = gl.getUniformLocation(program, "primaryColor")
		gl.uniform3f(primaryColorLoc, pr, pg, pb)

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
