import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg currentFill="fill" {...props}>
      <circle cx="11.98" cy="12.02" r="2.52" />
      <path d="M15.91 5.49H8.05c-1.75 0-2.6.85-2.6 2.6v7.86c0 1.75.85 2.6 2.6 2.6h7.86c1.75 0 2.6-.85 2.6-2.6V8.09c0-1.75-.85-2.6-2.6-2.6zm-3.93 10.68c-2.29 0-4.15-1.86-4.15-4.15s1.86-4.15 4.15-4.15 4.15 1.86 4.15 4.15-1.86 4.15-4.15 4.15zm3.9-7.42c-.65 0-1.18-.53-1.18-1.18s.53-1.18 1.18-1.18 1.18.53 1.18 1.18-.53 1.18-1.18 1.18zM16.59 2H7.41A5.41 5.41 0 0 0 2 7.41v9.19a5.41 5.41 0 0 0 5.41 5.41h9.19a5.41 5.41 0 0 0 5.41-5.41V7.41A5.41 5.41 0 0 0 16.6 2zm3.54 13.95c0 2.65-1.58 4.23-4.23 4.23H8.04c-2.65 0-4.23-1.58-4.23-4.23V8.09c0-2.65 1.58-4.23 4.23-4.23h7.86c2.65 0 4.23 1.58 4.23 4.23v7.86z" />
    </Svg>
  );
}