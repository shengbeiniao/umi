import routesToJSON from './routesToJSON';

test('normal', () => {
  const ret = routesToJSON({
    routes: [{ path: '/', component: '@/pages/index.ts' }],
    config: {},
  });
  expect(ret).toEqual(
    `
[
  {
    "path": "/",
    "component": require('@/pages/index.ts').default
  }
]
  `.trim(),
  );
});

test('normal with dynamicImport', () => {
  const ret = routesToJSON({
    routes: [{ path: '/', component: '@/pages/index.ts' }],
    config: {
      dynamicImport: true,
    },
  });
  expect(ret).toEqual(
    `
[
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__index' */'@/pages/index.ts')})
  }
]
  `.trim(),
  );
});

test('component with arrow function', () => {
  expect(
    routesToJSON({
      routes: [{ path: '/', component: '()=><div>loading...</div>' }],
      config: {},
    }),
  ).toEqual(
    `
[
  {
    "path": "/",
    "component": ()=><div>loading...</div>
  }
]
  `.trim(),
  );
  expect(
    routesToJSON({
      routes: [{ path: '/', component: '(props) => <div>loading...</div>' }],
      config: {},
    }),
  ).toEqual(
    `
[
  {
    "path": "/",
    "component": (props) => <div>loading...</div>
  }
]
  `.trim(),
  );
});

test('component with function', () => {
  expect(
    routesToJSON({
      routes: [
        {
          path: '/',
          component: 'function(){ return <div>loading...</div>; }',
        },
      ],
      config: {},
    }),
  ).toEqual(
    `
[
  {
    "path": "/",
    "component": function(){ return <div>loading...</div>; }
  }
]
  `.trim(),
  );
  expect(
    routesToJSON({
      routes: [
        {
          path: '/',
          component: 'function abc(props) { return <div>loading...</div>; }',
        },
      ],
      config: {},
    }),
  ).toEqual(
    `
[
  {
    "path": "/",
    "component": function abc(props) { return <div>loading...</div>; }
  }
]
  `.trim(),
  );
});
