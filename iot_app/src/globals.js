export const myVar = 'This is my variable'
export const settings = {
  some: 'Settings',
}
export const groups = [
  { slug: 'mysensor', name: 'MySensor' },
  //{ slug: 'pump', name: 'Pump' },
]

export const topics = [
  {
    uniq: 'mysensor-humidity-1-1',
    name: 'Humidity',
    slug: 'humidity',
    desc: 'Set humidity value (float)',
    opt: [
      { slug: 'min', name: 'Min. value', value: 0.01 },
      { slug: 'max', name: 'Max. value', value: 70.0 },
      { slug: 'ratio', name: 'Ratio', value: 80 },
    ],
    status: 0,
    groupSlug: 'mysensor',
  },
  /* {
    uniq: 'mysensor-temperature-1-2',
    name: 'Temperature',
    slug: 'temperature',
    desc: 'Set temperature value (float)',
    opt: [
      { slug: 'min', name: 'Min. value', value: 0.01 },
      { slug: 'max', name: 'Max. value', value: 70.0 },
      { slug: 'ratio', name: 'Ratio', value: 50 },
    ],
    status: 0,
    groupSlug: 'mysensor',
  },
  {
    uniq: 'pump-vibration-2-1',
    name: 'Vibration',
    slug: 'vibration',
    desc: 'Set vibration value (float)',
    opt: [
      { slug: 'min', name: 'Min. value', value: 0.01 },
      { slug: 'max', name: 'Max. value', value: 70.0 },
      { slug: 'ratio', name: 'Ratio', value: 70 },
    ],
    status: 1,
    groupSlug: 'pump',
  }, */
]
