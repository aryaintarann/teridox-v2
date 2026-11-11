import { describe, expect, it } from 'vitest'
import { jsonLdString } from '@/lib/json-ld'

describe('jsonLdString', () => {
  it('never emits a raw "<" so </script> cannot close the tag', () => {
    const s = jsonLdString({ headline: '</script><script>alert(1)</script>' })
    expect(s).not.toContain('<')
  })

  it('round-trips to the original object', () => {
    const o = { headline: 'a </script> b', n: 1 }
    expect(JSON.parse(jsonLdString(o))).toEqual(o)
  })
})
