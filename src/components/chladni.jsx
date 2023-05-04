import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import useMeasure from "react-use-measure";

import * as THREE from "three";

const geometry = new THREE.PlaneGeometry(7, 7);
const shader = new THREE.ShaderMaterial({
	uniforms: {
		u_time: { value: 0.0 },
		u_resolution: {
			value: new THREE.Vector2(0, 0),
		},
		u_mouse: { value: new THREE.Vector2(0.0, 0.0) },
		u_pi: { value: Math.PI },
		u_n: { value: 3 },
		u_m: { value: 4 },
		u_a: { value: -5 },
		u_b: { value: 20 },
		colorOne: { value: new THREE.Color(0xff0000) },
		colorTwo: { value: new THREE.Color(0xffffff) },
		opacityOne: { value: 1.0 },
		opacityTwo: { value: 1.0 },
		u_random: { value: 0.0 },
		u_animate: { value: 0.5 },
	},
	vertexShader: `
    void main() {
      gl_Position = vec4(position, 1.0);
      }
      `,
	fragmentShader: `
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform float u_pi;
  uniform float u_n;
  uniform float u_m;
  uniform float u_a;
  uniform float u_b;
  uniform vec3 colorOne;
  uniform vec3 colorTwo;
  uniform float opacityOne;
  uniform float opacityTwo;
  uniform float u_random;
  uniform float u_animate;

  void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    //a*sin(pi*x*n)*sin(pi*y*m) + b*sin(pi*x*m)*sin(pi*y*n)
    float a = u_a*(sin(u_time*u_animate));
    float b = u_b*(cos(u_time*u_animate));

    float n = u_n;
    float m = u_m;

    float x = st.x;
    float y = st.y;

    float r = a*sin(u_pi*x*n)*sin(u_pi*y*m) + b*sin(u_pi*x*m)*sin(u_pi*y*n);
    
    r = 1.0 - r;
    float color = r;

    if (color > 0.0) {
      gl_FragColor = (color-1.0)*vec4(colorOne,opacityOne);
    } else {
      gl_FragColor = (-color-1.0)*vec4(colorTwo,opacityTwo);
    }
  }
    `,
});

const Chladni = ({
	n,
	m,
	a,
	b,
	colorOne,
	colorTwo,
	opacityOne,
	opacityTwo,
	height,
	width,
	animate
}) => {
	useFrame((state, delta, xrFrame) => {
		shader.uniforms.u_time.value += delta;
		shader.uniforms.u_random = Math.random();
	});
	shader.uniforms.u_n.value = n;
	shader.uniforms.u_m.value = m;
	shader.uniforms.u_a.value = a;
	shader.uniforms.u_b.value = b;
	shader.uniforms.colorOne.value = new THREE.Color(colorOne);
	shader.uniforms.colorTwo.value = new THREE.Color(colorTwo);
	shader.uniforms.opacityOne.value = opacityOne;
	shader.uniforms.opacityTwo.value = opacityTwo;
	shader.uniforms.u_resolution.value = new THREE.Vector2(width, height);
	shader.uniforms.u_animate.value = animate;

	return <mesh geometry={geometry} material={shader} />;
};

