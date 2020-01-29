# filegen

## Examples

### 1MB, 6-12 words per line, 1,000,000 lines max, 1 MB max
```sh
node index.js --min 6 --max 12 --lines 1000000 \
  --size $(expr 1000 \* 1000) \
  --input /usr/share/dict/words \
  --output ./1mb.txt
```

## TODO:

- Allow input via pipe
- Get closer to size limit
- Better messaging
- Some optional settings
- stdout optional
- argument parsing
