const assetsFolder = import.meta.glob('@/assets/**/*', {
  eager: true,
  import: 'default',
})

/**
 * Method to get the URL of a static asset.
 * @param path path to the asset
 * @returns URL of the static asset relative to the '/src/assets' folder
 */
export function getStaticAssetUrl(path: string): string {
  // @ts-expect-error: wrong type info
  return assetsFolder['/assets/' + path]
}