const App = (props) => {
	const [n, setN] = useState(props.n || 3.0);
	const [m, setM] = useState(props.m || 5.0);
	const [a, setA] = useState(props.a || 100.0);
	const [b, setB] = useState(props.b || 100.0);
	const [colorOne, setColorOne] = useState(props.colorOne || '#000000');
	const [colorTwo, setColorTwo] = useState(props.colorTwo || '#000000');
	const [opacityOne, setOpacityOne] = useState(props.opacityOne || 1);
	const [opacityTwo, setOpacityTwo] = useState(props.opacityTwo || 1);
	const [backgroundColor, setBackgroundColor] = useState(props.backgroundColor || '#ffffff');
	const [animate, setAnimate] = useState(props.animate || 0.5);

	const [ref, bounds] = useMeasure();

	const getURLparams = () => {
		const urlParams = new URLSearchParams(window.location.search);
		setN(urlParams.get('n') || 3.0);
		setM(urlParams.get('m') || 5.0);
		setA(urlParams.get('a') || 100.0);
		setB(urlParams.get('b') || 100.0);
		setColorOne(urlParams.get('colorOne') || '#000000');
		setColorTwo(urlParams.get('colorTwo') || '#000000');
		setOpacityOne(urlParams.get('opacityOne') || 1);
		setOpacityTwo(urlParams.get('opacityTwo') || 1);
		setBackgroundColor(urlParams.get('backgroundColor') || '#ffffff');
		setAnimate(urlParams.get('animate') || 0.5);
	}
	useEffect(() => {
		getURLparams();
	}, []);

    const urlToClipboard = () => {
		const url = new URL(window.location.href);
		url.searchParams.set('n', n);
		url.searchParams.set('m', m);
		url.searchParams.set('a', a);
		url.searchParams.set('b', b);
		url.searchParams.set('colorOne', colorOne);
		url.searchParams.set('colorTwo', colorTwo);
		url.searchParams.set('opacityOne', opacityOne);
		url.searchParams.set('opacityTwo', opacityTwo);
		url.searchParams.set('backgroundColor', backgroundColor);
		url.searchParams.set('animate', animate);
		navigator.clipboard.writeText(url.href);
    }

	return (
		<div className="flex flex-col pt-5 no-type">
			<div className="flex justify-center">
				<div
					className="flex flex-col rounded-lg items-center"
					style={{
						height: "50vh",
						width: "50vh",
						backgroundColor: backgroundColor,
					}}
					ref={ref}
				>
					<Canvas className="flex rounded-lg"
						gl={{
							premultipliedAlpha: false,
						}}
					>
						<Chladni
							n={n}
							m={m}
							a={a}
							b={b}
							colorOne={colorOne}
							colorTwo={colorTwo}
							opacityOne={opacityOne}
							opacityTwo={opacityTwo}
							height={bounds.height}
							width={bounds.width}
							animate={animate}
						/>
					</Canvas>
				</div>
			</div>
			<div className="flex flex-col">
				<label className="">n: {n}</label>
				<input
					type="range"
					min="0"
					max="100"
					step={0.1}
					value={n}
					onChange={(e) => setN(e.target.value)}
				/>

				<label className="">m: {m}</label>
				<input
					type="range"
					min="0"
					max="100"
					step={0.1}
					value={m}
					onChange={(e) => setM(e.target.value)}
				/>

				<label className="">a: {a}</label>
				<input
					type="range"
					min="-100"
					max="100"
					step={0.1}
					value={a}
					onChange={(e) => setA(e.target.value)}
				/>

				<label className="">b: {b}</label>
				<input
					type="range"
					min="-100"
					max="100"
					step={0.1}
					value={b}
					onChange={(e) => setB(e.target.value)}
				/>

				<label className="">colorOne: {colorOne}</label>
				<input
					type="color"
					value={colorOne}
					onChange={(e) => setColorOne(e.target.value)}
				/>

				<label className="">colorTwo: {colorTwo}</label>
				<input
					type="color"
					value={colorTwo}
					onChange={(e) => setColorTwo(e.target.value)}
				/>

				<label className="">
					backgroundColor: {backgroundColor}
				</label>
				<input
					type="color"
					value={backgroundColor}
					onChange={(e) => setBackgroundColor(e.target.value)}
				/>

				<label className="">opacityOne: {opacityOne}</label>
				<input
					type="checkbox"
					checked={opacityOne}
					onChange={(e) => setOpacityOne(e.target.checked)}
				/>

				<label className="">opacityTwo: {opacityTwo}</label>
				<input
					type="checkbox"
					checked={opacityTwo}
					onChange={(e) => setOpacityTwo(e.target.checked)}
				/>

				<label className="">animate: {animate}</label>
				<input
					type="range"
					min="0"
					max="1"
					step={0.1}
					value={animate}
					onChange={(e) => setAnimate(e.target.value)}
				/>

                <button onClick={urlToClipboard}>Copy Link! Share it!</button>
			</div>
		</div>
	);
};

export default App;
