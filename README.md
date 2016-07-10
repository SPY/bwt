## Effective implementation of Burrows-Wheeler transform

```typescript
import {bwt, ibwt} from 'burrows-wheeler-transform'

const WORD = 'banana'

assert(ibwt(bwt(WORD)) === WORD)
```
