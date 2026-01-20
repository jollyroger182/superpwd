import load from 'argon2id'
import setupWasm from 'argon2id/lib/setup'

// @ts-expect-error untyped import
import SIMD_FILENAME from 'argon2id/dist/simd.wasm'
// @ts-expect-error untyped import
import NON_SIMD_FILENAME from 'argon2id/dist/no-simd.wasm'

export async function getArgon() {
  if (process) {
    return setupWasm(
      async (importObject) =>
        WebAssembly.instantiate(
          await Bun.file(SIMD_FILENAME).arrayBuffer(),
          importObject,
        ),
      async (importObject) =>
        WebAssembly.instantiate(
          await Bun.file(NON_SIMD_FILENAME).arrayBuffer(),
          importObject,
        ),
    )
  } else {
    return load()
  }
}
