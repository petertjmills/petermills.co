import { Button } from "./ui/button.jsx";
import { useState } from "react";
import Color from "colorjs.io";

const randomNumber2dp = (min, max) => {
  return Number((Math.random() * (max - min) + min).toFixed(2));
};

const harmonyMultiple = {
  complementary: [0, 180],
  splitComplementary: [0, 150, 320],
  splitComplementaryCW: [0, 150, 300],
  splitComplementaryCCW: [0, 60, 210],
  triadic: [0, 120, 240],
  clash: [0, 90, 270],
  tetradic: [0, 90, 180, 270],
  fourToneCW: [0, 60, 180, 240],
  fourToneCCW: [0, 120, 180, 300],
  fiveToneA: [0, 115, 155, 205, 245],
  fiveToneB: [0, 40, 90, 130, 245],
  fiveToneC: [0, 50, 90, 205, 320],
  fiveToneD: [0, 40, 155, 270, 310],
  fiveToneE: [0, 115, 230, 270, 320],
  sixToneCW: [0, 30, 120, 150, 240, 270],
  sixToneCCW: [0, 90, 120, 210, 240, 330],
  neutral: [0, 15, 30, 45, 60, 75],
  analogous: [0, 30, 60, 90, 120, 150],
};

export default function OKLCH() {
  const [hue, setHue] = useState(randomNumber2dp(0, 360));
  const [lightness, setLightness] = useState(randomNumber2dp(0, 100));
  const [chroma, setChroma] = useState(randomNumber2dp(0, 0.37));
  const [harmony, setHarmony] = useState("complementary");

  const randomColour = (hueval) => {
    return `oklch(${lightness}% ${chroma} ${hueval})`;
  };

  const isValidRGBColour = (colour) => {
    return new Color(colour).to("srgb").inGamut();
  };

  const isValidP3Colour = (colour) => {
    return new Color(colour).to("p3").inGamut();
  };

  return (
    <>
      <div className="flex justify-center pt-5 gap-2">
        <select
          className="p-2 text-black"
          onChange={(e) => setHarmony(e.target.value)}
        >
          {Object.keys(harmonyMultiple).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-center pt-5 gap-2">
        {harmonyMultiple[harmony].map((i) => {
          const hueval = (hue + i) % 360;
          return (
            <div className="w-20">
              <div
                key={hueval}
                className={
                  "rounded-lg h-10 w-20" +
                  (isValidRGBColour(randomColour(hueval)) ||
                  !isValidP3Colour(randomColour(hueval))
                    ? ""
                    : " border-b-4 border-yellow-500") +
                  (isValidP3Colour(randomColour(hueval))
                    ? ""
                    : " border-b-4 border-red-500")
                }
                style={{
                  backgroundColor: randomColour(hueval),
                }}
              ></div>
              <div className="text-xs">
                <p>
                  {(isValidRGBColour(randomColour(hueval)) ||
                  !isValidP3Colour(randomColour(hueval))
                    ? ""
                    : "Not in RGB") +
                    (isValidP3Colour(randomColour(hueval))
                      ? ""
                      : "Not in P3")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center pt-5 gap-2">
        <input
          type="range"
          min="0"
          max="360"
          value={hue}
          onChange={(e) => setHue(Number(e.target.value))}
        />
        <Button
          className="text-light"
          onClick={() => {
            setHue(randomNumber2dp(0, 360));
          }}
        >
          Random
        </Button>
        <input
          type="range"
          min="0"
          max="100"
          value={lightness}
          onChange={(e) => setLightness(e.target.value)}
        />
        <input
          type="range"
          min="0"
          max="0.37"
          step="0.01"
          value={chroma}
          onChange={(e) => setChroma(e.target.value)}
        />
      </div>
    </>
  );
}
