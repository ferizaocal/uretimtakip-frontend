import {View, Text} from 'react-native';
import React from 'react';
import {G, Path, Svg} from 'react-native-svg';

export default function BabyPijamaSvg({color = '#C9C9C9'}: SvgProps) {
  return (
    <Svg fill={color} width="31" height="24" viewBox="0 0 512 512">
      <G>
        <G>
          <Path
            d="M489.287,100.994l-71.504-85.803C409.739,5.537,397.917,0,385.349,0H126.651c-12.568,0-24.39,5.537-32.435,15.191
           l-71.504,85.803c-4.347,5.217-5.054,12.713-1.756,18.653L57.209,184.9c4.041,7.273,12.911,10.426,20.635,7.336l24.769-9.907
           v223.017c0,10.447,3.85,20.479,10.84,28.245l57.99,64.433c7.994,8.883,19.432,13.976,31.382,13.976h106.351
           c11.95,0,23.388-5.094,31.383-13.976l57.989-64.433c6.99-7.766,10.84-17.797,10.84-28.245V182.33l24.768,9.907
           c7.725,3.094,16.596-0.063,20.637-7.335l36.252-65.255C494.341,113.708,493.634,106.212,489.287,100.994z M315.844,16.033
           C311.908,45.555,286.581,68.409,256,68.409c-30.581,0-55.908-22.854-59.844-52.376H315.844z M179.995,16.033
           c4.022,38.387,36.571,68.409,76.005,68.409c39.434,0,71.983-30.022,76.003-68.409h18.25c-4.083,48.423-44.793,86.58-94.254,86.58
           s-90.171-38.157-94.254-86.58H179.995z M71.89,177.351c-0.251,0.097-0.534-0.003-0.664-0.237l-36.252-65.251
           c-0.109-0.197-0.087-0.432,0.057-0.603l12.704-15.244l41.362,74.452L71.89,177.351z M104.578,164.275l-0.475,0.19L58.74,82.809
           l47.056-56.469C112.619,45.697,129.459,105.111,104.578,164.275z M175.892,478.999l-50.522-56.135
           c-3.07-3.41-5.139-7.531-6.099-11.943c5.589-1.013,11.285-1.535,17.014-1.535c31.958,0,61.869,16.343,79.26,42.96
           C200.677,458.192,187.103,467.235,175.892,478.999z M309.175,495.967H202.825c-5.762,0-11.327-1.917-15.851-5.355
           c17.856-19.04,42.884-29.918,69.026-29.918c26.175,0,51.165,10.872,69.026,29.918C320.502,494.05,314.938,495.967,309.175,495.967
           z M386.631,422.864l-50.523,56.138c-11.217-11.772-24.78-20.821-39.644-26.666c17.391-26.61,47.297-42.95,79.252-42.95
           c5.728,0,11.425,0.522,17.015,1.535C391.77,415.334,389.7,419.454,386.631,422.864z M393.353,394.756
           c-5.813-0.931-11.713-1.403-17.638-1.403c-38.893,0-75.198,20.699-95.094,54.095c-8.01-1.831-16.263-2.788-24.621-2.788
           c-8.351,0-16.604,0.958-24.618,2.792c-19.897-33.4-56.201-54.099-95.098-54.099c-5.925,0-11.825,0.472-17.637,1.403V172.138
           c17.721-40.972,16.744-81.615,12.74-108.643c-3.338-22.531-9.159-39.345-11.914-46.462c2.308-0.655,4.719-0.998,7.178-0.998
           h19.011v-0.001C149.784,73.307,197.694,118.647,256,118.647s106.217-45.34,110.338-102.614h19.01c2.458,0,4.87,0.343,7.178,0.998
           c-2.755,7.117-8.576,23.93-11.914,46.462c-7.183,48.488,2.778,85.617,12.741,108.666V394.756z M407.897,164.465l-0.476-0.19
           c-24.881-59.164-8.04-118.579-1.217-137.934l47.057,56.469L407.897,164.465z M477.027,111.861l-36.252,65.253
           c-0.131,0.234-0.419,0.335-0.666,0.236l-17.205-6.882l41.362-74.452l12.704,15.244
           C477.112,111.431,477.135,111.667,477.027,111.861z"
          />
        </G>
      </G>
    </Svg>
  );
}
