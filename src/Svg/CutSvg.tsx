import {View, Text} from 'react-native';
import React from 'react';
import {Circle, G, Path, Svg} from 'react-native-svg';
import useThemeColors from '../constant/useColor';

export default function CutSvg({h, w}: any) {
  const colors = useThemeColors();
  return (
    <Svg height={h || '24px'} width={w || '24px'} viewBox="0 0 512 512">
      <G>
        <Path
          fill={'#EFEFEF'}
          d="M382.184,388.862L187.337,51.377l-0.071,0.04c-0.494-0.954-1.004-1.903-1.546-2.843
		c-19.149-33.166-61.556-44.529-94.722-25.38c-33.166,19.148-44.528,61.555-25.38,94.721s61.555,44.528,94.721,25.38
		c2.028-1.17,3.97-2.43,5.832-3.767L373.21,498.13L382.184,388.862z"
        />
        <Path
          fill={'#EFEFEF'}
          d="M421.004,23.194c-33.166-19.148-75.573-7.786-94.721,25.38c-0.542,0.94-1.054,1.889-1.546,2.843
		l-0.071-0.042L129.818,388.862l8.974,109.27l207.04-358.602c1.863,1.337,3.805,2.596,5.832,3.767
		c33.166,19.148,75.573,7.784,94.721-25.38C465.532,84.749,454.168,42.342,421.004,23.194z"
        />
      </G>
      <Circle fill={colors.iconColor} cx="256.145" cy="228.99" r="52.005" />
      <Path
        d="M125.603,69.364c-2.409,0-4.719,0.63-6.869,1.869c-6.622,3.823-8.901,12.322-5.077,18.944
	c3.722,6.445,10.183,6.945,12.075,6.945c2.41,0,4.721-0.63,6.87-1.869c6.622-3.823,8.899-12.322,5.074-18.945
	C133.957,69.866,127.496,69.364,125.603,69.364z"
      />
      <Path
        d="M393.266,71.233c-2.15-1.24-4.46-1.869-6.869-1.869c-1.892,0-8.353,0.501-12.075,6.947
	c-3.823,6.622-1.546,15.12,5.076,18.944c2.148,1.241,4.461,1.869,6.873,1.869c1.892,0,8.35-0.501,12.071-6.945
	C402.167,83.556,399.89,75.057,393.266,71.233z"
      />
      <Path
        d="M466.706,61.709c-5.753-21.469-19.521-39.412-38.77-50.524c-19.248-11.113-41.668-14.066-63.14-8.313
	c-21.468,5.752-39.412,19.521-50.522,38.766C313.898,42.29,256,142.571,256,142.571S198.104,42.293,197.727,41.641
	c-11.113-19.248-29.055-33.017-50.524-38.77c-21.471-5.752-43.893-2.8-63.14,8.313c-19.249,11.113-33.017,29.055-38.77,50.524
	c-5.751,21.468-2.801,43.891,8.313,63.14c21.772,37.713,68.814,51.936,107.517,33.676l31.214,54.063
	c-1.349,5.245-2.068,10.741-2.068,16.4c0,7.447,1.261,14.602,3.549,21.282l-76.011,131.657c-1.412,2.444-2.043,5.259-1.813,8.068
	l8.974,109.27c0.496,6.046,4.866,11.067,10.784,12.397c1.014,0.227,2.033,0.337,3.04,0.337c4.877,0,9.494-2.581,12.007-6.934
	l105.199-182.211l105.199,182.211c2.514,4.355,7.131,6.934,12.007,6.934c1.008,0,2.028-0.11,3.04-0.337
	c5.919-1.329,10.287-6.35,10.784-12.397l8.974-109.27c0.23-2.811-0.401-5.626-1.813-8.068l-75.831-131.344
	c2.356-6.77,3.654-14.033,3.654-21.595c0-5.782-0.754-11.39-2.161-16.736l31.02-53.728c11.34,5.35,23.39,7.913,35.315,7.912
	c28.778-0.001,56.809-14.926,72.202-41.588C469.508,105.6,472.459,83.176,466.706,61.709z M178.181,132.594
	c-1.958-3.392-5.259-5.798-9.088-6.622c-0.968-0.209-1.947-0.312-2.922-0.312c-2.876,0-11.18,4.71-12.766,5.625
	c-26.492,15.294-60.484,6.185-75.778-20.304c-7.408-12.832-9.376-27.782-5.542-42.094c3.836-14.312,13.015-26.275,25.847-33.683
	c12.834-7.41,27.783-9.378,42.094-5.542c14.312,3.835,26.275,13.014,33.686,25.85c0.435,0.756,63.7,110.332,63.7,110.332
	c-11.42,3.394-21.548,9.803-29.466,18.306L178.181,132.594z M148.979,452.748l-4.987-60.704l66.668-115.473
	c7.715,7.378,30.359,16.797,30.359,16.797L148.979,452.748z M218.006,228.989c0-21.03,17.109-38.137,38.137-38.137
	s38.137,17.108,38.137,38.137s-17.109,38.137-38.137,38.137S218.006,250.017,218.006,228.989z M368.008,392.044l-4.987,60.704
	l-91.969-159.264c0,0,22.624-9.367,30.389-16.736L368.008,392.044z M434.374,110.981c-15.292,26.49-49.29,35.597-75.777,20.306
	c-1.588-0.917-3.162-1.935-4.681-3.023c-3.183-2.285-7.188-3.116-11.009-2.291c-3.829,0.825-7.13,3.231-9.088,6.622l-29.658,51.369
	c-7.946-8.471-18.098-14.839-29.532-18.189c0,0,63.223-109.505,63.663-110.265c7.408-12.832,19.371-22.011,33.683-25.846
	c14.315-3.833,29.262-1.865,42.094,5.542c12.832,7.408,22.012,19.371,25.847,33.683C443.75,83.199,441.782,98.148,434.374,110.981z"
      />
    </Svg>
  );
}
