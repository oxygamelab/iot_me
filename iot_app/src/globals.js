export const myVar = 'This is my variable'
export const settings = {
  some: 'Settings',
}
export const groups = [
  { id: 1, uniq: 'mysensor-1', name: 'MySensor' },
  { id: 2, uniq: 'pump-2', name: 'Pump' },
]

export const topics = [
  {
    id: 1,
    uniq: 'mysensor-humidity-1-1',
    name: 'Humidity',
    desc: 'Set humidity value (float)',
    opt: [
      { slug: 'min', name: 'Min. value', value: 0.01 },
      { slug: 'max', name: 'Max. value', value: 70.0 },
      { slug: 'ratio', name: 'Ratio', value: 1.0 },
    ],
    status: 1,
    group_id: 1,
  },
  {
    id: 2,
    uniq: 'mysensor-temperature-1-2',
    name: 'Temperature',
    desc: 'Set temperature value (float)',
    opt: [
      { slug: 'min', name: 'Min. value', value: 0.01 },
      { slug: 'max', name: 'Max. value', value: 70.0 },
      { slug: 'ratio', name: 'Ratio', value: 1.0 },
    ],
    status: 0,
    group_id: 1,
  },
  {
    id: 3,
    uniq: 'pump-vibration-2-1',
    name: 'Vibration',
    desc: 'Set vibration value (float)',
    opt: [
      { slug: 'min', name: 'Min. value', value: 0.01 },
      { slug: 'max', name: 'Max. value', value: 70.0 },
      { slug: 'ratio', name: 'Ratio', value: 1.0 },
    ],
    status: 1,
    group_id: 2,
  },
]
