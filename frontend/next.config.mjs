/** @type {import('next').NextConfig} */
export function headers() {
  return [
    {
      source: '/login',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store',
        },
      ],
    },
  ];
}
