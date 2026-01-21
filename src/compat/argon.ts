import setupWasm from 'argon2id/lib/setup'
import { readFile } from 'fs/promises'
import { resolve } from 'path'

// @ts-expect-error untyped import
import SIMD_FILENAME from 'argon2id/dist/simd.wasm'
// @ts-expect-error untyped import
import NON_SIMD_FILENAME from 'argon2id/dist/no-simd.wasm'

export async function getArgon() {
  if (globalThis.process) {
    if (typeof SIMD_FILENAME === 'string') {
      const simdPath = resolve(import.meta.dirname, SIMD_FILENAME)
      const nonSimdPath = resolve(import.meta.dirname, NON_SIMD_FILENAME)
      return setupWasm(
        async (importObject) =>
          WebAssembly.instantiate(await readFile(simdPath), importObject),
        async (importObject) =>
          WebAssembly.instantiate(await readFile(nonSimdPath), importObject),
      )
    } else {
      return setupWasm(
        async (importObject) =>
          WebAssembly.instantiate(SIMD_FILENAME, importObject),
        async (importObject) =>
          WebAssembly.instantiate(NON_SIMD_FILENAME, importObject),
      )
    }
  } else {
    return setupWasm(
      async (importObject) =>
        WebAssembly.instantiateStreaming(fetch(SIMD_FILENAME), importObject),
      async (importObject) =>
        WebAssembly.instantiateStreaming(
          fetch(NON_SIMD_FILENAME),
          importObject,
        ),
    )
  }
}
