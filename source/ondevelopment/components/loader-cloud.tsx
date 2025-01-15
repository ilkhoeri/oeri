export function LoaderCloud() {
  return (
    <>
      <svg viewBox="-4 -4 151 100" color="currentColor" preserveAspectRatio="xMidYMid" data-test="progress" className="cloudsvg">
        <path
          d="M121.663 90.638c-1.796 0-99.33-.498-101.474-1.478C8.685 83.877 1.25 72.196 1.25 59.396c0-16.656 12.797-30.61 29.052-32.323 7.49-15.706 23.186-25.707 40.714-25.707 20.98 0 39.215 14.752 43.945 34.907 15.09.245 27.29 12.63 27.29 27.822 0 11.968-7.738 22.55-19.256 26.33"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
          fillRule="evenodd"
          className="cloudpath"
        />
      </svg>
      <style>{style}</style>
    </>
  );
}
const style = `.cloudsvg{width:var(--cloud-sz,66px)}.cloudsvg path{stroke-dasharray:280;stroke-dashoffset:0;transform-origin:center center}.cloudpath{animation:2s ease-in-out 0s infinite normal none running path-1,8s ease-in-out 0s infinite normal none running path-2}@keyframes path-1{0%{stroke-dashoffset:560}50%{stroke-dashoffset:0}100%{stroke-dashoffset:560}}@keyframes path-2{0%{stroke:var(--cloud-cl,hsl(var(--color)))}50%{stroke:var(--cloud-cl,hsl(var(--color)))}100%{stroke:var(--cloud-cl,hsl(var(--color)))}}`;
