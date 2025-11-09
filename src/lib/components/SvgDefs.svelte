<svg style="position: absolute; width: 0; height: 0;">
    <defs>
        <mask id="FooterMask">
            <image href="/footer-paper-piece.svg" width="328px" height="80px" />
        </mask>
        <filter id="InkBleed">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
            <feGaussianBlur stdDeviation="0.6" />
            <feMorphology operator="erode" radius="0.1" />
            <feBlend in="SourceGraphic" in2="blur" mode="normal" />
        </filter>
        <filter id='RoughPaper' x='0' y='0' width='100%' height='100%'>
            <feTurbulence type="fractalNoise" baseFrequency='0.025' result='noise' numOctaves="5" />
            <feDiffuseLighting in='noise' lighting-color='#fff' surfaceScale='2'>
                <feDistantLight azimuth='90' elevation='70' />
            </feDiffuseLighting>
        </filter>
    </defs>
</svg>