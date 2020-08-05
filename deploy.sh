#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

npm run build

# cdn_asset 路径
path="../cdn_asset/common/theme/base/0.2.0/js/"

# 主题文件路径
theme_path="../../project/sibo-lyh/assets/"

# chunk 不匹配时启用
# 需要在 vue.config.js 中使用以下代码
# config.output.chunkFilename = '[id].[chunkhash].raw.js'

# chunk_path="../cdn_asset/common/theme/base/0.2.0/"
# mv "$chunk_path"*chunk* "$theme_path"

mv "$path"base.js "$theme_path"base.raw.js

# 部署到 gitlab 可选
git add .
git commit -m 'deploy'
git push
