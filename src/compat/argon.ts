import setupWasm from 'argon2id/lib/setup'

// @ts-expect-error untyped import
import SIMD_FILENAME from 'argon2id/dist/simd.wasm'
// @ts-expect-error untyped import
import NON_SIMD_FILENAME from 'argon2id/dist/no-simd.wasm'

export async function getArgon() {
  if (globalThis.process) {
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
    return setupWasm(
      async (importObject) =>
        WebAssembly.instantiateStreaming(fetch(SIMD_FILENAME), importObject),
      async (importObject) =>
        WebAssembly.instantiateStreaming(fetch(NON_SIMD_FILENAME), importObject),
    )
  }
}
