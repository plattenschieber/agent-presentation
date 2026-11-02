#!/usr/bin/env bash
set -euo pipefail
# Optional Linux x64 verification. No provider account or API key is required.
mkdir -p .local/model
cd .local/model
curl --fail --location --retry 2 -o llama.tar.gz \
  https://github.com/ggml-org/llama.cpp/releases/download/b12032/llama-b12032-bin-ubuntu-x64.tar.gz
curl --fail --location --retry 2 -o qwen.gguf \
  https://huggingface.co/Qwen/Qwen2.5-1.5B-Instruct-GGUF/resolve/91cad51170dc346986eccefdc2dd33a9da36ead9/qwen2.5-1.5b-instruct-q4_k_m.gguf
echo '9f10432ca3f66ef003a7a540aaffb9da0acadaefd05404521b9ab7a2436af304  llama.tar.gz' | sha256sum --check
echo '6a1a2eb6d15622bf3c96857206351ba97e1af16c30d7a74ee38970e434e9407e  qwen.gguf' | sha256sum --check
tar -xzf llama.tar.gz
export LLAMA_SERVER="$PWD/llama-b12032/llama-server"
export LLAMA_MODEL="$PWD/qwen.gguf"
export LOCAL_MODEL_LABEL=Qwen2.5-1.5B-Instruct-Q4_K_M
export JUDGE_TIMEOUT_MS=300000
cd ../..
npm run test:local-model
